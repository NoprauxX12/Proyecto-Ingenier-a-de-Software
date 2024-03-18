/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Urls from "../../util/urls";
import "../../styles/card.css";

const Card = (props) => {
    const { freelancer } = props;
    if (!freelancer) {
        return null; // Manejar el caso de datos incompletos o nulos
    }
    console.log("freelancer.profilePhoto.data")
    return (
        <div className="card__item card">
          {!freelancer.profilePhoto? (<>
          <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`}>
            <img src="/images/defaultUser.png" className="card-img-top"  alt="usuario por defecto" style={{width: "12em",margin: "auto", cursor: "pointer"}} />
          </a>
          </>):(
            <>
            <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`}>
              <img src={`data:image/jpeg;base64,${freelancer.profilePhoto}`} id={"cardIm"} className="card-img-top" alt="Profile" />
            </a>
            </>
          )}
            
            <div className="card-body">
              <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`} style={{textDecoration: "none", color: "inherit"}}>
                <h5 className="card-title">{freelancer.name}</h5>
              </a>
              <p style={{display: "block"}}>{freelancer.description}</p>
            <div className="city-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msfilter: ''}}><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z" /><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z" /></svg>
              <p style={{color: "#3D00B7", padding: "0.2em"}}>{freelancer.city}</p>
            </div>
            </div>
        </div>
    );
}

export default Card;
