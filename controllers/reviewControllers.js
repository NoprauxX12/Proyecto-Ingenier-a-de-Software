const Review = require('../model/entities/review')
const ReviewDAO = require('../model/data Acces/reviewDAO')

exports.createRanking = (req, res, next)=>{
    const review = new Review(req.body)
    ReviewDAO.giveRanking(review, (result)=>{
        res.json(result)
    })
}

exports.averageRanking = (req, res, next)=>{
    ReviewDAO.averageRank((result)=>{
        res.json(result)
    })
}