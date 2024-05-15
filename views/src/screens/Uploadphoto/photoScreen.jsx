import React, { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/userProvider';
import UserData from '../../services/user';
import Urls from '../../util/urls';
//componets
import Alert from '../../includes/overlays/alert';
import MiddleLogoContainer from '../../includes/containers/middleLogoContainer';
import KnowledgeData from '../../services/knowledges';

const UploadPhotoScreen = () => {
  const {userData, login} = useContext(AuthContext);
  const { user, name, idCard, email, idCity, telphone, adress, password1, cellphone } = userData;
  // states
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(null);
  const [knowledge, setKnowLd] = useState([]);
  const [knowledges, setKnowLds] = useState([]);
  const [listOfKnowledge, setListOfKnowledge]= useState([]);
  const [preview, setPreview] = useState("/images/defaultUser.png");
// refs
  const fileInputRef = useRef();
  const addButtonRef = useRef();
  const deleteButtonRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage]= useState("");

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    if(!userData.password1) window.location.href =Urls.home;
    const GetKnowledge= async ()=>{
      try {
        KnowledgeData.fetchAll((data)=>{
          setKnowLds(data);
        });
      } catch (error) {
        console.log(error);
      }
      
    };
    GetKnowledge();
  }, [userData]);

  const addKnowledge=(e)=>{
    e.preventDefault();
    if(knowledge!=="00"){
      if(listOfKnowledge.includes(knowledge)) return;
    const k= [...listOfKnowledge, knowledge];
    console.log(k)
    setListOfKnowledge(k);
    }else{
      setMesage("debe agregar un conocimiento");
        toggleAlert();
    }
  }

  const deleteKnowledge= (e)=>{
    e.preventDefault();
    let k= [...listOfKnowledge];
    k.pop();
    setListOfKnowledge(k);
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo === null) {
      setPhoto("default");
    }
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append("description", description);
    formData.append("knowledge", listOfKnowledge);
    formData.append("idCard", idCard);
    formData.append("user", user);
    formData.append("name", name);
    formData.append("telphone", telphone);
    formData.append("adress", adress);
    formData.append("email", email);
    formData.append("password", password1);
    formData.append("idCity", idCity);
    formData.append("cellphone", cellphone);
    try {
      UserData.signUp(formData, (res) => {
        console.log(res);
        if (res.result) {
          login({
            user: user,
            name: name,
            idCard: idCard,
            email: email,
            idCity: idCity,
            adress: adress
          });
          setMesage("Te has registrado con éxito!");
          toggleAlert();
          setTimeout(() => {
            window.location.href = Urls.home;
          }, 100); // Aquí colocamos el setTimeout
        } else {
          setMesage("Oops, ha habido un error :(");
          toggleAlert();
        }
      })
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      {showAlert && (
        <Alert
          message={message}
          onClose={toggleAlert}
        />
      )}
      <MiddleLogoContainer hide={true} />
      <fieldset>
        <div className="form__container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Subir Foto</h2>
              <label htmlFor="photo">
                <div className="preview-container" style={{ cursor: 'pointer' }}>
                  <img src={preview} alt="Preview" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="form-control-file"
                  id="photo"
                  accept="image/png, image/jpeg"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label mt-4">Descripcion</label>
              <input
                className="form-control"
                onChange={(e)=>{
                  setDescription(e.target.value);
                }}
                type="text"
                name="description"
                placeholder="Descripcion"
              />
            </div>
            {user==="1" && (
              <>
              <div className="form-group">
                
                    {listOfKnowledge.length>0 && (
                    <div className="form-group">
                      <label htmlFor="seleccionados" className="form-label mt-4">Seleccionados:</label>
                      <select name="seleccionados" id="" className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }}>
                        {listOfKnowledge.map((e)=>(
                          <option>{e[1]}</option>
                          ))}
                      </select>
                    
                    </div>
                    )}
                    <label htmlFor="knowledges" className="form-label mt-4">Conocimiento Tecnico:</label>
                    <select className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="knowledges" name="knowledges" onChange={async (e)=>{
                      const val= e.target.value.split(",");
                      console.log(val)
                      setKnowLd(val);
                    }}>
                      {knowledges.length>0 && (
                        <>
                          { knowledges.map((k)=>(
                          <option value={[k.idTechnicalKnowledge, k.title]}>{k.title}</option>
                        ))}
                        </>
                      )}
                    </select>
                    <label htmlFor="addKnowledge">
                        <div className="preview-container" style={{ cursor: 'pointer' }}>
                          <img src="/images/mas.png" alt="addKnowledge" className="rounded-circle icon" style={{width: "2em", margin: "0.5em"}}/>
                        </div>
                        <input
                          type="button"
                          ref={addButtonRef}
                          className="form-control-file"
                          id="addKnowledge"
                          onClick={addKnowledge}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <label htmlFor="cleanKnowledge">
                        <div className="preview-container" style={{ cursor: 'pointer' }}>
                          <img src="/images/menos.png" alt="addKnowledge" className="rounded-circle icon" style={{width: "2em", margin: "0.5em", marginLeft: "2em"}}/>
                        </div>
                        <input
                          type="button"
                          ref={deleteButtonRef}
                          className="form-control-file"
                          id="cleanKnowledge"
                          onClick={deleteKnowledge}
                          style={{ display: 'none' }}
                        />
                      </label>
                </div>
              </>
            )}
            <button type="submit" className="btne_dark btn-primary mt-3">Guardar</button>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default UploadPhotoScreen;
