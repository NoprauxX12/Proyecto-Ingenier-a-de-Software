import React, {useState} from "react";
import EstimateData from "../../services/estimate.js";
import "../../styles/overlays.css";

const SendEstimateOv= ({onClose, estimateId})=>{
    const [cost, setCost] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        // Remover cualquier caracter que no sea un dígito
        const sanitizedValue = value.replace(/[^\d]/g, '');
        // Formatear el valor con separadores de miles
        const formattedValue = new Intl.NumberFormat().format(sanitizedValue);
        setCost(formattedValue);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        EstimateData.setState({state: 3, id: estimateId,cost: cost}, (res)=>{
            console.log(res)
        })
        onClose();
    }
    return(<>
    <div className="overlay" >
        <div className="deal-box" style={{height:"40%", width: "30%"}} >
           <div style={{width: "90%"}}>
            <h3 style={{color:"#55ACEE", fontWeight: "bold"}}> <span style={{color:"#3D00B7", fontWeight: "bold"}}>Enviar la </span> cotizacion</h3>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <input
                    className="form-control"
                    type="text" // Usamos text en lugar de number para permitir caracteres de separación de miles
                    value={cost}
                    onChange={handleChange}
                    placeholder="$ Ingrese el costo de el servicio "
                    />
                    <textarea placeholder="observaciones" type="text" className="form-control" style={{maxHeight:"4em"}}/>
                    <button type="button" className="botn" id="button_b" onClick={onClose} style={{display: "inline-block"}}>Cerrar</button>
                    <button type="submit" className="botn" id="button">Enviar</button>
                </form>
           </div>
        </div>

    </div>
    </>);
}

export default SendEstimateOv;