import React, { useLayoutEffect, useRef, useState } from "react";
import UserData from "../../services/user";

function ProfileScreen(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const id= params.get("id");
    const fileInputRef = useRef();

    useLayoutEffect(()=>{
        const getUserData= async ()=>{
            UserData.fetchFreelancerById(id, (res)=>{
                setUser(res);
            });
        }

        getUserData();
    },[id]);
    
    return(
        <>
        <div className="main-container">
            <div className="header-container">
                <h1>{user.name}</h1>
            </div>
            <form id="profile-form" onsubmit="saveChanges(event)">
                <div className="content-container">
                <div className="left-container">
                <label htmlFor="image-upload">
                {!user.profilePhoto? (<>
                        <img className="profile-image" id="profile-image" src="/images/defaultUser.png" alt="usuario por defecto" style={{width: "10em", margin: "auto", cursor: "pointer"}}/>
                    </>):(
                        <>
                        <img id="profile-image" src={`data:image/jpeg;base64,${user.profilePhoto}`} className="profile-image" alt="Imagen de Perfil" style={{width: "10em", margin: "auto", cursor: "pointer"}} />
                        </>
                    )}
                    <input ref={fileInputRef} type="file" id="image-upload" name="profilePhoto" accept="image/*" style={{display:"none"}} onChange={(e)=>{
                        
                    }}/>
                </label>
                </div>
                <div className="mid-container">
                    <div className="content-element">
                    <label htmlFor="profession">Profesión:</label> <input type="text" id="profession" className="profession-box inside-color" defaultValue="Carpintero, ebanista" />
                    </div>
                    <div className="content-element">
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" className="description-box inside-color" defaultValue={""} />
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
                    <label htmlFor="phone">Teléfono:</label> <input type="tel" id="phone" className="phone-box inside-color" defaultValue="####" size={10} />
                    </div>
                    <div>
                    <label htmlFor="email">Correo Electrónico:</label> 
                    </div>
                    <div className="content-element">
                    <input type="email" id="email" className="email-box inside-color" defaultValue="pmontana@email.com" />
                    </div>
                    <div className="content-element">
                    <label htmlFor="academic-info">Información Académica:</label>
                    <textarea id="academic-info" className="academic-info-box inside-color" defaultValue={""} />
                    </div>
                    <div className="content-element">
                    <label htmlFor="important-info">Información Importante:</label>
                    <textarea id="important-info" className="important-info-box inside-color" defaultValue={"blablabla"} />
                    </div>
                    <div className="content-element">
                    <label htmlFor="password">Nueva Contraseña:</label> <input type="password" id="password" className="password-box1 inside-color" />
                    </div>
                    <div className="content-element">
                    <label htmlFor="password">Confirmar Contraseña:</label> <input type="password" id="password" className="password-box2 inside-color" />
                    </div>
                    <button type="submit" className="button-box">Guardar Cambios</button>
                </div>
                </div>
            </form>
            <div className="portfolio-container">
                <label htmlFor="portfolio">Portafolio:</label>
                <div className="add-button">
                <a className="button-plus" href="#"><svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" /><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /></svg></a>
                </div>
            </div>
        </div>

        </>
    )
}

export default ProfileScreen;