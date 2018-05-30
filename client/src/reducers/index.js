import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import authReducer from './authReducer';
import uiReducer from './uiReducer';
import cryptocurrencyReducer from './cryptocurrencyReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  form: reduxForm,
  cryptocurrency: cryptocurrencyReducer,
});