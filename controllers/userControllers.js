const Freelancer = require("../model/entities/freelancer")
const FreelancerDAO = require("../model/data Acces/freelancerDAO")
const client = require("../model/entities/client")
const ClientDAO = require("../model/data Acces/clientDAO")
const GeneralDAO = require("../model/data Acces/generalDAO")

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
   
exports.FinalOfSignUp = (req, res, next)=>{
    if(parseInt(req.body.user)===1){
    const list = [];
    req.body.knowledge.split(",").map((e)=>{
        let n=parseInt(e);
        if(!isNaN(n))list.push(n);
    });
    if(req.body.photo==="default"){  
        FreelancerDAO.UpdloadPhoto(null, req.body.description, req.body.id, (a)=>{});
    }else{
        FreelancerDAO.UpdloadPhoto(req.file.path, req.body.description, req.body.id, (a)=>{});
    }
    GeneralDAO.insertKnowledge(list, req.body.id);
    }else{
        ClientDAO.UpdloadPhoto(req.file.path, req.body.description, req.body.id, (a)=>{
            res.json({answer: a});
        });
    }
    
};

exports.verifyUserExistence=(req, res, next)=>{
    if(parseInt(req.body.user)===1){
        FreelancerDAO.userExist(req.body, (answer)=>{
            res.json(answer);
        });

    }else{

    }
};