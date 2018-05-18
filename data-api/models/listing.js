const mongoose = require('mongoose');


const ListingSchema =  mongoose.Schema({
    crypto_currency_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CryptoCurrency' },
    pair_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pair' }
},{timestamps:true});

const Listing = module.exports = mongoose.model('Listing', ListingSchema);