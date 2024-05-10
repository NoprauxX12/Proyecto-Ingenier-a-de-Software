import React, { useState, useContext } from "react";
import { AuthContext } from "../../providers/userProvider";
import Alert from "../../includes/overlays/alert";
import AdminData from "../../services/admin";

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

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
    AdminData.logInAdmin(formValues, (args) => {
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
      <div className="left-section">
        <h1 style={{ color: "white", textAlign: "center" }}>El Que Sable</h1>
        <p style={{ color: "white", textAlign: "center" }}>Admin</p>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="log_in">
              <span style={{ color: "#3D00B7" }}>Log </span>
              <span style={{ color: "#55ACEE" }}>In </span> {"    "}
              <span style={{color: "black"}}>Admin</span>
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
    </div>
  );
};

export default AdminLogin;
