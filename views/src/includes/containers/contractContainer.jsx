/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState, useContext} from "react";
import EstimateData from "../../services/estimate";
import { AuthContext } from "../../providers/userProvider";
import MessageData from "../../services/message";
import Formulario from "../overlays/ratingOverlay";
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

const ContractContainer =({toggleChat, estimateId, socket, show, onOpen})=>{
    const [estimate, setEstimate] = useState({});
    const [showRating, setShowRating] = useState(false);
    const [showRealizar, setShowRealizar]= useState(false);
    const [showAsk, setshowAsk]= useState(false);
    const {userData} = useContext(AuthContext);
    var snd = new Audio('http://localhost:3000/sounds/sendmsg.mp3');
    snd.volume = 0.05;
        useEffect(() => {
            const getEst = () => {
                EstimateData.getEstimateById({estimateId:estimateId, user: userData.user, name:userData.name}, (res) => {
                    setEstimate(res);
                    console.log(res)
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
            socket.on("recive_message", ()=>{
                getEst()
            })
            socket.on("recive_cotizacion", (data)=>{snd.play();getEst();})
            getEst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [estimateId, socket]);

        const onAcept=(action)=>{
            if(action==="1"){
                EstimateData.setState({state: 6, id: estimateId}, (res)=>{})
                setShowRealizar(false);
            }else{
                EstimateData.setState({state: 7, id: estimateId}, (res)=>{})
                setShowRating(true);
                setshowAsk(false);
            }
            socket.emit("sendEstimateChange", {
                estimateId: estimateId,
                autorId: userData.idCard
            });
        }
        function openChat(){
             MessageData.onView({estimateId: estimateId, userName: userData.name}, (res)=>{
                console.log(res);
             });
             socket.emit("view", userData.idCard+userData.user)
             onOpen()
             setEstimate({...estimate, msg: 0});
             toggleChat();
        }

        function onClose(){
            setShowRealizar(!showRealizar);
        }

    return (<>
        {showRating && (<>
            <Formulario idContract={estimateId} onClose={()=>{
                setShowRating(false);
                show();
            }}/>
        </>)}
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
                    {(5===parseInt(estimate.state))&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} onClick={onClose}>Pago realizado</a>
                    </>)}
                </>): (<>
                    {(6===parseInt(estimate.state) ||3===parseInt(estimate.state))&& (<>
                        <a className="btne_dark" style={{display: "block", width: "max-content", marginRight: "1.5em", fontSize: "1.1em"}} onClick={()=>{setshowAsk(true)}}>Finalizar servicio</a>
                    </>)}
                </>)}
                <span onClick={openChat} style={{ position: 'relative', cursor: "pointer" }}>
    {estimate.msg > 0 && (
        <>
            <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px', 
                backgroundColor: '#55ACEE', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                justifyContent: 'center', 
                padding: "3px",
                alignItems: 'center' }}>
                {estimate.msg}
            </div>
            </>
        )}
            <i className="bx bx-message-dots" style={{ color: '#4f4f4f', fontSize: "2.5em" }} />
            </span>
                <span><i class='bx bx-dots-vertical-rounded' style={{color: '#4f4f4f', fontSize: "2.5em", marginLeft: "1em"}}></i></span>
            </div>
            <div className="contentBox">
                <p style={{float: "right"}}>{estimate.sendDate}</p>
                <h5 style={{}}>{estimate.city} - {estimate.adress}</h5>
                <h1 style={{color: "#3D00B7", fontWeight: "bold", marginBottom: "1em"}}>Valor: <span style={{float: "right", marginRight:"1em",color: "#3D00B7"}}>{estimate.cost}.000</span></h1>
                <p>Importante: las cotizaciones realizadas incluyen unicamente el costo de la mano de obra.</p>
                {showRealizar && (<>
                <AskOv  onAcept={onAcept} onClose={()=>{setShowRealizar(false)}} text={`¿Te han pagado los ${estimate.cost}.000?`} action="1"/>
                </>)}
                {showAsk && (<>
                <AskOv  onAcept={onAcept} onClose={()=>{
                    setshowAsk(false);
                    }} text={`¿Quieres finalizar el servicio?`} action="2" />
                </>)}
                <h3>Codigo de autenticacion:</h3>
                <h2 style={{margin: "1em 0", color: "#55ACEE"}}>{estimate.authenticationCode}</h2>
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

export default ContractContainer;


const AskOv= ({onClose, onAcept, text, action})=>{
    return(<>
    <div className="overlay" >
        <div className="deal-box" style={{ width: action==="1"? "30%": "40%"}} >
           <div style={{width: "90%"}}>
            <h2 style={{color:"#55ACEE", fontWeight: "bold"}}>Seguro que </h2>
                    <h4>{text}</h4>
                    <button type="button" className="botn" id="button_b" onClick={onClose} style={{display: "inline-block", marginBottom: "0.1em"}}>Cancelar</button>
                    <button type="button" className="botn" id="button" onClick={()=>onAcept(action)} style={{display: "inline-block", marginBottom: "0.1em"}}>Aceptar</button>
           </div>
        </div>

    </div>
    </>);
}
