const FreelancerModel = require("../model/freelancer/freelancer")
const clientModel = require("../model/client/client")

exports.SignUp= (req, res, next)=>{
    if(parseInt(req.body.user)===1){
        const free= new FreelancerModel.Freelancer(req.body).createFreelancer((result)=>{
            res.json(result);
        });
        
    }else{
        const _ = new clientModel(req.body).createClient((result)=>{
            res.json(result)
        });

    }
    
}


exports.getFreelancer =(req, res, next)=>{
    FreelancerModel.fetchAll((result)=>{
        res.json(result);
    })
    
}
   
