const mysqlExecute = require("../../util/mysqlConnexion");

class RecoveryDAO {
    static async insertRecoveryToken(user, email, token, dateTime, cb) {
        let sql = "INSERT INTO recovery_tokens (user, email, token, dateTime) VALUES (?, ?, ?, ?)";
        try {
            await mysqlExecute(sql, [user, email, token, dateTime]);
            cb(null, "Datos del token de recuperación insertados correctamente en la tabla.");
        } catch (error) {
            console.error('Error al insertar los datos del token de recuperación en la tabla:', error);
            cb(error, null);
        }
    }

    static async getTokenInfoByToken(token, cb) {
        let sql = "SELECT * FROM recovery_tokens WHERE token = ?";
        console.log(token)
        try {
            const result = await mysqlExecute(sql, [token.token]);
            console.log(result)
            cb(result); // Suponiendo que solo esperas un resultado
        } catch (error) {
            console.error('Error al obtener la información del token:', error);
            cb({result: false})
        }
    }
}

module.exports = RecoveryDAO;
