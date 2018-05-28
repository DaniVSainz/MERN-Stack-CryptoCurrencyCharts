const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Token = require('../models/verificationToken')
var crypto = require('crypto');
var nodemailer = require('nodemailer');



router.post('/register', async (req,res,next) => {
  try {

    let newUser = new User ({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    let user;

    if( !newUser.username || !newUser.email || !newUser.password ){
      return res.status(400).json({success: false, msg: `Please fill in all the fields`});
    }    

    //Check if username is unique
    user = await User.findOne({username: newUser.username});
    if (user) {
      return res.status(400).json({success: false, msg: `An Account with username:  ${newUser.username} already exists`});
    }

    //Check if email is unique
    user = await User.findOne({email:newUser.email});
    if (user) {
      return res.status(400).json({success: false, msg: `An Account with email:  ${newUser.email} already exists`});
    }

    User.addUser(newUser , (err,user)=>{
      if (err) res.status(500).json({success: false, msg: 'Failed to register user'});
      else{
        token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        token.save(err=>{
          if(err) res.status(500).json({success: false, msg: `Encountered and Unknown error: ${err}`});
          // Send the email
          var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.userEmail, pass: process.env.userPass } });
          var mailOptions = { from: 'no-reply@yourwebapplication.com',
                                to: user.email, subject: 'Account Verification Token',
                                text: `Hello,\n\n  Please verify your account by clicking the link: \n https://${req.headers.host}/emailVerification/${token.token}  \n` };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).json({ msg: err.message })};
              res.status(200).json({success: true, msg: "You've successfully registered, please check your email to confirm your email address."});
          });
        })
      }
    });

  } catch (e) {
    //this will eventually be handled by your error handling middleware
    res.json({success: false, msg: `Encountered and Unknown error: ${err}`})
    next(e) 
  }
})



// Authenticate
router.post('/authenticate', (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.status(400).send({success: false, msg: 'Incorrect username or password'});
    }
    if(user.isVerified == false){
      return res.status(400).send({success: false, isVerified:false, msg: `Email is not verified, please verify to log in.`})
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.status(200).send({
          msg:`You're now logged in`,
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.status(400).json({success: false,isVerified:true, msg: 'Incorrect username or password'});
      }
    });
  });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let tempUser = req.user;
  let user = {
    name: tempUser.name,
    email: tempUser.email,
    username: tempUser.username,
    isVerified: tempUser.isVerified
  }
  res.status(200).send({user, msg:'Success'});
});

router.delete('/delete', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log('Inside delete')
  try{
    console.log(req.user);
    req.user.remove();
    res.status(200).json({success:'deleted user'});
  }catch (e){
    res.status(500).json({success: false, msg: `Encountered and Unknown error: ${err}`})
    next(e) 
  }
})

module.exports = router;
