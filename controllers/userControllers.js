const Freelancer = require("../model/entities/freelancer")
const FreelancerDAO = require("../model/data Acces/freelancerDAO")
const client = require("../model/entities/client")
const ClientDAO = require("../model/data Acces/clientDAO")
const GeneralDAO = require("../model/data Acces/generalDAO")

exports.SignUp= (req, res, next)=>{
    let link=null;
        try {
            link=req.file.path;
        } catch (error) {
            
        }
        console.log(req.body); 
        if(parseInt(req.body.user)===1){
            const list = [];
        req.body.knowledge.split(",").map((e)=>{
            let n=parseInt(e);
            if(!isNaN(n))list.push(n);
        });
        req.body["technickKnowledge"]= list;
        req.body["profilePhoto"]= link;
        const free = new Freelancer(req.body);
        FreelancerDAO.createFreelancer(free, (result)=>{
            res.json(result);
        });
    }else{
        req.body["profilePhoto"]= link;
        console.log(req.body);
        const c = new client(req.body);
        ClientDAO.createClient(c ,(result)=>{
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
   
exports.verifyUserExistence=(req, res, next)=>{
    if(parseInt(req.body.user)===1){
        FreelancerDAO.userExist(req.body, (answer)=>{
            res.json(answer);
        });

    }else{
        ClientDAO.userExist(req.body, (answer)=>{
            res.json(answer);
        });
    }
};