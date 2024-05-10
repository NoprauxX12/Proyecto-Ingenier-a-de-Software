import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class AdminData {

    static async logInAdmin(json, cb){
        try{
            console.log("admin")
            const response = await axios.post(`${BaseUrl}/adm-log-in`, json);
            cb(response.data);    
              
        }catch (error){
            cb({response: false});
        }
    }

    static async AdminSignUp(params, cb) {
        try {
          const response = await axios.post(BaseUrl + "/adm-sign-up", params);
          cb(response.data);
        } catch (error) {
          cb({ result: false });
        }
      }

}

export default AdminData;