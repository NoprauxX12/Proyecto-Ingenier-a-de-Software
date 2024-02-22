const FreelancerModel = require("../model/freelancer/freelancer")

exports.SignUp= (req, res, next)=>{
    console.log(req.body)
    if(parseInt(req.body.user)===1){
        const free= new FreelancerModel.Freelancer(req.body).createFreelancer((result)=>{
            res.json(result);
        });
        
    }
    
}


exports.getFreelancer =(req, res, next)=>{
    FreelancerModel.fetchAll((result)=>{
        console.log(result);
        res.json(result);
    })
    
}
   
