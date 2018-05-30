import { GET_CRYPTOCURRENCIES } from '../actions/types';

export default function(state=null,action){

  switch(action.type){
    default:
      return {...state};
    
    case GET_CRYPTOCURRENCIES:
      return {...state, cryptocurrency: action.payload }
  }
}