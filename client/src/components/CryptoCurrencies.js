import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/'

import { Typography } from '@material-ui/core';

class CryptoCurrencies extends Component {
  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          CryptoCurrency Page
        </Typography>
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}
export default connect(mapStateToProps, actions)(CryptoCurrencies);