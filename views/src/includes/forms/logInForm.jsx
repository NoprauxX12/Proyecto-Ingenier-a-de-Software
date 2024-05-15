/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import UserData from "../../services/user";
import { AuthContext } from "../../providers/userProvider";


import Alert from "../overlays/alert";

const users = {
  "0": "Seleccione tipo usuario",
  "1": "Freelancer",
  "2": "Cliente"
};

const FormularioLogIn = () => {
  const { login } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    user: "0",
    email: "",
    password: ""
  });
  const [recoveryFormValues, setRecoveryFormValues] = useState({
    user: "0",
    email: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  const toggleRecovery = () => {
    setShowRecovery(!showRecovery);
  };

  const toggleSignUP = () => {
    window.location.href = "http://localhost:3000/sign-up"
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleRecoveryChange = (e) => {
    const { name, value } = e.target;
    setRecoveryFormValues({
      ...recoveryFormValues,
      [name]: value
    });
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    console.log(recoveryFormValues)
    UserData.verifyEmailvalid(recoveryFormValues, (args) => {
      console.log(args);
      if (args.length!==0) {
        window.location.href = `/recovery?${encodeURIComponent(recoveryFormValues.user)}${encodeURIComponent(recoveryFormValues.email)}`;
    
      } else {
        setMessage("Correo electrónico o tipo de usuario no válido ");
        toggleAlert();
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    UserData.logIn(formValues, (args) => {
      console.log(args);
      if (args.login) {
        login(args.user);
        window.location.href = "/";
      } else {
        setMessage("Usuario o contraseña incorrecto");
        toggleAlert();
      }
    });
  };

  return (
    <div className="form__container">
      {showAlert && <Alert message={message} onClose={toggleAlert} />}
      {showRecovery ? (
        <div>
          <legend className="log_in">
            <span style={{ color: "#3D00B7" }}>Recuperar</span>{" "}
            <span style={{ color: "#55ACEE" }}>contraseña</span>
          </legend>
          <form onSubmit={handleRecoverySubmit}>
            <div className="form-group">
              <label htmlFor="recoveryEmail">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="recoveryEmail"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={recoveryFormValues.email}
                onChange={handleRecoveryChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="recoveryUser">Tipo de Usuario:</label>
              <select
                className="form-control"
                id="recoveryUser"
                name="user"
                value={recoveryFormValues.user}
                onChange={handleRecoveryChange}
                required
              >
                {Object.entries(users).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar Correo de Recuperación
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="log_in">
              <span style={{ color: "#3D00B7" }}>Log </span>
              <span style={{ color: "#55ACEE" }}>In</span>
            </legend>
            <div>
              <div className="form-group">
                <label htmlFor="exampleFreelancer/client" className="form-label mt-4">
                  Tipo de Usuario
                </label>
                <select
                  className="form-control"
                  style={{ backgroundColor: "rgb(236, 236, 236)" }}
                  id="exampleFreelancer/client"
                  name="user"
                  onChange={handleChange}
                  value={formValues.user}
                >
                  {Object.entries(users).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Dirección de Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Ingrese Email"
                name="email"
                value={formValues.email}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="exampleInputPassword1" className="form-label mt-4">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Contraseña"
                name="password"
                required
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <button
              style={{ margin: 10, display: "inline" }}
              className="btne"
              type="submit"
            >
              Confirmar
            </button>
          </fieldset>
          <div>
            ¿Olvidaste tu contraseña?{" "}
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={toggleRecovery}
            >
              Recuperar contraseña
            </a>
          </div>
          <div>
            ¿Aun no tienes cuenta?{" "}
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={toggleSignUP}
            >
              ¡Registrate!
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormularioLogIn;