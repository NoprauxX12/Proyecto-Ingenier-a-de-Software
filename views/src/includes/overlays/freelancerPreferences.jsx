import React, { useContext, useState } from "react";
import "../../styles/overlays.css";
import { AuthContext } from "../../providers/userProvider";
import UserData from "../../services/user";

function FirstStep({ onNext, values, handleChange }) {
  return (
    <div className="App">
      <div className="Titulo">
        <label>
          ¿Cuáles son las herramientas que más utilizas en el trabajo?
        </label>
      </div>
      <div className="container" style={{ marginBottom: "-2.3em" }}>
        <textarea
          name="tools"
          value={values.tools}
          placeholder="Ej: Martillo, sierra, destornillador, etc..."
          onChange={handleChange}
          style={{ width: "95%", height: "5em" }}
        />
        <div className="button-">
          <button className="botn" id="button_b" onClick={onNext}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

function SecondStep({ onPrev, onSubmit, values, handleChange }) {
  return (
    <div className="App">
      <div className="Titulo">
        <label>
        ¿Qué marcas prefieres para tus herramientas?
        </label>
      </div>
      <div className="container" style={{ marginBottom: "-2.3em" }}>
        <textarea
          name="preferredBrands"
          value={values.preferredBrands}
          onChange={handleChange}
          style={{ width: "95%", height: "5em" }}
        />
        <div className="button-">
          <button className="botn1" id="button_b" onClick={onPrev}>
            Anterior
          </button>
          <button className="botn1" id="button" onClick={onSubmit}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

function FreelancerPreferences({showOverlayPrefrefences, setShowOverlayPreferences}) {
  const { userData } = useContext(AuthContext);
  const [paso, setPaso] = useState(1);
  const [formValues, setFormValues] = useState({
    tools: "",
    preferredBrands: "",
  });

  const handleNext = () => {
    setPaso(paso + 1);
  };

  const handlePrev = () => {
    setPaso(paso - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserData.progressiveProfiling(
      { ...formValues, id: userData.idCard },
      (arg) => {
        if (arg.response) {
          alert("¡Gracias por tus respuestas!");
        } else {
          alert("Oops, ha ocurrido un error");
        }
      }
    );
  };

  const exitClick = async () =>{
    setShowOverlayPreferences(false);
  }

  return (
    <div className="overlay">
      <div className="alert-box" style={{maxHeight: "100%", width: "50%"}}>
        <button type="button" onClick={exitClick} style={{border:"transparent", background:"transparent", margin:"0px"}}> <i class='bx bx-x-circle exit-button' style={{color:"gray", fontSize:"30px"}}></i> </button>
        <div>
          {paso === 1 && <FirstStep onNext={handleNext} values={formValues} handleChange={handleChange} />}
          {paso === 2 && (
            <SecondStep onPrev={handlePrev} onSubmit={handleSubmit} values={formValues} handleChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerPreferences;
