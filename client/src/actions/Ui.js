import { OPEN_DRAWER, CLOSE_DRAWER} from './types';

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