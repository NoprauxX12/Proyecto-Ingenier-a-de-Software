// ChatList.js
import React from 'react';
import { List } from 'semantic-ui-react';

const ChatList = ({ chats, handleChatClick }) => {
  return (
    <List selection verticalAlign='middle'>
      {chats.map(chat => (
        <List.Item key={chat.id} onClick={() => handleChatClick(chat.id)}>
          <List.Content>
            <List.Header>{chat.name}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ChatList;
