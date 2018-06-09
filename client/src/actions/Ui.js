import { OPEN_DRAWER, CLOSE_DRAWER,CLOSE_CHAT,OPEN_CHAT} from './types';


//Open Close sidebar
export const openDrawer = () => {
  return{
    type:OPEN_DRAWER,
    payload:{open:true}
  }
};
export const closeDrawer = () => {
  return{
    type:CLOSE_DRAWER,
    payload:{open:false}
  }
};



//Toggle Chat box
export const openChat = () => {
  return{
    type:OPEN_CHAT,
    payload:{chat:true}
  }
};

export const closeChat = () => {
  return{
    type:CLOSE_CHAT,
    payload:{chat:false}
  }
};

