# socket-io-repro

This is a repro to the behavior observed when scaling out to 2 instances in Azure App Services where the socket disconnects and reconnects intermittently even though affinity cookie has been set.

## Details
* 2 separate app services, hosted in the same app service plan. One is the "web" server and the other is the "socket" server.
* Affinity cookie enabled on both apps
* Scale out to 2 instances

As for the socket connectivity we use socket.io's (Server API)[https://socket.io/docs/v3/server-api/index.html] and (Client API)[https://socket.io/docs/v3/client-api/index.html]. We create a connection on start up of the web app and emit details from the App service instance that connected, socket ID and such, which we use to determine what connections are made and which ones are used to emit events.

The "web" app service emits messages when we hit the '/' and '/test' routes.
