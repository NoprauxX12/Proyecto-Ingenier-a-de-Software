const AdminDAO = require("../model/data Acces/adminDAO")
const Admin = require("../model/entities/admin")

exports.AdminlogIn =(req,res, next)=>{
    AdminDAO.logInAdmin(req.body, (result) => {
        res.json(result)
    })
}

exports.AdminSignUp =(req, res, next)=>{
    AdminDAO.CreateAdmin(req, (result) => {
        res.json(result)
    })
}