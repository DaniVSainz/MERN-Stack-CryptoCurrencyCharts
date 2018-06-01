import React, { Component } from 'react';

import { Typography } from '@material-ui/core';

import SmartTable from './Table2'

class CryptoCurrencies extends Component {



  render() {
    return (
      <div style={{display:'flex', height:'-webkit-fill-available', flexDirection:"column"}}>
        <div>
          <Typography variant="headline" gutterBottom>
            CryptoCurrency Page
          </Typography>
        </div>
        <div style={{backgroundColor: 'white', display:'flex', flex:'1'}}>
          <SmartTable></SmartTable> 
        </div>
      </div>
    );
  }
}


export default CryptoCurrencies