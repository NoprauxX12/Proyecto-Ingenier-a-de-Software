import React, { useState, useContext } from "react";
import UserData from "../../services/user";
import { AuthContext } from "../../providers/userProvider";

import Alert from "../alert";

const users = {
  "0": "Seleccione tipo usuario",
  "1": "Freelancer",
  "2": "Cliente"
};

const FormularioLogIn = () => {
  const {login} = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    user: "0",  
    email: "",
    password: "",  
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage]= useState("");

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    UserData.logIn(formValues, (args)=>{
      console.log(args)
      if (args.login){
        login(args.user);
        window.location.href= "/"
      }else{
        setMesage("Usuario o contraseña incorrecto");
        toggleAlert();
      }
    });
  }

  return (
    <div className="form__container">
      {showAlert && (
        <Alert
          message={message}
          onClose={toggleAlert}
        />
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="log_in">
            <span style={{ color: "#3D00B7" }}>Log </span>
            <span style={{ color: "#55ACEE" }}>In</span>
          </legend>
          <div>
            <div className="form-group">
              <label htmlFor="exampleFreelancer/client" className="form-label mt-4">Tipo de Usuario</label>
              <select 
                className="form-control" 
                style={{ backgroundColor: 'rgb(236, 236, 236)' }} 
                id="exampleFreelancer/client" 
                name="user" 
                onChange={handleChange}
                value={formValues.user}
              >
                {Object.entries(users).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
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
      </form>
    </div>
  );
};

export default FormularioLogIn;
