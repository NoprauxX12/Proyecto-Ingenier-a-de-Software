import React, { useState, useEffect } from "react";
import UserData from "../../services/user";

const ChangePassword = () => {
    const [tokenInfo, setTokenInfo] = useState(null);
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
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const delay = () => {
        fetchInfoToken()
    }

    const fetchInfoToken = async () => {
        try {
            await UserData.fecthTokenInfo(token, (args) => {
                setTokenInfo(args)
            })
            const expirationTime = new Date(tokenInfo[0].dateTime).getTime(); 
            const currentTime = new Date().getTime(); 
            const timeDifference = (expirationTime - currentTime) / (1000 * 60);
            console.log(expirationTime, currentTime, timeDifference) 
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
        } finally {
            setLoading(false);
        }
    };

    const upDate = async ()=>{
        try{
            await UserData.updatePassword(data, (args) => {
                if(args === true ){
                    console.log("contraseña cambiada")
                    alert("EXITO")
                } else {
                    alert("ERROR")
                    console.log("contraseña NO cambiada")
                }
            })
        } catch (error) {
            console.log("ERROR")
        }
    }

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (newPassword === confirmPassword && newPassword.length >= 8) {
            setData({
                password: newPassword
            })
            upDate()
        } else {
           
            alert("Las contraseñas no coinciden o tienen menos de 8 caracteres.");
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (linkExpired) {
        return (
            <div>
                <h1>Enlace Expirado</h1>
                <p>El enlace para restablecer la contraseña ha expirado. Por favor, solicite un nuevo enlace.</p>
                <button onClick={() => window.location.href = "http://localhost:3000"}>Ir al Inicio</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Cambio de Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input type="password" id="password" value={newPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default ChangePassword;
