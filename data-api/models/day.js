const mongoose = require('mongoose');

const DaySchema =  mongoose.Schema({
    date:{type:String, required:true},
    openEpoch:{type:Number},
    openTime:{type:Date},
    openingPrice:{type:String},
    highestPrice:{type:String},
    lowestPrice:{type:String},
    closingPrice:{type:String},
    totalVolume:{type:String},
    closeEpoch:{type:Number},
    totalVolumeQuoteAsset:{type:String},
    totalTrades:{type:Number},
    closeTime:{type:Date},
    price_usd:{type:Number},
    changePercent:{type:Number},
    pair_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pair' }
},{timestamps:true});

const Day = module.exports = mongoose.model('Day', DaySchema);



// Binance klines data
// [
//     1499040000000,      // Open time 0
//     "0.01634790",       // Open 1
//     "0.80000000",       // High 2 
//     "0.01575800",       // Low 3
//     "0.01577100",       // Close 4 
//     "148976.11427815",  // Volume 5
//     1499644799999,      // Close time 6 
//     "2434.19055334",    // Quote asset volume 7 
//     308,                // Number of trades 8 
//     "1756.87402397",    // Taker buy base asset volume 9 
//     "28.46694368",      // Taker buy quote asset volume 10
//     "17928899.62484339" // Ignore
//   ]