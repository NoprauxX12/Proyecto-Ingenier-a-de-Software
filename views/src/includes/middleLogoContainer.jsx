import React from "react";
import "../styles/register.css";

const MiddleLogoContainer =((links, brandName, logoUrl)=>{
    return (
        <div className="mitad div__logo">
          <a href="/">volver</a>
          <div className="logoContainer">
            <h1 className="pageTitle bigger">El Que <span style={{color: '#55ACEE'}}>Sabe</span></h1>
            <h3 className="pageTitle" style={{textAlign: 'left'}}>Sabe...</h3>
          </div>
        </div>

    )
})

export default MiddleLogoContainer;