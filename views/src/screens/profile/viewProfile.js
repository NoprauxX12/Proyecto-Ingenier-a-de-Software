/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect, useState, useContext } from "react";
import UserData from "../../services/user";
import "../../styles/profile.css";
import { AuthContext } from '../../providers/userProvider';
import Urls from "../../util/urls";
import Portfolio from "../../includes/overlays/portfolio";

function ViewProfile(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const [showOverlayPortfolio, setshowOverlayPortfolio] = useState(false);
    const {userData} = useContext(AuthContext);
    const id = params.get("id");
    const usertype = params.get("usertype");

    useLayoutEffect(() => {
      const reqView = {id, usertype};
      document.title = user.name;
      const getUserData = async () => {
        UserData.viewProfile(reqView, (res) => {
          setUser(res);
        });
      };

      getUserData();
    }, [id, usertype, user.name]);


    function base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const length = binaryString.length;
      const bytes = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    const addPreviousWork = () =>{
      setshowOverlayPortfolio(true);
    };

    const viewPdf = (type) => {
      if (type === "curriculum") {
          if (user.curriculum) {
            const pdfBlob = new Blob([base64ToArrayBuffer(user.curriculum)], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
        } else {
            alert("¡Ups! Este perfil todavía no tiene una hoja de vida");
        }
      } else if (type === "rut") {
        if (user.rut) {
          const pdfBlob = new Blob([base64ToArrayBuffer(user.rut)], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
        } else {
            alert("¡Ups! Este perfil todavía no tiene un RUT");
        }
      } else if (type === "eps") {
        if (user.eps) {
          const pdfBlob = new Blob([base64ToArrayBuffer(user.eps)], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
        } else {
            alert("¡Ups! Este perfil todavía no tiene una EPS");
        }
      } 
    };
    
    return (
      <>
        <div className="main-container">
          <div className="header-container">
          <a href="/" style={{display: "inline-block"}}> 
              <div className="back" style={{position: "absolute", marginTop: "0"}}>
                <i class='bx bx-chevron-left' style={{color: '#7d7d7d', fontSize: "4em"}} ></i>
              </div>
            </a>
            <h1>{user.name}</h1>
          </div>
          <div className="content-container">
            <div className="left-container">
              {userData.idCard === id && (<>
                <a href={Urls.editProfile+`/?id=${id}&usertype=${usertype}`} style={{display: "inline-block"}}> 
                  <div className="back" style={{position: "absolute", marginTop: "5px"}}>
                    <i class='bx bx-edit-alt' style={{color: '#7d7d7d', fontSize: "3em"}} ></i>
                  </div>
                </a>
              </>)}
              {!user.profilePhoto ? (<>
                <img className="profile-image" id="profile-image" src="/images/defaultUser.png" alt="usuario por defecto" />
                </>):(
                <>
                <img id="profile-image" src={`data:image/jpeg;base64,${user.profilePhoto}`} className="profile-image" alt="Imagen de Perfil" style={{maxHeight: "30em"}}/>
                </>
              )}
              <div className="content-element-inline">
                <label htmlFor="profession">Profesión:</label>{" "}
                <input
                  readOnly
                  type="text"
                  id="profession"
                  className="profession-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.knowledge}
                />
              </div>
              <div className="content-element">
                <label htmlFor="rating">Puntuación y reseñas:</label>
                <h1>4.8/5.0</h1>
                <a href="#">Ver 182 reseñas</a>
              </div>
              <div className="content-element">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  readOnly
                  id="description"
                  className="description-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.description !== "null" ? user.description : ""}
                />
              </div>
<<<<<<< HEAD
              <div className="content-element">
                <label htmlFor="rating">Puntuación y reseñas:</label>
              </div>
              <div className="content-element">
                <h1>{averageRank}/5.0</h1>
                <a href={"/review/?id="+ id }>Ver reseñas</a>
              </div>
            </div>
            <div className="right-container">
              <div className="content-element">
=======
              <div className="content-element-inline">
>>>>>>> 6cb5b5d3b7f7aface3a362fb667ed2841f73657d
                <label htmlFor="phone">Teléfono:</label>{" "}
                <input
                  readOnly
                  type="tel"
                  id="phone"
                  className="phone-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.cellphone}
                  size={10}
                />
              </div>
              <div className="content-element">
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  readOnly
                  type="email"
                  id="email"
                  className="email-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.email}
                />
              </div>
              <div>
                <div className="content-element-inline">
                  <label>Hoja de Vida:</label>
                  <button type="button" className="button-box" onClick={() => viewPdf("curriculum")}> Ver </button>
                </div>
                <div className="content-element-inline">
                  <label>RUT:</label>
                  <button type="button" className="button-box" onClick={() => viewPdf("rut")}> Ver </button>
                </div>
                <div className="content-element-inline">
                  <label>EPS:</label>
                  <button type="button" className="button-box" onClick={() => viewPdf("eps")}> Ver </button>
                </div>
              </div>
              <div className="content-element">
                <label htmlFor="important-info">Información Importante:</label>
                <textarea
                  readOnly
                  id="important-info"
                  className="important-info-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.importantInfo}
                />
              </div>
            </div>

            <div className="right-container">
              {userData.idCard === id && (
                <>
                  <button type="button" className="button-box-lg" onClick={addPreviousWork}> Añadir Nuevo Elemento al Portafolio<i class='bx bx-plus-circle' style={{fontSize:"60px", color:"white" }}></i> </button>
                  {showOverlayPortfolio && (<> <Portfolio showOverlayPortfolio={showOverlayPortfolio} setshowOverlayPortfolio={setshowOverlayPortfolio} /> </>)}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default ViewProfile;