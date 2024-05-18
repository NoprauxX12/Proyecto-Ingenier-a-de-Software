/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect, useState, useContext, useEffect } from "react";
import UserData from "../../services/user";
import "../../styles/profile.css";
import { AuthContext } from '../../providers/userProvider';
import Urls from "../../util/urls";
import Portfolio from "../../includes/overlays/portfolio";
import ReviewData from "../../services/review";
import PortfolioCard from "../../includes/cards/portfolioCard";

function ViewProfile(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const [showOverlayPortfolio, setshowOverlayPortfolio] = useState(false);
    const {userData} = useContext(AuthContext);
    const id = params.get("id");
    const usertype = params.get("usertype");
    const [averageRank, setAverageRank] = useState(null)
    const [portfolio, setPortfolio] = useState([]);


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

    useEffect(()=>{
      const fetchData = async () =>{
        try{
          if(usertype==="1"){
            ReviewData.averageRank({id: id}, (response)=>{
              if(response.result){
                setAverageRank(response.data)
              }else{
                console.log("Error al mostrar ranking")
              }
            })
          }
        }catch(error){
          console.log(error)
        }
      };
      fetchData(); // eslint-disable-next-line
    }, [])

    useEffect(() => {
      const fetchData = async () => {
        if (usertype === "1") {
          try {
            UserData.fetchPortfolio({ id: id },(data)=>{
              setPortfolio(data);
            });
          } catch (error) {
            console.error("Error al obtener trabajos previos:", error);
          }
        }
      };
    
      fetchData(); // eslint-disable-next-line
    }, []);

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
          <div className={((userData === null) || (userData.user === "2")) ? "header-container-nolog" : "header-container"}>
            <div>
            <a href="/" style={{ display: "inline-block" }}>
              <div className="back" style={{ marginTop: "0" }}>
                <i className='bx bx-chevron-left' style={{ color: '#7d7d7d', fontSize: "4em" }}></i>
              </div>
            </a>
            </div>
            <div className="header-content">
              <div className="header-name">
                <h1 style={{marginRight: "6em"}}>{user.name}</h1>
              </div>
              {userData && (
                <div className="edit" style={{ marginTop: "5px", marginLeft: "10px" }}>
                  {userData.idCard === id && (
                    <a href={Urls.editProfile + `/?id=${id}&usertype=${usertype}`}>
                      <i className='bx bx-edit-alt' style={{ color: '#7d7d7d', fontSize: "3em" }}></i>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="content-container">
            <div className="left-container">
              {!user.profilePhoto ? (<>
                <div className="content-element">
                  <img className="profile-image" id="profile-image" src="/images/defaultUser.png" alt="usuario por defecto" />
                </div>
                </>):(
                <>
                <div className="content-element">
                  <img id="profile-image" src={`data:image/jpeg;base64,${user.profilePhoto}`} className="profile-image" alt="Imagen de Perfil" style={{maxHeight: "30em"}}/>
                </div>
                </>
              )}
            </div>
            <div className={usertype==="1" ? "mid-container": "client-mid-container"}>
              {(usertype==="1")? (<>
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
                </>): (<>
              </>)}
              <div className="content-element">
                <label htmlFor="description">{usertype === "1" ? "Descripción" : "Información Importante"}</label>
                <textarea
                  readOnly
                  id="description"
                  className="description-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.description !== "null" ? user.description : ""}
                />
              </div>
              {(userData && (userData.idCard===id && userData.user==="2"))? (<>
              </>): (<>
                <div className="content-element">
                  <label htmlFor="rating">Puntuación y reseñas:</label>
                  <h1>{averageRank}/5</h1>
                  <a href={"/review/?id="+ id }>Ver reseñas</a>
                </div>
              </>)}
            </div>
            <div className={usertype==="1" ? "right-container": "client-right-container"}>
              <div className="content-element-inline">
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
              {usertype==="1" ? (
                <>
                <div>
                  <div className="content-element-inline">
                    <label>Hoja de Vida:</label>
                    <button type="button" className="button-box" onClick={() => viewPdf("curriculum")}> Ver </button>
                  </div>
                  {userData && userData.idCard === id && (<>
                    <div className="content-element-inline">
                      <label>RUT:</label>
                      <button type="button" className="button-box" onClick={() => viewPdf("rut")}> Ver </button>
                    </div>
                    <div className="content-element-inline">
                      <label>EPS:</label>
                      <button type="button" className="button-box" onClick={() => viewPdf("eps")}> Ver </button>
                    </div>
                  </>)}
              </div>
              <div className="content-element">
                <label htmlFor="important-info">Información Importante:</label>
                <textarea
                  readOnly
                  id="important-info"
                  className="important-info-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.importantInfo !== "null" ? user.importantInfo : "" }
                />
              </div>
              </>
              ):(
              <div className="content-element">
                <label htmlFor="adress">Dirección:</label>
                <input
                  readOnly
                  type="adress"
                  id="adress"
                  className="adress-box inside-color"
                  style={{ cursor:"default", outline: "none" }}
                  defaultValue={user.adress}
                />
              </div>
              )}
            </div>
          </div>
          {usertype==="1" && (
            <>
            <div className="portfolio-label">
              <h3 htmlFor="portfolio">Portafolio:</h3>
            </div>
            <div className="portfolio-container">
              {userData && (<>
                {userData.idCard === id && (
                  <>
                  <button type="button" className="button-box-lg" onClick={addPreviousWork}><i class='bx bx-plus-circle' style={{fontSize:"90px", color:"white" }}></i> </button>
                  {showOverlayPortfolio && (<> <Portfolio showOverlayPortfolio={showOverlayPortfolio} setshowOverlayPortfolio={setshowOverlayPortfolio} /> </>)}
                  </>
                )}
                </>
              )}
              {portfolio.length>0 && (
                <>
                {portfolio.map((portfolioItem) => (
                  <PortfolioCard portfolioItem={portfolioItem}/> 
                ))}
                </>
              )}
            </div>
            </>
          )}
        </div>
      </>
    );
}

export default ViewProfile;