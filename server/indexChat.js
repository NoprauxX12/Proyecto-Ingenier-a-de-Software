const express = require("express");
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io");
const { Socket } = require("socket.io-client");

app.use(cors())

const server = http.createServer(app)
const rooms = {};

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Usuario actual: ", socket.id);

    socket.on("join_room", (room)=> {
        socket.join(room)
        if (!rooms[room]) {
            rooms[room] = [];
          }
          rooms[room].push(socket.id); // Agregar usuario a la lista de usuarios en la sala
          let conected = rooms[room].length
          io.to(room).emit("users_changed", conected);
        console.log("Usuario id: ", socket.id, "Se unio a la sala", room)
        console.log("Conectados a la sala: ", socket.id, ". ", conected)
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("recive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("Usuario desconectado", socket.id)

        Object.keys(rooms).forEach((room) => {
            const index = rooms[room].indexOf(socket.id);
            if (index !== -1) {
              rooms[room].splice(index, 1); // Eliminar usuario de la lista al desconectarse
              io.to(room).emit("users_changed", rooms[room].length); // Emitir evento para actualizar usuarios
              console.log(rooms[room].length, "Usuarios restantes")
            }
        });
    })
})

server.listen(3001, ()=>{
    console.log("Server running")
})
