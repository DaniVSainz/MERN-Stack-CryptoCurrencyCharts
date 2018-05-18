const mongoose = require("mongoose");

const PairSchema = mongoose.Schema(
  {
    name: { type: String },
    symbol: { type: String },
    quote_asset: { type: String },
    price_btc: { type: String },
    price_usd: { type: String },
    volume_24h: { type: String },
    pair: { type: String },
    market_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Market"
    }
  },
  { timestamps: true }
);

const Pair = (module.exports = mongoose.model("Pair", PairSchema));
