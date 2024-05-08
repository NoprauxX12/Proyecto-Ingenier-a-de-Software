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

    static async createMessage(content, cb){
        try {
            const response = axios.post('http://localhost:3001/messages', content);
            console.log('Mensaje enviado correctamente:', response.data);
            cb({response})
        } catch (error) {
            cb(false)
            console.error('Error al enviar el mensaje:', error);
        }
    }


}

export default MessageData;