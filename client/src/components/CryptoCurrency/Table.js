import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [
  {
	Header: 'Rank',
  accessor: 'rank',
  className: 'tableRowStyles', 
  style:{fontFamily: 'exo'} 
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
  Cell: props => 
    <span style={{ fontFamily:'exo', color: 'black', fontSize: '18px'}} > ${props.value.toFixed(2)} </span>
  
},
{
	Header: '24 Hour Change',
	accessor: 'percent_change_24h',
  className: 'tableRowStyles',  
  Cell: props =>{
    if(props.value.charAt(0) === '-'){
      return <span style={{color:'red', fontFamily:'exo', fontSize: '16px'}}>{props.value}</span>;
    }else{
      return <span style={{color:'green', fontFamily:'exo', fontSize: '16px'}}>+{props.value}</span>;
    }
  }
}

]

class SmartTable extends Component {

  async componentDidMount(){
    await this.props.getAllCryptoCurrencies();
    console.log(this.props.cryptocurrency)
  }

  navigateToArea(rowData){
    this.props.history.push(`/chart/${rowData.symbol}`);
  }

  renderTable(){
    if(this.props.cryptocurrency.cryptocurrencies){
      return(
          <div>
						<ReactTable
							data={this.props.cryptocurrency.cryptocurrencies}
              columns={columns}
							getTrProps={(state, rowInfo, column, instance) => ({
								onClick: e => this.navigateToArea(rowInfo.original)
							})}
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