import React, { useRef, useEffect, useState, useCallback } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";

const Screenchat = ({ socket, username, rooms, mesgs, contactInfo, userId }) => {
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const messagesEndRef = useRef(null);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } 

    const messageHandle = useCallback((data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom();
    }, []);

    useEffect(() => {
        document.title="chat";
        setMessages(mesgs);
    }, [mesgs]);

    useEffect(() => {
        socket.on("recive_message", messageHandle);
        return () => socket.off("recive_message", messageHandle);
    }, [socket, messageHandle]);



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
                <SiderBar/>
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList rooms={rooms} username={username} mesgs={mesgs}/>
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (
                    <ChatContainer socket={socket} rooms={rooms} username={username} mesgs={mesgs} ></ChatContainer>
                ) : (
                    <NotChosenChat/>
                )}
            </div>
        </div>
    );
};

export default Screenchat;
