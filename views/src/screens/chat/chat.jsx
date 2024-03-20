import { useState } from "react";
import io from 'socket.io-client';
import Screenchat from "./screenchat";
import { Container} from 'semantic-ui-react'
import { CardContent, Card, Icon } from 'semantic-ui-react'
import { FormField, Button, Form, Input } from 'semantic-ui-react'

const socket = io.connect("http://localhost:3001")

function Chat() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] =useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      console.log("Ingresado " + username + " a la sala: " + room)
      setShowChat(true)
    }
  };

  return (
    <Container className="mx-auto">
      {!showChat ? (
        <Card className="w-full max-w-lg mx-auto my-8">
          <CardContent className="bg-gray-200 p-4">
            <h2 className="text-xl mb-4">Unirme al chat</h2>
            <Form>
              <FormField className="mb-4">
                <label className="block mb-2">Usuario</label>
                <Input 
                  type='text' 
                  placeholder='Usuario:' 
                  onChange={e => setUsername(e.target.value)}
                  className="w-full py-2 px-4 rounded bg-white border border-gray-300 focus:outline-none focus:border-teal-500"
                />
              </FormField>
              <FormField className="mb-4">
                <label className="block mb-2">Sala</label>
                <Input 
                  type='text' 
                  placeholder='ID Sala:' 
                  onChange={e => setRoom(e.target.value)}
                  className="w-full py-2 px-4 rounded bg-white border border-gray-300 focus:outline-none focus:border-teal-500"
                />
              </FormField>
              <Button onClick={joinRoom} className="py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded shadow">
                Unirme
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
        <Screenchat socket={socket} username={username} room={room}></Screenchat>
      )}
    </Container>
  );
}  

export default Chat
