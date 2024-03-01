
 class Freelancer {
    constructor(json){
        this.name = json.name;
        this.idCard= json.idCard;
        this.telphone= json.telphone;
        this.cellphone=json.cellphone;
        this.adress=json.adress;
        this.email=json.email;
        this.password=json.password1;
        this.idCity=parseFloat(json.idCity);
        this.description=json.description;
        this.rut= json.rut;
        this.profilePhoto= json.profilePhoto;
       // this.rut=json.rut;
        //this.technickKnowledge=json.technickKnowledge;
    }


    addPhoto(p){
        this.profilePhoto=p;
    }
}

module.exports= Freelancer;
