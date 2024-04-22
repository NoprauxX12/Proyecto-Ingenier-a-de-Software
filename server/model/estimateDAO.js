const connection= require("../DAL/mysqlCon");
const fs = require("fs");
const sharp = require("sharp");

exports.fetchAllEstimates= async (userId,user, cb) =>{
    let sql= user==="2"? "select estimateId id, f.name name, e.description, f.profilePhoto from estimate e join freelancer f using(idFreelancer) where idClient=?"
    : "select estimateId id, c.name name, e.description, c.profilePhoto from estimate e join client c using( idClient) where idFreelancer=?";
    connection.query(sql, [userId], (err, results) => {
        if (err) {
          console.error('Error al obtener las salas asociadas al usuario:', err.message);
          cb({error:500});
        }else if (results.length === 0) {
          // Si no se encuentran salas asociadas al usuario, devolver un error 404
          cb({error:404});
        }else{
          cb({ estimate: results });
        }
        
      });
}

exports.createEstimate= async (json, cb)=>{
  const { city, user, idClient, idFreelancer, place, description, dateStart, photo} =json;

  let sql= user=== "2"? "INSERT INTO stimate ( `idClient`, `idFreelancer`, `description`, `adress`, `idCity`, `sendedBy`, `state_stateId`, dateStart, dercriptiveImg) VALUES (?,?,?,?,?,?,?,?,?)":
  "";
  let values=[idClient, idFreelancer, description,place,city,user, 1, dateStart];
  if(photo){
    const fileContent = await sharp(photo)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toBuffer();
      values.push(fileContent);
  }
  onnection.query(sql, values, (err) => {
    if (photo !== null) {
      fs.unlink(photo, (error) => {
          if (error) {
              console.error("Error deleting file:", error);
          } else {
              console.log("File deleted successfully.");
          }
      });
    }
    if (err) {
      console.error('Error al crear estimacion', err.message);
      cb({result:false });
    }else{
      cb({result: false });
    }
    
  });
}