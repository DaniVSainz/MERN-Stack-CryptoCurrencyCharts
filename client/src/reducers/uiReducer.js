import {OPEN_DRAWER,CLOSE_DRAWER} from '../actions/types';


export default function(state = {open: false},action){
  switch(action.type){
    default:
      return state;
    
    case CLOSE_DRAWER:
    case OPEN_DRAWER:
      return action.payload;
  }
}