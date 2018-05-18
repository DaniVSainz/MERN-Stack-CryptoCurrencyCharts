const mongoose = require('mongoose');


const MarketSchema =  mongoose.Schema({
    name: {type: String, required: true},
    symbol:{type:String},
    exchange_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Exchange' },
    volume_24h:{type:String}

},{timestamps:true});

const Market = module.exports = mongoose.model('Market', MarketSchema);