import { BaseUrl } from "../util/apiUrl";
import axios from "axios";

  class TownData {
    static async fetchCityes(cb) {
      try {
        const response = await axios.post(BaseUrl + "/towns");
        cb(response.data); // Aquí pasas solo response.data en lugar de response
      } catch (error) {
        cb({}); // Si hay un error, puedes manejarlo pasando un objeto vacío
      }
    }
  }
  
  export default TownData;
  