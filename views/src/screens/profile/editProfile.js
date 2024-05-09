/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect, useState } from "react";
import UserData from "../../services/user";

function EditProfile() {
  const params = new URLSearchParams(window.location.search);
  const [data, setData] = useState({});
  const [curriculumFile, setCurriculumFile] = useState(null);
  const [rutFile, setRutFile] = useState(null);
  const [epsFile, setEpsFile] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const id = params.get("id");
  const usertype = params.get("usertype");

  useLayoutEffect(() => {
    const reqView = {id,usertype};
    document.title = data.name;
    const getUserData = async () => {
      UserData.viewProfile(reqView, (res) => {
        setData(res);
      });
    };

    getUserData();
  }, [id, usertype, data.name]);

  const onSubmit = async () => {
    const reqView = {id,usertype};
    UserData.viewProfile(reqView, (res) => {
      setData(res);
    });
  };

  function openPdfInNewTab(pdfUrl) {
    window.open(pdfUrl, "_blank");
  };

  const viewPdf = (type) => {
    if (type === "curriculum") {
      if (!data.curriculum_blob) {
        alert(
          "¡Parece que no has subido todavía tu hoja de vida! ¡Súbela para generar más confianza en tu perfil!"
        );
        return;
      }
      openPdfInNewTab(data.curriculum_blob);
    } else if (type === "rut") {
      if (!data.rut_blob) {
        alert(
          "¡Parece que no has subido todavía tu RUT! ¡Súbelo para generar más confianza en tu perfil!"
        );
        return;
      }
      openPdfInNewTab(data.rut_blob);
    } else if (type === "eps") {
      if (!data.eps_blob) {
        alert(
          "¡Parece que no has subido todavía tu EPS! ¡Súbela para generar más confianza en tu perfil!"
        );
        return;
      }
      openPdfInNewTab(data.eps_blob);
    } 
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    const formData = new FormData();
    formData.append("usertype",usertype);
    formData.append("id",id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("description", data.description);
    formData.append("cellphone", data.cellphone);
    formData.append("importantInfo", data.importantInfo);
    formData.append("photo", profilePhotoFile);
    formData.append("curriculum", curriculumFile);
    formData.append("rut", rutFile);
    formData.append("eps", epsFile);
    formData.append("newPassword", newPassword);

    UserData.editProfile(formData);
    setTimeout(()=>{
      onSubmit()
    },500);
  }

  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <h1>{data.name}</h1>
        </div>
        <form id="profile-form" onSubmit={handleSubmit}>
          <div className="content-container">
            <div className="left-container">
              {!data.profilePhoto ? (
                <img
                  className="profile-image"
                  id="profile-image"
                  src="/images/defaultUser.png"
                  alt="usuario por defecto"
                />
              ) : (
                <img
                  id="profile-image"
                  src={`data:image/jpeg;base64,${data.profilePhoto}`}
                  className="profile-image"
                  alt="Imagen de Perfil"
                  style={{ maxHeight: "30em" }}
                />
              )}
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfilePhotoFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setData({ ...data, profilePhoto: reader.result });
                  };
                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }}
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
                  defaultValue={data.knowledge}
                />
              </div>
              <div className="content-element">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  className="description-box inside-color"
                  defaultValue={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
              <div className="content-element">
                <label>Puntuación y reseñas:</label>
              </div>
              <div className="content-element">
                <h1>4.8/5.0</h1>
                <a href="#">Ver 182 reseñas</a>
              </div>
            </div>
            <div className="right-container">
              <div className="content-element">
                <label htmlFor="cellphone">Teléfono:</label>{" "}
                <input
                  type="tel"
                  id="cellphone"
                  className="phone-box inside-color"
                  defaultValue={data.cellphone}
                  size={10}
                  onChange={(e) =>
                    setData({ ...data, cellphone: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Correo Electrónico:</label>
              </div>
              <div className="content-element">
                <input
                  type="email"
                  id="email"
                  className="email-box inside-color"
                  defaultValue={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <div className="content-element">
                  <label>Hoja de Vida:</label>
                  <button
                    type="button"
                    className="button-box"
                    onClick={() => viewPdf("curriculum")}
                  >
                    Ver
                  </button>
                  <input
                    type="file"
                    id="curriculum"
                    className="button-box"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={(e) => setCurriculumFile(e.target.files[0])}
                  />
                  <button
                    type="button"
                    className="button-box"
                    onClick={() =>
                      document.getElementById("curriculum").click()
                    }
                  >
                    Editar
                  </button>
                </div>
                <div className="content-element">
                  <label>RUT:</label>
                  <button
                    type="button"
                    className="button-box"
                    onClick={() => viewPdf("rut")}
                  >
                    Ver
                  </button>
                  <input
                    type="file"
                    id="rut"
                    className="button-box"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={(e) => setRutFile(e.target.files[0])}
                  />
                  <button
                    type="button"
                    className="button-box"
                    onClick={() => document.getElementById("rut").click()}
                  >
                    Editar
                  </button>
                </div>
                <div className="content-element">
                  <label>EPS:</label>
                  <button
                    type="button"
                    className="button-box"
                    onClick={() => viewPdf("eps")}
                  >
                    Ver
                  </button>
                  <input
                    type="file"
                    id="eps"
                    className="button-box"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={(e) => setEpsFile(e.target.files[0])}
                  />
                  <button
                    type="button"
                    className="button-box"
                    onClick={() => document.getElementById("eps").click()}
                  >
                    Editar
                  </button>
                </div>
              </div>
              <div className="content-element">
                <label htmlFor="important-info">Información Importante:</label>
                <textarea
                  id="important-info"
                  className="important-info-box inside-color"
                  defaultValue={data.importantInfo}
                  onChange={(e) =>
                    setData({ ...data, importantInfo: e.target.value })
                  }
                />
              </div>
              <div className="content-element">
                <label htmlFor="password">Nueva Contraseña:</label>{" "}
                <input
                  type="password"
                  id="password"
                  className="password-box1 inside-color"
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {newPassword !== confirmPassword && (
                <p className="error-message">Las contraseñas no coinciden</p>
              )}
              <button type="submit" 
              className="button-box">
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>

        <div className="portfolio-container">
          <label>Portafolio:</label>
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

export default EditProfile;
