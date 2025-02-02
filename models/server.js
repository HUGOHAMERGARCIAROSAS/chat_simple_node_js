const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar middlewares
    this.middlewares();

    // configurar sockets
    this.configurarSockets();

    // iniciar el server
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
