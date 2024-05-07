import React, { useContext, useState, useRef } from "react";
import PostData from "../../services/postData"; 
import { AuthContext } from "../../providers/userProvider";
import { useNavigate } from "react-router-dom";

import Alert from "../overlays/alert"

const Postform = ({cities}) => {
    const { userData } = useContext(AuthContext);
    const [img, setImg] = useState(null);
    const [response] = useState(null);
    const [alerta, setAlerta] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState("/images/defaultUser.png")
    const [postValues, setPostValues] = useState({
        title: "",
        description: "",  
    });

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        // Verificar si el archivo es una imagen en formato PNG o JPG
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          // Aquí puedes hacer algo con el archivo, como subirlo a un servidor
        setImg(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        } else {
          setMessage('Por favor, seleccione una imagen en formato PNG o JPG.');
          toggleAlert();
        }
      }
    };

    const toggleAlert=()=>{
      setAlerta(!alerta);
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPostValues({
        ...postValues,
        [name]: value
      });
    };

    const handlePost = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("idClient",userData.idCard);
      formData.append("img", img);
      formData.append("title", postValues.title);
      formData.append("description", postValues.description)
      PostData.createPost(formData, (arg)=>{
        if(arg.result){
          setMessage("El post se ha creado correctamente");
          toggleAlert();
          window.location.href = '/';

        }else{
          setMessage("Oops, ha habido un error :(");
          toggleAlert();
        }
      });
    };



  return (
   <div>
    {response !== null && (<h2>{response.title}</h2>)}
    {alerta? (<>
      <Alert onClose={toggleAlert} message={message}/>
    </>): (<>
    </>)}
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
                required
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
                <span className="t" style={{color: '#3D00B7' }}>Descripción</span> <span className="s" style={{color: '#55ACEE'}}>del servicio</span> 
              </label>
              <textarea
                required
                className="form-control"
                id="descripcion"
                name="description"
                rows="3"
                placeholder="Ingrese descripción de su problema, donde es el problema, que tiene, etc"
                value={postValues.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <label
                htmlFor="img"
                className="left form-label mt-4"
                style={{ display: 'block', width: '100%', textAlign: 'left' }}
          >
            {img? (<>
                  <img id="postImg" src={preview} alt="imagen referencia"/>
                </>): (<>
                  <div className="addContent">
                    <h4>Añadir a tu post <span><i class='bx bxs-image-add'></i></span></h4>
                  </div>                 
                </>)}
          </label>
          <input
                type="file"
                id="img"
                name="img"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg" // Acepta solo imágenes PNG o JPEG
                onChange={handleFileChange}
              />
          <div className="enviar">
            <button id="button" type="submit" className="botn">
                Enviar
            </button>
            <button id="button_b" type="button" className="botn" onClick={()=>{
              navigate("/")
            }}>
                Cancelar
            </button>
          </div>
        </fieldset>
      </div>
    </form>
   </div>
    
  );
};

export default Postform;
