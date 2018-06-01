import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const columns = [{
	Header: 'Rank',
	accessor: 'rank' // String-based value accessors!
}, {
	Header: 'Name',
	accessor: 'name',
	Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
	id: 'friendName', // Required because our accessor is not a string
	Header: 'Friend Name',
	accessor: 'symbol'// Custom value accessors!
}]

class SmartTable extends Component {

  async componentDidMount(){
    await this.props.getAllCryptoCurrencies();
    console.log(this.props.cryptocurrency.cryptocurrencies)
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