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
                let result = await axios.post(BaseUrl+"/average-rank", json);
                cb({result: true});
            }catch(error){
                cb({result:false});
            }
        }

        static async selectedReviews(json, cb){
            try{
                console.log("id",json)
                let result = await axios.post(BaseUrl+ "/select-reviews", json)
                cb(result.data);
            }catch(error){
                console.log(error)
                cb({result: false});
            }
        }
}


export default ReviewData;