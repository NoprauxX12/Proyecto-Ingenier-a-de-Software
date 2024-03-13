const mysqlExecute = require("../../util/mysqlConnexion");
const fs = require("fs");
const bcrypt = require('bcrypt');
const sharp = require("sharp");



const hashPassword = async (password) => {
    const saltRounds = 10; // Número de rondas de salado
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  };

class ClientDAO{
    static async createClient(client ,cb){
        let sql = "INSERT INTO Client (idClient, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description` ) VALUES (?,?,?,?,?,?,?,?);" ;
        const password= await hashPassword(client.password);
        const values = [client.idCard, client.name, client.telphone, client.cellphone, client.adress, client.email, password, parseFloat(client.idCity)];
        try{
            const results= await mysqlExecute(sql, values);
            cb({result: true});
        }catch(err){
            cb({result: false});
        }
       
    }

    static async UpdloadPhoto(route, description, id){
        let sql = "UPDATE Client SET profilePhoto = ?, description=? WHERE idClient=?";
        let fileContent=route;
        try {
            if(route!==null) {
                fileContent = await sharp(route)
                .resize({ width: 800 })
                .toBuffer();
            }
            const res= await mysqlExecute(sql, [fileContent, description, id]);
        } catch (error) {
            console.log(error);
        }
        if(route!==null) fs.unlink(route, (error) => {
            if (error) {
              console.log(error);
            }
          });
    }
}

module.exports= ClientDAO;