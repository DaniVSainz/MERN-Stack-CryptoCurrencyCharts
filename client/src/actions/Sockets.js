import {SOCKET_CONNECT} from './types';
import {store} from '../index'
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

socket.on('connected', (msg) => {
  store.dispatch({ type: SOCKET_CONNECT, payload: 'Connected' });
});

export const emitTest = (msg) => async dispatch => {
  socket.emit('my other event', msg);
}
