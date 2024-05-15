/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useContext} from "react";
import { AuthContext } from "../../providers/userProvider";
import Urls from "../../util/urls";
import "../../styles/card.css";

import DealOverlay from "../overlays/DealOverlay";
import SignUpAlert from "../overlays/singUpSugerence";
import Alert from "../overlays/alert";

const Card = (props) => {
    const { freelancer, cities } = props;
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage]= useState("se ha enviado la cotizacion");
    const [showDealOverlay, setShowDealOverlay]= useState(false);
    const [showSingUpSugerence, setShowSingUpSugerence]= useState(false);
    const {userData} = useContext(AuthContext);

    const toggleOverlay=(res=true)=>{
      if(userData!==null){
        setShowDealOverlay(!showDealOverlay);
      }else{
        setShowSingUpSugerence(!showSingUpSugerence);
        if(!res){
          setMessage("oops, ha habido un error :(")
        }
      }
    }

    
    if (!freelancer) {
        return null; // Manejar el caso de datos incompletos o nulos
    }
    return (
      <>
      {showSingUpSugerence && (<>
          <SignUpAlert onClose={toggleOverlay} />
        </>)}
      {showDealOverlay && (<>
          <DealOverlay idFreelancer={freelancer.idFreelancer} cities={cities} onClose={toggleOverlay}/>
        </>)}
        {showAlert&& (<>
          <Alert message={message} onClose={()=>{
            setShowAlert(false);
          }}/>
          </>)}
      <div className="card__item card" style={{marginBottom: "0.5em"}}>
          {!freelancer.profilePhoto? (<>
          <a href={Urls.viewProfile+`/?id=${freelancer.idFreelancer}&usertype=1`}>
            <img src="/images/defaultUser.png" className="card-img-top"  alt="usuario por defecto" style={{ maxHeight: "10rem", objectFit: "contain", cursor:"pointer",borderRadius:"20px" }} />
          </a>
          </>):(
            <>
            <a href={Urls.viewProfile+`/?id=${freelancer.idFreelancer}&usertype=1`}>
              <img src={`data:image/jpeg;base64,${freelancer.profilePhoto}`} style={{ maxHeight:"10em", objectFit: "contain", cursor:"pointer", borderRadius:"20px" }} className="card-img-top" alt="Profile" />
            </a>
            </>
          )}
            
            <div className="card-body">
              <a href={Urls.viewProfile+`/?id=${freelancer.idFreelancer}&usertype=1`} style={{textDecoration: "none", color: "inherit"}}>
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
