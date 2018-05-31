import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default ({cryptoCurrency}) => {
  console.log(cryptoCurrency);
  return(
    <div>
      <Typography variant="subheading" gutterBottom>{cryptoCurrency.name}</Typography>
      <Divider></Divider>
    </div>
  )
};