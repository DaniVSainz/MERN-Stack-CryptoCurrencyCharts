import {SOCKET_CONNECT, SOCKET_MSGS} from '../actions/types';

let initialState = {
  msgs:[],
  connected:false
}

export default function(state=initialState,action){

  switch(action.type){
    default:
      return state;

    case SOCKET_CONNECT:
      return {connected:true,msgs:action.payload[1]}

      case SOCKET_MSGS:
      return {...state, msgs:action.payload}
  }
}