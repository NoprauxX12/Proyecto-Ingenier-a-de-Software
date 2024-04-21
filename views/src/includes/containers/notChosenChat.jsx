import React from 'react'

const NotChosenChat = () => {
  return (
    <>
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
    </>
  )
}

export default NotChosenChat;
