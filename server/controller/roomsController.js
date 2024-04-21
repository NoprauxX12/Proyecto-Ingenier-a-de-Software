const {getUserRommsById} = require("../model/roomDAO")

exports.getUserRomms= (req, res) => {
    const userId = req.params.userId;
    // Consulta a la base de datos para obtener las salas asociadas al usuario con el ID proporcionado
    getUserRommsById(userId, (result)=>{
        const {error}= result;
        if(error){
            if(error==404){
                res.status(404).send('No se encontraron salas asociadas al usuario');
            }else{
                res.status(500).send('Error al obtener las salas asociadas al usuario');
            }
        }else{
            res.json(result)
        }
    })
  }