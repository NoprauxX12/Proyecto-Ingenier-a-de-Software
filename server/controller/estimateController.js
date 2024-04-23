const { fetchAllEstimates , createEstimate, getById, setState } = require("../model/estimateDAO");

exports.getUserEstimates = (req, res) => {
    const {id, user} = req.body;
    console.log(req.body);
    // Consulta a la base de datos para obtener las salas asociadas al usuario con el ID proporcionado
    fetchAllEstimates(id , user, (result) => {
        console.log(result);
        const { error } = result;
        if (error === 404) {
            res.status(404).send('No se encontraron salas asociadas al usuario');
            return;
        } else if(error === 500){
            res.status(500).send('Error al obtener las salas asociadas al usuario');
            return;
        } else {
            res.json(result);
            return;
        }
    });
};

exports.creatEstimate = (req, res, next)=>{
    let link=null;
        try {
            link=req.file.path;
        } catch (error) {
            console.log(error+"\n en el arhivo estimateController");
        }
    req.body["photo"]=link;
    createEstimate(req.body, (response)=>{
        res.json(response);
    })
}

exports.getEstimateById=(req,res)=>{
    getById(req.body, (response)=>{
        res.json(response)
    })
}

exports.setStateStimate=(req, res)=>{
    const {state, id,cost}= req.body;
    setState(state, id,cost, (response)=>{
        res.json(response);
    })
}