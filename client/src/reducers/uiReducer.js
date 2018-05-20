export default function(state={open: false},action){
  switch(action.type){
    default:
      return state;
    
    case USER_AUTHENTICATE:
      return action.payload || false ;
  }
}