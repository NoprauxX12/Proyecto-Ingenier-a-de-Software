import React, { useState, useContext, useRef} from "react";
import "../../styles/overlays.css";
import { AuthContext } from "../../providers/userProvider";
import UserData from "../../services/user";


function Portfolio({showOverlayPortfolio, setshowOverlayPortfolio}){
  const {userData} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("/images/defaultUser.png");
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: ""
  });


  const handleInputImg = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
      setImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      } else {
        setError('Por favor, seleccione una imagen en formato PNG o JPG.');
        setTimeout(()=>{
          setError(null);
        },4000)
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('idFreelancer', userData.idCard);
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('date', formValues.date);
    if(img){
      formData.append('img', img);
    };
    
    UserData.addPreviousWork(formData,(arg) => {
        if (arg.response) {
          alert("¡Portafolio actualizado exitosamente!");
        } else {
          alert("Oops, ha ocurrido un error");
        }
      }
    );
      setTimeout(()=>{
        onSubmit()
      },1000);
  };


  const onSubmit = async () => {
    setshowOverlayPortfolio(false);
  };

  return (
    <>
      <div className="overlay">
        <div className="deal-box" style={{overflow: "auto"}}>
          <div className="title-container">
            <h2 style={{color:"black", fontWeight:"bolder",marginBottom:"0px"}}>Publicar un Trabajo Previo</h2>
            <button type="button" onClick={onSubmit} style={{border:"transparent", background:"transparent", margin:"0px"}}> <i class='bx bx-x-circle exit-button' style={{color:"gray", fontSize:"30px"}}></i> </button>
          </div>
          <p style={{color: "red"}}>{error}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="left form-label mt-0">Título</label>
              <input value={formValues.title} onChange={(e)=>setFormValues({...formValues, title: e.target.value})} type="text" name="title" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="left form-label mt-3">Descripción del trabajo realizado</label>
              <textarea value={formValues.description} onChange={(e)=>setFormValues({...formValues, description: e.target.value})}  type="text" name="description" className="expand form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="date" className="left form-label mt-3">Fecha de realización (opcional)</label>
              <input value={formValues.date} onChange={(e)=>setFormValues({...formValues, date: e.target.value})}  type="date" name="date" className="form-control" />
            </div>
              <p className="left form-label mt-3">Agregar una imagen: </p>
              <input
                type="file"
                id="img"
                name="img"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg" // Acepta solo imágenes PNG o JPEG
                onChange={handleInputImg}
              /> 
            <div>
              <label htmlFor="img" className="left form-label mt-0" style={{ display: 'block', width: '100%', textAlign: 'left', margin:"0px" }}>
                {img? (<>
                  <img src={preview} alt="imagen referencia" style={{height: "4em"}}/>
                </>): (<>
                  <i className="bx bxs-image-add" style={{ color: '#55acee', fontSize: '4em', cursor: 'pointer' }}/>
                </>)}
              </label>
                <button type="submit" className="botn" id="button" >Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}

export default Portfolio;