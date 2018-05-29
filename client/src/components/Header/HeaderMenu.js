import React, { Component } from 'react';

//Routing
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

class HeaderMenu extends Component {
  state = {
    anchorEl: null,
  };
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logoutAction(){
    // this.props.handleClose();
    this.props.logout();
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link to="/login"><Button color="primary" variant="raised">Login</Button></Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/register"><Button color="primary" variant="raised">Register</Button></Link></MenuItem>
          <MenuItem onClick={this.logoutAction.bind(this)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
function mapStateToProps({auth}){
  return{ 
    auth,
  };
}

export default connect(mapStateToProps, actions)(HeaderMenu);
