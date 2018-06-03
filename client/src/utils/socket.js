const io = require('socket.io-client')

export default function () {
  const socket = io.connect('http://localhost:5000');

  function emitTest(msg) {
    socket.emit('my other event', msg)
  }

  return{
    emitTest
  }
}