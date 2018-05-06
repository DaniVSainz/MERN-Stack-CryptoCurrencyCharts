import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import your Module reducers here and combine them

const rootReducer = combineReducers({
	router: routerReducer
});

export default rootReducer;