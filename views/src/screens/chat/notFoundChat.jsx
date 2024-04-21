import React from 'react';

const NoChatsFoundScreen = () => {
  return (
    <div style={styles.container}>
      <p>No se encontraron tus chats :(</p>
      <div style={styles.sadFace}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  sadFace: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #6e42e9, #a45ee5)',
    borderRadius: '50%',
    border: '5px solid #ffffff',
    position: 'relative',
    marginBottom: '20px',
  },
};

export default NoChatsFoundScreen;