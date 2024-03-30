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

}

module.exports= PostDAO;