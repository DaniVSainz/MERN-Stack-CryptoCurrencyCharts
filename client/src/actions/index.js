import axios from "axios";
import { USER_AUTHENTICATE } from "./types";

export const login = (values) => async (dispatch) => {
  let res = await axios.post('/api/users/authenticate', values).catch((err)=>{
    return err.response;
  })
  dispatch({ type: USER_AUTHENTICATE, payload: res.data})
}

