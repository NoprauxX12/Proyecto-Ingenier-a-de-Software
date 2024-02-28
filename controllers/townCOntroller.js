const Town = require("../model/town/town");

exports.fetchCityes = (req, res, next)=>{
    Town.fetchAll((results)=>{
        res.json(results);
    })
    
}

