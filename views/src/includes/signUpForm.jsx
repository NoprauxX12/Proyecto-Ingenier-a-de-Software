import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/userProvider";
import axios from "axios"
import { BaseUrl } from "../util/apiUrl";

const users= {"0": "Seleccione tipo usuario",
"1": "Freelancer",
"2":"Cliente"
}


const Formulario = () => {
  const {login} = useContext(AuthContext);
  const [response, setResponse]= useState(null);
  const [step, setStep] = useState(1); 
  const [err, setErr] = useState(null);
  const [cityes, setCytyes] = useState([]);
  const [formValues, setFormValues] = useState({
    user: "0",
    name: "",
    idCard: "",
    telphone: "",
    cellphone: "",
    adress: "",
    email: "",
    password1: "",
    password2:"",
    idCity: "",
    rut: null,
    profilePhoto:"",
    description: "",
  });

  

  useEffect(()=>{
    const fetchCityes= async () =>{
      try {
        const response= await axios.post(BaseUrl+"/towns");
        setCytyes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(formValues.password1!== formValues.password2){
      setErr("las contraseñas no coinciden");
    }else if((!formValues.email.includes("@") || !formValues.email.includes(".com")) && formValues.email.length > 0){
        setErr("ingrese un email valido por favor");
    }else{
      setErr(null);
    }

    fetchCityes();
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(BaseUrl+"/sign-up", formValues
    ).then((response)=>{
      setResponse(response.data);
      if(response.data.result){
        login( formValues);
        alert("te has registrado con exito!");
        window.location.href = "/";
      }else{
        alert("oops ha habido un error :(")
      }
    });
  };

  const nextStep = () => {
    if(step===1){
      if((formValues.password1.length + formValues.password2.length) < 16){
        setErr("La contraseña debe contener minimo 8 caracteres.")
      }else if(err===null){
        if(formValues.user!=="0"){
          setErr(null);
          setStep(step + 1);
        }else{
          setErr("debe seleccionar un usuario")
        }
      }
    }
    
  };
  const prevStep = () => {
      setStep(step - 1);
    

  };
  
  return (
    <div>
      {response!==null && (<h2>{response.email}</h2>)}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <fieldset>
            <div className="form__container">
                <legend id="log_in">
                    <span style={{ color: '#3D00B7' }}>Sign </span>
                    <span style={{ color: '#55ACEE' }}>Up</span>
                </legend>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Paso</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={step+" de 3"} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFreelancer/client" className="form-label mt-4">Tipo de Usuario</label>
                    <select className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="exampleFreelancer/client" name="user" onChange={handleChange}>
                        <option value={"0"}>{users[formValues.user]}</option>
                        <option value={"1"}>Freelancer</option>
                        <option value={"2"}>Cliente</option>
                        {formValues.user!=="0" && (
                          <option value={"0"}>...</option>
                        )}
                    </select>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">Dirección de Email</label>
            <input value={formValues.email} type="email" name="email" className="form-control" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese Email" required />
            <small id="emailHelp" className="form-text text-muted">No compartiremos tu Email.</small>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4 ">Contraseña</label>
            <input value={formValues.password1} type="password" name="password1" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" autoComplete="off" required onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label mt-4">Confirmar Contraseña</label>
            <input value={formValues.password2}  type="password" name="password2" className="form-control" id="exampleInputPasswordConfirm1" placeholder="Confirmar Contraseña" autoComplete="off" onChange={handleChange}/>
            </div>
        </div>
        </fieldset>
        </div>
        )}
        {step === 2 && (
          <div>
            <div className="form__container">
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Paso</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={step+" de 3"} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cityes" className="form-label mt-4">Ciudad residencia:</label>
                    <select className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="cityes" name="idCity" onChange={handleChange}>
                    <option value={0}>Seleccione una ciudad</option>
                      {cityes.length>0 && (
                        <>
                          { cityes.map((city)=>(
                          <option value={city.idCity}>{city.name}</option>
                        ))}
                        </>
                      )}
                        
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="adress" className="form-label mt-4">direccion</label>
                    
                    <input
                    className="form-control" 
                    type="text"
                    required
                    name="adress"
                    value={formValues.adress}
                    onChange={handleChange}
                    placeholder="direccion"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cellphone" className="form-label mt-4">celular</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="cellphone"
                    required
                    value={formValues.cellphone}
                    onChange={handleChange}
                    placeholder="celular"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telphone" className="form-label mt-4">telefono</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="telphone"
                    value={formValues.telphone}
                    onChange={handleChange}
                    placeholder="telefono"
                    />
                </div>
                    
                </div>
            
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="form__container">
            <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Paso</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={step+" de 3"} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="form-label mt-4">Nombre</label>
                    <input
                    required
                    className="form-control" 
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idCard" className="form-label mt-4">Cedula</label>
                    <input
                    className="form-control" 
                    required
                    type="text"
                    name="idCard"
                    value={formValues.idCard}
                    onChange={handleChange}
                    placeholder="Cedula"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label mt-4">Descripcion</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    placeholder="Descripcion"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePhoto" className="form-label mt-4">agregar url de photo:</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="profilePhoto"
                    value={formValues.profilePhoto}
                    onChange={handleChange}
                    placeholder="Descripcion"
                    />
                </div>
            </div>
            </div>
        )}
        {err !== null && (<p className="error-message" style={{marginLeft: "3.8em"}}>{err}</p>)}
        <div className="buttonsContainer"> 
        {step !== 1 && (
          <button className="btne_dark" type="button" style={{margin: 10, display: "inline"}} onClick={prevStep}>
            Anterior
          </button>
        )}
        
        {step !== 3 ? (
          <button style={{margin: 10, display: "inline"}} className="btne" type="button" onClick={nextStep}>
            Siguiente
          </button>
        ) : (
          <button style={{margin: 10, display: "inline"}} className="btne_dark" type="submit">Enviar</button>
        )}
        </div>
      </form>
    </div>
  );
};

export default Formulario;
