/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect, useState } from "react";
import UserData from "../../services/user";
import "../../styles/profile.css";
import Urls from "../../util/urls";
import { useNavigate } from "react-router-dom";

function ViewProfile(){
    const params = new URLSearchParams(window.location.search);
    const [user, setUser]= useState({});
    const id = params.get("id");
    const usertype = params.get("usertype");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photo, setPhoto] = useState(null);
    const [curriculum, setCurriculum] = useState(null);
    const [curriculumUrl, setCurriculumUrl] = useState(null);
    const [rut, setRut] = useState(null);
    const [rutUrl, setRutUrl] = useState(null);
    const [eps, setEps] = useState(null);
    const [epsUrl, setEpsUrl] = useState(null);

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

    function handleSubmit(e) {
      e.preventDefault();
  
      if (newPassword !== confirmPassword) {
        return;
      }
  
      const formData = new FormData();
      formData.append("usertype",usertype);
      formData.append("id",id);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("description", user.description);
      formData.append("cellphone", user.cellphone);
      formData.append("importantInfo", user.importantInfo);
      formData.append("newPassword", newPassword);
      if(photo){
        formData.append("photo",photo);
      }
      if(curriculum){
        formData.append("curriculum",curriculum);
      }
      if(rut){
        formData.append("rut",rut);
      }
      if(eps){
        formData.append("eps",eps);
      }

      UserData.editProfile(formData);
      setTimeout(()=>{
        onSubmit()
      },500);
    };

  const navigate = useNavigate();

  const onSubmit = async () => {
    const dynamicUrl = `${Urls.viewProfile}?id=${id}&usertype=${usertype}`;
    navigate(dynamicUrl);
  };

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const viewPdf = (type) => {
    if (type === "curriculum") {
      if (curriculumUrl) {
        window.open(curriculumUrl, "_blank");
      } else if (user.curriculum) {
          const pdfBlob = new Blob([base64ToArrayBuffer(user.curriculum)], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, "_blank");
      } else {
          alert("¡Parece que no has subido todavía tu hoja de vida! ¡Súbela para generar más confianza en tu perfil!");
      }
    } else if (type === "rut") {
      if (rutUrl) {
        window.open(rutUrl, "_blank");
      } else if (user.rut) {
        const pdfBlob = new Blob([base64ToArrayBuffer(user.rut)], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      } else {
          alert("¡Parece que no has subido todavía tu RUT! ¡Súbelo para generar más confianza en tu perfil!");
      }
    } else if (type === "eps") {
      if (epsUrl) {
        window.open(epsUrl, "_blank");
      } else if (user.eps) {
        const pdfBlob = new Blob([base64ToArrayBuffer(user.eps)], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      } else {
          alert("¡Parece que no has subido todavía tu EPS! ¡Súbela para generar más confianza en tu perfil!");
      }
    } 
  };

  function handleInputPhoto(event) {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  function handleInputCurriculum(event) {
    const file = event.target.files[0];
        if (file) {
            setCurriculum(file);
            const curriculumUrl = URL.createObjectURL(file);
            setCurriculumUrl(curriculumUrl);
        }
  };

  function handleInputRut(event) {
    const file = event.target.files[0];
        if (file) {
            setRut(file);
            const rutUrl = URL.createObjectURL(file);
            setRutUrl(rutUrl); 
        }
  };

  function handleInputEps(event) {
    const file = event.target.files[0];
        if (file) {
            setEps(file);
            const epsUrl = URL.createObjectURL(file);
            setEpsUrl(epsUrl); 
        }
  };
    
    return (
      <>
        <div className="main-container">
          <div className="header-container">
          <a href={Urls.viewProfile+`/?id=${id}&usertype=${usertype}`} style={{display: "inline-block"}}> 
              <div className="back" style={{position: "absolute", marginTop: "0"}}>
                <i class='bx bx-chevron-left' style={{color: '#7d7d7d', fontSize: "4em"}} ></i>
              </div>
            </a>
            <h1>{user.name}</h1>
          </div>
          <form id="profile-form" onSubmit={handleSubmit}>
            <div className="content-container">
              <div className="left-container">
                <div className="photo-container" onClick={() => document.getElementById("photo").click()}>
                {photo ? (
                    <img id="profile-image" src={URL.createObjectURL(photo)} className="edit-profile-image" alt="Imagen de Perfil" style={{maxHeight: "30em"}}/>
                  ) : (
                    <img className="edit-profile-image" id="profile-image" src={`data:image/jpeg;base64,${user.profilePhoto}` || "/images/defaultUser.png"} alt="usuario por defecto" />
                  )}
                  <input
                    type="file"
                    id="photo"
                    style={{ display: "none" }}
                    onChange={handleInputPhoto}
                  />
                  <div className="edit-icon">
                    <i className='bx bxs-edit'></i>
                  </div>
                </div>
                <div className="content-element-inline">
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
                  <label htmlFor="rating">Puntuación y reseñas:</label>
                  <h1>4.8/5.0</h1>
                  <a href="#">Ver 182 reseñas</a>
                </div>
                <div className="content-element">
                  <label htmlFor="description">Descripción:</label>
                  <textarea
                    id="description"
                    className="description-box inside-color"
                    style={{ cursor: "pointer" }}
                    defaultValue={user.description !== "null" ? user.description : ""}
                    onChange={(e) =>
                      setUser({ ...user, description: e.target.value })
                    }
                  />
                </div>
                <div className="content-element-inline">
                  <label htmlFor="phone">Teléfono:</label>{" "}
                  <input
                    type="tel"
                    id="phone"
                    className="phone-box inside-color"
                    style={{ cursor: "pointer" }}
                    defaultValue={user.cellphone}
                    size={10}
                    onChange={(e) =>
                      setUser({ ...user, cellphone: e.target.value })
                    }
                  />
                </div>
                <div className="content-element">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    id="email"
                    className="email-box inside-color"
                    style={{ cursor: "pointer" }}
                    defaultValue={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div>
                  <div className="content-element-inline">
                    <label>Hoja de Vida:</label>
                    <button type="button" className="button-box" onClick={() => viewPdf("curriculum")}> Ver </button>
                    <input type="file" id="curriculum" className="button-box" accept=".pdf" style={{ display: "none" }} onChange={handleInputCurriculum}/>
                    <button type="button" className="button-box" onClick={() => document.getElementById("curriculum").click()}> Editar </button>
                  </div>
                  <div className="content-element-inline">
                    <label>RUT:</label>
                    <button type="button" className="button-box" onClick={() => viewPdf("rut")}> Ver </button>
                    <input type="file" id="rut" className="button-box" accept=".pdf" style={{ display: "none" }} onChange={handleInputRut}/>
                    <button type="button" className="button-box" onClick={() => document.getElementById("rut").click()}> Editar </button>
                  </div>
                  <div className="content-element-inline">
                    <label>EPS:</label>
                    <button type="button" className="button-box" onClick={() => viewPdf("eps")}> Ver </button>
                    <input type="file" id="eps" className="button-box" accept=".pdf" style={{ display: "none" }} onChange={handleInputEps}/>
                    <button type="button" className="button-box" onClick={() => document.getElementById("eps").click()}> Editar </button>
                  </div>
                </div>
                <div className="content-element">
                  <label htmlFor="important-info">Información Importante:</label>
                  <textarea
                    id="important-info"
                    className="important-info-box inside-color"
                    style={{ cursor: "pointer" }}
                    defaultValue={user.importantInfo}
                    onChange={(e) => setUser({ ...user, importantInfo: e.target.value })}
                  />
                </div>
                <div className="content-element">
                  <label htmlFor="password">Nueva Contraseña:</label>{" "}
                  <input
                    type="password"
                    id="password"
                    className="password-box1 inside-color"
                    style={{ cursor: "pointer" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="content-element">
                  <label htmlFor="confirmPassword">Confirmar Contraseña:</label>{" "}
                  <input
                    type="password"
                    id="confirmPassword"
                    className="password-box2 inside-color"
                    style={{ cursor: "pointer" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {newPassword !== confirmPassword && (
                  <p style={{color:"red"}}>Las contraseñas no coinciden</p>
                )}
                <button type="submit" className="button-box"> Guardar Cambios </button>
              </div>

              <div className="right-container">
                
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default ViewProfile;