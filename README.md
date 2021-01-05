# socket-io-repro

2 different web apps, "web" and "socket" which use socket.io to start up a socket server and connect to it from the "web" app, both using express.

This is a repro to the behavior observed when scaling out to 2 instances in Azure App Services where the socket disconnects and reconnects intermittently even though affinity cookie has been set.