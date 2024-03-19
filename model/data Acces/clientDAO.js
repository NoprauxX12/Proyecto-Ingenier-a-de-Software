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
    static async createClient(client, cb) {
        let sql = "INSERT INTO Client (idClient, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description`, profilePhoto ) VALUES (?,?,?,?,?,?,?,?,?,?);";
        const password = await hashPassword(client.password);
        let link = client.profilePhoto;
        let fileContent = null;
        const values = [client.idCard, client.name, client.telphone, client.cellphone, client.adress, client.email, password, parseFloat(client.idCity), client.description];
        try {
            if (link !== null) {
                fileContent = await sharp(link)
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            }
            values.push(fileContent);
            const results = await mysqlExecute(sql, values);
            cb({ result: true });
        } catch (err) {
            console.error(err);
            cb({ result: false });
        }
    
        if (link !== null) {
            fs.unlink(link, (error) => {
                if (error) {
                    console.error("Error deleting file:", error);
                } else {
                    console.log("File deleted successfully.");
                }
            });
        }
    }
    static async userExist(json, cb){
      let sql= "select * from  client where idClient=?";
      try {
          const res= await mysqlExecute(sql, [json.idCard]);
          this.emailExist(json, (e)=>{
              if(e.length===0 && res.length===0){
                  cb({result: true});
              }else{
                  if(e.length!==0){
                      
                      cb({result: false, error: "Email registrada anteriormente."});
                  }else{
                      cb({result: false, error: "Cedula registrada anteriormente."});
                  }
              }
          })

      } catch (error) {
          
      }
      
  }

  static async emailExist(json, cb){
      let sql= "select * from  client where  email=?";
      try {
          const res= await mysqlExecute(sql, [json.email])
          cb(res);
      } catch (error) {
          console.log(error);
      }
  }
}

module.exports= ClientDAO;