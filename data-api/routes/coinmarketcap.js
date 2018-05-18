const express = require('express');
const router = express.Router();
const axios = require("axios");
const CryptoCurrency = require('../models/cryptoCurrency');
const Exchange = require('../models/exchange');
const fs = require('fs');

router.get('/getall', async (req,res,next)=>{
    try{
        let data = await CryptoCurrency.find({},(err)=>{
            if (err) console.log(err);
        });
        if(data){
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json(err);
        next(err);
    }
});

router.get('/coinmarketcap', async (req,res,next) => {
    try{
        let coinMarketCap = await Exchange.coinMarketCap();
        const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
        const response = await axios.get(url);
        const data = response.data;

        // const response = fs.readFileSync('../testResponses/coinMarketCapTicker.json')
        // let data = await JSON.parse(response);
        // data = data;

        const time = new Date();
        let counter = 0;
        let coin;
        let saved = 0;
        let updated = 0;
        let i=0;
        for(i;i<data.length;i++){
            data[i].rank = parseInt(data[i].rank);
            
            coin = await CryptoCurrency.find({name:data[i].name, symbol:data[i].symbol});
            if(coin.length == 0){
                coin = new CryptoCurrency({
                    name: data[i].name,
                    symbol: data[i].symbol,
                    rank: data[i].rank,
                    price_usd: data[i].price_usd,
                    price_btc: data[i].price_btc,
                    '24h_volume_usd': data[i]['24h_volume_usd'],
                    market_cap_usd: data[i].market_cap_usd,
                    available_supply: data[i].available_supply,
                    total_supply: data[i].total_supply,
                    max_supply: data[i].max_supply,
                    percent_change_1h: data[i].percent_change_1h,
                    percent_change_24h: data[i].percent_change_24h,
                    percent_change_7d: data[i].percent_change_7d,
                    last_updated: data[i].last_updated,
                });
                coin.save(err=>{
                    if (err) console.log(err);
                    saved++;
                });
            }else{
                if(coin.length == 1 && coin[0].last_updated != data[i].last_updated){
                    coin = coin[0];

                    coin.set({
                        name: data[i].name,
                        symbol: data[i].symbol,
                        rank: data[i].rank,
                        price_usd: data[i].price_usd,
                        price_btc: data[i].price_btc,
                        '24h_volume_usd': data[i]['24h_volume_usd'],
                        market_cap_usd: data[i].market_cap_usd,
                        available_supply: data[i].available_supply,
                        total_supply: data[i].total_supply,
                        max_supply: data[i].max_supply,
                        percent_change_1h: data[i].percent_change_1h,
                        percent_change_24h: data[i].percent_change_24h,
                        percent_change_7d: data[i].percent_change_7d,
                        last_updated: data[i].last_updated,
                        updatedAt:time
                    });
                    coin.save(err=>{
                        if (err) console.log(err);
                        updated++;
                    });
                }else{
                    console.log(coin[0],data[i]);
                }
            }
        }
    
        res.status(200).send({
            saved:`Saved: ${saved} coins`,
            updated:`Updated ${updated} coin`,
            responseLength:`Response contained ${i-1} items`,
            lastItem:`Last item in response: ${data[i-1].name}`,
            firstItem:`First item in response: ${data[0].name}`
        })
    }catch(err){
        next(err)
    }
});


module.exports = router;


