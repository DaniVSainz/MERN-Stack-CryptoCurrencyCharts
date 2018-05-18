const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var logger = require('morgan');
require('dotenv').config()


mongoose.Promise = require('bluebird');

//Works easier with deploys and git not having to change stuff and just using .env vars
mongoose.connect(process.env.mongoUrl);


// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ process.env.mongoUrl);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');
const confirmation = require('./routes/confirmation');

//The port number inside of bin/www takes precendence
// Port Number
const port = process.env.PORT || 8080;


app.use(logger('dev'));


// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'angular-src/dist')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/confirmation', confirmation);




// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './angular-src/dist/index.html'));
});

module.exports = app;