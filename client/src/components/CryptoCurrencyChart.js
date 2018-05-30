import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class CryptoCurrencyChart extends Component {

  componentDidMount(){
    this.props.getCryptoCurrency(this.props.match.params.symbol);
    console.log(this.props.cryptocurrency)
  }

  logProps(){
    console.log(this.props.cryptocurrency.cryptocurrency[1].days);
  }

  render() {
    return (
      <div className="myContainer">
        Hi from cryptocurrency chart
        <button onClick={()=> this.logProps()}></button>
        {this.props.cryptocurrency.cryptocurrency[1].days && (
          <ResponsiveContainer width={700} height="80%">
            <LineChart width={600} height={300} data={this.props.cryptocurrency.cryptocurrency[1].days}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="linear" dataKey="lowestPrice" dot stroke="#8884d8" />
            <Line type="linear" dataKey="highestPrice" stroke="#82ca9d" />
            </LineChart>
          </ ResponsiveContainer>
        )}
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}

export default connect(mapStateToProps, actions)(CryptoCurrencyChart);