const mysqlExecute = require("../../util/mysqlConnexion");

class PostDAO{
    static async createPost(post, cb){
        let values= [
        post.description,
        post.title,
        post.idClient];
        
    let sql= " INSERT INTO contractOffer (description, title, idClient) VALUES (?,?,?)";
    try {
        mysqlExecute(sql, values);
        cb({result: true});
    } catch (error) {
        cb({result: false});
    }
    }
    
    static async fetchAll(city, cb){
        let sql=city?"select idContractOffer, c.description, title, idClient, l.name, t.name city from contractOffer c join client l using(idClient) join town t using(idCity) WHERE l.idCity=?" : "select idContractOffer, c.description, title, idClient, l.name, t.name city from contractOffer c join client l using(idClient) join town t using(idCity)"
        try {
            const response =city? await mysqlExecute(sql, [parseFloat(city)]) : await mysqlExecute(sql);
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