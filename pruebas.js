const mysqlCon = require("./util/mysqlConnexion")

mysqlCon.query("SELECT * FROM department", (err, res, fields)=>{
    if(err){
        console.log(err);
    }else{
        console.log(res);
    }
})
