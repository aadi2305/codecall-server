const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
var obj2;
io.on('connection', socket => {

    socket.on("join-room", (obj)=>{
        // console.log(obj);
        socket.on("send-changes", delta =>{
            socket.broadcast.to(obj.roomId).emit("recieve-changes",delta)
        })
        socket.on("toggle-editor", yo =>{
            socket.broadcast.to(obj.roomId).emit("turn-on-editor",yo)
        })
        obj2 = obj.roomId
        socket.join(obj.roomId)
        socket.broadcast.to(obj.roomId).emit('user-connected', obj.userId)
        socket.on('sent-message', msgObj=>{
            console.log(msgObj);
            socket.broadcast.to(obj.roomId).emit('recieved-msg', msgObj)
        })
        socket.on('disconnect', () => {
            console.log("diconnected");
            socket.broadcast.to(obj.roomId).emit('user-disconnected', obj.userId)
        })
       
      
    })
  

})

server.listen(process.env.PORT || 8001, () => console.log(`Server has started.`));