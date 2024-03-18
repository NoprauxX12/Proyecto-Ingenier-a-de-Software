/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
//components

const ClientsMainContainer=(props)=>{
    const {search} = props;
    const text= "Resultados de ";
    return (
      <div>
        <div className="discoberDontainer">
          <h2>
            {search===null ? (
              <>
              Explora todos los freelancers
              </>
            ):(
              <>
              {text+search+" en: "}
              </>
            )}
          </h2>
        </div>
    </div>

    );
}

export default ClientsMainContainer;