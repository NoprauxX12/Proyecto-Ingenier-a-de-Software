import React, { useContext, useState, useRef, useEffect } from "react";
import PostData from "../../services/postData"; 
import { AuthContext } from "../../providers/userProvider";
import { useNavigate } from "react-router-dom";
import TownData from "../../services/towns";
import Alert from "../overlays/alert"

const Postform = () => {
    const { userData } = useContext(AuthContext);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [img, setImg] = useState(null);
    const [response] = useState(null);
    const [alerta, setAlerta] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState("/images/defaultUser.png")
    const [postValues, setPostValues] = useState({
        title: "",
        city: userData.idCity,
        description: "",
        "place": userData.adress,
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
      formData.append("description", postValues.description);
      formData.append("place", postValues.place);
      formData.append("city", postValues.city);
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

    useEffect(()=>{
      const fetchCities = async () => {
        TownData.fetchCityes((res) => {
          setCities(res); // Aquí accedes a res.data en lugar de res
        });
      
      };
      function nameCity(){
        const city = cities.find((cit)=> cit.idCity===postValues.city);
        if(city){
          
          setSelectedCity(city.name);
        }
      }
      fetchCities();
      nameCity();
    }, [cities, postValues, selectedCity, userData])

  return (
   <div>
    {response !== null && (<h2>{response.title}</h2>)}
    {alerta? (<>
      <Alert onClose={toggleAlert} message={message}/>
    </>): (<>
    </>)}
    <form onSubmit={handlePost}>
    <legend className="Info"><span style={{color: '#3D00B7'}}>Nuevo</span> <span style={{color:'#55ACEE' }}>Servicio</span></legend>
      <div className="cuadro">
          <section className="cuadrito">
            <div className="form-group ">
                <label htmlFor="titulo" className="left form-label mt-4">Título del servicio </label>
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
          <div className="form-group ">
              <label htmlFor="descripcion" className="left form-label mt-4">Descripción del servicio</label>
              <textarea
                required
                className="form-control short"
                id="descripcion"
                name="description"
                rows="3"
                placeholder="Ingrese descripción de su problema, donde es el problema, que tiene, etc"
                value={postValues.description}
                onChange={handleChange}
              ></textarea>
          </div> 
          </section>
          <section className="cuadrito" >
            <div className="form-group">
              <label htmlFor="city" className="left form-label mt-4">ciudad donde se realizará el servicio</label>
              <select onChange={handleChange} className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="exampleFreelancer/client" name="city" >
                  <option value={userData.idCity}>{selectedCity}</option>
                      {cities.length>0 && (
                        cities.map((city) => (<>
                          {city.idCity!==postValues.city && (<>
                            <option value={city.idCity}>{city.name}</option>
                          </>)}
                        </>
                        )
                      )
                      
                      )}
                  </select>
            </div>
            <div className="form-group">
              <label htmlFor="place" className="left  form-label mt-4">Dirección o barrio</label>
              <input value={postValues.place} onChange={handleChange} type="text" name="place" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="¿Dónde vamos a realizar el servicio?" required />
            </div>
          </section>
      </div>
      <div style={{width:"90%"}}>
            <label
                  htmlFor="img"
                  className="left form-label mt-4"
                  style={{ display: 'block', width: '100%', textAlign: 'left' }}
            >
              {img? (<>
                    <img id="postImg" src={preview} alt="imagen referencia"/>
                  </>): (<>
                    <div className="addContent">
                      <h4>Añadir a tu post <span ><i class='bx bxs-image-add'></i></span></h4>
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
          </div>
    </form>
   </div>
    
  );
};

export default Postform;
