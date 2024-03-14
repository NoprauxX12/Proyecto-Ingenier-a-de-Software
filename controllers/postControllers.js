const PostDAO= require("../model/data Acces/postDAO")
const Post= require("../model/entities/post")

exports.createPost = (req, res, next)=>{
    const post = new Post(req.body);
    PostDAO.createPost(post, (result)=>{
        res.json(result);
    })
    
};
