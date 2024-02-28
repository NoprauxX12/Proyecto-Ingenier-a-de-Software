const mysqlExecute = require("../../util/mysqlConnexion");

class ClientDAO{
    static async createClient(client ,cb){
        let sql = "INSERT INTO Client (idClient, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description`, url ) VALUES (?,?,?,?,?,?,?,?,?,?);" 
        const values = [client.idCard, client.name, client.telphone, client.cellphone, client.adress, client.email, client.password, parseFloat(client.idCity), client.description, client.profilePhoto];
        try{
            const results= await mysqlExecute(sql, values);
            cb({result: true});
        }catch(err){
            cb({result: false});
        }
       
    }
}

module.exports= ClientDAO;