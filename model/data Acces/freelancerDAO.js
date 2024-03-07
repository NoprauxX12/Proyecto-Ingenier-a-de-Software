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

class FreelancerDAO{
    static async createFreelancer(free ,cb){
        let sql = "INSERT INTO freelancer (idFreelancer, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description` ) VALUES (?,?,?,?,?,?,?,?,?);" ;
        const password= await hashPassword(free.password);
        const values = [free.idCard, free.name, free.telphone, free.cellphone, free.adress, free.email, password, parseFloat(free.idCity), free.description];
        try{
            const results= await mysqlExecute(sql, values);
            cb({result: true, user: {}});
        }catch(err){
            cb({result: false});
        }
       
    }

    static async fetchAll(p,cb){
        let sql= "select f.idFreelancer, f.name , t.name city, f.description, f.url from freelancer f left join town t using (idCity) where f.idCity=?";
        try{
            const results= await mysqlExecute(sql, [parseFloat(p.city)]);
            cb(results);
        }catch(err){
            cb({result: false});
        }
    }

    static async fetchByKeyword(p, cb){
        let sql = "SELECT * FROM freelancer WHERE description LIKE ? or name like ? and idCity=?";
        try {
            const results = await mysqlExecute(sql, [`%${p.keyword}%`, `%${p.keyword}%`, parseFloat(p.city)]);
            cb(results);
        } catch (err) {
            cb({ result: false });
        }

            }
}

module.exports = FreelancerDAO;