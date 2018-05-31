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
    let chartColors ={
      line: 'white'
    }
    return {
      backgroundColor: 'transparent',
      // backgroundColor: {
      //   type: 'linear',
      //   x: 0,
      //   y: 1,
      //   x2: 0,
      //   y2: 1,
      //   colorStops: [{
      //       offset: 0, color: '#24243e' // color at 0% position
      //   },{
      //     offset: 0.5, color: '#302b63' // color at 0% position
      //   },{
      //       offset: 1, color: '#0f0c29' // color at 100% position
      //   }],
      //   globalCoord: false // false by default
      // },
      color: ['#26df8b'],
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
      },
      toolbox:{
        feature:{
          saveAsImage:{}
        }
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.9)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
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
              color: chartColors.line,
            },
          },
          axisLabel: {
            textStyle: {
              color: chartColors.line,
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
              color: chartColors.line,
            },
          },
          splitLine: {
            lineStyle: {
              color: chartColors.line,
            },
          },
          axisLabel: {
            textStyle: {
              color: chartColors.line,
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
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
        },
      ],
    };
  };

  renderLineChart(){
    if(this.state.pair){
      return(
        <div className='examples'>
          <div className='parent'>
            <ReactEcharts
              option={this.getOption()}
              style={{height: '350px', width: '100%'}}
              className='react_for_echarts' />
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
        {this.renderLineChart()}
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}

export default connect(mapStateToProps, actions)(CryptoCurrencyChart);