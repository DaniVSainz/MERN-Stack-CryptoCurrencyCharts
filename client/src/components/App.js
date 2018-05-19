import React, {Component} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './Home';
import Login from './Login'

import Header from './Header';



class App extends Component {

  componentDidMount(){
    // this.props.fetchUser();
  }

  render() {
    return(
      <div className="">
        <BrowserRouter>
          <div>
            <Header></Header>
            <div className="container">
              <Route path="/" component={Home} exact></Route>
              <Route path="/login" component={Login} exact></Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

export default connect( null, actions )(App);
