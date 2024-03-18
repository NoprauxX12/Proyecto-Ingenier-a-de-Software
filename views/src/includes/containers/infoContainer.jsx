/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const InfoContainer=()=>{
    return(
        <>
        <div className="container">
            <div className="grid-container" style={{ flex: "1" }}>
                <div className="grid-item">
                <h2>Descubre y conecta con freelancers</h2>
                <p>¡Encuentra una amplia gama de servicios para dar solución a tus problemas en nuestra plataforma de freelancers! Conectamos personas, emprendedores y proyectos con expertos independientes listos para ayudarte. ¡Explora, conecta y haz que suceda!</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label htmlFor="search">
                    <a className="btne_dark">Buscar Ahora</a>
                  </label>  
                </div>
            </div>
            <div className="grid-item" style={{ flexShrink: 0 }}>
                <img src="/images/free.png" alt=""/>
            </div>
           
        </div>



        <div className="container-1">
          <h2 style={{margin: "0.5em"}} >Encuentra toda clase de oficios en un sólo lugar</h2>
          <div className="grid-container-1">
            <div className="grid-item">
              <div className="back">
                <h4>Contacta facilmente</h4>
                <img src="/images/evaluacion.png" alt="icon" className="icons"/>
              </div>
              
              <p>Busca el trabajo que necesitas, explora los perfiles de las diversas personas que ofrecen el servicio, y habla con ellos por chat.</p>
            </div>
            <div className="grid-item">
            <div className="back">
                <h4>Deja Calificaciones y Reseñas</h4>
                <img src="/images/barra-grafica.png" alt="icon" className="icons"/>
              </div>
              <p>Antes de contactar un freelancer, puedes observar sus reseñas y calificaciones, o si ya recibiste sus servicios, puedes dejar tu propia reseña.</p>
            </div>
            <div className="grid-item">
            <div className="back">
                <h4>Publica tus Necesidades</h4>
                <img src="/images/mecanico.png" alt="icon" className="icons"/>
              </div>
              <p>Como cliente, también puedes publicar tus problemas, proyectos o necesidades para que un freelancer que te pueda ayudar se comunique contigo.</p>
            </div>
          </div>
        </div>
        </>
    )
}

export default InfoContainer;