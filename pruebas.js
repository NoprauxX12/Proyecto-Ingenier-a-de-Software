const mysqlCon = require("./util/mysqlConnexion")

cosa = mysqlCon.query("SELECT * FROM town", (err, res, fields)=>{
    if(err){
        console.log(err);
    }else{
        for(let town of res){
            console.log(town.name);
        }
    }
})
