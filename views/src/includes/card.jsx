import React from "react";

const Card= (props)=>{
    const { freelancer } = props; 
    return(
        <>
        <div className="card__item card">
                    <img src={freelancer.url} class="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{freelancer.name}</h5>
                      <p className="card-text">{freelancer.description}</p>
                      <a href="/" className="btne btn-primary">Go somewhere</a>
                    </div>
                  </div>
        </>
    );
        
    
}

export default Card;