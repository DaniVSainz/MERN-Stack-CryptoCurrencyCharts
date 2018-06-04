import {SOCKET_CONNECT,SOCKET_MSGS} from './types';
import {store} from '../index'
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

socket.on('connected', (msg) => {
  store.dispatch({ type: SOCKET_CONNECT, payload: msg });
});

socket.on('broadcastMsg', (msg) => {
  store.dispatch({ type: SOCKET_MSGS, payload: msg });
});

export const emitMsg = (msg) => {
  socket.emit('message', msg);
}
