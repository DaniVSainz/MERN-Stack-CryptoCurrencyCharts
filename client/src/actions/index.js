import axios from "axios";
import { USER_AUTHENTICATE, OPEN_DRAWER, CLOSE_DRAWER, USER_REGISTER } from "./types";

export const login = values => async dispatch => {
  console.log('login')
  let res = await axios.post("/api/users/authenticate", values).catch(err => {
    return err.response;
  });
  dispatch({ type: USER_AUTHENTICATE, payload: res });
};

export const register = values => async dispatch => {
  let res = await axios.post("/api/users/register", values).catch(err => {
    return err.response;
  });
  dispatch({ type: USER_REGISTER, payload: res });
};

export const openDrawer = () => {
  console.log('Open Drawer')
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
