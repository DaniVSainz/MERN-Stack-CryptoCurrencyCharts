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
// mongoose.connect("mongodb://localhost:27017/cryptoNalysisApi");


process.on('message', async(msg) => {
    try{
        await mongoose.connection.on('connected', () => {
            console.log('Connected to Database '+ process.env.mongoUrl);
          });
        const sum = await scrapeBinanceExchangeInfo();
        await mongoose.connection.close((res)=>{
          console.log('Connection Closed, From exchangeInfo Worker');
        });
        process.send(sum);
    }catch(err){
        console.log(err);
        next(err);
    }
});




//This function saves all the exchanges pair listings to our db To later run a script that hits their historical data from this list.
const scrapeBinanceExchangeInfo = async () => {
  try {
    const url = "https://api.binance.com/api/v1/exchangeInfo";
    const response = await axios.get(url);
    const data = response.data;

    let exchange = await Exchange.binance();

    let responsePairs = data.symbols; // all the coins in the response from exchange
    let responsePair; // current response pair
    let currentMarket; //current market pair data will be saved to
    let quoteAsset; // quote asset reference cryptocurrency
    let baseAsset; //base asset reference cryptocurrency
    let pairInDb; // check if the pair exists or create one. later this will be used to get _Id to save days to

    for(let i=0;i<responsePairs.length;i++){
      //Binance api has fake data in prod... skip this symbol
      responsePair = responsePairs[i];
      if(responsePair.symbol != "123456"){

        currentMarket = await Market.find({symbol:responsePair.quoteAsset, exchange_id:exchange._id});

        //If exchange dosent have a market create it.
        if(currentMarket.length==0){
          quoteAsset = await CryptoCurrency.findOne({symbol:responsePair.quoteAsset});
          //create new market since we did not have a market for it
          currentMarket = new Market({
            name:quoteAsset.name,
            symbol:quoteAsset.symbol,
            exchange_id:exchange._id
          });
          //save the market
          currentMarket = await currentMarket.save();
          //push ref onto market incase we ever want to populate
          exchange.markets.push(currentMarket._id);
          exchange = await exchange.save();


        //We have a market to add pairs to.
        }else if(currentMarket.length == 1){
          //set current market for easier referencing.
          currentMarket=currentMarket[0];

          //Now we would check if a pair exists for that cryptoCurrency.
          pairInDb = await Pair.findOne({symbol:responsePair.baseAsset, market_id:currentMarket._id});
          if(pairInDb==undefined){
            //Check if we have the responses pair cryptocurrency's(baseAsset) in our database to save a name to it since its not returned from exchange api
            baseAsset = CryptoCurrency.findOne({symbol:responsePair.baseAsset});
            pairInDb = new Pair({
              symbol: responsePair.baseAsset,
              quote_asset: responsePair.quoteAsset,
              market_id: currentMarket._id,
              pair: responsePair.symbol
            });

            if(baseAsset != null) pairInDb.name = baseAsset.name;
            
            pairInDb = await pairInDb.save();
            // console.log(`Saved ${pairInDb.pair}`);
          }
        //This would mean we found multiple markets which should not occur.
        }else{
          throw Error('Found duplicates when it should have not occured, create validation');
        }
      }
    }
    return exchange;
  }catch(err) {
    console.log(err);
  }
};

//Methods below were for development

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



// run().then((result)=>{
//   console.log(result);
//   mongoose.connection.close((res)=>{
//     console.log('Connection Closed, From exchangeInfo Worker');
//   });
// })


