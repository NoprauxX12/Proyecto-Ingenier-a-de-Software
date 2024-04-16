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

    static async fetchFreelancerById(id, cb){
        try {
            const  response = await axios.post( "http://localhost:3200/getFreelancerInfo", {id: id});
            console.log(response.data);
            cb(response.data);
        } catch (error) {
            cb({response: false});
        }
    }
    static async logIn(json, cb){
        try{
            const response = await axios.post(`${BaseUrl}/log-in`, json);
            cb(response.data);    
              
        }catch (error){
            cb({response: false});
        }
    }

    static async fetchProfilePhoto(json, cb){
        try{
            const response = await axios.post(`${BaseUrl}/profile-photo`, json);
            cb(response.data);    
        }catch (error){
            cb({response: false});
        }
    }

}

export default UserData;