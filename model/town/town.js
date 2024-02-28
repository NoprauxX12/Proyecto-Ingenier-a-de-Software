const executeQuery = require("../Queryes");

class Town{
    constructor(json){
        this.idCity = json.idCity;
        this.name= json.name;
        this.idDepartment= json.idDepartment;
    }

    
}

exports.Town= Town;

exports.fetchAll = async (cb)=>{
    let sql= "select * from town ORDER BY name ASC"
    try {
        const results = await executeQuery(sql);
        cb(results);
    } catch (error) {
        console.log(error);
    }
}