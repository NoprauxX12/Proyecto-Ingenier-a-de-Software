import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

class MessageData{
    static async onView(data, cb){
        try {
            const res= await axios.post(`${BaseUrl.chatsserver}/viewMessage`, data);
            cb(res.data);
        } catch (error) {
            cb(`error`);
        }
    }

    static async getNotifications(data, cb){
        try {
            const res= await axios.post(`${BaseUrl.chatsserver}/notificatios-user`, data);
            cb(res.data);
        } catch (error) {
            cb(`error`);
        }
    }

    static async createMessage(content, cb){
        try {
            const response = axios.post(`${BaseUrl.chatsserver}/messages`, content);
            console.log('Mensaje enviado correctamente:', response.data);
            cb({response})
        } catch (error) {
            cb(false)
            console.error('Error al enviar el mensaje:', error);
        }
    }

    static async getMessages(roomId, cb){
        try {
            const response = await axios.get(`${BaseUrl.chatsserver}/messages/${roomId}`);
            cb(response.data);
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
    }

    

}

export default MessageData;