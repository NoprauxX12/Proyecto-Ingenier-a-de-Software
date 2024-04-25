import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/userProvider";
import io from 'socket.io-client';
import Chat from "./chat";
import axios from 'axios';
import NoChatsFoundScreen from "./notFoundChat";
import { useSocket } from "../../providers/socketProvider";


function ChatScreen() {
  const socket = useSocket();
  const [userId, setUserId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
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

  const joinRoom = () => {
    if (userId !== "") {
      // Verificar si la ID de usuario es válida
      console.log(userId)
      axios.get(`http://localhost:3001/user/${userId}`)
        .then(response => {
          // Si la respuesta es exitosa, significa que la ID de usuario es válida
          setShowChat(true);
          socket.emit("join_room");
        })
        .catch(error => {
          // Si hay un error en la respuesta, la ID de usuario no es válida
          console.error('Error fetching user info:', error);
          alert('La ID de usuario ingresada no es válida. Por favor, intenta nuevamente.');
        });
    }
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
        <Chat socket={socket} username={username} ></Chat>
      )}
    </div>
  );
}

export default ChatScreen;
