import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class PostData{
    static async createPost(json, cb){
        try {
            let response= await axios.post(BaseUrl+"/create-post", json);
            cb(response.data);
        } catch (error) {
            cb({result: false});
        }
        
    }

    static async getPost(city, search, cb){
        try {
            let response= await axios.post(BaseUrl+"/get-posts", {city:city, search: search});
            cb(response.data);
        } catch (error) {
            cb({result: false});
        }
    }
}

 export default PostData;