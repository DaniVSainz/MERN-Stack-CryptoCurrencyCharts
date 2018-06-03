const server = require('../server');
var io = require('socket.io')(server,  { origins: '*localhost:3000'} );

console.log(io);
io.on('connection', function (socket) {
  console.log('connection')
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
