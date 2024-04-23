import React from 'react'

const NotChosenChat = () => {
  return (
    <>
      <div style={{
        position: 'relative',
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundColor: "#EEEEEE",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        }}>
        <div style={{ textAlign: 'center' , background:" radial-gradient(circle, rgba(85, 172, 238, 0.8), rgba(255, 255, 255, 0.8))", padding: "3em", borderRadius: "100%"}}>
            <h1 style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '9rem', color: '#B9B7B7' , margin: "0"}}><i className="bx bxl-mailchimp" style={{color: '#ffffff'}} /></h1>
            <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '1.5rem', color: '#fff', fontWeight: "bold" }}>Buzon de cotizaciones</p>
        </div>
      </div>
    </>
  )
}

export default NotChosenChat;
