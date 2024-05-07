import React, { useState, useRef, useContext, useEffect} from "react";
import "../../styles/overlays.css";
import { AuthContext } from "../../providers/userProvider";
import { useSocket } from "../../providers/socketProvider";
import EstimateData from "../../services/estimate";

function DealOverlay({onClose, cities, idFreelancer}){
  const {userData} = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("/images/defaultUser.png");
  const fileInputRef = useRef(null);
  const socket = useSocket();
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
    if(step===2){
    const formData = new FormData();
    formData.append('city', formValues.city);
    formData.append("user", userData.user);
    formData.append("idClient", userData.idCard);
    formData.append("idFreelancer", idFreelancer);
    formData.append('place', formValues.place);
    formData.append('description', formValues.description);
    formData.append('dateStart', formValues.dateStart);
    formData.append('img', img);

    EstimateData.Create(formData,(res)=>{
      setTimeout(onClose(res),500);
      let idToNotify = userData.user==="2"? res.idFreelancer+"1" : res.idClient+"2";
      socket.emit("newEstimate", {autorId: userData.idCard+userData.user,
      receptorId: idToNotify});
    })
    
  }else{
    setTimeout(()=>{
      next();
    },100);
  }
    
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
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
          <h3 style={{color:"black"}}>Realizar solicitud cotización</h3>
          <h5 id="pasos">Paso {step} de 2</h5>
          <p style={{color: "red"}}>{error}</p>
          <form onSubmit={handleSubmit}>
            {step===1 && (
              <div>
                <div className="form-group">
                  <label htmlFor="city" className="left form-label mt-4">ciudad donde se realizará el servicio</label>
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
                  <label htmlFor="place" className="left form-label mt-4">Dirección o barrio</label>
                  <input value={formValues.place} onChange={handleChange} type="text" name="place" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="¿Dónde vamos a realizar el servicio?" required />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="left form-label mt-4">Descripción de trabajo a realizar</label>
                  <textarea onChange={handleChange} value={formValues.description}  type="text" name="description" className="expanded form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cuéntanos el servicio que requieres..." required />
                </div>
                  
              </div>
            )}
            {step===2 && (<>
              
              <div className="form-group" style={{marginTop: "2.5em"}}>
                <label htmlFor="place" className="left form-label mt-4">Fecha de inicio (opcional)</label>
                <input onChange={handleChange} value={formValues.dateStart}  type="date" name="dateStart" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="¿donde vamos a realizar el servicio?"/>
              </div>
              <p className="left form-label mt-4">Agregar una imagen: </p>
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
                <button type="submit" className="botn" id="button_b">Siguiente</button>
              ) : (
                <button type="submit" className="botn" id="button_b" >Enviar</button>
              )}
            </form>
          </div>
        </div>
      );
}

export default DealOverlay;