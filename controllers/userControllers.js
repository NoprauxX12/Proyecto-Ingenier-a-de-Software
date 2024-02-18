

exports.Login= (req, res, next)=>{
     
    res.render("login", {
        pageTitle: "log in"
    })
}

exports.getSignUp =(req, res, next)=>{
    
    res.render("sign-up/sign-up", {
        pageTitle: "sign up",
        error: false
    })
}


exports.postSignUp =(req, res, next)=>{
    //TODO: realizar las validaciones necesarias
    const user=req.body.user;
    if(user==="0"){
        res.render("sign-up/sign-up", {
            pageTitle: "sign up",
            error: "el tipo de usuario es requerido"
        })
    }else if(user==="1"){
        res.render("sign-up/freelancers", {
            pageTitle: "Freelancers"
        });
    }else if(user === "2"){
        res.render("sign-up/clients",  {
            pageTitle: "Clients"
        });
    }
}
   
