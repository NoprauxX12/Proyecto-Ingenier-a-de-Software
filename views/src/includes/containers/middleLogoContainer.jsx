import React from "react";
import "../../styles/register.css";

const MiddleLogoContainer =(props)=>{
    const {hide}= props;    return (
        <div className="mitad div__logo">
          {!hide &&(
            <>
            <a href="/"> 
              <div className="back">
                <img src="/images/back.png" className="icons" alt="back" />
                <p>volver</p>
              </div>
            </a>
            </>
          )}
            
          <div className="logoContainer">
            <h1 className="pageTitle bigger">El Que <span style={{color: '#55ACEE'}}>Sabe</span></h1>
            <h3 className="pageTitle" style={{textAlign: 'left'}}>Sabe...</h3>
          </div>
        </div>

    )
}

export default MiddleLogoContainer;