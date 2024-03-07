const mysqlExecute = require("../../util/mysqlConnexion");

const bcrypt = require('bcrypt');



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
        let sql = "INSERT INTO Client (idClient, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description` ) VALUES (?,?,?,?,?,?,?,?,?);" ;
        const password= await hashPassword(client.password);
        const values = [client.idCard, client.name, client.telphone, client.cellphone, client.adress, client.email, password, parseFloat(client.idCity), client.description];
        try{
            const results= await mysqlExecute(sql, values);
            cb({result: true});
        }catch(err){
            cb({result: false});
        }
       
    }
}

module.exports= ClientDAO;