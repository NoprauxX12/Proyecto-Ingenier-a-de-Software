import React, { useEffect, useState, useContext } from "react";
import '@fontsource/comfortaa'
import SiderBar from "../../includes/navs/SiderBar";
import ChatList from "../../includes/containers/chatList";
import ChatContainer from "../../includes/containers/chatContainer";
import NotChosenChat from "../../includes/containers/notChosenChat";
import axios from "axios";
import EstimateData from "../../services/estimate";
import EstimateContainer from "../../includes/containers/stimateContainer";
import { AuthContext } from "../../providers/userProvider";

const Chat = ({ socket, username }) => {
    const {userData} = useContext(AuthContext);
    const [showchat, setShowChat]= useState(false);
    // eslint-disable-next-line no-unused-vars
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [estimates, setEstimates] = useState([]);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;

    function toggleChats(){ 
        setShowChat(!showchat);
    }
    
    const searchMessages = async (roomId) => {
        let _messages = null;
        console.log("Consulta principal")
        try {
          const response = await axios.get(`http://localhost:3001/messages/${roomId}`);
          _messages = response.data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
        return _messages;
      };
    

    async function  handleChatClick(roomId, user){
        if(userData.user!==user){
            await EstimateData.setState({state:2, id:roomId},(res)=>{
                console.log(res);
            })
        await setMessages(searchMessages(roomId));
        fetchestimates();
        setSelectedRoom(roomId);
        setShowChat(false);
        }
    }
    const fetchestimates = () => {
        EstimateData.getEstimates({id: userData.idCard, user: userData.user, name: userData.name}, (res)=>{
            setEstimates(res);
        })
    };

    useEffect(() => {
        const fetchestimates = () => {
            EstimateData.getEstimates({id: userData.idCard, user: userData.user, name: userData.name}, (res)=>{
                setEstimates(res);
            })
        };
        socket.on("recive_cotizacion", ()=>{
            fetchestimates();
        })
        socket.on("recive_message", ()=>{
            fetchestimates()
        })
        if (estimates.length === 0) { //poner cuidado con un ciclo inf
            fetchestimates();
        }else{
            console.log(estimates)
        }
        document.title="chat";
        setMessages(searchMessages(selectedRoom));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estimates, selectedRoom, userData]);


    return (
        <div style={{ display: 'flex', height: '100vh' }}>
                <SiderBar socket={socket}/>
            <div style={{ flex: '2.70', backgroundColor: '#white', position: 'relative' }}>
                <ChatList estimates={estimates} username={username} handler={handleChatClick}/>
            </div>
            <div style={{ flex: '9', height: '100%', overflowY: 'hidden' }}> {/* Columna principal */}
                {selectedRoom ? (<>
                    {showchat? (<>
                        <ChatContainer socket={socket} rooms={estimates} username={username} mesgs={searchMessages} selectedRoom={selectedRoom} />
                    </>): (<>
                        <EstimateContainer onOpen={fetchestimates} socket={socket} estimateId={selectedRoom} toggleChat={toggleChats} show={()=>{
                            setSelectedRoom(null);
                            fetchestimates(); 
                            }}/>
                    </>)}
                </> ) : (
                    <NotChosenChat/>
                )}
            </div>
        </div>
    );
};

export default Chat;
