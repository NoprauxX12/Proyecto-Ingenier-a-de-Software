

class Post{
    constructor(json){
        this.description= json.description;
        this.title= json.title;
        this.idClient= json.idClient;
    }
}

module.exports = Post;