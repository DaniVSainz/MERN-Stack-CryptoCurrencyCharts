import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
          Pairing: ${cryptoCurrency.price_usd}
        </Typography>
      </div>
      <div>
        <Typography variant="title" gutterBottom>
          Pairing: ${cryptoCurrency.price_usd}
        </Typography>
      </div>
      <div>
        <Typography variant="title" gutterBottom>
          Pairing: ${cryptoCurrency.price_usd}
        </Typography>
      </div>
      <Divider></Divider>
    </div>
  )
};