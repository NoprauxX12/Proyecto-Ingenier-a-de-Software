const connection= require("../DAL/mysqlCon");


exports.getMessages = async (roomId) =>{
    console.log(roomId)
  
    connection.query('SELECT id, content, author, room_id, attachment, DATE_FORMAT(time, "%H:%i") AS time FROM messages WHERE room_id = ?', [roomId], (err, results) => {
      if (err) {
        console.error('Error al obtener los mensajes asociadas a la sala: ', err.message);
        cb({error: 500});
        return;
      }
      if (results.length === 0) {
        cb({error: 400})
        return;
      }
      cb({ messages : results });
      
    })
    }

exports.insterMessage= async (content, author, room_id, time, cb)=>{
    connection.query('INSERT INTO messages (content, author, room_id, time) VALUES (?, ?, ?, ?)', [content, author, room_id, time], (err, result) => {
        if (err) {
          console.error('Error al guardar el mensaje:', err);
          cb({error: 500})
        }else{  
            console.log('Mensaje guardado correctamente en la base de datos');
        }
      });
}

exports.insertImages= async (attachment, author, room_id, time, cb)=>{
    connection.query('INSERT INTO messages (attachment, author, room_id, time) VALUES (?, ?, ?, ?)', [attachment, author, room_id, time], (err, result) => {
        if (err) {
          console.error('Error al guardar el mensaje:', err); 
        }
        console.log('Mensaje guardado correctamente en la base de datos');
      });
}