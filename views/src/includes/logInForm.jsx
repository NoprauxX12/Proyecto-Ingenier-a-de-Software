import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/userProvider";
import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

const FormularioLogIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      email: email,
      password: password,
    };


    const apiUrl = `${BaseUrl}/login`;
    console.log("Api URL:", apiUrl)


    axios.post(`${BaseUrl}/log-in`, formValues).then((response) => {
      if (response.data.result) {
        login(formValues);
        alert("¡Inicio de sesión exitoso!");
        window.location.href = "/";
      } else {
        alert("¡Oops! Ha habido un error :(");
      }
    });
  };

  return (
    <div className="form__container" id="formlog">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="log_in">
            <span style={{ color: "#3D00B7" }}>Log </span>
            <span style={{ color: "#55ACEE" }}>In</span>
          </legend>
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">
              Dirección de Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese Email"
              value={email}
              onChange={handleEmail}
              required
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
              value={password}
              onChange={handlePassword}
              autoComplete="off"
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
      </form>
    </div>
  );
};

export default FormularioLogIn;
