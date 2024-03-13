import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/userProvider';
import MiddleLogoContainer from '../../includes/middleLogoContainer';
import KnowledgeData from '../../services/knowledges';
import { BaseUrl } from '../../util/apiUrl';

const UploadPhotoScreen = () => {
  const {userData} = useContext(AuthContext);
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
  }, []);

  const addKnowledge=(e)=>{
    e.preventDefault();
    if(listOfKnowledge.includes(knowledge)) return;
    const k= [...listOfKnowledge, knowledge];
    console.log(k)
    setListOfKnowledge(k);
    console.log(listOfKnowledge);
  }

  const deleteKnowledge= (e)=>{
    e.preventDefault();
    let k= [...listOfKnowledge];
    k.pop();
    setListOfKnowledge(k);
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(photo===null){
      setPhoto("default");
    }
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append("description", description);
    formData.append("knowledge", listOfKnowledge);
    formData.append("id", userData.idCard);
    formData.append("user", userData.user)
    try {
      const response = await axios.post(BaseUrl+"/update-users",  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Photo uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
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
                  accept="image/*"
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
            {userData.user==="1" && (
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
