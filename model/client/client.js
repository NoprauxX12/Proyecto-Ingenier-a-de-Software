const pool = require("../../util/mysqlConnexion")

function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

 class Client {
    constructor(json){
        this.name = json.name;
        this.idCard= json.idCard;
        this.telphone= json.telphone;
        this.cellphone=json.cellphone;
        this.adress=json.adress;
        this.email=json.email;
        this.password=json.password1;
        this.idCity=json.idCity==="Medellin"? 5001:0;
        this.description=json.description;
        this.rut= json.rut;
        this.profilePhoto= json.profilePhoto;
       // this.rut=json.rut;
        //this.technickKnowledge=json.technickKnowledge;
    }

    async createClient(cb){
        let sql = "INSERT INTO Client (idClient, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description`, url ) VALUES (?,?,?,?,?,?,?,?,?,?);" 
        const values = [this.idCard, this.name, this.telphone, this.cellphone, this.adress, this.email, this.password, parseFloat(this.idCity), this.description, this.profilePhoto];
        try{
            const results= await executeQuery(sql, values);
            cb({result: true});
        }catch(err){
            cb({result: false});
        }
       
    }


    addPhoto(p){
        this.profilePhoto=p;
    }
}

module.exports= Client;