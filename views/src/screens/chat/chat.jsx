import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";
import axios from "axios";
import { AuthContext } from "../../providers/userProvider";

const Screenchat = ({ socket, username, }) => {
    const {userData} = useContext(AuthContext);
    const {idCard} = userData;
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    

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
        const fetchRooms = () => {
            axios.get(`http://localhost:3001/rooms/${idCard}`)
                .then(response => setRooms(response.data.rooms))
                .catch(error => console.error('Error fetching rooms:', error));
        };

        if (rooms.length === 0) { //poner cuidado con un ciclo inf
            fetchRooms();
        }else{
            console.log(rooms)
        }
        document.title="chat";
        setMessages(searchMessages(selectedRoom));
    }, [idCard, rooms]);



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
                <SiderBar/>
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList rooms={rooms} username={username} handler={handleChatClick} />
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (
                    <ChatContainer socket={socket} rooms={rooms} username={username} mesgs={searchMessages} selectedRoom={selectedRoom} />
                ) : (
                    <NotChosenChat/>
                )}
            </div>
        </div>
    );
};

export default Screenchat;
