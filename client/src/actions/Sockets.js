const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

socket.on('connected', (msg) => {
  console.log(msg);
});

export const emitTest = (msg) => async dispatch => {
  socket.emit('my other event', msg);
}
