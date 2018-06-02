import {OPEN_DRAWER,CLOSE_DRAWER} from '../actions/types';


export default function(state = {open: false},action){
  switch(action.type){
    
    case CLOSE_DRAWER:
      return action.payload;
      
    case OPEN_DRAWER:
      return action.payload;

    default:
      return state;
  }
}