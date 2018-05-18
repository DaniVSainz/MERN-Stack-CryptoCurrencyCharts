const axios = require("axios");
const CryptoCurrency = require("../../models/cryptoCurrency");
const Exchange = require("../../models/exchange");
const Market = require('../../models/market');
const Pair = require('../../models/pair');
const Day = require('../../models/day');
require('dotenv').config()


const fs = require("fs");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
mongoose.connect(process.env.mongoUrl);

//Hardcoded url, used when running debugger.
// mongoose.connect("mongodb://localhost:27017/cryptoNalysisApi");



process.on('message', async(msg) => {
    try{
        await mongoose.connection.on('connected', () => {
            console.log('Connected to Database '+ process.env.mongoUrl);
          });
        const sum = await scrapeDays();

        await mongoose.connection.close((res)=>{
            console.log('Connection Closed, From Scrape Klines Worker');
        });

        process.send(sum);
    }catch(err){
        console.log(err);
        next(err);
    }
});






//This function will get a list of all Binance's pair and scrape data from the api for each one.
const scrapeDays = async () =>{
  console.log('Begin Scrape Days');
  let exchange = await Exchange.findOne({name:'Binance'});
  let markets = await Market.find({exchange_id:exchange._id});
  let pairs;
  let pair;

  let url;
  let response;
  let responseDay;
  let data;
  let day;
  let date;
  let skipCount;
  let saved = 0;


  //go through each of binances markets ie BTC/ETH/USDT/BNB then get all of the pairs against that market and get the current data from the api.
  for(let i=0;i < markets.length;i++){
    //Get the pairs for the market
    pairs = await Pair.find({market_id:markets[i]._id});
    //Go through each pair, get response from the api for that pair, seed the db with the days data.
    for(let i=0;i< pairs.length;i++){
      pair = pairs[i];
      url = `https://api.binance.com/api/v1/klines?symbol=${pair.pair}&interval=1d`
      response = await axios.get(url);
      data = response.data;
      skipCount = 0;
      for(let i = data.length -1 ;i >= 0; i--){
        responseDay=data[i]
        date = new Date(responseDay[0]);
        date = date.toISOString().slice(0,10);
        day = await Day.findOne({date:date, pair_id:pair._id});
        //If the day dosent exist create it
        if(day==undefined){
          day = new Day({
            date:date,
            openEpoch:responseDay[0],
            openingPrice:responseDay[1],
            highestPrice:responseDay[2],
            lowestPrice:responseDay[3],
            closingPrice:responseDay[4],
            totalVolume:responseDay[5],
            closeEpoch:responseDay[6],
            totalVolumeQuoteAsset:responseDay[7],
            totalTrades:responseDay[8],
            pair_id: pair._id
          })
          //save the day
          day = await day.save();
          saved ++;
        }else if(day && skipCount < 2 ){
          day.openEpoch = responseDay[0];
          day.openingPrice = responseDay[1];
          day.highestPrice = responseDay[2];
          day.lowestPrice = responseDay[3];
          day.closingPrice = responseDay[4];
          day.totalVolume = responseDay[5];
          day.closeEpoch = responseDay[6];
          day.totalVolumeQuoteAsset = responseDay[7];
          day.totalTrades = responseDay[8];
          day = await day.save();
          skipCount ++;
        }else{
          break;
        }
      }
    }
  }
  return saved;
}

//Old method to trigger manually while developing
// const run = async () => {
//   try {
//     //wait for mongoose connection
//     await mongoose.connection.on("connected", () => {
//       console.log("Connected to Database " + process.env.mongoUrl);
//     });

//     //wait for result
//     let result = await scrapeDays();;

//     return result;

//   } catch (err) {
//     console.log(err);
//   }
// };

//Old method to trigger manually while developing
// run().then((result)=>{
//   console.log(result);
//   mongoose.connection.close((res)=>{
//     console.log('Connection Closed');
//   });
// })


