const express = require('express');
const router = express.Router();
const CryptoCurrency = require('../models/cryptoCurrency');
const Exchange = require('../models/exchange');
const Market = require('../models/market');
const Pair = require('../models/pair');
const Day = require('../models/day');



router.get('/getpairdata/:symbol', async (req,res,next) => {
    try{
        let pairParam = req.params.symbol.toUpperCase();
        let pairs = await Pair.find({symbol:pairParam});
        let pair;
        let cryptoCurrency = await CryptoCurrency.findOne({symbol:pairParam});
        let days;
        console.log(pairs.length);
        if (pairs.length >= 0){
            for (let i =0;i<pairs.length;i++){
                console.log(pairs[i].quote_asset);
                if(pairs[i].quote_asset=='USDT'){
                    pair = pairs[i];
                    break;
                }else if(pairs[i].quote_asset=='BTC'){
                    pair = pairs[i];
                }else if(pairs[i].quote_asset=='ETH' && pair.quote_asset=='BNB'){
                    pair = pairs[i];
                }else if (pairs[i].quote_asset=='ETH' && pair == undefined){
                    pair = pairs[i];
                }
            }
            days = await Day.find({pair_id:pair._id}).sort('date').exec();
            return res.status(200).send([{pair},{days},{cryptoCurrency}]);
        }else{
            return res.status(500).send({msg:'Sorry we dont have any historical data for that cryptocurrency'});
        }        
    }catch(err){
        console.log(err);
        next(err); 
    }
});


module.exports = router;

//We need to go USDT>BTC>ETH>BNB

//Find Exchange.
//Get exchange markets.
// For i in markets.length
// Do a search if pair is returned break.

// let exchange = await Exchange.findOne({name:'Binance'});
// let markets = await Market.find({exchange_id:exchange._id});

// if i.length >=1 
// then
// for i pair.length i++


