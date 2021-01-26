var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io-client');

//connect to namespaces
if(process.env.APPENV == "prod"){
  socket = io('ws://<app service name>.azurewebsites.net');
  socket2 = io('ws://<app service name>.azurewebsites.net/test-namespace');
}else{
  socket = io('ws://localhost:5000/');
  socket2 = io('ws://localhost:5000/test-namespace');
}

//Default namespace
socket.on('connect', () => {
  socket.emit('identifier',
  {
    instanceId: process.env.WEBSITE_INSTANCE_ID,
    socketId: socket.id,
    namespace: 'default'
  });
});

//Second namespace
socket2.on('connect', () => {
  socket2.emit('identifier',
  {
    instanceId: process.env.WEBSITE_INSTANCE_ID,
    socketId: socket.id,
    namespace: 'test-namespace'
  });
});

app.get('/', (req, res) => {
  socket.emit('hello', {
    greeting: 'Hello from socket 1!'
  });
  res.send('Hello message');
});

app.get('/test', (req, res) => {
  socket2.emit('hello2', {
    greeting: 'Hello from socket 2!'
  });
  res.send('Hello2 message');
});

http.listen(process.env.PORT || 3000, () => {
  console.log('Server is up and running');
});
