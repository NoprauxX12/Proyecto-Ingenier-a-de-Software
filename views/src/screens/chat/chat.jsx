import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Screenchat from "./screenchat";
import { FormField, Button, Form, Input, CardContent, Card, Icon } from 'semantic-ui-react';
import axios from 'axios';

const socket = io.connect("http://localhost:3001");

function Chat() {
  const [userId, setUserId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);

  const fetchUserInfo = async() => {
    console.log("entro a fetchuserinfo")
    await axios.get(`http://localhost:3001/user/${userId}`)
      .then(response=>setUsername(response.data.name))
      .catch(error => console.error('Error fetching username', error))
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
  
  useEffect (() => {
    if(userId !== ""){
      fetchUserInfo()
    }
  })

  return (
    <div style={{overflow:'hidden'}}>
      {!showChat ? (
        <Card className="w-full max-w-lg mx-auto my-8">
          <CardContent className="bg-gray-200 p-4">
            <h2 className="text-xl mb-4">Join Chat</h2>
            <Form>
              <FormField className="mb-4">
                <label className="block mb-2">User ID</label>
                <Input 
                  type='text' 
                  placeholder='User ID:' 
                  onChange={e => setUserId(e.target.value)}
                  className="w-full py-2 px-4 rounded bg-white border border-gray-300 focus:outline-none focus:border-teal-500"
                />
              </FormField>
              <Button className="py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded shadow" onClick={joinRoom}>
                Join
              </Button>
            </Form>
          </CardContent>
          <CardContent extra className="bg-gray-300 py-2 px-4 flex items-center justify-between">
            <span className="flex items-center">
              <Icon name='user' />
            </span>
          </CardContent>
        </Card>
      ) : (
        <Screenchat socket={socket} username={username} rooms={rooms} mesgs={searchMessages} usId = {userId} ></Screenchat>
      )}
    </div>
  );
}  

export default Chat;

// recuerdas que mandamos era la funcion? szs, creo que la podemo usar alla, hagamos eso