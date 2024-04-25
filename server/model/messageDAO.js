const connection= require("../DAL/mysqlCon");

exports.getMessages = async (roomId, cb) =>{
    connection.query('SELECT id, content, autor, estimateid, attachment, DATE_FORMAT(time, "%H:%i") AS time FROM messages WHERE estimateid = ?', [roomId], (err, results) => {
      if (err) {
        console.error('Error al obtener los mensajes asociadas a la sala: ', err.message);
        cb({error: 500});
        return;
      }
      if (results.length === 0) {
        cb({messages: []})
        return;
      }
      cb({ messages : results });
      
    })
    }

exports.insterMessage= async (content, autor, estimateid, time, cb)=>{
    connection.query('INSERT INTO messages (content, autor, estimateid, time) VALUES (?, ?, ?, ?)', [content, autor, estimateid, time], (err, result) => {
        if (err) {
          console.error('Error al guardar el mensaje:', err);
          cb({error: 500})
        }else{ 
            console.log('Mensaje guardado correctamente en la base de datos');
        }
      });
}

exports.insertImages= async (attachment, autor, estimateid, time, cb)=>{

  
  
    connection.query('INSERT INTO messages (attachment, autor, estimateid, time) VALUES (?, ?, ?, ?)', [attachment, autor, estimateid, time], (err, result) => {
        if (err) {
          console.error('Error al guardar el mensaje:', err); 
        }
        console.log('Mensaje guardado correctamente en la base de datos');
      });
}