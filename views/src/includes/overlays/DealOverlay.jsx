import React, { useState, useRef, useContext, useEffect} from "react";
import "../../styles/overlays.css";
import { AuthContext } from "../../providers/userProvider";

function DealOverlay({onClose, cities}){
  const {userData} = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("/images/defaultUser.png");
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    "city": userData.idCity,
    "place": userData.adress,
    "description": null,
    "dateStart":"",
    "img": null
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
    // Crear un FormData para enviar los datos del formulario y la imagen
    const formData = new FormData();
    formData.append('city', formValues.city);
    formData.append('place', formValues.place);
    formData.append('description', formValues.description);
    formData.append('dateStart', formValues.dateStart);
    formData.append('img', img);
    console.log("succes"+ formValues.city);
    onClose();
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
  };


  const handleIconClick = () => {
    // Simular un clic en el input de tipo file cuando se hace clic en el icono
    fileInputRef.current.click();
  };

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
        setError('Por favor, seleccione una imagen en formato PNG o JPG.');
        setTimeout(()=>{
          setError(null);
        },  4000)
      }
    }
  };

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setTimeout(()=>{
      next();
    },100)
  };

  const back =()=>{
    if(step>1){
      setStep(step-1)
    }
  }

  useEffect(()=>{
    function nameCity(){
      const city = cities.find((cit)=> cit.idCity===formValues.city);
      if(city){
        
        setSelectedCity(city.name);
      }
    }
    nameCity();
  }, [cities, formValues, selectedCity, userData])
    return (
        <div className="overlay">
          <div className="deal-box">
          <h3 style={{color:"black"}}>Realizar solicitud cotizacion</h3>
          <h5 id="pasos">Paso {step} de 2</h5>
          <p style={{color: "red"}}>{error}</p>
          <form onSubmit={handleSubmit}>
            {step===1 && (
              <div>
                <div className="form-group">
                  <label htmlFor="city" className="left form-label mt-4">ciudad donde se realizara el servicio</label>
                  <select onChange={handleChange} className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="exampleFreelancer/client" name="city" >
                  <option value={userData.idCity}>{selectedCity}</option>
                      {cities.length>0 && (
                        cities.map((city) => (<>
                          {city.idCity!==formValues.city && (<>
                            <option value={city.idCity}>{city.name}</option>
                          </>)}
                        </>
                        )
                      )
                      
                      )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="place" className="left form-label mt-4">Direccion o barrio</label>
                  <input value={formValues.place} onChange={handleChange} type="text" name="place" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="¿donde vamos a realizar el servicio?" required />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="left form-label mt-4">Descripcion de trabajo a realizar</label>
                  <textarea onChange={handleChange} value={formValues.description}  type="text" name="description" className="expanded form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cuentanos el servicio que requieres..." required />
                </div>
                  
              </div>
            )}
            {step===2 && (<>
              
              <div className="form-group" style={{marginTop: "2.5em"}}>
                <label htmlFor="place" className="left form-label mt-4">Fecha de inicio (opcional)</label>
                <input onChange={handleChange} value={formValues.dateStart}  type="date" name="dateStart" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="¿donde vamos a realizar el servicio?"/>
              </div>
              <p className="left form-label mt-4">Adregar una imagen: </p>
              <input
                type="file"
                id="img"
                name="img"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg" // Acepta solo imágenes PNG o JPEG
                onChange={handleFileChange}
              />
              <div>
                
              </div>
              <label
                htmlFor="img"
                className="left form-label mt-4"
                style={{ display: 'block', width: '100%', textAlign: 'left' }}
              >
                {img? (<>
                  <img src={preview} alt="imagen referencia" style={{height: "4em"}}/>
                </>): (<>
                  <i
                  className="bx bxs-image-add"
                  style={{ color: '#55acee', fontSize: '4em', cursor: 'pointer' }}
                  onClick={handleIconClick} // Manejar el clic en el icono
                />
                </>)}
                
              </label>
              </>)}
            {step===1 ? (
            <button type="button" className="botn" id="button" onClick={onClose}>Cerrar</button>
            ) : (
              <button type="button" className="botn" id="button" onClick={back}>atras</button>
            )}
             {step ===1 ? (
                <button type="button" className="botn" id="button_b" onClick={(e)=>handleNextClick(e)}>Siguiente</button>
              ) : (
                <button type="submit" className="botn" id="button_b" >Enviar</button>
              )}
            </form>
          </div>
        </div>
      );
}

export default DealOverlay;