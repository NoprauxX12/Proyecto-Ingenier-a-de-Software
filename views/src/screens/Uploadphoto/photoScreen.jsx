import React, { useState } from 'react';
import axios from 'axios';
import MiddleLogoContainer from '../../includes/middleLogoContainer';

const UploadPhotoScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("/images/defaultUser.png");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    try {
      const response = await axios.post('/upload', formData, {
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
            <label htmlFor="photo">Seleccionar foto:</label>
            <input
              type="file"
              className="form-control-file"
              id="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
            </div>
          )}
          <div className="form-group">
                    <label htmlFor="description" className="form-label mt-4">Descripcion</label>
                    <input
                    className="form-control" 
                    type="text"
                    name="description"
                    onChange={handleChange}
                    placeholder="Descripcion"
                    />
                </div>
          <button type="submit" className="btn btn-primary mt-3">Subir Foto</button>
        </form>
        </div>
      </fieldset>
    </div>
  );
};

export default UploadPhotoScreen;
