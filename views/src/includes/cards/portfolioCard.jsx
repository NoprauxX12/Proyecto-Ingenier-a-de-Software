import React, { useState } from 'react';
import "../../styles/card.css";
import ViewPortfolio from "../overlays/viewPortfolio";

const PortfolioCard = (props) => {
    const { portfolioItem } = props;
    const [showPortfolio, setShowPortfolio] = useState(false);
  
    if (!portfolioItem) {
      return null;
    }
  
    const handleClick = () =>{
        setShowPortfolio(true);
    }

    return (
    <>
      <div className="portfolio-card-wrapper" onClick={handleClick} style={{cursor:"pointer"}}>
        <div className="card" style={{ width: "15rem" }}> 
          <div className="card-body" style={{ height: "15rem" }}>
            {!portfolioItem.img ? (
              <>
                <img
                  src="/images/defaultUser.png"
                  className="card-img-top"
                  alt="Imagen por defecto"
                  style={{ maxHeight: "8rem", objectFit: "contain" }}
                />
              </>   
            ) : (
              <>
                <img
                  src={`data:image/jpeg;base64,${portfolioItem.img}`}
                  className="card-img-top"
                  alt="Trabajo Previo"
                  style={{ maxHeight: "8rem", objectFit: "contain" }}
                />
              </>
            )}
            <h5 className="card-title" style={{fontWeight:"bolder",marginTop:"10px"}}>{portfolioItem.title.length>21 ? portfolioItem.title.slice(0,20)+"...":portfolioItem.title}</h5>
            <p className="card-text">
              {portfolioItem.description.length > 26
                ? portfolioItem.description.slice(0, 25) + "..."
                : portfolioItem.description}
            </p>
            <p className="card-text">
              <small className="text-muted">
                {portfolioItem.date === null
                  ? ""
                  : portfolioItem.date.slice(0, 10)}
              </small>
            </p>
          </div>
        </div>
      </div>
      {showPortfolio && <ViewPortfolio portfolioItem={portfolioItem} setShowPortfolio={setShowPortfolio}/>}
    </>
    );
  };

export default PortfolioCard;