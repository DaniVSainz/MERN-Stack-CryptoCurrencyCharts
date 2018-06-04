import {SOCKET_CONNECT} from '../actions/types';

let initialState = {
  msgs:[],
  connected:false
}

export default function(state=initialState,action){

  switch(action.type){
    default:
      return state;

    case SOCKET_CONNECT:
      console.log('Socket_CONNECT')
      return {...state, connected:true}
  }
}