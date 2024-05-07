const PostDAO= require("../model/data Acces/postDAO")
const Post= require("../model/entities/post")

exports.createPost = (req, res, next)=>{
    let link=null;
        try {
            link=req.file.path;
        } catch (error) {
            console.log(error);
        }
    console.log(req.body, link)
    const post = new Post(req.body, link);
    PostDAO.createPost(post, (result)=>{
        res.json(result);
    })
    
};

exports.fetchPost= (req, res)=>{
    if(req.body.search!==null){
        PostDAO.fetchByKeyword(req.body.city, req.body.search, (result)=>{
            res.json(result);
        })
    }else{
        PostDAO.fetchAll(req.body.city , (resp)=>{
            res.json(resp);
        });
    }
    
};