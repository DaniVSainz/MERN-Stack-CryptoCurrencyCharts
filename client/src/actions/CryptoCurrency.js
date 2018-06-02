import axios from "axios";
import { GET_CRYPTOCURRENCIES, GET_CRYPTOCURRENCY} from "./types";

const url = "http://159.89.48.60:3001"
// const url = "http://localhost:3001";


export const getAllCryptoCurrencies = () => async dispatch =>{
  let res = await axios.get(`${url}/coinmarketcap/getall`).catch(err => {
    return err.response;
  });
  dispatch({ type: GET_CRYPTOCURRENCIES, payload: res.data });
}

export const getCryptoCurrency = (symbol) => async (dispatch) =>{
  let res = await axios.get(`${url}/binance/getpairdata/${symbol}`).catch(err => {
    return err.response;
  });
  if(res.data.msg !== "Sorry we dont have any historical data for that cryptocurrency"){
    dispatch({ type: GET_CRYPTOCURRENCY, payload: res.data });
  }else{
    dispatch({ type: GET_CRYPTOCURRENCY, payload: [{},{days:false},{}] });
  }
}