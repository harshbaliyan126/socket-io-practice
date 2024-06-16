const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const cors = require('cors');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('offer', (data) => {
    console.log('offer received:', data);
    socket.broadcast.emit('getOffer', data);
  });

  socket.on('answer', (data) => {
    console.log('answer received:', data);
    socket.broadcast.emit('getAnswer', data);
  });

  // socket.on('candidate', (data) => {
  //   console.log('candidate received:', data);
  //   socket.broadcast.emit('getCandidate', data);
  // });
});

httpServer.listen(8080, () => {
  console.log('listening on *:8080');
});
