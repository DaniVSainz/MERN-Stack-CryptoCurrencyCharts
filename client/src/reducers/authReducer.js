import {USER_AUTHENTICATE} from '../actions/types';

export default function(state=null,action){

  switch(action.type){
    default:
      return state;
    
    case USER_AUTHENTICATE:
      console.log(action.payload)
      return action.payload || false ;
      
  }
}