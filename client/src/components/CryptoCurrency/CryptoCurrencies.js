import React, { Component } from 'react';

import { Typography } from '@material-ui/core';

import SmartTable from './Table';

class CryptoCurrencies extends Component {



  render() {
    return (
      <div style={{position:'absolute', width:'100%', overflow:'auto'}}>
        <div>
          <div>
            <Typography variant="headline" gutterBottom>
              CryptoCurrency Page
            </Typography>
          </div>
          <div style={{backgroundColor: 'white',}}>
            <SmartTable></SmartTable> 
          </div>
        </div>
      </div>
    );
  }
}


export default CryptoCurrencies