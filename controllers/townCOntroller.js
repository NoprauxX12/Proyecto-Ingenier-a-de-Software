const TownDAO = require("../model/data Acces/townDAO");

exports.fetchCityes = (req, res, next)=>{
    TownDAO.fetchAll((results)=>{
        res.json(results);
    })
    
}

