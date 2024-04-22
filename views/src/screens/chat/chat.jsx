import React, { useEffect, useState, useContext } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";
import axios from "axios";
import EstimateData from "../../services/estimate";
import { AuthContext } from "../../providers/userProvider";

const Chat = ({ socket, username }) => {
    const {userData} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [estimates, setEstimates] = useState([]);
    

    const searchMessages = async (roomId) => {
        let _messages = null;
        console.log("Consulta principal")
        try {
          const response = await axios.get(`http://localhost:3001/messages/${roomId}`);
          _messages = response.data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
        return _messages;
      };

    async function  handleChatClick(roomId){
        await setMessages(searchMessages(roomId));
        setSelectedRoom(roomId);
        console.log(`Abrir chat con ID: ${roomId}`);
    }

    useEffect(() => {
        const fetchestimates = () => {
            EstimateData.getEstimates(userData.user, userData.idCard, (res)=>{
                setEstimates(res);
            })
        };

        if (estimates.length === 0) { //poner cuidado con un ciclo inf
            fetchestimates();
        }else{
            console.log(estimates)
        }
        document.title="chat";
        setMessages(searchMessages(selectedRoom));
    }, [estimates, selectedRoom, userData]);



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
                <SiderBar/>
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList estimates={estimates} username={username} handler={handleChatClick} />
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (
                    <ChatContainer socket={socket} estimates={estimates} username={username} mesgs={searchMessages} selectedRoom={selectedRoom} />
                ) : (
                    <NotChosenChat/>
                )}
            </div>
        </div>
    );
};

export default Chat;
