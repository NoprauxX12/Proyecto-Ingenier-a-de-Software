
import React, {  useContext, useState } from "react";
import PostData from "../services/postData";
import { AuthContext } from "../providers/userProvider";

const Postform = () => {
    const {userData} = useContext(AuthContext);
    const [response, setResponse] = useState(null);
    const [postValues, setPostValues] = useState({
        title: "",
        description: "",
        idClient: userData.idCard,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPostValues({
        ...postValues,
        [name]: value
      });
      
    };

    const handlePost = (e) => {
      PostData(postValues, (arg)=>{
        if(arg.result){
          alert("el post se ha creado correctamnete");
        }else{
          alert("oops ha habido un error :(");
        }
      })
    };


  return (
   <div>
    {response !== null && (<h2>{response.title}</h2>)}
    <form onSubmit={handlePost}>
      <div className="cuadro">
        <fieldset>
          <legend className="Info"><span style={{color: '#3D00B7'}}>Nuevo</span> <span style={{color:'#55ACEE' }}>Servicio</span></legend>
          <div className="mb-3">
            <div className="titulo">
              <label htmlFor="titulo" className="form-label">
                <span className="t" style={{color: '#3D00B7'}}>Título</span> <span className="s" style={{color:'#55ACEE' }}>de servicio</span> 
              </label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Ingrese el título de servicio"
                value={postValues.title}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="description">
              <label htmlFor="descripcion" className="form-label">
                <span className="t" style={{color: '#3D00B7' }}>Descripción</span> <span className="s" style={{color: '#55ACEE'}}>de servicio</span> 
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                rows="3"
                placeholder="Ingrese la descripción de servicio"
                value={postValues.description}
              ></textarea>
            </div>
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="cedula" className="form-label">
                Cédula del Cliente
              </label>
              <input
                type="text"
                className="form-control"
                id="cedula"
                placeholder="Ingrese la cédula del cliente"
                value={postValues.idClient}
              />
            </div>
          </div>
          <div className="enviar">
            <button type="submit" className="btn btn-primary">
                Enviar
            </button>
          </div>
          
        </fieldset>
      </div>
    </form>
   </div>
    
  );
};

export default Postform;