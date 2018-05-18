const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const response = await axios.get(url);
console.log(response.data);
const data = response.data;
fs.writeFileSync('../testResponses/coinMarketCapTicker.json', JSON.stringify(data));