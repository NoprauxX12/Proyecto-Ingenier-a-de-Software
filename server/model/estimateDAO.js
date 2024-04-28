const connection= require("../DAL/mysqlCon");
const fs = require("fs");
const sharp = require("sharp");


exports.fetchAllEstimates = async (userId, user, name, cb) => {
  let sql =
    user === "2"
      ? "select estimateId id, f.name name, e.description, f.profilePhoto, sendedBy user, state_stateId state, f.idFreelancer receptor from estimate e join freelancer f using(idFreelancer) where idClient=? order by sendDate desc"
      : "select estimateId id, c.name name, e.description, c.profilePhoto, sendedBy user, state_stateId state, c.idClient receptor from estimate e join client c using( idClient) where idFreelancer=? order by sendDate desc";

  connection.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("Error al obtener las salas asociadas al usuario:", err.message);
      cb({ error: 500 });
    } else {
      // Iterar sobre los resultados de manera sincrónica con un bucle for
      for (let i = 0; i < results.length; i++) {
        const estimate = results[i];
        
        await new Promise((resolve, reject) => {
          let sql = "select count(*) msg from messages where estimateId=? and autor!=? and visto=0";
          connection.query(sql, [estimate.id, name], (err, res) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              estimate["msg"] = res[0].msg;
              resolve();
            }
          });
        });

        if (estimate.profilePhoto) {
          let photo = estimate.profilePhoto.toString("base64");
          estimate["profilePhoto"] = photo;
        }
      }
      cb({ estimate: results });
    }
  });
};

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
      fs.unlink(photo, (error, result) => {
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
      cb({result: true, idFreelancer: idFreelancer, idClient: idClient});
    }
     
  });
}

exports.getById= async (json, cb)=>{
  const {estimateId, user, name} =json;

  let sql=user==="1"? "select sendDate, estimateId, `idClient`, `idFreelancer`, e.description, e.adress, t.name city, `sendedBy`, `state_stateId` state, `dateStart`, `dercriptiveImg`, c.name clientName, f.name freelancerName, cost, c.profilePhoto profilePhoto from estimate e join client c using(idClient) join freelancer f using(idFreelancer) join town t on e.idCity=t.idCity where estimateId=?": 
  "select sendDate, estimateId, `idClient`, `idFreelancer`, e.description, e.adress, t.name city, `sendedBy`, `state_stateId` state, `dateStart`, `dercriptiveImg`, c.name clientName, f.name freelancerName, cost, f.profilePhoto profilePhoto from estimate e join client c using(idClient) join freelancer f using(idFreelancer) join town t on e.idCity=t.idCity where estimateId=?";
  connection.query(sql, [parseInt(estimateId)], async (err, results) => {
    if (err) {
      console.error('Error al crear estimacion', err.message);
      cb({result: false });
    }else{
    const estimate = results[0];
    if(estimate.profilePhoto){
      let photo=estimate.profilePhoto.toString('base64');
      estimate["profilePhoto"]=photo;
    } 
    if(estimate.dercriptiveImg){
      let photo=estimate.dercriptiveImg.toString('base64');
      estimate["dercriptiveImg"]=photo;
    } 
    let sql = "select count(*) msg from messages where estimateId=? and autor!=? and visto=0";
    await new Promise((resolve) => {
        connection.query(sql, [parseInt(estimateId), name], (err, res)=>{
          estimate["msg"]=res[0].msg;
          resolve();
        }) 
    })
    cb(estimate);
    }
  });

}
//TODO cambiar el estado a  cunado sea visto un estimate
exports.setState= async (json, cb)=>{
  const {state, id, cost}= json;
  const values = [
    parseInt(state),
    parseInt(id)
  ];
  
  let sql = "update estimate set state_stateId=? where estimateId=?";
  if(cost) {
    values.splice(1 ,0, parseFloat(cost));
    sql="update estimate set state_stateId=?, cost=? where estimateId=?";
  }
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al crear estimacion', err.message);
      cb({result: false });
    }else{
      cb(results[0]);
    }
  });
}

exports.toNotificaions= (id, cb)=>{
  let sql = "select idClient, idFreelancer from estimate where estimateId=?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al crear estimacion', err.message);
    }else{
      cb(results[0]);
    }
  });
}

