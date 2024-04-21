const connection= require("../DAL/mysqlCon");

exports.getUserRommsById= async (userId, cb) =>{
    connection.query('SELECT * FROM rooms WHERE client_id = ? OR freelancer_id = ?', [userId, userId], (err, results) => {
        if (err) {
          console.error('Error al obtener las salas asociadas al usuario:', err.message);
          cb({error:500});
        }
        if (results.length === 0) {
          // Si no se encuentran salas asociadas al usuario, devolver un error 404
          cb({error:404});
        }
        // Devolver las salas asociadas al usuario en formato JSON
        cb({ rooms: results });
        console.log(results)
      });
}