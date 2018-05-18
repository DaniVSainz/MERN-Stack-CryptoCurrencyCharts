const express = require('express');
const router = express.Router();
const passport = require('passport');
const Token = require('../models/verificationToken')
const resetPassToken = require('../models/resetToken');
const User = require('../models/user');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

router.post('/verifyEmail', (req, res, next) => {

    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({success:true,msg:"You're now verified and can login"});
            });
        });
    });
})

router.post('/verifyEmail/resend', (req,res,next) => {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified.You can now log in' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.userEmail, pass: process.env.userPass } });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
    });
})

router.post('/reset', (req,res,next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });

        resetPassToken.find({_userId: user._id} , (err,tokens) =>{
            if(err){
                return res.status(400).send({ msg: 'Error' });
            }
            if(tokens){
                tokens.forEach(token=>{
                    token.remove();
                })
            }
        })

        var token = new resetPassToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // Send the email
        var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.userEmail, pass: process.env.userPass } });
        var mailOptions = { from: 'no-reply@yourwebapplication.com',
                             to: user.email, subject: 'Account Password Reset',
                             text: `Hello \n\n 
                                    You can reset your password by visiting: http://${req.headers.host}/resetpw/${token.token} \n\n
                                    For your security this link only works for 1 hour.`};
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            return res.status(200).send({success:true, msg: `A verification email has been sent to : ${user.email}`});
        });
    });
    });
});

router.post('/reset/password', (req,res,next) => {
    console.log(req.body);
    resetPassToken.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        User.findOne({ email: req.body.email }, function (err, user) {
        if (!user){
            console.log(user);
            return res.status(400).send({ msg:'We were unable to find a user with that email.'});
        }
        
        if(token._userId.toString !== user._id.toString){
            console.log(token._userId, user._id)
            return res.status(400).send({ msg: 'Email provided does not match this password reset token.' });
        }
        console.log('Tokens match');
        //If token user id and email user id match
        user.password = req.body.password;

        User.changePassword(user, (err,user)=>{
            if(err) res.status(400).send({ msg: 'Unknown error saving password, please contact support' });

            token.remove();
            return res.status(200).send({ msg: `You've reset your password successfully for ${user.email}` });
        })

        // return res.status(200).send({ msg: `You've reset your password successfully` });

        })
    })    
})



module.exports = router;
