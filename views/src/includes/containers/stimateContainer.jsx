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

const EstimateContainer =({toggleChat, estimateId, socket, show})=>{
    const [estimate, setEstimate] = useState({});
    const [showRealizar, setShowRealizar]= useState(false);
    const [showAsk, setshowAsk]= useState(false);
    const {userData} = useContext(AuthContext);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;
        useEffect(() => {
            const getEst = () => {
                EstimateData.getEstimateById(estimateId, userData.user, (res) => {
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
            socket.on("recive_cotizacion", (data)=>{
                snd.play();
                getEst();
            })
            getEst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [estimateId, socket]); // Eliminado estimate de las dependencias del efecto

        const onAcept=()=>{
            EstimateData.setState({state: 4, id: estimateId}, (res)=>{
                console.log(res)
            })
            show();
            setshowAsk(false);
        }
            
        function onSend(value){
            setShowRealizar(!showRealizar);
            setEstimate({...estimate, state: value.state, cost: value.cost.toString().substring(0,2)});
            socket.emit("send_estimate", {
                room_id: estimateId, 
                estimate: value
            });
        }

        function onClose(){
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
                {estimate.profilePhoto ? (<>
                    <img src={`data:image/jpeg;base64,${estimate.profilePhoto}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                </>):(<>
                    <img src="/images/defaultUser.png" alt="Not" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                            
                </>)}  
                    
                </div>
                <span style={{ fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', marginRight: 'auto' }}>{userData.user==="2"? estimate.freelancerName : estimate.clientName}</span>
                {userData.user==="1"? (<>
                    {1===parseInt(estimate.state)&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} onClick={onClose}>Realizar Cotización</a>
                    </>)}
                </>): (<>
                    {3===parseInt(estimate.state)&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} onClick={()=>{setshowAsk(true)}}>Aceptar Cotización</a>
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
                <SendEstimateOv  onSend={onSend} onClose={onClose} estimateId={estimateId}/>
                </>)}
                {showAsk && (<>
                <AskOv  onAcept={onAcept} onClose={()=>{setshowAsk(false)}} cost={estimate.cost}/>
                </>)}
                <h3>Descripción:</h3>
                <p className="textDescriptio">{estimate.description}</p>
                <h3>Fecha de inicio:</h3>
                <p className="textDescriptio">{estimate.dateStart==="" || estimate.dateStart===null? "No especificada": estimate.dateStart }</p>
                <h3>Foto: </h3>
                {estimate.dercriptiveImg && (<>
                    <img src={`data:image/jpeg;base64,${estimate.dercriptiveImg}`} alt="descrictive img" style={{height: "40%"}}/>
                </>)}
            </div>
        </div>
        </>)
}

export default EstimateContainer;


const AskOv= ({onClose, cost, onAcept, show})=>{
    return(<>
    <div className="overlay" >
        <div className="deal-box" style={{height:"30%", width: "40%"}} >
           <div style={{width: "90%"}}>
            <h2 style={{color:"#55ACEE", fontWeight: "bold"}}> <span style={{color:"#3D00B7", fontWeight: "bold"}}>Quieres Aceptar </span> la cotizacion</h2>
                    <h4>por: {cost} <span style={{marginLeft: "0.2em", marginTop: "0.2em"}}>mil pesos</span></h4>
                    <button type="button" className="botn" id="button_b" onClick={onClose} style={{display: "inline-block", marginBottom: "0.1em"}}>Cancelar</button>
                    <button type="button" className="botn" id="button" onClick={onAcept} style={{display: "inline-block", marginBottom: "0.1em"}}>Aceptar</button>
           </div>
        </div>

    </div>
    </>);
}