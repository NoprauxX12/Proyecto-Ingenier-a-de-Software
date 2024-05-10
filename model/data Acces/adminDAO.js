const mysqlExecute = require("../../util/mysqlConnexion");
const fs = require("fs");
const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
  const saltRounds = 10; // Número de rondas de salado
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

  const comparePassword = async (password, hashedPassword, cb) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      cb(match);
    } catch (error) {
      console.error("Error al comparar contraseñas:", error);
      return false;
    }
  }; 

class AdminDAO {

    static async logInAdmin(json, cb){
        let sql = "SELECT id_admin, name, email, password from admin where email = ?";
        try{
            const response = await mysqlExecute(sql, [ json.email]);
            if (response.length === 0) {
                cb({login: false});    
            } else{
                comparePassword(json.password, response[0]["password"], (match)=>{
                if(match) {
                    let user = response[0];
                    user["user"]="1";
                    user["password"]=null;
                    cb({login : true, user : user})
                } else {
                    cb({login: false});
                }
                });
                
            } 
        } catch (error){
            console.log(error);
        }
    }

    static async CreateAdmin(adm, cb){
      let sql = "INSERT INTO admin (id_admin, name, email, password) VALUES (?,?,?,?);";
      const password = await hashPassword(adm.password);
      const values = [
        adm.id_admin,
        adm.name,
        adm.email,
        password,
      ];

      try{
        const resuls = await mysqlExecute(sql, values);
        cb(true)
      } catch (error) {
        cb(false)
      }
    }

}

module.exports = AdminDAO;