import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './components/App2'


//Development only axios helpers
import axios from 'axios';
window.axios = axios;


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Insert app into #root div in public/index
ReactDOM.render(
  <Provider store={store}>
    <App>
      <CssBaseline />
    </App>
  </Provider>,
  document.querySelector("#root")
);

