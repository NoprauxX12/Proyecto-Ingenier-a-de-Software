// Alert.js
import React from 'react';
import "../../styles/overlays.css";


function Alert({ message, onClose }) {
  return (
    <div className="overlay">
      <div className="alert-box">
        <h2 style={{color:"black"}}>El Que Sabe</h2>
        <p>{message}</p>
        <button className="botn" id="button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Alert;
