/* eslint-disable no-console */
const _ = require('lodash');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { createGame } = require('./GameLogic');

const PORT = Number.parseInt(process.env.PORT || '8081', 10);

const app = express();

const clientPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

const players = [];

io.on('connection', (sock) => {
  sock.emit('status', 'CONNECTED');

  if (players.length) {
    const player1 = players.shift();
    const player2 = sock;

    player1.emit('status', 'FOUND_OPPONENT');
    player2.emit('status', 'FOUND_OPPONENT');

    createGame(player1, player2);
  } else {
    players.push(sock);
    sock.emit('status', 'WAITING_FOR_OPPONENT');
    sock.on('disconnect', () => {
      _.pull(players, sock);
    });
  }
});

server.on('error', (error) => {
  console.error('server error:', error);
});

server.listen(PORT, () => {
  console.log(`serving static from: ${clientPath}`);
  console.log(`server started on: http://localhost:${PORT}`);
});
