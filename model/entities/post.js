

class Post{
    constructor(json, img){
        this.description= json.description;
        this.title= json.title;
        this.idClient= json.idClient;
        this.img= img;
    }
}

module.exports = Post;