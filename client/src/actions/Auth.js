import axios from "axios";
import { USER_AUTHENTICATE, USER_REGISTER} from "./types";

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

export const verifyEmail = async (values) =>{
  let token = {token: values};
  let res = await axios.post("/api/confirmation/verifyEmail", token).catch(err => {
    return err.response;
  });
  return res;
}