exports.homeCOntroller = (req, res, next) =>{
    console.log(req.session.user);
    if(req.session.user){
        res.redirect("/cosa")
    }else{
        res.render("index", {
            pageTitle: "Home"
        });
    }
    
}