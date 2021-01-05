var app = require('express')();

var server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Socket server with ID ${process.env.WEBSITE_INSTANCE_ID} is up and running`);
});

var io = require('socket.io')(server);

function preciseTimeStamp(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

//Default namespace
io.on('connection', (socket) => {

  console.log(preciseTimeStamp() + ` A connection has been detected on socket server ${process.env.WEBSITE_INSTANCE_ID} for default namespace. Socket ID: ${socket.id}`);
  socket.on('hello', (data) => {
    console.log(`${preciseTimeStamp()} Message received ${JSON.stringify(data)} on default and socketID ${socket.id}`);
  });
  socket.on('disconnect', (reason) => console.log(`${preciseTimeStamp()} ${socket.id} has disconnected. Reason: ${reason}. Socket server instance: ${process.env.WEBSITE_INSTANCE_ID}. Namespace: default`));

  socket.on('identifier', (data) => console.log(`${preciseTimeStamp()} Client information: ${JSON.stringify(data)}. Namespace: default`));
});

//Second namespace
const nsp = io.of('/test-namespace');

nsp.on('connection', (socket) => {
  console.log(preciseTimeStamp() + ` A connection has been detected on socket server ${process.env.WEBSITE_INSTANCE_ID} for test-namespace. Socket ID: ${socket.id}`);
  socket.on('hello2', (data) => {
    console.log(`${preciseTimeStamp()} Message received ${JSON.stringify(data)} on test-namespace and socketID ${socket.id}`);
  });
  socket.on('disconnect', (reason) => console.log(`${preciseTimeStamp()} ${socket.id} has disconnected. Reason: ${reason}. Socket server instance: ${process.env.WEBSITE_INSTANCE_ID}. Namespace: test-namespace`));

  socket.on('identifier', (data) => console.log(`${preciseTimeStamp()} Client information: ${JSON.stringify(data)}. Namespace: test-namespace`));
});