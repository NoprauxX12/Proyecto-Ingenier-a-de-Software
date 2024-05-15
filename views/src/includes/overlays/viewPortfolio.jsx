import React, { useState, useContext } from 'react';
import "../../styles/overlays.css";
import { AuthContext } from '../../providers/userProvider';
import EditPortfolio from './editPortfolio';

function ViewPortfolio({portfolioItem,setShowPortfolio}){
    const [editPortfolio, setEditPortfolio] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const {userData} = useContext(AuthContext);
    const id = params.get("id");

  const onSubmit = async () => {
    setShowPortfolio(false);
  };

  const onEdit = async () => {
    setEditPortfolio(true);
  };

  return (
    <>
      <div className="overlay">
        <div className="deal-box" style={{overflow: "auto"}}>
          <div className="title-container">
            <h2 style={{color:"black", fontWeight:"bolder",marginBottom:"0px"}}>{portfolioItem.title}</h2>
            <div style={{display:"flex",gap:"10px"}}>
                {userData && (<>
                    {userData.idCard === id && (<>
                        <button type="button" onClick={onEdit} style={{border:"transparent", background:"transparent", margin:"0px"}}> <i class='bx bx-edit-alt' style={{color:"gray", fontSize:"30px"}}></i> </button>
                    </>)}
                </>
                )}
                <button type="button" onClick={onSubmit} style={{border:"transparent", background:"transparent", margin:"0px"}}> <i class='bx bx-x-circle exit-button' style={{color:"gray", fontSize:"30px"}}></i> </button>
            </div>
          </div>
            <div className="form-group">
              <textarea readOnly value={portfolioItem.description} style={{ cursor:"default", outline: "none" }}  type="text" name="description" className="expanded form-control" />
            </div>
            <div className="form-group" style={{marginBottom:"10px"}}>
              <label htmlFor="date" className="left form-label mt-3">Fecha de realización</label>
              <input readOnly value={portfolioItem.date === null ? "" : portfolioItem.date.slice(0, 10)}  style={{ cursor:"default", outline: "none" }} type="text" name="date" className="form-control" />
            </div>
            {portfolioItem.img && (<>
                <div style={{marginBottom:"20px", marginTop:"20px",display: "flex", justifyContent: "center"}}>
                  <img src={`data:image/jpeg;base64,${portfolioItem.img}`} alt="imagen referencia" style={{ maxHeight: "20em", objectFit: "contain" }}/>
                </div>
            </>)}
        </div>
      </div>
      {editPortfolio && <EditPortfolio portfolioItem={portfolioItem} setEditPortfolio={setEditPortfolio}/>}
    </>

  );
}

export default ViewPortfolio;