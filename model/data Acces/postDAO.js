const mysqlExecute = require("../../util/mysqlConnexion");
const sharp = require("sharp");
const fs= require("fs");
const { resolve } = require("path");

class PostDAO{
    static async createPost(post, cb){
        let values= [
        post.description,
        post.title,
        post.idClient];

    let link= post.img;
    let fileContent=null;
    try {
        if (link !== null) {
          fileContent = await sharp(link)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toBuffer();
        }
      } catch (err) {
        console.error(err);
      }
    let sql= " INSERT INTO contractOffer (description, title, idClient) VALUES (?,?,?)";
    let imgSql= "INSERT INTO imegesco (image, idContractOffer) VALUES (?,?)"
    try {
        let res= await mysqlExecute(sql, values);
        if(fileContent) mysqlExecute(imgSql, [fileContent, res.insertId]);
        cb({result: true});
    } catch (error) {
        cb({result: false});
    }
    
        try {
            if (link !== null) {
            fs.unlink(link, (error) => {
                if (error) {
                  console.error("Error deleting file:", error);
                } else {
                  console.log("File deleted successfully.");
                }
              });
            }
        } catch (error) {
            console.log(error);
        }
      
    }
    
    static async fetchAll(city, cb){
        let sql=city?"select idContractOffer, c.description, title, idClient, l.name, t.name city from contractOffer c join client l using(idClient) join town t using(idCity) WHERE l.idCity=?" : "select idContractOffer, c.description, title, idClient, l.name, t.name city from contractOffer c join client l using(idClient) join town t using(idCity)"
        try {
            const response =city? await mysqlExecute(sql, [parseFloat(city)]) : await mysqlExecute(sql);
            for (let i = 0; i < response.length; i++) {
                await new Promise(async (resolve)=>{
                    sql= "select image from imegesco where idContractOffer=?";
                    let res= await mysqlExecute(sql, response[i].idContractOffer);
                    if(res.length>0){
                        response[i]["img"]= res[0].image.toString("base64");
                    }else{
                        response[i]["img"]=null;
                    }
                    resolve()
                })
            }
            console.log(response)
            cb(response);
        } catch (error) {
            console.log(error);
        }

    }

    static async fetchByKeyword(city, search, cb){
        let sql = city ?
        "SELECT idContractOffer, c.description, title, idClient, l.name, t.name AS city FROM contractOffer c JOIN client l USING(idClient) JOIN town t USING(idCity) WHERE l.idCity = ? AND c.description LIKE ?" :
        "SELECT idContractOffer, c.description, title, idClient, l.name, t.name AS city FROM contractOffer c JOIN client l USING(idClient) JOIN town t USING(idCity) WHERE c.description LIKE ?";
        const descriptionValue = `%${search}%`;
        try {
            if(city) console.log("otra");
            const response =city? await mysqlExecute(sql, [parseFloat(city), descriptionValue]) : await mysqlExecute(sql,[descriptionValue]);
            cb(response);
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports= PostDAO;