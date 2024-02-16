const dbCredentials = require("../util/database/credentials");
exports.homeCOntroller = (req, res, next) =>{
    res.render("index", {
        host: dbCredentials.DatabaseCredentials.host
    });
}