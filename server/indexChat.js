const express = require("express");
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io");
const { Socket } = require("socket.io-client");
const mysql = require('mysql')
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());

const server = http.createServer(app)
const rooms = {};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000000',
    database: 'el_que_sabe1',
    port: 3300
  });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
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

// Agregar una ruta para obtener información sobre un usuario por su ID
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  
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
              console.log(freelancerData)
            }
            else if(clientData !== undefined){
              res.json(clientData)
              console.log(clientData)
            }
          } else {
              // Ninguna de las consultas devolvió resultados
              res.status(404).send('No se encontraron datos para el usuario');
          }
      });
  });
});


// Agregar una ruta para obtener las salas asociadas a un usuario por su ID
app.get("/rooms/:userId", (req, res) => {
    const userId = req.params.userId;
    // Consulta a la base de datos para obtener las salas asociadas al usuario con el ID proporcionado
    connection.query('SELECT * FROM rooms WHERE client_id = ? OR freelancer_id = ?', [userId, userId], (err, results) => {
      if (err) {
        console.error('Error al obtener las salas asociadas al usuario:', err.message);
        res.status(500).send('Error al obtener las salas asociadas al usuario');
        return;
      }
      if (results.length === 0) {
        // Si no se encuentran salas asociadas al usuario, devolver un error 404
        res.status(404).send('No se encontraron salas asociadas al usuario');
        return;
      }
      // Devolver las salas asociadas al usuario en formato JSON
      res.json({ rooms: results });
      console.log(results)
    });
  });
  
app.get("/messages/:roomId", (req, res) => {
  const roomId = req.params.roomId;

  console.log(roomId)

  connection.query('SELECT id, content, author, room_id, attachment, DATE_FORMAT(time, "%H:%i") AS time FROM messages WHERE room_id = ?', [roomId], (err, results) => {
    if (err) {
      console.error('Error al obtener los mensajes asociadas a la sala: ', err.message);
      res.status(500).send('Error al obtener los mensajes asociados a la sala');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No se encontraron mensajes');
      return;
    }
    res.json({ messages : results });
    console.log(results)
  })
})

app.post('/messages', (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { content, author, room_id, time } = req.body;

  // Verificar si se recibieron todos los campos necesarios
  if (!content || !author || !room_id || !time) {
    return res.status(400).json({ error: 'Faltan campos obligatorios en el mensaje' });
  }

  // Insertar el mensaje en la base de datos
  connection.query('INSERT INTO messages (content, author, room_id, time) VALUES (?, ?, ?, ?)', [content, author, room_id, time], (err, result) => {
    if (err) {
      console.error('Error al guardar el mensaje:', err);
      return res.status(500).json({ error: 'Error al guardar el mensaje en la base de datos' });
    }
    console.log('Mensaje guardado correctamente en la base de datos');
    res.status(201).json({ message: 'Mensaje guardado correctamente' });
  });
});

app.post('/photo', (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { attachment, author, room_id, time } = req.body;

  // Verificar si se recibieron todos los campos necesarios
  if (!attachment || !author || !room_id || !time) {
    return res.status(400).json({ error: 'Faltan campos obligatorios en el mensaje' });
  }

  // Insertar el mensaje en la base de datos
  connection.query('INSERT INTO messages (attachment, author, room_id, time) VALUES (?, ?, ?, ?)', [attachment, author, room_id, time], (err, result) => {
    if (err) {
      console.error('Error al guardar el mensaje:', err);
      return res.status(500).json({ error: 'Error al guardar el mensaje en la base de datos' });
    }
    console.log('Mensaje guardado correctamente en la base de datos');
    res.status(201).json({ message: 'Mensaje guardado correctamente' });
  });
});

  // Manejar la ruta 404 (Not Found)
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});
  

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
