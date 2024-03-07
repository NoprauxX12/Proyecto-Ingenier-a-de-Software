const Freelancer = require("../model/entities/freelancer")
const FreelancerDAO = require("../model/data Acces/freelancerDAO")
const client = require("../model/entities/client")
const ClientDAO = require("../model/data Acces/clientDAO")

exports.SignUp= (req, res, next)=>{
    if(parseInt(req.body.user)===1){
        const free= new Freelancer(req.body);
        FreelancerDAO.createFreelancer(free,(result)=>{
            res.json(result);
        } )
    }else{
        const c = new client(req.body);
        ClientDAO.createClient(c,(result)=>{
            res.json(result)
            
        } )
    }
    
}


exports.getFreelancer =(req, res, next)=>{
    const params= req.body;
    if(params.keyword!==null){
        FreelancerDAO.fetchByKeyword(params, (result)=>{
            res.json(result);
        });
    }else{
        FreelancerDAO.fetchAll(params, (result)=>{
            res.json(result);
        });
    }
    
    
}
   
