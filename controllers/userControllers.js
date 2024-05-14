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

exports.editProfile = (req, res, next) => {
    let photoLink = "";
    let curriculumLink = "";
    let rutLink = "";
    let epsLink = "";

    try {
        if (req.files) {
            if (req.files.photo) {
                photoLink = req.files.photo[0].path;
            }
            if (req.files.curriculum) {
                curriculumLink = req.files.curriculum[0].path;
            }
            if (req.files.rut) {
                rutLink = req.files.rut[0].path;
            }
            if (req.files.eps) {
                epsLink = req.files.eps[0].path;
            }
        }
    } catch (error) {}


    console.log(
        [{id: req.body.id},
        {name: req.body.name},
        {email: req.body.email},
        {description: req.body.description},
        {cellphone: req.body.cellphone},
        {importantInfo: req.body.importantInfo},
        {profilePhoto: photoLink},
        {curriculum: curriculumLink},
        {rut: rutLink},
        {eps: epsLink}]);
    if (parseInt(req.body.usertype) === 1) {
        FreelancerDAO.updateById({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            description: req.body.description,
            cellphone: req.body.cellphone,
            importantInfo: req.body.importantInfo,
            profilePhoto: photoLink,
            curriculum: curriculumLink,
            rut: rutLink,
            eps: epsLink,
        });
    }
    res.json({ response: true });
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

exports.progressiveProfiling = (req, res)=>{
    FreelancerDAO.progressiveProfiling(req.body, (result)=>{
        res.json(result);
    })
}

exports.checkPreferences = (req, res)=>{
    FreelancerDAO.checkPreferences(req.body.id, (result)=>{
        //console.log(result);
        res.json(result);
    })
}

exports.addPreviousWork = (req, res)=>{
    let imgLink = "";
    try {
        if(req.file){
            imgLink=req.file.path;
        }
    } catch (error) {}
    req.body["img"]= imgLink;
    
    FreelancerDAO.addPreviousWork(req.body, (result)=>{
        res.json(result);
    })
}