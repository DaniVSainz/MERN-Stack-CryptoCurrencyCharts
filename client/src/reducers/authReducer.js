import {USER_AUTHENTICATE, USER_REGISTER, USER_SET_JWT, USER_LOGOUT } from '../actions/types';

let initialState = {
  user:{
    user:{
      username: false
    }
  }
}

export default function(state=initialState,action){

  switch(action.type){
    default:
      return {...state};
    
    case USER_AUTHENTICATE:
      return {...state, login: action.payload} || false ;
    
    case USER_REGISTER:
      return {...state, register: action.payload} || false ;
      
    case USER_SET_JWT:
      return  { ...state , user: action.payload } || false ;

    case USER_LOGOUT:
      console.log('user logout', action.payload)
      return action.payload
  }
}