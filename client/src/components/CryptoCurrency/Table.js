import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
let windowHeight = parseInt(window.screen.availHeight * 0.7) ;

const dollarSign = {
  fontFamily: 'exo',
  marginRight: '1px',
  fontWeight: '600',
  color: '#00000061',
}

const columns = [
  {
	Header: 'Rank',
  accessor: 'rank',
  className: 'tableRowStyles', 
}, {
	Header: 'Currency',
  accessor: 'name',
  className: 'tableRowStyles',
	// Cell: props => <span className='number'>{props.value}</span> 
	Cell: props => 
    <div>
      <img src={window.location.origin + `/assets/images/coins/${props.value.split(' ').join('_')}.png`} alt={`${props.value} icon`}/>
      <span style={{ fontFamily:'exo', color: 'black', fontSize: '16px', marginLeft: '5px'}} >{props.value}</span>
    </div>
},
{
	Header: 'Price',
	accessor: 'price_usd',
  className: 'tableRowStyles',
  Cell: props => {
    if(props.value){
      return <span style={{ fontFamily:'exo', color: 'black', fontSize: '16px'}} > <span style={dollarSign}>$</span>{props.value.toFixed(2)} </span>
    }
  }
    
  
},
{
	Header: '24 Hour Change',
	accessor: 'percent_change_24h',
  className: 'tableRowStyles',  
  Cell: props =>{
    if(props.value && props.value.charAt(0) === '-'){
      return <span style={{color:'red', fontFamily:'exo', fontSize: '16px'}}>{props.value}</span>;
    }else{
      return <span style={{color:'green', fontFamily:'exo', fontSize: '16px'}}>+{props.value}</span>;
    }
  }
}
]

function noData(){
  return(
    <div>No Data</div>
  )
}

class SmartTable extends Component {

  async componentDidMount(){
    await this.props.getAllCryptoCurrencies();
  }

  navigateToArea(rowData){
    this.props.history.push(`/chart/${rowData.symbol}`);
  }

  renderTable(){
    if(this.props.cryptocurrency.cryptocurrencies){
      return(
          <div id="react-table-div">
						<ReactTable
              filterable
							data={this.props.cryptocurrency.cryptocurrencies}
              columns={columns}
							getTrProps={(state, rowInfo, column, instance) => ({
								onClick: e => this.navigateToArea(rowInfo.original)
              })}
              className="-striped -highlight"
              style={{height: windowHeight}}
						/>
					</div>
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