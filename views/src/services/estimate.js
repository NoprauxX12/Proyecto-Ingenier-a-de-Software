import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class EstimateData{

    static async Create(form, cb){
        try {
            const res= await axios.post(BaseUrl.chatsserver+"/create-estimate", form);
            cb(res.data);
        } catch (error) {
            cb("error");
        }
    }
    static async getEstimates(data, cb){
        const res= await axios.post(`${BaseUrl.chatsserver}/rooms`, data);
        cb(res.data.estimate);
    }

    static async getEstimateById(data, cb){
        const res= await axios.post(`${BaseUrl.chatsserver}/estimate-by-id`, data);
        cb(res.data);
    }

    static async setState(json, cb){
        const res= await axios.post(`${BaseUrl.chatsserver}/set-estimate-state`, json);
        cb(res.data);
    }
}


export default EstimateData;