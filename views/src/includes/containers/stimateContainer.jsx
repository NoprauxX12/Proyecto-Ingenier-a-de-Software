/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState, useContext} from "react";
import EstimateData from "../../services/estimate";
import SendEstimateOv from "../overlays/sendEstimateOv";
import { AuthContext } from "../../providers/userProvider";
const mesesDelAnio = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
];

const EstimateContainer =({toggleChat, estimateId})=>{
    const [estimate, setEstimate] = useState({});
    const [showRealizar, setShowRealizar]= useState(false);
    const {userData} = useContext(AuthContext);


        useEffect(() => {
            const getEst = () => {
                EstimateData.getEstimateById(estimateId, (res) => {
                    setEstimate(res);
                    const { sendDate, dateStart } = res; // Cambiado de estimate a res
        
                    if (sendDate) {
                        let date = new Date(sendDate);
                        setEstimate((prevEstimate) => ({
                            ...prevEstimate,
                            sendDate: `${date.getDate()} - ${mesesDelAnio[date.getMonth()]} de ${date.getFullYear()}`, // Obtener el día del mes
                        }));
                    }
        
                    if (dateStart) {
                        let date = new Date(dateStart);
                        setEstimate((prevEstimate) => ({
                            ...prevEstimate,
                            dateStart: `${date.getDate()} - ${mesesDelAnio[date.getMonth()]} de ${date.getFullYear()}` , // Obtener el día del mes
                        }));
                    }
                });
            };
            getEst();
        }, [estimateId]); // Eliminado estimate de las dependencias del efecto
            
        function onSend(){
            setShowRealizar(!showRealizar);
        }

    return (<>
        <div style={{
            position: 'absolute',
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            height: '100%',
            maxWidth: '71.4%',
            width: '100%',
            }}>
            <div style={{boxShadow: "2px 2px 2px rgba(100,100,100,0.5)", position: 'absolute', top: '0',  width: '100%', maxWidth: '100', backgroundColor: '#ffffff', padding: '1.16rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '999', float: "left" }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px', display: 'inline-block' }}>        
                    <img src="/images/defaultUser.png" alt="Not" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                            
                </div>
                <span style={{ fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', marginRight: 'auto' }}>{userData.user==="2"? estimate.freelancerName : estimate.clientName}</span>
                {userData.user==="1"? (<>
                    {1===parseInt(estimate.state)&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} onClick={onSend}>Realizar Cotización</a>
                    </>)}
                </>): (<>
                    {3===parseInt(estimate.state)&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} href="/">Aceptar Cotización</a>
                    </>)}
                </>)}
                <span onClick={toggleChat} style={{cursor: "pointer"}}><i className="bx bx-message-dots" style={{color: '#4f4f4f', fontSize: "2.5em"}} /></span>
                <span><i class='bx bx-dots-vertical-rounded' style={{color: '#4f4f4f', fontSize: "2.5em", marginLeft: "1em"}}></i></span>
            </div>
            <div className="contentBox">
                <p style={{float: "right"}}>{estimate.sendDate}</p>
                <h5 style={{}}>{estimate.city} - {estimate.adress}</h5>
                {3===parseInt(estimate.state) && (<>
                    <h1 style={{color: "#3D00B7", fontWeight: "bold", marginBottom: "1em"}}>Valor: <span style={{float: "right", marginRight:"1em",color: "#3D00B7"}}>{estimate.cost}.000</span></h1>
                </>)}
                {showRealizar && (<>
                <SendEstimateOv onClose={onSend} estimateId={estimateId}/>
                </>)}
                <h3>Descripción:</h3>
                <p className="textDescriptio">{estimate.description}</p>
                <h3>Fecha de inicio:</h3>
                <p className="textDescriptio">{estimate.dateStart==="" || estimate.dateStart===null? "No especificada": estimate.dateStart }</p>
                <h3>Foto:</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDcdFBcZWFO_lMPIUCjtQT75VopMSYsu4pG-t89B3cA&s" alt="" />
                </div>
        </div>
        </>)
}

export default EstimateContainer;