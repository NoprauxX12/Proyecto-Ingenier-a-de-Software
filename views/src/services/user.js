import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class userData{
    static async signUp(formValues, cb){
        try {
            const response = await axios.post(BaseUrl+"/sign-up", formValues);
            cb(response);
        } catch (error) {
            cb(false);
        }
        
    }

    static async fetchFreelancers(params, cb){
        try {
            const response = await axios.post(BaseUrl + "/getFreelancers", params);
            cb(response.data);
          } catch (error) {
            console.error("Error al obtener freelancers:", error);
          }
    }
}

export default userData;