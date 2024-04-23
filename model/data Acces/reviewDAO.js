const mysqlExecute = require("../../util/mysqlConnexion");

class ReviewDAO {
    static async giveRanking(rank, cb){
        values =[
            rank.idContract,
            rank.clientScore,
            rank.clientComment
        ];

        let sql = "INSERT INTO review(idContract, clientScore, clientComment) VALUES (?,?,?)";
        try{
            mysqlExecute(sql, values);
            cb({result: true});
        } catch(error){
            cb({result:false})
        }
    }

    static async averageRank(cb){
        let sql = "SELECT AVG(clientScore) AS Promedio_Ranking FROM review";
        try{
            mysqlExecute(sql);
            cb({result: true});
        }catch(error){
            cb({result:false})
        }
    }
}

module.exports = ReviewDAO;