import {OPEN_DRAWER,CLOSE_DRAWER} from '../actions/types';


export default function(state = {open: false, chat: true},action){
  switch(action.type){
    
    case CLOSE_DRAWER:
      return {...state, open: action.payload.open};
      
    case OPEN_DRAWER:
      console.log(state);
      return {...state,  open: action.payload.open};

    default:
      return state;
  }
}