import axios from "axios";
import { USER_AUTHENTICATE, USER_REGISTER, USER_SET_JWT } from "./types";

export const login = values => async dispatch => {
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

export const verifyEmail = async (values) =>{
  let token = {token: values};
  let res = await axios.post("/api/confirmation/verifyEmail", token).catch(err => {
    return err.response;
  });
  return res;
}

export const saveToken = (token, user) => async dispatch => {
  localStorage.setItem('id_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  dispatch({ type: USER_SET_JWT, payload: {token,user} });
}

export const getToken = () => async dispatch => {
  let token = await localStorage.getItem('id_token');
  let user = await localStorage.getItem('user');
  user = JSON.parse(user);
  dispatch({ type: USER_SET_JWT, payload: {token,user} });
}