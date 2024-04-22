/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useContext} from "react";
import { AuthContext } from "../../providers/userProvider";
import Urls from "../../util/urls";
import "../../styles/card.css";

import DealOverlay from "../overlays/DealOverlay";
import SignUpAlert from "../overlays/singUpSugerence";

const Card = (props) => {
    const { freelancer, cities } = props;
    const [showDealOverlay, setShowDealOverlay]= useState(false);
    const [showSingUpSugerence, setShowSingUpSugerence]= useState(false);
    const {userData} = useContext(AuthContext);

    const toggleOverlay=()=>{
      if(userData!==null){
        setShowDealOverlay(!showDealOverlay);
      }else{
        setShowSingUpSugerence(!showSingUpSugerence);
      }
    }

    
    if (!freelancer) {
        return null; // Manejar el caso de datos incompletos o nulos
    }
    console.log("freelancer.profilePhoto.data")
    return (
      <>
      {showSingUpSugerence && (<>
          <SignUpAlert onClose={toggleOverlay} />
        </>)}
      {showDealOverlay && (<>
          <DealOverlay idFreelancer={freelancer.idFreelancer} cities={cities} onClose={toggleOverlay}/>
        </>)}
      
      <div className="card__item card" style={{marginBottom: "0.5em"}}>
          {!freelancer.profilePhoto? (<>
          <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`}>
            <img src="/images/defaultUser.png" className="card-img-top"  alt="usuario por defecto" style={{width: "12em",margin: "auto", cursor: "pointer"}} />
          </a>
          </>):(
            <>
            <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`}>
              <img src={`data:image/jpeg;base64,${freelancer.profilePhoto}`} id={"cardIm"} className="card-img-top" alt="Profile" />
            </a>
            </>
          )}
            
            <div className="card-body">
              <a href={Urls.profile+`/?id=${freelancer.idFreelancer}`} style={{textDecoration: "none", color: "inherit"}}>
                <h5 className="card-title">{freelancer.name}</h5>
              </a>
              <p style={{display: "block"}}>{freelancer.description.length>26? freelancer.description.slice(0,25)+"..." : freelancer.description}</p>
            <div className="city-icon">
              <a onClick={toggleOverlay} className="btne_dark" style={{fontSize: "0.8em"}}><p style={{color: "#fff", margin:"0 0.5em", fontWeight: "bold"}}>Cotizar</p></a>
              <p style={{padding: "0.2em", marginTop: "0.5em", marginLeft: "1em", display: "flex", flexDirection: "row"}}><i className="bx bxs-star" style={{color: '#55ACEE', fontSize: "1.5em"}} /><span style={{color: "#55ACEE", marginLeft: "0.5em", fontSize: "1em"}}> 4/5</span> </p>
            </div>
            </div>
        </div>
      </>
    );
}

export default Card;
