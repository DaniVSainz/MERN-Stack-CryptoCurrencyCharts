import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {openDrawer} from '../actions';

import PropTypes from 'prop-types';


const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Header extends Component {
  


  render() {
    const { classes } = this.props;

    return (
      <AppBar
      position="absolute"
      className={classNames(classes.appBar, this.props.ui.open && classes.appBarShift)}
      >
      <Toolbar disableGutters={!this.props.ui.open}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={()=> this.props.openDrawer()}
          className={classNames(classes.menuButton, this.props.ui.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          CryptoNalysis
        </Typography>
        <div style={{ 'margin-left': 'auto'}}>
          <Link to="/login"><Button variant="outlined" color="primary" variant="raised">Login</Button></Link>
          <Link to="/register"><Button variant="outlined" color="primary" variant="raised">Register</Button></Link>
        </div>
      </Toolbar>
    </AppBar>
    );
  }
}

function mapStateToProps({ui}){
  return{ ui };
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// Header = withStyles(styles, { withTheme: true })(Header);
// export default  connect( mapStateToProps,  )(Header);
export default connect(mapStateToProps, {openDrawer})(withStyles(styles, { withTheme: true })(Header));

