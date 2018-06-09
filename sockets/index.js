const server = require('../server');
var io = require('socket.io')(server,  { origins: '*localhost:3000'} );

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  });
});
