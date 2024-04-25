/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Urls from "../../util/urls"

const InfoContainer=()=>{
    return(
        <>
       <div className="container-1">
        <div className="grid-container" style={{ display: "flex", alignItems: "center" }}>
          <div className="grid-item" style={{ flex: "1", maxWidth: "50%"}}>
            <h2 >Descubre y conecta con freelancers</h2>
            <p style={{ textAlign: "justify" }}>¡Encuentra una amplia gama de servicios para dar solución a tus problemas en nuestra plataforma de freelancers! Conectamos personas, emprendedores y proyectos con expertos independientes listos para ayudarte. ¡Explora, conecta y haz que suceda!</p>
            <div style={{ display: "flex", justifyContent: "center", textAlign: "jutify" }}>
              <label htmlFor="search">
                <a className="btne_dark">Buscar Ahora</a>
              </label>
            </div>
          </div>
          <div className="grid-item" style={{ flexShrink: 0, marginLeft: "20px" }}>
            <img src="/images/free.png" alt="" />
          </div>
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
              <p style={{textAlign: "justify"}}>Busca el trabajo que necesitas, explora los perfiles de las diversas personas que ofrecen el servicio, y habla con ellos por chat.</p>
            </div>
            <div className="grid-item">
            <div className="back">
                <h4>Deja Calificaciones y Reseñas</h4>
                <img src="/images/barra-grafica.png" alt="icon" className="icons"/>
              </div>
              <p style={{textAlign: "justify"}}>Antes de contactar un freelancer, puedes observar sus reseñas y calificaciones, o si ya recibiste sus servicios, puedes dejar tu propia reseña.</p>
            </div>
            <div className="grid-item">
            <div className="back">
                <h4>Publica tus Necesidades</h4>
                <img src="/images/mecanico.png" alt="icon" className="icons"/>
              </div>
              <p style={{textAlign: "justify"}}>Como cliente, también puedes publicar tus problemas, proyectos o necesidades para que un freelancer que te pueda ayudar se comunique contigo.</p>
            </div>
          </div>
          <div className="container">
          <div className="grid-item" style={{ flexShrink: 0 }}>
                <img src="/images/secondMain.png" alt=""/>
            </div>
            <div className="grid-container" style={{ flex: "1" }}>
                <div className="grid-item">
                <h2>Crea tu perfil como freelancer y ofrece tus servicios</h2>
                <p style={{textAlign: "justify"}}>El Que Sabe te permite conectar fácilmente con cientos de clientes en línea, ofrecer y recibir ofertas por tus servicios como independiente, y tener un portafolio de trabajos realizados en tu perfil para que otras personas puedan ver lo que has hecho.</p>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <a href={Urls.signUp} className="btne_dark">Registrarme ahora</a>  
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default InfoContainer;