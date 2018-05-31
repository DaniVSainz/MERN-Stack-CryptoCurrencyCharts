import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import ReactEcharts from 'echarts-for-react';

class CryptoCurrencyChart extends Component {

  state={
    priceData:[],
    dayData:[],
    days:[],
    pair:false,
    cryptoCurrency:false
  }

  async componentDidMount(){
    await this.props.getCryptoCurrency(this.props.match.params.symbol);
    await this.setState({days: this.props.cryptocurrency.cryptocurrency[1].days});
    await this.setState({cryptoCurrency : this.props.cryptocurrency.cryptocurrency[2].cryptoCurrency });
    await this.state.days.forEach(element => {
      this.state.dayData.push(element.date);
      this.state.priceData.push(element.openingPrice.replace(/,/g,""));
    });
    await this.setState({pair: this.props.cryptocurrency.cryptocurrency[0].pair});
  }

  logProps(){
    console.log(this.props.cryptocurrency.cryptocurrency[1].days);
    console.log(this.state.dayData);
  }

  getOption = () => {
    return {
      backgroundColor: 'white',
      color: ['green', 'yellow'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      toolbox:{
        feature:{
          saveAsImage:{}
        }
      },
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
        },
        {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty',
        }
    ],
      xAxis: [ 
        {
          boundaryGap:false,
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'black',
            },
          },
          axisLabel: {
            textStyle: {
              color: 'black',
            },
            showMaxLabel: true
          },
          axisPointer: {
            label: {formatter: params => {
              return (
                params.value + (params.seriesData.length ? ' ：Price $' + params.seriesData[0].data : '')
              );
            }},
          },
          data: this.state.dayData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          min:0,
          axisLine: {
            lineStyle: {
              color: 'black',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'black',
            },
          },
          axisLabel: {
            textStyle: {
              color: 'black',
            },
            showMaxLabel: true
          },
        },
      ],
      series: [
        {
          type: 'line',
          smooth: true,
          data:this.state.priceData,
        },
      ],
    };
  };

  renderLineChart(){
    let code = "<ReactEcharts \n" +
    "  option={this.getOtion()} \n" +
    "  style={{height: '350px', width: '100%'}}  \n" +
    "  className='react_for_echarts' />";
    if(this.state.pair){
      return(
        <div className='examples'>
          <div className='parent'>
            <label> render a Simple echart With <strong>option and height</strong>: </label>
            <ReactEcharts
              option={this.getOption()}
              style={{height: '350px', width: '100%'}}
              className='react_for_echarts' />
            <label> code below: </label>
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )
    }else{
      return (
      <div>
        Sorry we have no data for this coin
      </div>
      )
    }
  }

  render() {
    return (
      <div className="myContainer">
        Hi from cryptocurrency chart
        <button onClick={()=> this.logProps()}></button>
        {this.renderLineChart()}
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}

export default connect(mapStateToProps, actions)(CryptoCurrencyChart);