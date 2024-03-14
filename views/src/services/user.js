import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class UserData{
    static async signUp(formValues, cb){
        try {
            const response = await axios.post(BaseUrl+"/sign-up", formValues);
            cb(response.data);
        } catch (error) {
            cb({response: false});
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

    static async verifyForSigunUp(params, cb){
        try {
            const response = await axios.post(BaseUrl + "/user_exist", params);
            cb(response.data); 
        } catch (error) {
            cb({result: false});
        }
    }
}

export default UserData;