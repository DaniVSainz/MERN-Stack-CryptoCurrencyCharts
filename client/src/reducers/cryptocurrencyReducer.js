import { GET_CRYPTOCURRENCIES, GET_CRYPTOCURRENCY } from '../actions/types';
let initialState = {
  cryptocurrencies: false,
  cryptocurrency:[{},{days:false},{}]
}
export default function(state=initialState,action){

  switch(action.type){
    default:
      return state;
    
    case GET_CRYPTOCURRENCIES:
      return {...state, cryptocurrencies: action.payload }

    case GET_CRYPTOCURRENCY:
    return {...state, cryptocurrency: action.payload}
  }
}