import React, { useEffect, useState, useContext } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";
import axios from "axios";
import { AuthContext } from "../../providers/userProvider";

const Screenchat = ({ socket, username }) => {
    const { userData } = useContext(AuthContext);
    const { idCard } = userData;
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [contactInfo, setContactInfo] = useState({});

    const searchMessages = async (roomId) => {
        try {
            const response = await axios.get(`http://localhost:3001/messages/${roomId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchRooms = () => {
            axios.get(`http://localhost:3001/rooms/${idCard}`)
                .then(response => setRooms(response.data.rooms))
                .catch(error => console.error('Error fetching rooms:', error));
        };

        if (rooms.length === 0) {
            fetchRooms();
        } else {
            console.log(rooms);
        }
        document.title = "chat";
        setMessages(searchMessages(selectedRoom));
    }, [idCard, rooms]);

    useEffect(() => {
        const loadContactInfo = () => {
            const contactInfoObj = {};
            for (const room of rooms) {
                const contactId = room.client_id === idCard ? room.freelancer_id : room.client_id;
                try {
                    const response = axios.get(`http://localhost:3001/user/${contactId}`);
                    contactInfoObj[room.id] = response.data;
                    
                    console.log(contactInfoObj[room.id])
                } catch (error) {
                    console.error("Error fetching contact info:", error);
                }
            }
            setContactInfo(contactInfoObj);
        };

        if (rooms.length > 0) {
            loadContactInfo();
        }
    }, [idCard, rooms]);

    const handleChatClick = async (roomId) => {
        await setMessages(searchMessages(roomId));
        setSelectedRoom(roomId);
        console.log(`Abrir chat con ID: ${roomId}`);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SiderBar />
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList rooms={rooms} username={username} handler={handleChatClick} contactInfo={contactInfo} />
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}>
                {selectedRoom ? (
                    <ChatContainer socket={socket} rooms={rooms} username={username} mesgs={searchMessages} selectedRoom={selectedRoom} />
                ) : (
                    <NotChosenChat />
                )}
            </div>
        </div>
    );
};

export default Screenchat;