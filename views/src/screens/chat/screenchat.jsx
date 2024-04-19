import axios from "axios";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faCamera } from '@fortawesome/free-solid-svg-icons';
import {Buffer} from 'buffer'
import '@fontsource/comfortaa'

const Screenchat = ({ socket, username, rooms, mesgs, usId }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [usersOnline, setUsersOnline] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [cameraAvailable, setCameraAvailable] = useState(true);
    const contact = rooms.find(room => room.id === selectedRoom)
    const messagesEndRef = useRef(null);
    let photo = 'http://localhost:3000/images/profiledf.png';
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleChatClick = async (roomId) => {
        await fetchMessages(roomId);
        setSelectedRoom(roomId);
        console.log(`Abrir chat con ID: ${roomId}`);
        scrollToBottom();
    };

    const fetchMessages = async (roomId) => {
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
                author: username,
                room_id: selectedRoom,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };

            socket.emit("send_message", info); // Emitir el mensaje al servidor    

            axios.post('http://localhost:3001/messages', info)
                .then(response => {
                    console.log('Mensaje enviado correctamente:', response.data);
                    setMessages(prevMessages => [...prevMessages, info]);
                    scrollToBottom();
                    snd.play();
                    snd.currentTime = 0;
                })
                .catch(error => {
                    console.error('Error al enviar el mensaje:', error);
                });

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
            sendImage(result)
        })  
        reader.readAsDataURL(file);
    }

    const sendImage = (file) => {
        if (username && file) {
            const info = {
                attachment: file,
                author: username,
                room_id: selectedRoom,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };
            
            // Si se ven cuando los cargas pero no cuando se envian, donde es la logica de enviar los mensajes?
            socket.emit("send_message", info); // Emitir el mensaje al servidor    

            console.log(info)

            axios.post('http://localhost:3001/photo', info)
                .then(response => {
                    console.log('Foto enviada correctamente:', response.data);
                    fetchMessages(selectedRoom);
                    //setMessages(prevMessages => [...prevMessages, info]);
                    scrollToBottom();
                    snd.play();
                    snd.currentTime = 0;
                })
                .catch(error => {
                    console.error('Error al enviar la foto', error);
                });

            setCurrentMessage(""); // Limpiar el campo de mensaje
        }
        else {
            alert("No se envio la foto")
        }
    };

    const messageHandle = useCallback((data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom();
    }, []);

    useEffect(() => {
        setMessages(mesgs);
    }, [mesgs]);

    useEffect(() => {
        socket.on("recive_message", messageHandle);
        return () => socket.off("recive_message", messageHandle);
    }, [socket, messageHandle]);

    useEffect(() => {
        socket.on("users_changed", (numUsers) => {
            setUsersOnline(numUsers); // Actualiza el estado con el nuevo número de usuarios
        });

        return () => {
            socket.off("users_changed");
        };
    }, [socket]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: '0.6', backgroundColor: '#805ad5' }}> 
            </div>
            <div style={{ flex: '3', backgroundColor: '#white', position: 'relative' }}>
                <div style={{ padding: '0.23rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: '0', fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Chats</h2>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', margin:'0' }}>
                        <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '1.8rem', color: '#333' }} />
                    </button>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '2px', backgroundColor: 'black' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
                    {rooms.map(room => (
                        <div key={room.id} onClick={() => handleChatClick(room.id)} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'lightgray' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                    <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold' }}>{room.name_client === username ? room.name_freelancer : room.name_client}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (
                    <div>
                        <div style={{ position: 'absolute', top: '0', right: '0', width: '71.4%', maxWidth: '71.4%', backgroundColor: '#ffffff', padding: '1.16rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '999' }}>
                            <div style={{ width: '40px', height: '31.55px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px', display: 'inline-block' }}>
                                <img src={'http://localhost:3000/images/profiledf.png'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', marginRight: 'auto' }}>
                                {contact.name_client === username ? contact.name_freelancer : contact.name_client}
                            </span>
                        </div>
                        <div style={{position: 'absolute', height:'100%', overflow:'hidden'}}>
                            <div style={{
                                 backgroundImage: "url('http://localhost:3000/images/borrosa.jpg')",
                                 backgroundSize: 'cover',
                                 height: 'calc(100vh)',
                                 overflowY: 'scroll',
                                 WebkitOverflowScrolling: 'touch',
                                 msOverflowStyle: 'none', 
                                 scrollbarWidth: 'none', 
                                 boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                                 borderRadius: '0.5rem',
                                 padding: '1rem',
                                 paddingRight: '17px', 
                                 boxSizing: 'content-box' 
                            }}>
                                <div style={{ marginTop: '100px', marginBottom: '55px' }}>
                                    
                                    {messages.map((message, index) => {
                                        const isOwnMessage = username === message.author;
                                        return (
                                            <div key={index} style={{
                                                textAlign: isOwnMessage ? 'right' : 'left',
                                                marginBottom: '1rem',
                                            }}>
                                                <div style={{ backgroundColor: isOwnMessage ? '#3D00B7' : '#EE35A4', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.9rem', maxWidth: '70%', marginLeft: isOwnMessage ? 'auto' : 'none', marginRight: isOwnMessage ? 'none' : 'auto', position: 'relative' }}>
                                                {message.content === null ? 
                                                        (   
                                                            (() => {
                                                                console.log("aaa");
                                                                return <img src={message.attachment}></img>
                                                            })() // puede ser tambien
                                                        ) : 
                                                        message.content
                                                    }
                                                    <div style={{
                                                        position: 'absolute',
                                                        width: '0',
                                                        height: '0',
                                                        borderLeft: '10px solid transparent',
                                                        borderRight: '10px solid transparent',
                                                        borderTop: isOwnMessage ? '10px solid #3D00B7' : '10px solid #EE35A4',
                                                        bottom: isOwnMessage ? '-9.6px' : '-9.6px',
                                                        left: isOwnMessage ? 'auto' : '10px',
                                                        right: isOwnMessage ? '10px' : 'auto',
                                                        transform: isOwnMessage? 'rotate(-2deg)':'rotate(2deg)',
                                                    }} />
                                                    <p style={{ textAlign: isOwnMessage ? 'right' : 'left', color: 'white', marginTop: '0.5rem' }}>Enviado por: <strong>{message.author}</strong> a las <i><strong>{message.time}</strong></i></p>
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
                                                backgroundColor: '#3D00B7',
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
                                                backgroundColor: '#3D00B7',
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
                    </div>
                ) : (
                    <div style={{
                        position: 'relative',
                        backgroundImage: "url('http://localhost:3000/images/clara.png')",
                        backgroundSize: 'cover',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '3rem', color: '#333' }}>Este es tu Buzón de Mensajes</h1>
                            <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '1.5rem', color: '#555' }}>Selecciona un chat para hablar</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Screenchat;
