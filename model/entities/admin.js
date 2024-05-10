
class Admin {
    constructor(json){
        this.id_admin = json.id_admin;
        this.name = json.name;
        this.email = json.email;
        this.password = json.password;
    }
}

module.exports = Admin;