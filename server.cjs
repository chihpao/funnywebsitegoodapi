const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // 允許的前端應用程式的 URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// 使用 CORS 中介軟體
app.use(cors({
  origin: 'http://localhost:5173', // 允許的前端應用程式的 URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3050, () => {
  console.log('listening on *:3050');
});