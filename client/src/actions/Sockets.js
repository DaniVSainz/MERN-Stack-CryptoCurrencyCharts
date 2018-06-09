import {SOCKET_CONNECT,SOCKET_MSGS} from './types';
import {store} from '../index'
const io = require('socket.io-client');
let socket;
if(process.env.REACT_APP_ENV === 'dev'){
   socket = io.connect('http://localhost:5000');
}else{
   socket = io.connect('http://159.89.48.60:5000');
}


socket.on('connected', (msg) => {
  store.dispatch({ type: SOCKET_CONNECT, payload: msg });
});

socket.on('broadcastMsg', (msg) => {
  store.dispatch({ type: SOCKET_MSGS, payload: msg });
});

export const emitMsg = (msg,user) => {
  socket.emit('message', msg,user);
}
