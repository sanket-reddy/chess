import type { Socket } from "socket.io";

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server  = http.createServer(app);
app.use(cors())

const io = socketIo(server,{
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET","POST"]
    }
})







io.on("connection", (socket : Socket) => {
    console.log("New client connected");
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  
    socket.on("message", (data) => {
      console.log("Message from client:", data);
      socket.emit("message", "Hello from server!");
    });
  });









app.listen(3000, ()=>{
    console.log("listening from port : ", 3000);
})




console.log("Hello via Bun!");