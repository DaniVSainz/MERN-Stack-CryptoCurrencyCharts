import React, {Component} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header></Header>
            <Route path="/" component={Landing} exact></Route>
            <Route path="/surveys" component={Dashboard} exact></Route>
            <Route path="/surveys/new" component={SurveyNew}></Route>
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

export default connect( null, actions )(App);
