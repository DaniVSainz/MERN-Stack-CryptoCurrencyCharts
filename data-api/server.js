const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const logger = require('morgan');

//Our routes
const users = require('./routes/users');
const confirmation = require('./routes/confirmation');
const coinmarketcap = require('./routes/coinmarketcap');
const binance = require('./routes/binance');


//
const { fork } = require('child_process');
//cronjobs
const CronJob = require('cron').CronJob;

const coinMarketCapJob = new CronJob('*/5 * * * *', function() {
  const compute = fork('./jobs/coinMarketCap.js');
  console.log('Running CoinmarketCap job');
  compute.send('start');
  compute.on('message', result => {
    console.log(result);
    compute.kill('SIGINT');
  });
}, null, true, 'America/Los_Angeles');

//Should run every 15 minutes
const binanceScrapeKlinesJob = new CronJob('0 */15 * * * *', function() {
  const compute2 = fork('./jobs/binance/scrapeKlines.js');
  console.log('Running Binance Klines job');
  compute2.send('start');
  compute2.on('message', result => {
    console.log(result);
    compute2.kill('SIGINT');
  });
}, null, true, 'America/Los_Angeles');

const binanceScrapeExchangeInfo = new CronJob('0 0 0 * * *', function() {
  const compute3 = fork('./jobs/binance/exchangeInfo.js');
  console.log('Running Binance Exchange Info job');
  compute3.send('start');
  compute3.on('message', result => {
    console.log(result)
    compute3.kill('SIGINT');
  });
}, null, true, 'America/Los_Angeles');

//For .env variables
require('dotenv').config()


mongoose.Promise = require('bluebird');
// // Use q. Note that you **must** use `require('q').Promise`.
// mongoose.Promise = require('q').Promise;

//Read Mongoose.connect below
// // Connect To Database 
// mongoose.connect(config.database);

//Or USE this instead to connect to db if you rather use .env variables
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



//The port number inside of bin/www takes precendence
// Port Number
// const port = process.env.PORT || 8080;


app.use(logger('dev'));


// CORS Middleware
app.use(cors());

// Set Static Folder
// This was for setup using angular front end.
// app.use(express.static(path.join(__dirname, 'angular-src/dist')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/confirmation', confirmation);
app.use('/coinmarketcap', coinmarketcap);
app.use('/binance', binance);




// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});


module.exports = app;