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

    static async selectReviews(id,cb){
        let sql = "SELECT r.clientComment, r.clientScore FROM review r INNER JOIN contract c ON r.idContract = c.idContract INNER JOIN estimate e ON c.estimate_estimateId = e.estimateId INNER JOIN freelancer f ON e.idFreelancer = f.idFreelancer WHERE f.idFreelancer = ?";   
        try{
            const rows = await mysqlExecute(sql, [id]);
            cb({result: true, data: rows});
        }catch(error){
            console.error("Error al ejecutar la consulta:", error);
            cb({result: false});
        }
    }
}

module.exports=ReviewDAO;