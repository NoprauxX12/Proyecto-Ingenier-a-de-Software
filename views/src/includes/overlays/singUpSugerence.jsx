import React from "react";
import "../../styles/overlays.css"
import Urls from "../../util/urls";

function SignUpAlert({onClose}){

    return(
    <div className="overlay">
      <div className="alert-box">
        <h2 style={{color:"black"}}>El Que Sabe</h2>
        <p>Para tener acceso a algunas de nuestras funcionalidades registrate, es gratis! :)</p>
        <button className="botn" id="button" onClick={onClose}>Cerrar</button>
        <a href={Urls.signUp} className="botn" id="button_b" onClick={onClose}>Sign up</a>
      </div>
    </div>
    );
}

export default SignUpAlert;