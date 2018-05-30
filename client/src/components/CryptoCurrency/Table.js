import React, { Component } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../actions'

class SmartTable extends Component {

  async componentDidMount(){
    await this.props.getAllCryptoCurrencies();
    console.log(this.props.cryptocurrency.cryptocurrency)
  }

  navigateToArea(rowData){
    this.props.history.push(`/chart/${rowData.symbol}`);
  }

  renderTable(){
    if(this.props.cryptocurrency.cryptocurrency){
      return(
          <AutoSizer>
            {({ height, width }) => (
              <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.props.cryptocurrency.cryptocurrency.length}
              rowGetter={({ index }) => this.props.cryptocurrency.cryptocurrency[index]}
              onRowClick={({ event, index, rowData }) => {
                return this.navigateToArea(rowData)
              }} 
            > 
              <Column
                label='Rank'
                dataKey='rank'
                width={width}
                height={20}
              />
              <Column
                label='img'
                dataKey='name'
                width={width}
                height={20}
                cellRenderer={function({cellData}){
                  return(
                    //React rendering tips
                    // https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                    // <span><img src={require(`../../assets/images/coins/${cellData.split(' ').join('_')}.png`)}  />{cellData}</span>
                    <span><img src={window.location.origin + `/assets/images/coins/${cellData.split(' ').join('_')}.png`} />{cellData}</span>
                  )
                }}
              />
              <Column
                width={width}
                label='Symbol'
                dataKey='symbol'
                height={20}
                style={{color:'black'}}
              />
              <Column
                label='Price'
                dataKey='price_usd'
                width={width}
                height={20}
              />
            </Table>
            )}
          </AutoSizer>
      )
    }else{
      return(
        <div>
          Loading....
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{ flex: '1 1 auto' }}>
          {this.renderTable()}
      </div>
    );
  }
}

function mapStateToProps({cryptocurrency}){
  return {cryptocurrency}
}
SmartTable = withRouter(SmartTable);
export default connect(mapStateToProps, actions)(SmartTable);