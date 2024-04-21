import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/userProvider";
import io from 'socket.io-client';
import Screenchat from "./chat";
import axios from 'axios';
import NoChatsFoundScreen from "./notFoundChat";

const socket = io.connect("http://localhost:3001");

function Chat() {
  const [userId, setUserId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (userData && userData.idCard) {
      setUserId(userData.idCard);
    }
  }, [userData]); // Ejecutar solo cuando userData cambie

  const fetchUserInfo = async () => {
    await axios.get(`http://localhost:3001/user/${userId}`)
      .then(response => setUsername(response.data.name))
      .catch(error => console.error('Error fetching username', error))
  };

  const fetchContactInfo = async (contactId) => {
    let contacInfo = null;
    try{
    const response = await axios.get(`http://localhost:3001/user/${contactId}`)
    contacInfo = response.data
    } catch(error){
      console.error("Error buscando datos de usuario", error)
    }
    return contacInfo;
  };

  const fetchRooms = () => {
    axios.get(`http://localhost:3001/rooms/${userId}`)
      .then(response => setRooms(response.data.rooms))
      .catch(error => console.error('Error fetching rooms:', error));
  };

  const joinRoom = () => {
    if (userId !== "") {
      // Verificar si la ID de usuario es válida
      axios.get(`http://localhost:3001/user/${userId}`)
        .then(response => {
          // Si la respuesta es exitosa, significa que la ID de usuario es válida
          setShowChat(true);
          fetchRooms(); // Fetch de las salas disponibles
          searchMessages(); // Fetch de los mensajes
          socket.emit("join_room");
        })
        .catch(error => {
          // Si hay un error en la respuesta, la ID de usuario no es válida
          console.error('Error fetching user info:', error);
          alert('La ID de usuario ingresada no es válida. Por favor, intenta nuevamente.');
        });
    }
  };

  const searchMessages = async (roomId) => {
    let _messages = null;
    try {
      const response = await axios.get(`http://localhost:3001/messages/${roomId}`);
      _messages = response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    return _messages;
  };

  useEffect(() => {
    joinRoom();
    if (userId !== "") {
      fetchUserInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Ejecutar cuando userId cambie

  return (
    <div style={{ overflow: 'hidden' }}>
      {!showChat ? (
        <NoChatsFoundScreen></NoChatsFoundScreen>
      ) : (
        <Screenchat socket={socket} username={username} rooms={rooms} mesgs={searchMessages} contact={fetchContactInfo} user={userId}></Screenchat>
      )}
    </div>
  );
}

export default Chat;
