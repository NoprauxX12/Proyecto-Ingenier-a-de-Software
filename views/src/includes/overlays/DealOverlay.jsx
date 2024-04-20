import React from "react";
import "../../styles/overlays.css";

function DealOverlay({onClose}){
    return (
        <div className="overlay">
          <div className="deal-box">
            <h3 style={{color:"black"}}>Solicitud cotizacion</h3>
            <p>Voluptate minim consectetur non eu lorem upsum.</p>
            <form action="/">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="left form-label mt-4">Descripcion de trabajo a realizar</label>
                <textarea  type="text" name="Desciption" className="expanded form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cuentanos el servicio que requieres..." required />
              </div>
            </form>
            <button className="botn" id="button" onClick={onClose}>Cerrar</button>
            <button className="botn" id="button_b" onClick={onClose}>Enviar</button>
          </div>
        </div>
      );
}

export default DealOverlay;