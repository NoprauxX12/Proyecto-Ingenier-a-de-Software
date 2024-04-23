import axios from "axios";
import { BaseUrl } from "../util/apiUrl";


class ReviewData{
        static async createReview(json, cb){
            try{
                let result = await axios.post(BaseUrl+"/create-review", json);
                cb({result: true});
            }catch(error){
                cb({result: false});
            }
        }

        static async averageRank(json, cb){
            try{
                let response = await axios.post(BaseUrl+"/average-rank", json);
                cb({response: true});
            }catch(error){
                cb({response:false});
            }
        }
}


export default ReviewData;