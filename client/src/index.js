//styles
import 'materialize-css/dist/css/materialize.min.css';

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import App from "./components/App";

//Development only axios helpers
import axios from 'axios';
window.axios = axios;


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Insert app into #root div in public/index
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.querySelector("#root")
);

