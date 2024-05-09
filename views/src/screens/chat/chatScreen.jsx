import React, { useContext} from "react";
import { AuthContext } from "../../providers/userProvider";
import Chat from "./chat";
import NoChatsFoundScreen from "./notFoundChat";
import { useSocket } from "../../providers/socketProvider";


function ChatScreen() {
  const socket = useSocket(); 
  const { userData } = useContext(AuthContext);
  return (
    <div style={{ overflow: 'hidden' }}>
      {userData===null ? (
        <NoChatsFoundScreen></NoChatsFoundScreen>
      ) : (
        <Chat socket={socket} username={userData.name} ></Chat>
      )}
    </div>
  );
}

export default ChatScreen;
