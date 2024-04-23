

class Review{
    constructor(json){
        this.idContract = json.idContract;
        this.clientScore = json.clientScore;
        this.clientComment = json.clientComment;
    }
}
module.exports = Review;