import {OPEN_DRAWER,CLOSE_DRAWER, OPEN_CHAT, CLOSE_CHAT} from '../actions/types';


export default function(state = {open: false, chat: false},action){
  switch(action.type){
    
    case CLOSE_DRAWER:
      return {...state, open: action.payload.open};
      
    case OPEN_DRAWER:
      return {...state,  open: action.payload.open};

    case OPEN_CHAT:
      return {...state,  chat: action.payload.chat};

    case CLOSE_CHAT:
      return {...state,  chat: action.payload.chat};

    default:
      return state;
  }
}