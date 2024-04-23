import axios from "axios";

class EstimateData{
    constructor(){
        this.base="http://localhost:3001";
    }

    static async Create(form, cb){
        try {
            const res= await axios.post("http://localhost:3001/create-estimate", form);
            cb(res.data);
        } catch (error) {
            cb("error");
        }
    
    }
    static async getEstimates(user, idCard, cb){
        const res= await axios.post(`http://localhost:3001/rooms`, {id: idCard, user: user})
        cb(res.data.estimate);
    }

    static async getEstimateById(idestimate, cb){
        const res= await axios.post(`http://localhost:3001/estimate-by-id`, {estimateId:idestimate});
        cb(res.data);
    }

    static async setState(json, cb){
        const res= await axios.post(`http://localhost:3001/set-estimate-state`, json);
        cb(res.data);
    }
}


export default EstimateData;