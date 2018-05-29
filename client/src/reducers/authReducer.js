import {USER_AUTHENTICATE, USER_REGISTER, USER_SET_JWT} from '../actions/types';

export default function(state={},action){

  switch(action.type){
    default:
      console.log('Auth Reducer default func triggered', state);
      return state;
    
    case USER_AUTHENTICATE:
      return {login: action.payload} || false ;
    
    case USER_REGISTER:
      return action.payload || false ;
      
    case USER_SET_JWT:
      return {...state, user: action.payload} || false ;
  }
}