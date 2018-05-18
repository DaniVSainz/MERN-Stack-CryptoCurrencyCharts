const mongoose = require('mongoose');

const ExchangeSchema =  mongoose.Schema({
    name: {type: String, required: true, unique:true},
    volume_24h:{type:String},
    markets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }]
},{timestamps:true});


ExchangeSchema.statics.coinMarketCap = async function(){
    let coinMarketCap = await Exchange.findOne({name: 'CoinMarketCap'});
    if (coinMarketCap == undefined){
        coinMarketCap = new Exchange({name:'CoinMarketCap'});
        coinMarketCap = await coinMarketCap.save();
    }
    return coinMarketCap
}

// ExchangeSchema.statics.binance = async function(){
//     let binance = await Exchange.findOne({name: 'Binance'});
//     if (binance == undefined){
//         binance = new Exchange({name:'Binance'});
//         binance = await binance.save();
//     }
//     return binance
// }

ExchangeSchema.statics.binance = async function(){
    let binance = await Exchange.findOne({name: 'Binance'}).populate('markets').exec();
    if (binance == undefined){
        binance = await Exchange.create({name:'Binance'});
        binance;
    }
    return binance
}

const Exchange = module.exports = mongoose.model('Exchange', ExchangeSchema);
