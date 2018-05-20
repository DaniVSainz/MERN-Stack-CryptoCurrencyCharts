import {OPEN_DRAWER,CLOSE_DRAWER} from '../actions/types';


export default function(state = {open: false},action){
  switch(action.type){
    
    case CLOSE_DRAWER:
      console.log(action.payload);
      return action.payload;
      
    case OPEN_DRAWER:
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
}