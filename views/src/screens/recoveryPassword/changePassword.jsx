import React, { useState, useEffect } from "react";
import UserData from "../../services/user";
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";
import Alert from "../../includes/overlays/alert";

const ChangePassword = () => {
    const [tokenInfo, setTokenInfo] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [linkExpired, setLinkExpired] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [data, setData] = useState({
        user: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        setToken(window.location.search.substring(1));
        if(token !== null){
            delay()} 
    }, [trigger]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTrigger(prevTrigger => prevTrigger + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const delay = () => {
        fetchInfoToken()
    }

    const fetchInfoToken = async () => {
        try {
            if(tokenInfo === null){
            await UserData.fecthTokenInfo(token, (args) => {
                setTokenInfo(args)
            })
            }
            setLinkExpired(false)
            const expirationTime = new Date(tokenInfo[0].dateTime).getTime(); 
            const currentTime = new Date().getTime(); 
            const timeDifference = (expirationTime - currentTime) / (1000 * 60);
            if (timeDifference < 284) {
                setLinkExpired(true);
            }
            setData({
                user: tokenInfo[0].user,
                email: tokenInfo[0].email,
                password: newPassword
            })
        } catch (error) {
            console.error('Error al obtener la información del token:', error);
            setLinkExpired(true)
        } finally {
            setLoading(false);
        }
    };

    const upDate = async ()=>{
        try{
            console.log(data)
            await UserData.updatePassword(data, (args) => {
                if(args === true ){
                    console.log("contraseña cambiada")
                    setMessage("Contraseña actualizada correctamente")
                    window.location.href = "http://localhost:3000"
                } else {
                    setMessage("No se pudo actualizar tu contraseña")
                    console.log("contraseña NO cambiada")
                }
                toggleAlert()
            })
        } catch (error) {
            console.log("ERROR")
        }
    }

    const toggleAlert = () => {
        setShowAlert(!showAlert);
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (newPassword === confirmPassword && newPassword.length >= 8) {
            upDate()
        } else {
           
            alert("Las contraseñas no coinciden o tienen menos de 8 caracteres.");
        }
    };

    if (loading) {
        return (
            <>
            <div style={{
              position: 'relative',
              backgroundSize: 'cover',
              minHeight: '100vh',
              backgroundColor: "#fff",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              }}>
              <div style={{ textAlign: 'center' , background:" radial-gradient(circle, rgba(85, 172, 238, 0.8), rgba(255, 255, 255, 0.8))", padding: "3em", borderRadius: "100%"}}>
                  <h1 style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '9rem', color: '#B9B7B7' , margin: "0"}}><i className="bx bxl-mailchimp" style={{color: '#ffffff'}} /></h1>
                  <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '1.5rem', color: '#fff', fontWeight: "bold" }}>Cargando...</p>
              </div>
            </div>
          </>    
    );
    }

    if (linkExpired) {
        return (
            <div className="text-center">
                <h1 className="text-blue-700 text-2xl font-bold mb-4">Enlace Expirado :(</h1>
                <p className="text-gray-700 text-xl mb-4">El enlace para restablecer la contraseña ha expirado. Por favor, solicita un nuevo enlace.</p>
                <button onClick={() => window.location.href = "http://localhost:3000"} className="btne">Ir al Inicio</button>
            </div>
        );
    }

    return (
        <div>
            {showAlert && <Alert message={message} onClose={toggleAlert} />}
            <MiddleLogoContainer></MiddleLogoContainer>
            <div className='shadow-md rounded-lg p-4'>
            <form>
                <fieldset>
                <legend>
                    <span style={{ color: '#3D00B7' }}>Cambiar </span>
                    <span style={{ color: '#55ACEE' }}>contraseña</span>
                </legend>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label mt-4"  htmlFor="password">Nueva Contraseña:</label>
                        <input className="form-control" type="password" id="password" value={newPassword} placeholder="Contraseña" autoComplete="off" onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4" htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <input className="form-control" type="password" id="confirmPassword" value={confirmPassword} placeholder="Confirmar contraseña" autoComplete="off" onChange={handleConfirmPasswordChange} />
                    </div>
                    <button className="btne" type="button" onClick={handleSubmit}>Cambiar Contraseña</button>
                </form>
                </fieldset>
            </form>
            </div>
        </div>
    );
};

export default ChangePassword;
