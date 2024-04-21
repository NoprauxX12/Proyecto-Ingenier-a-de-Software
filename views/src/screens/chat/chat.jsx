import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";
import axios from "axios";
import { AuthContext } from "../../providers/userProvider";
import Alert from "../../includes/overlays/alert";


const Screenchat = ({ socket, username, mesgs }) => {
    const {userData} = useContext(AuthContext);
    const {idCard} = userData;
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;
    const [rooms, setRooms] = useState([]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } 

    const fetchMessages = async (roomId) => {
        const roomMessages = await mesgs(roomId);
        if (!roomMessages)
            setMessages([]);
        else
            setMessages(roomMessages.messages);
    }



    async function  handleChatClick(roomId){
        await fetchMessages(roomId);
        setSelectedRoom(roomId);
        console.log(`Abrir chat con ID: ${roomId}`);
        scrollToBottom();
    };

    const messageHandle = useCallback((data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom();
    }, []);

    useEffect(() => {
        const fetchRooms = () => {
            axios.get(`http://localhost:3001/rooms/${idCard}`)
                .then(response => setRooms(response.data.rooms))
                .catch(error => console.error('Error fetching rooms:', error));
        };

        if (rooms.length === 0) {

            fetchRooms();
        }else{
            console.log(rooms)
        }
        document.title="chat";
        setMessages(mesgs);
    }, [mesgs, idCard, rooms]);

    useEffect(() => {
        socket.on("recive_message", messageHandle);
        return () => socket.off("recive_message", messageHandle);
    }, [socket, messageHandle]);



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
                <SiderBar/>
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList rooms={rooms} username={username} handler={handleChatClick} />
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (
                        <Alert onClose={()=>{
                            setSelectedRoom(null);
                        }} message={"hello"}/>
                ) : (
                    <NotChosenChat/>
                )}
            </div>
        </div>
    );
};

export default Screenchat;
