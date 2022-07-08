//import express
const express = require('express');
const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket)=>{
    console.log("socket details: ", socket);
    console.log("socket active...");
    socket.on("chat", (payload)=>{
        console.log("payload: ", payload);
        io.emit("chat", payload);
    });
});

httpServer.listen(3000, ()=>{console.log('listnening on port 3000...')})

