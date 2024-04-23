const connection= require("../DAL/mysqlCon");
const fs = require("fs");
const sharp = require("sharp");

exports.fetchAllEstimates= async (userId,user, cb) =>{
    let sql= user==="2"? "select estimateId id, f.name name, e.description, f.profilePhoto, sendedBy user from estimate e join freelancer f using(idFreelancer) where idClient=?"
    : "select estimateId id, c.name name, e.description, c.profilePhoto, sendedBy user from estimate e join client c using( idClient) where idFreelancer=?";
    connection.query(sql, [userId], (err, results) => {
        if (err) {
          console.error('Error al obtener las salas asociadas al usuario:', err.message);
          cb({error:500});
        }else{
          cb({ estimate: results });
        }
        
      });
}

exports.createEstimate= async (json, cb)=>{
  const { city, user, idClient, idFreelancer, place, description, dateStart, photo} =json;
  const date = dateStart===""? null: dateStart;
  let sql= "INSERT INTO estimate (`idClient`, `idFreelancer`, `description`, `adress`, `idCity`, `sendedBy`, `state_stateId`, `dateStart`, `dercriptiveImg`) VALUES (?,?,?,?,?,?,?,?,?)";
  let values=[idClient, idFreelancer, description,place,city,user, 1, date];
  let fileContent=null;
  if(photo){
    fileContent = await sharp(photo)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toBuffer();
  }
  values.push(fileContent);
  connection.query(sql, values, (err) => {
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
      cb({result: true });
    }
    
  });
}

exports.getById= async (json, cb)=>{
  const {estimateId} =json;

  let sql= "select sendDate, estimateId, `idClient`, `idFreelancer`, e.description, e.adress, t.name city, `sendedBy`, `state_stateId` state, `dateStart`, `dercriptiveImg`, c.name clientName, f.name freelancerName, cost from estimate e join client c using(idClient) join freelancer f using(idFreelancer) join town t on e.idCity=t.idCity where estimateId=?";
  connection.query(sql, [parseInt(estimateId)], (err, results) => {
    if (err) {
      console.error('Error al crear estimacion', err.message);
      cb({result: false });
    }else{
      cb(results[0]);
    }
  });

}

exports.setState= async (state, id,cost, cb)=>{
  const values = [
    parseInt(state), 
    parseInt(id)
  ];
  if(cost) values.splice(1 ,0, parseFloat(cost));
  console.log(values)
  let sql =cost===null? "update estimate set state_stateId=? where estimateId=?": "update estimate set state_stateId=?, cost=? where estimateId=?";
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al crear estimacion', err.message);
      cb({result: false });
    }else{
      cb(results[0]);
    }
  });
}