const express = require("express");
const app = express();
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io");
const { Socket } = require("socket.io-client");
const connection = require("./DAL/mysqlCon");
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());

// routes
const chatRoutes= require("./routes/message");
const roomsRoutes= require("./routes/estimate");

const server = http.createServer(app)
const rooms = {};


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      return;
    }
    console.log('Conexión a la base de datos establecida correctamente');
  });



// Agrega una ruta para obtener información sobre un usuario por su ID
// Agregar una ruta para obtener información sobre un usuario por su ID
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("user id"+userId);
  // Variables para almacenar los resultados de las consultas
  let freelancerData = null;
  let clientData = null;
  
  // Realizar la consulta para obtener datos de la tabla 'freelancer'
  connection.query('SELECT idFreelancer, name, profilePhoto FROM freelancer WHERE idFreelancer = ?', userId, (err, freelancerResults) => {
      if (err) {
          console.error('Error al obtener datos del freelancer:', err.message);
      } else {
          freelancerData = freelancerResults[0];
      }
      
      // Realizar la consulta para obtener datos de la tabla 'client'
      connection.query('SELECT idClient, name, profilePhoto FROM client WHERE idClient = ?', userId, (err, clientResults) => {
          if (err) {
              console.error('Error al obtener datos del cliente:', err.message);
          } else {
              clientData = clientResults[0];
          }
          
          // Verificar si alguna de las consultas devolvió resultados
          if (freelancerData || clientData) {
            if (freelancerData !== undefined){
              res.json(freelancerData);
            }
            else if(clientData !== undefined){
              res.json(clientData)
            }
          } else {
              // Ninguna de las consultas devolvió resultados
              res.status(404).send('No se encontraron datos para el usuario');
          }
      });
  });
});


app.use(chatRoutes);
// Agregar una ruta para obtener las salas asociadas a un usuario por su ID
app.use(roomsRoutes);

app.use(chatRoutes);
  // Manejar la ruta 404 (Not Found)
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});
  

io.on("connection", (socket) => {
    console.log("Usuario actual: ", socket.id);

    socket.on("join_room", (room)=> {
        socket.join(room);
        if (!rooms[room]) {
            rooms[room] = [];
          }
          rooms[room].push(socket.id); 
          console.log("lo que esoty buescando   "+rooms[room]);// Agregar usuario a la lista de usuarios en la sala
          let conected = rooms[room].length
          io.to(room).emit("users_changed", conected);
        console.log("Usuario id: ", socket.id, "Se unio a la sala", room)
        console.log("Conectados a la sala: ", socket.id, ". ", conected)
    })

    

    socket.on("send_message", (data)=> {
          socket.to(data.room).emit("recive_message", data);
    })

    socket.on("send_estimate", (data)=> {
      console.log(data);
      socket.to(data.room).emit("recive_cotizacion", data);
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
