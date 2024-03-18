import React, { useContext, useState } from "react";
import PostData from "../../services/postData"; 
import { AuthContext } from "../../providers/userProvider";


const Postform = () => {
    const { userData } = useContext(AuthContext);
    const [response, setResponse] = useState(null);
    const [postValues, setPostValues] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPostValues({
        ...postValues,
        [name]: value
      });
    };

    const handlePost = (e) => {
      e.preventDefault();
      PostData.createPost({ ...postValues, idClient: userData.idCard }, (arg)=>{
        if(arg.result){
          alert("El post se ha creado correctamente");
          window.location.href = '/';

        }else{
          alert("Oops, ha habido un error :(");
        }
      });
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
                name="title"
                placeholder="Ingrese el título de servicio"
                value={postValues.title}
                onChange={handleChange}
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
                name="description"
                rows="3"
                placeholder="Ingrese la descripción de servicio"
                value={postValues.description}
                onChange={handleChange}
              ></textarea>
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
