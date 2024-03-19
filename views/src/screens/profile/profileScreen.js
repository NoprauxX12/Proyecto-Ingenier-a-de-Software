import React, { useLayoutEffect, useRef, useState } from "react";
import UserData from "../../services/user";

function ProfileScreen(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const id= params.get("id");
    const fileInputRef = useRef();

    useLayoutEffect(()=>{
        document.title="freelancer-profile";
        const getUserData= async ()=>{
            UserData.fetchFreelancerById(id, (res)=>{
                setUser(res);
            });
        }

        getUserData();
    },[id]);
    
    return (
      <>
        <div className="main-container">
          <div className="header-container">
            <h1>{user.name}</h1>
          </div>
          <div className="content-container">
            <div className="left-container">
              <img
                id="profile-image"
                src="Carpintero - Perfil.jpg"
                alt="Imagen de Perfil"
                className="profile-image"
              />
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
                  defaultValue={user.profession}
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
                <h1>4.8/5.0</h1>
                <a href="#">Ver 182 reseñas</a>
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
            <div className="add-button">
              <a className="button-plus" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={120}
                  height={120}
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProfileScreen;