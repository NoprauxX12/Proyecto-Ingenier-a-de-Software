import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, List } from 'semantic-ui-react'
import { CardContent, Card, Icon, FormField, Form, Input, MessageHeader, Message } from 'semantic-ui-react'

const Screenchat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([
        { id: 1, name: "Chat 1" },
        { id: 2, name: "Chat 2" },
        { id: 3, name: "Chat 3" },
    ]);
    const [usersOnline, setUsersOnline] = useState(0);

    const handleChatClick = (chatId) => {
        // Aquí puedes definir la lógica para abrir el chat correspondiente
        console.log(`Abrir chat con ID: ${chatId}`);
    };

    const sendMessage = () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };

            socket.emit("send_message", info); // Emitir el mensaje al servidor
            setCurrentMessage(""); // Limpiar el campo de entrada después de enviar el mensaje

            setMessages(prevMessages => [...prevMessages, info]);
        }
    };

    useEffect(() => {
        const messageHandle = (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        }
        socket.on("recive_message", messageHandle );

        return () => socket.off("recive_message", messageHandle )
    }, [socket]);

    useEffect(() => {
        socket.on("users_changed", (numUsers) => {
            setUsersOnline(numUsers); // Actualiza el estado con el nuevo número de usuarios
        });
    
        return () => {
            socket.off("users_changed");
        };
    }, [socket]);
    

    return (
        <Container>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {/* Espacio para los chats del usuario */}
                        <List selection verticalAlign='middle'>
                            {chats.map(chat => (
                                <List.Item key={chat.id} onClick={() => handleChatClick(chat.id)}>
                                    <List.Content>
                                        <List.Header>{chat.name}</List.Header>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Card fluid>
                            <CardContent header={`Chat | Sala: ${room}`} />
                            <CardContent style={{maxHeight: "400px", overflowY: "auto"}}>
                                {/* Espacio para los mensajes recibidos */}
                                {messages.map((message, index) => {
                                    const isOwnMessage = username === message.author;
                                    return( 
                                        <span key={index}>
                                            <Message 
                                                style={{textAlign: isOwnMessage ? 'right' : 'left', 
                                                backgroundColor: isOwnMessage ? 'rgba(128, 90, 213, 0.8)' : 'rgba(51, 176, 247, 0.8)',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Agrega sombra
                                                maxWidth: '70%', // Ajusta el ancho máximo del mensaje
                                                marginLeft: isOwnMessage ? 'auto' : 'none', 
                                                marginRight: isOwnMessage ? 'none' : 'auto',
                                                borderRadius: '0.9rem', 
                                                }}
                                                >
                                                <div style={{
                                                    position: 'absolute',
                                                    width: '0',
                                                    height: '0',
                                                    borderLeft: '10px solid transparent',
                                                    borderRight: '10px solid transparent',
                                                    borderTop: isOwnMessage ? '10px solid rgba(128, 90, 213, 0.8)' : '10px solid rgba(51, 176, 247, 0.8)',
                                                    bottom: isOwnMessage ? '-10px' : '-10px',
                                                    top: isOwnMessage ? 'auto' : 'auto',
                                                    left: isOwnMessage ? 'auto' : '10px',
                                                    right: isOwnMessage ? '10px' : 'auto',
                                                }} />
                                                <MessageHeader style={{color: '#ffffff'}}>{message.message}</MessageHeader>
                                                <p style={{color: '#ffffff'}}>Enviado por: <strong> {message.author} </strong> a las <i><strong>{message.time}</strong></i></p>
                                            </Message>
                                            <Divider hidden></Divider>
                                        </span>                         
                                    );
                                })}
                            </CardContent>
                            <CardContent extra>
                                <Form>
                                    <FormField>
                                        <Input
                                            action={{
                                                color: 'teal',
                                                labelPosition: 'right',
                                                icon: 'send',
                                                content: 'Enviar',
                                                onClick: sendMessage,
                                            }}
                                            type="text" 
                                            placeholder='Mensaje' 
                                            value={currentMessage} 
                                            onChange={e => setCurrentMessage(e.target.value)}
                                        />
                                    </FormField>
                                </Form>
                                <Icon name='user' />{usersOnline} En linea
                            </CardContent>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Screenchat;
