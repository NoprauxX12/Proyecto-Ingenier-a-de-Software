const mysqlExecute = require("../../util/mysqlConnexion");
const fs= require("fs")
const bcrypt = require('bcrypt');
const sharp= require("sharp");
const GeneralDAO = require("./generalDAO");
const { response } = require("express");

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
      // Manejar el error, si ocurre
      console.error("Error al comparar contraseñas:", error);
      return false;
    }
  };  

class FreelancerDAO {
  static async createFreelancer(free, cb) {
    let sql =
      "INSERT INTO freelancer (idFreelancer, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description`, profilePhoto) VALUES (?,?,?,?,?,?,?,?,?,?);";
    const password = await hashPassword(free.password);
    const knowledge = free.technickKnowledge;
    let link = free.profilePhoto;
    const values = [
      free.idCard,
      free.name,
      free.telphone,
      free.cellphone,
      free.adress,
      free.email,
      password,
      parseFloat(free.idCity),
      free.description,
    ];
    let fileContent = null;

    try {
      if (link !== null) {
        fileContent = await sharp(link)
          .resize({ width: 800 })
          .jpeg({ quality: 80 })
          .toBuffer();
      }
      values.push(fileContent);
      const results = await mysqlExecute(sql, values);
      cb({ result: true, user: {} });
      GeneralDAO.insertKnowledge(knowledge, free.idCard);
    } catch (err) {
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

  static async fetchAll(p, cb) {
    let sql =
      p.city !== "00"
        ? "select f.idFreelancer, f.name , t.name city, f.description, f.profilePhoto, f.url from freelancer f left join town t using (idCity) where f.idCity=?"
        : "select f.idFreelancer, f.name , t.name city, f.description, f.profilePhoto, f.url from freelancer f left join town t using (idCity)";
    try {
      const results =
        p.city !== "00"
          ? await mysqlExecute(sql, [parseFloat(p.city)])
          : await mysqlExecute(sql);
      results.map((freelancer) => {
        if (freelancer.profilePhoto) {
          let photo = freelancer.profilePhoto.toString("base64");
          freelancer["profilePhoto"] = photo;
        }
      });
      cb(results);
    } catch (err) {
      cb({ result: false });
    }
  }
    static async fetchAll(p,cb){
        let sql=p.city!=="00"?  "select f.idFreelancer, f.name , t.name city, f.description, f.profilePhoto from freelancer f left join town t using (idCity) where f.idCity=?" :"select f.idFreelancer, f.name , t.name city, f.description, f.profilePhoto from freelancer f left join town t using (idCity)";
        try{
            const results=p.city!=="00"? await mysqlExecute(sql, [parseFloat(p.city)]): await mysqlExecute(sql);
            results.map((freelancer)=>{
                if(freelancer.profilePhoto){
                    let photo=freelancer.profilePhoto.toString('base64');
                    freelancer["profilePhoto"]=photo;
                } 
            });
            cb(results);
        }catch(err){
            console.log(err);
            cb({result: false});
        }
    }

  static async fetchByKeyword(p, cb) {
    let sql =
      p.city !== "00"
        ? "select f.idFreelancer, f.name name, t.name city, f.description, f.profilePhoto FROM freelancer f left join town t using (idCity) WHERE idCity=? and description LIKE ? or f.name like ? "
        : "select f.idFreelancer, f.name name, t.name city, f.description, f.profilePhoto FROM freelancer f left join town t using (idCity) WHERE description LIKE ? or f.name like ? ";
    try {
      const results =
        p.city !== "00"
          ? await mysqlExecute(sql, [
              parseFloat(p.city),
              `%${p.keyword}%`,
              `%${p.keyword}%`,
            ])
          : await mysqlExecute(sql, [`%${p.keyword}%`, `%${p.keyword}%`]);
      results.map((freelancer) => {
        if (freelancer.profilePhoto) {
          let photo = freelancer.profilePhoto.toString("base64");
          freelancer["profilePhoto"] = photo;
        }
      });
      cb(results);
    } catch (err) {
      console.log(err);
      cb({ result: false });
    }
  }
  static async userExist(json, cb) {
    let sql = "select * from  freelancer where idFreelancer=?";
    try {
      const res = await mysqlExecute(sql, [json.idCard]);
      this.emailExist(json, (e) => {
        if (e.length === 0 && res.length === 0) {
          cb({ result: true });
        } else {
          if (e.length !== 0) {
            cb({ result: false, error: "Email registrada anteriormente." });
          } else {
            cb({ result: false, error: "Cedula registrada anteriormente." });
          }
        }
      });
    } catch (error) {}
  }

  static async emailExist(json, cb) {
    let sql = "select * from  freelancer where  email=?";
    try {
      const res = await mysqlExecute(sql, [json.email]);
      cb(res);
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchById(id, cb) {
    let sql =
      "SELECT idFreelancer, name, description, cellphone, email, importantInfo, profilePhoto, rut, curriculum, eps FROM freelancer WHERE idFreelancer = ?";
    try {
      const response = await mysqlExecute(sql, [id]);
      const user = response[0];
      
      // Convertir blobs a URLs de datos base64 si existen
      if (user.profilePhoto) {
        user.profilePhoto = user.profilePhoto.toString("base64");
      }
      if (user.rut) {
        user.rut = user.rut.toString("base64");
      }
      if (user.curriculum) {
        user.curriculum = user.curriculum.toString("base64");
      }
      if (user.eps) {
        user.eps = user.eps.toString("base64");
      }
  
      // Obtener títulos de conocimientos académicos y agregarlos a la respuesta
      sql = "SELECT title FROM academicdegrees JOIN technicalknowledge USING(idTechnicalKnowledge) WHERE idFreelancer = ?";
      const knowledge = await mysqlExecute(sql, [id]);
      const knowledgeList = knowledge.map((e) => e.title).join(", ");
      user["knowledge"] = knowledgeList;
  
      cb(user);
    } catch (error) {
      console.log(error);
    }
  }
  

  static async updateById(formData) {
    const {
      id,
      name,
      description,
      cellphone,
      email,
      importantInfo,
      photo,
      curriculum,
      rut,
      eps,
      password,
    } = formData;

    let fileContent = null;

    if (photo !== null) {
      fileContent = await sharp(photo)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    let sql = `UPDATE freelancer SET
                name = ?,
                description = ?,
                cellphone = ?,
                email = ?,
                importantInfo = ?,
                profilePhoto = ?,
                curriculum = ?,
                rut = ?,
                eps = ?
                WHERE idFreelancer = ?`;

    try {
      // Ejecutar la consulta SQL para actualizar el perfil
      await mysqlExecute(sql, [
        name,
        description,
        cellphone,
        email,
        importantInfo,
        fileContent,
        curriculum,
        rut,
        eps,
        id,
      ]);

      if (photo !== null) {
        fs.unlink(photo, (error) => {
          if (error) {
            console.error("Error deleting file:", error);
          } else {
            console.log("File deleted successfully.");
          }
        });
      }

      if (password) {
        const hashedPassword = hashPassword(password);
        sql = "UPDATE freelancer SET password = ? WHERE idFreelancer = ?";
        await mysqlExecute(sql, [hashedPassword, id]);
      }

      console.log("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  }

    static async logIn(json, cb){
        let sql = "SELECT name, idFreelancer idCard, email, idCity, adress, password from freelancer where email = ?";
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
    
    static async getProfilePhotoById(id, cb){
        let sql= "select profilePhoto from  freelancer where  idFreelancer=?";
        try {
            const res= await mysqlExecute(sql, [id]);
            if(res[0].profilePhoto){
                let photo= res[0].profilePhoto.toString("base64");
                cb({profilePhoto: photo, response: true});
            }else{
                cb({response: false});
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FreelancerDAO;