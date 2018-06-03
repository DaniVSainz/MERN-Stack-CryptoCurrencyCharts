import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default ({cryptoCurrency, pair}) => {
  return(
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <div>
        <Typography variant="title" gutterBottom>
          <span><img src={window.location.origin + `/assets/images/coins/${cryptoCurrency.name.split(' ').join('_')}.png`} alt={`${cryptoCurrency.name} icon`}/></span>
          {cryptoCurrency.name}
        </Typography>
        <Typography variant="title" gutterBottom>
          Current Price: ${cryptoCurrency.price_usd}
        </Typography>
        <Typography variant="title" gutterBottom>
          Pairing: {pair.symbol}/{pair.quote_asset}
        </Typography>
      </div>
      <div>
        <Typography variant="title" gutterBottom>
          Percent Change 1 Hour: {cryptoCurrency.percent_change_1h}%
        </Typography>
        <Typography variant="title" gutterBottom>
          Percent Change 24 Hour: {cryptoCurrency.percent_change_24h}%
        </Typography>
        <Typography variant="title" gutterBottom>
          Percent Change 7 Days: {cryptoCurrency.percent_change_7d}%
        </Typography>
      </div>
      <div>
        <Typography variant="title" gutterBottom>
          24H Volume: ${cryptoCurrency['24h_volume_usd']}
        </Typography>
        <Typography variant="title" gutterBottom>
          Info Update: {new Date(cryptoCurrency.updatedAt).toLocaleString()}
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