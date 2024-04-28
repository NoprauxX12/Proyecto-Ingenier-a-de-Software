import axios from "axios";


class MessageData{
    static async onView(data, cb){
        try {
            const res= await axios.post(`http://localhost:3001/viewMessage`, data);
            cb(res.data);
        } catch (error) {
            cb("error");
        }
    }

    static async getNotifications(data, cb){
        try {
            const res= await axios.post(`http://localhost:3001/notificatios-user`, data);
            cb(res.data);
        } catch (error) {
            cb("error");
        }
    }
}

export default MessageData;