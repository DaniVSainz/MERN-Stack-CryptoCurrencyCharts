import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import authReducer from './authReducer';
import uiReducer from './uiReducer';
import cryptocurrencyReducer from './cryptocurrencyReducer';
import chatReduxer from './chatReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  form: reduxForm,
  cryptocurrency: cryptocurrencyReducer,
  chat: chatReducer
});