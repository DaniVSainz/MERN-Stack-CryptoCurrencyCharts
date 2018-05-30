import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import ReactEcharts from 'echarts-for-react';

class CryptoCurrencyChart extends Component {

  componentDidMount(){
    this.props.getCryptoCurrency(this.props.match.params.symbol);
    console.log(this.props.cryptocurrency)
  }

  logProps(){
    console.log(this.props.cryptocurrency.cryptocurrency[1].days);
  }

  getOption = () => {
    return {
      title: {
        text: '堆叠区域图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        }
      ]
    };
  };

  renderLineChart(){
    let code = "<ReactEcharts \n" +
    "  option={this.getOtion()} \n" +
    "  style={{height: '350px', width: '100%'}}  \n" +
    "  className='react_for_echarts' />";
    if(this.props.cryptocurrency.cryptocurrency[1].days){
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