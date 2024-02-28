const mysqlExecute = require("../../util/mysqlConnexion");

class TownDAO{
    static async fetchAll(cb){
        let sql= "select * from town ORDER BY name ASC"
    try {
        const results = await mysqlExecute(sql);
        cb(results);
    } catch (error) {
        console.log(error);
    }
    }
}

module.exports= TownDAO;