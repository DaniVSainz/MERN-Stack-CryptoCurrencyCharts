import axios from "axios";
import { LOGIN } from "./types";


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
export const login = () => async (dispatch) => {
  let res = await axios.get('/api/current_user');
  dispatch({ type: login, payload: res.data})
}

