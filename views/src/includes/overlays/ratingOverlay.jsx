import React, { useContext } from "react";
import { useState } from "react";
import "../../styles/overlays.css";
import ReviewData from "../../services/review";
import { AuthContext } from "../../providers/userProvider";

function FistStep({ onNext, handleChange }) {
  const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(null)

  const handleChangeRating = (value) => {
    console.log(value+1)
    setRating(value);
    setHover(value)
    handleChange({ target: { name: "clientScore", value } });
  };

  return (
    <div className="App">
      <div className="Titulo">
        <label><span style={{color: "#3D00B7"}}>Puntuación de </span><span style={{color: "#55ACEE"}}>Freelancer</span></label>
      </div>
      <div className="star-container">
      {[...Array(5)].map((_, index) => {
        return (
          <label htmlFor="rating" key={index}>
            <i className="bx bxs-star"
            onClick={()=>handleChangeRating(index)}
            onMouseOver={()=>{
              setHover(index)
            }}
            onMouseLeave={()=>{
              setHover(null)
            }}
             style={{color: index<=rating || index <= hover ? '#3D00B7':"#BBB", fontSize: "2.5em"}} 
             />
          </label>
        );
      })}
      </div>
      <button className="botn" id="button_b" onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
}

function SecondStep({ onPrev, onSubmit, values, handleChange }) {
  return (
    <div className="App">
      <div className="Titulo">
        <label><span style={{color: "#3D00B7"}}>Reseña tu </span><span style={{color: "#55ACEE"}}>Freelancer</span> </label>
      </div>
      <div className="container" style={{marginBottom: "-2.3em"}}>
        <textarea name="clientComent" value={values.clientComent} onChange={handleChange} style={{width: "95%", height:"5em"}}/>
        <div className="button-">
          <button className="botn1" id="button_b" onClick={onPrev}>Anterior</button>
          <button className="botn1" id="button" onClick={onSubmit}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

function Formulario() {
  const { userData } = useContext(AuthContext);
  const [paso, setPaso] = useState(1);
  const [formValues, setFormValues] = useState({
    clientScore: '',
    clientComent: '',
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
    ReviewData.createReview({ ...formValues,  idContract: userData.idContract }, (arg) => {
      if (arg.result) {
        alert("Gracias por tus respuestas");
      } else {
        alert("Oops, ha ocurrido un error");
      }
    });
  };

  return (
    <div className="overlay">
      <div className="alert-box" style={{maxHeight: "50%", width: "30%"}}>
        <div>
          {paso === 1 && <FistStep onNext={handleNext} values={formValues} handleChange={handleChange} />}
          {paso === 2 && (
            <SecondStep onPrev={handlePrev} onSubmit={handleSubmit} values={formValues} handleChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}
