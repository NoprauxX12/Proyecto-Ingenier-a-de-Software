const Freelancer = require("../model/entities/freelancer")
const FreelancerDAO = require("../model/data Acces/freelancerDAO")
const client = require("../model/entities/client")
const ClientDAO = require("../model/data Acces/clientDAO")
const GeneralDAO = require("../model/data Acces/generalDAO")
const Client = require("../model/entities/client")

exports.SignUp= (req, res, next)=>{
    let link=null;
        try {
            link=req.file.path;
        } catch (error) {
            
        }
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
            res.json(result);   
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

exports.viewProfile=(req,res,next)=>{
    if(parseInt(req.body.usertype)===1){
        FreelancerDAO.fetchById(req.body.id,(result)=>{
            res.json(result);
        });
    }else{
        ClientDAO.fetchById(req.body.id,(result)=>{
            res.json(result);
        });
    }
};

exports.editProfile=(req,res,next)=>{
    let link = null;
    try {
      link = req.file.path;
      req.body["photo"] = link;
    } catch (error) {}
    if(parseInt(req.body.usertype)===1){
        FreelancerDAO.updateById(req.body);
    }
    res.json({response:true});
};


exports.logIn =(req,res, next)=>{
    if(parseInt(req.body.user)===1){
        FreelancerDAO.logIn(req.body, (result)=>{
            res.json(result);
        })
    }else if(parseInt(req.body.user)=== 2){
        ClientDAO.logIn(req.body, (result)=>{
            res.json(result);
        })
    }
}

exports.fetchPhoto= (req, res)=>{
    if(parseInt(req.body.user)===1){
        FreelancerDAO.getProfilePhotoById(req.body.id, (result)=>{
            res.json(result);
        })
    }else if(parseInt(req.body.user)=== 2){
        ClientDAO.getProfilePhotoById(req.body,(result)=>{
            res.json(result);
        });
    }
};