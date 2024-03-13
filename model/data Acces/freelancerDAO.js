const mysqlExecute = require("../../util/mysqlConnexion");
const fs= require("fs")
const bcrypt = require('bcrypt');
const sharp= require("sharp");


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
            
    static async UpdloadPhoto(route, description, id){
        let sql = "UPDATE freelancer SET profilePhoto = ?, description=? WHERE idFreelancer=?";
        let fileContent=route;
        try {
            if(route!==null) {
                fileContent = await sharp(route)
                .resize({ width: 700 })
                .jpeg({quality: 70})
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

    static async userExist(json, cb){
        let sql= "select * from  freelancer where idFreelancer=?";
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
        let sql= "select * from  freelancer where  email=?";
        try {
            const res= await mysqlExecute(sql, [json.email])
            cb(res);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FreelancerDAO;