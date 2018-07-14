/* eslint-disable no-console */
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const GameLogic = require('./GameLogic');

const PORT = Number.parseInt(process.env.PORT || '8081', 10);

const app = express();

const clientPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

let player1 = null;

io.on('connection', (sock) => {
  sock.emit('status', 'CONNECTED');

  if (player1 != null) {
    const player2 = sock;

    player1.emit('status', 'FOUND_OPPONENT');
    player2.emit('status', 'FOUND_OPPONENT');

    new GameLogic(player1, player2);

    player1 = null;
  } else {
    player1 = sock;
    player1.emit('status', 'WAITING_FOR_OPPONENT');
  }
});

server.on('error', (error) => {
  console.error('server error:', error);
});

server.listen(PORT, () => {
  console.log(`serving static from: ${clientPath}`);
  console.log(`server started on: http://localhost:${PORT}`);
});
