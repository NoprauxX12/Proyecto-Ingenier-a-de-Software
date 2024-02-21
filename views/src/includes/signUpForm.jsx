import React, { useState } from "react";

const Formulario = () => {
  const [step, setStep] = useState(1); // Variable para controlar el paso del formulario
  const [formValues, setFormValues] = useState({
    tipo: "0",
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
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formValues);
    // Aquí puedes enviar los datos al servidor o realizar otras operaciones necesarias
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
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
                        <option value={0}>Seleccione tipo usuario</option>
                        <option value={1}>Freelancer</option>
                        <option value={2}>Cliente</option>
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
            {formValues.password1!== formValues.password2 && (<p className="error-message">las contraseñas no coinciden.</p>)}
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
                    
                    <label htmlFor="idCity" className="form-label mt-4">ciudad</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="idCity"
                    value={formValues.idCity}
                    onChange={handleChange}
                    placeholder="por realizar"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adress" className="form-label mt-4">direccion</label>
                    
                    <input
                    className="form-control" 
                    type="text"
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
                    className="form-control" 
                    type="text"
                    name="name"
                    value={formValues.field7}
                    onChange={handleChange}
                    placeholder="Nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idCard" className="form-label mt-4">Cedula</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="idCard"
                    value={formValues.field8}
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
                    value={formValues.field9}
                    onChange={handleChange}
                    placeholder="Descripcion"
                    />
                </div>
            </div>
                <div>
            { parseInt(formValues.tipo)===1 && (
                
                    <div className="form-group">
                    <label htmlFor="rut">RUT:</label>
                    <input type="file" id="rut" name="rut" accept=".pdf,.doc,.docx" />
                    </div>
                
            )}
            </div>
          </div>
        )}
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
