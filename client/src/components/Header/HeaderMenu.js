import React, { Component } from 'react';

//Routing
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../actions';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import toasterOven from '../../utils/myToasterOven';
import { slide, scale } from '../../utils/transitions'

const styles = theme => ({
  menuDiv:{
    display:'flex'
  }
})

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

  async logoutAction(){
    this.handleClose();
    await this.props.logout();
    toasterOven({
      status:200,
      data:{
        msg:`You've successfully logged out!`
      }
    })
    this.props.history.push('/');      
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.menuDiv}>
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
          {/* <MenuItem onClick={this.handleClose}><Link to={{pathname:"/login", state: slide }} ><Button color="primary" variant="raised">Login</Button></Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to={{pathname:"/register", state: slide }}><Button color="primary" variant="raised">Register</Button></Link></MenuItem> */}
          <MenuItem onClick={this.handleClose}><Link to="/login" ><Button color="primary" variant="raised">Login</Button></Link></MenuItem>
          <MenuItem onClick={this.handleClose}><Link to="/register"><Button color="primary" variant="raised">Register</Button></Link></MenuItem>
          {this.props.auth.user.user.username && (
            <MenuItem onClick={this.logoutAction.bind(this)}>Logout</MenuItem>
          )}
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
HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
HeaderMenu = withRouter(HeaderMenu);
HeaderMenu = withStyles(styles)(HeaderMenu);
export default connect(mapStateToProps, actions)(HeaderMenu);
