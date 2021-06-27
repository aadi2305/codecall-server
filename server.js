const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
// app.options('*', cors());

// app.use(router);

io.on('connection', socket => {
    // console.log("hey");
    socket.on("plz", word =>{
        console.log("hey");
        console.log(word);
    })
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
  })
})

server.listen(process.env.PORT || 8001, () => console.log(`Server has started.`));