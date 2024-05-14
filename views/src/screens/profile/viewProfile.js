/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useLayoutEffect, useState } from "react";
import UserData from "../../services/user";
import ReviewData from "../../services/review";

function ViewProfile(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const id = params.get("id");
    const usertype = params.get("usertype");
    const [averageRank, setAverageRank] = useState(null)

  
    useLayoutEffect(() => {
      const reqView = {id, usertype};
      document.title = user.name;
      const getUserData = async () => {
        UserData.viewProfile(reqView, (res) => {
          console.log(res);
          setUser(res);
        });
      };

      getUserData();
    }, [id, usertype, user.name]);

    useEffect(()=>{
      const fetchData = async () =>{
        try{
          ReviewData.averageRank({id: id}, (response)=>{
            if(response.result){
              console.log("ola",typeof response.data)
              setAverageRank(response.data)
            }else{
              console.log("Error al mostrar ranking")
            }
          })
        }catch(error){
          console.log(error)
        }
      };
      fetchData();
    }, [])


    
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
            {!user.profilePhoto? (<>
                        <img className="profile-image" id="profile-image" src="/images/defaultUser.png" alt="usuario por defecto" />
                    </>):(
                        <>
                        <img id="profile-image" src={`data:image/jpeg;base64,${user.profilePhoto}`} className="profile-image" alt="Imagen de Perfil" style={{maxHeight: "30em"}}/>
                        </>
                    )}

            </div>
            <div className="mid-container">
              <div className="content-element">
                <label htmlFor="profession">Profesión:</label>{" "}
                <input
                  readOnly
                  type="text"
                  id="profession"
                  className="profession-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.knowledge}
                />
              </div>
              <div className="content-element">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  readOnly
                  id="description"
                  className="description-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.description}
                />
              </div>
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
                <label htmlFor="phone">Teléfono:</label>{" "}
                <input
                  readOnly
                  type="tel"
                  id="phone"
                  className="phone-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.cellphone}
                  size={10}
                />
              </div>
              <div>
                <label htmlFor="email">Correo Electrónico:</label>
              </div>
              <div className="content-element">
                <input
                  readOnly
                  type="email"
                  id="email"
                  className="email-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.email}
                />
              </div>
              <div className="content-element">
                <label htmlFor="academic-info">Información Académica:</label>
                <textarea
                  readOnly
                  id="academic-info"
                  className="academic-info-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.academicInfo}
                />
              </div>
              <div className="content-element">
                <label htmlFor="important-info">Información Importante:</label>
                <textarea
                  readOnly
                  id="important-info"
                  className="important-info-box inside-color"
                  style={{ cursor: "default" }}
                  defaultValue={user.importantInfo}
                />
              </div>
            </div>
          </div>
          <div className="portfolio-container">
            <label htmlFor="portfolio">Portafolio:</label>
          </div>
        </div>
      </>
    );
}

export default ViewProfile;