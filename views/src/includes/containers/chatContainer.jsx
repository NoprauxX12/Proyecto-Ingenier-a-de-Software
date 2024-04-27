import React, {useState,useRef,useEffect,useCallback, useContext}  from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../providers/userProvider";

const ChatContainer = ( {socket, rooms, username, mesgs, selectedRoom} )=>{
    const {userData} = useContext(AuthContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [cameraAvailable, setCameraAvailable] = useState(true);
    const contact = rooms.find(room => room.id === selectedRoom);
    const messagesEndRef = useRef(null);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;
    username= userData.name;
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } 
    
    
    const fetchMessages = async (roomId) => {
        console.log("Consulta chatcontainer")
        const roomMessages = await mesgs(roomId);
        if (!roomMessages)
            setMessages([]);
        else
            setMessages(roomMessages.messages);
    }


    const sendMessage = () => {
        if (username && currentMessage) {
            const info = {
                content: currentMessage,
                autor: username,
                user: userData.user,
                id: userData.idCard,
                room_id: selectedRoom,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };

            socket.emit("send_message", info); // Emitir el mensaje al servidor    

            try {
                const response = axios.post('http://localhost:3001/messages', info);
                console.log('Mensaje enviado correctamente:', response.data);
                setMessages(prevMessages => [...prevMessages, info]);
                scrollToBottom();
                snd.play();
                snd.currentTime = 0;
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
            

            setCurrentMessage(""); // Limpiar el campo de mensaje
        }
        else {
            console.error('Usuario, mensaje o sala no seleccionados');
            console.log(username)
            console.log(currentMessage)
        }
    };

    const selectDocument = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = handleFileSelect;
        input.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            const result = e.target.result;
            sendImage(result);
        })  
        reader.readAsDataURL(file);
    }

    const sendImage = (file) => {
        if (username && file) {
            const info = {
                attachment: file,
                autor: username,
                room_id: selectedRoom,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };
            
            socket.emit("send_message", info); // Emitir el mensaje al servidor    

            console.log(info)

            try {
                const response = axios.post('http://localhost:3001/photo', info);
                console.log('Foto enviada correctamente:', response.data);
                fetchMessages(selectedRoom);
                scrollToBottom();
                snd.play();
                snd.currentTime = 0;
            } catch (error) {
                console.error('Error al enviar la foto', error);
            }
            

            setCurrentMessage(""); // Limpiar el campo de mensaje
        }
        else {
            alert("No se envio la foto")
        }
    };

    useEffect(() => {
        console.log("Consulta useefect")
        if (selectedRoom) {
            fetchMessages(selectedRoom);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoom]);

    const messageHandle = useCallback((data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom();
    }, []);

    useEffect(() => {
        socket.on("recive_message", messageHandle);
        return () => socket.off("recive_message", messageHandle);
    }, [socket, messageHandle]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    return(<>
<div>
            {contact && (<>
            
            <div style={{
            position: 'absolute',
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            height: '100%',
            maxWidth: '71.4%',
            width: '100%',
            }}>
            <div style={{position: 'absolute', top: '0',  width: '100%', maxWidth: '100', backgroundColor: '#FFF', padding: '1.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '999', float: "left" }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px', display: 'inline-block' }}>      
                {contact.profilePhoto ? (<>
                    <img src={`data:image/jpeg;base64,${contact.profilePhoto}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                </>):(<>
                    <img src="/images/defaultUser.png" alt="Not" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                            
                </>)}  
                    
                </div>
                    </div>
                            <div className="contentBox" style={{
                                margin: "0",
                                backgroundImage: "url('http://localhost:3000/images/fondo.jpg')"}}>
                                <div style={{marginBottom: '55px' }}>

                                    
                                    {messages.map((message, index) => {
                                        const isOwnMessage = username === message.autor;
                                        return (
                                            <div key={index} style={{
                                                textAlign: isOwnMessage ? 'right' : 'left',
                                                marginBottom: '1rem',
                                            }}>
                                                <div style={{ backgroundColor: isOwnMessage ? '#55ACEE' : '#777', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.9rem', maxWidth: '70%', marginLeft: isOwnMessage ? 'auto' : 'none', marginRight: isOwnMessage ? 'none' : 'auto', position: 'relative'}}>
                                                {message.content === null ? 
                                                        (   
                                                            (() => {

                                                                return <img src={message.attachment} alt="No se pudo cargar la imagen" style={{maxHeight: "150px"}} ></img>
                                                            })()
                                                        ) : 
                                                        message.content
                                                    }
                                                    <div style={{
                                                        position: 'absolute',
                                                        width: '0',
                                                        height: '0',
                                                        borderLeft: '10px solid transparent',
                                                        borderRight: '10px solid transparent',
                                                        borderTop: isOwnMessage ? '10px solid #55ACEE' : '10px solid #777',
                                                        bottom: isOwnMessage ? '-9.6px' : '-9.6px',
                                                        left: isOwnMessage ? 'auto' : '10px',
                                                        right: isOwnMessage ? '10px' : 'auto',
                                                        transform: isOwnMessage? 'rotate(-2deg)':'rotate(2deg)',
                                                    }} />
                                                    <p style={{ textAlign: isOwnMessage ? 'right' : 'left', color: 'white', marginTop: '0.5rem'}}><strong style={{color: "#fff"}}>{message.autor}</strong> a las <i><span style={{color: isOwnMessage? "#3D00B7": "#55ACEE¬"}}>{message.time}</span></i></p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef}></div>
                                    <div style={{
                                         position: 'fixed',
                                        bottom: '0.2rem',
                                        right: '0',
                                        width: '70%',
                                        maxWidth: '70%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems:'center',
                                        margin:'0.3rem',
                                    }}>
                                        <input
                                            style={{
                                                width: 'calc(100% - 4rem)', 
                                                padding: '0.2rem',
                                                border: 'none',
                                                outline: 'none',
                                                borderTopLeftRadius: '0.5rem',
                                                borderBottomLeftRadius: '0.5rem',
                                                height: '3rem',
                                            }}
                                            type="text"
                                            placeholder='Mensaje'
                                            value={currentMessage}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    sendMessage();
                                                }
                                            }}
                                            onChange={e => {
                                                setCurrentMessage(e.target.value);
                                                if (e.target.value === "") {
                                                    setCameraAvailable(true);
                                                } else {
                                                    setCameraAvailable(false);
                                                }
                                            }}
                                        />
                                        {!cameraAvailable && <button
                                            style={{ 
                                                padding: '0.2rem',
                                                borderTopRightRadius: '0.5rem',
                                                borderBottomRightRadius: '0.5rem',
                                                border: '0',
                                                backgroundColor: '#55ACEE',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                margin:'0',
                                                width:'3rem', 
                                                height:'3rem',
                                            }}
                                            onClick={sendMessage}
                                        >
                                            <FontAwesomeIcon icon={faPaperPlane} />
                            </button>}
                                        {cameraAvailable && <button
                                            style={{ 
                                                padding: '0.2rem',
                                                borderTopRightRadius: '0.5rem',
                                                borderBottomRightRadius: '0.5rem',
                                                border: '0',
                                                backgroundColor: '#55ACEE',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                margin:'0',
                                                width:'3rem', 
                                                height:'3rem',
                                            }}
                                            onClick={selectDocument}
                                        >
                                            <FontAwesomeIcon icon={faCamera} />
                            </button>}
                        </div>
                    </div>
                </div>
            </div>                      

            </>)}
        </div>
    </>);
}

export default ChatContainer;