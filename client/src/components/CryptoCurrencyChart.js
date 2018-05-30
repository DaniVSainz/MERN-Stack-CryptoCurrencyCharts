import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions'

class CryptoCurrencyChart extends Component {

  componentDidMount(){
    this.props.getCryptoCurrency(this.props.match.params.symbol);
  }

  render() {
    return (
      <div>
        Hi from cryptocurrency chart
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}

export default connect(mapStateToProps, actions)(CryptoCurrencyChart);