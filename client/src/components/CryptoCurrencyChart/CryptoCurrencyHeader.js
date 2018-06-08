import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


let styles = {
  pairing:{
    color: '#38ef7d'
  },
  positive: {
    color: '#38ef7d'
  },
  negative: {
    color : 'red'
  }
}



export default ({cryptoCurrency, pair,pairs,getSpecificPairing}) => {

  console.log(pairs)

  function preparePercentChange(text,percent) {
    let color;
    if(percent.charAt(0) == '-'){
      color = styles.negative
    }else{
      color = styles.positive
    }
    return(
      <Typography variant="title" gutterBottom>
        {text} <span style={color}>{percent}%</span>
      </Typography>
    )
  }

  function preparePairs(pairs){
    let pairsSpan = pairs.map((pair,i)=>{
      // return(<span key={i}>{pair.quote_asset}</span>);
      return(
        <Button variant="outlined" color="primary" key={i} onClick={()=> getSpecificPairing(pair)}>
          {pair.quote_asset}
        </Button>
      )
    });
    return pairsSpan
  }

  return(
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <div>
        <Typography variant="title" gutterBottom>
          <span><img style={{marginRight:'3px'}} src={window.location.origin + `/assets/images/coins/${cryptoCurrency.name.split(' ').join('_')}.png`} alt={`${cryptoCurrency.name} icon`}/></span>
          {cryptoCurrency.name}
        </Typography>
        <Typography variant="title" gutterBottom>
          Current Price: ${cryptoCurrency.price_usd}
        </Typography>
        <Typography variant="title" gutterBottom>
          Pairing: <span style={styles.pairing}>{pair.symbol}</span>/{pair.quote_asset} {preparePairs(pairs)}
        </Typography>
      </div>
      <div>
        {preparePercentChange('Percent Change 1 Hour:', cryptoCurrency.percent_change_1h)}
        {preparePercentChange('Percent Change 24 Hour:', cryptoCurrency.percent_change_24h)}
        {preparePercentChange('Percent Change 7 Days:', cryptoCurrency.percent_change_7d)}
      </div>
      <div>
        <Typography variant="title" gutterBottom>
          24H Volume: ${parseInt(cryptoCurrency['24h_volume_usd']).toLocaleString()}
        </Typography>
        <Typography variant="title" gutterBottom>
          Info Updated: {new Date(cryptoCurrency.updatedAt).toLocaleString()}
        </Typography>
      </div>
      <div>
      <Button variant="outlined" color="primary" >
        Primary
      </Button>
      </div>
    </div>
  )
};