import axios from "axios";
import { USER_AUTHENTICATE } from "./types";


// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get("/api/current_user").then(res =>
//       dispatch({
//         type: FETCH_USER,
//         payload: res
//       })
//     );
//   };
// };

//Refactor below
export const login = (values) => async (dispatch) => {
  console.log(values);
  let res = await axios.get('/api/users/authenticate');
  dispatch({ type: USER_AUTHENTICATE, payload: res.data})
}

