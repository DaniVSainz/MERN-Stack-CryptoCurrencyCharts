import React, {Component} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <AppBar>
              <div>Cryptonalysis</div>
            </AppBar>
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

export default connect( null, actions )(App);
