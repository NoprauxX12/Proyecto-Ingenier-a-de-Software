import React, { useState, useEffect } from 'react';
import UserData from '../../services/user'; 
import Alert from "../../includes/overlays/alert";
import { v4 as uuidv4 } from 'uuid';
import MiddleLogoContainer from '../../includes/containers/middleLogoContainer';

const RecoveryPassword = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [recoveryFormValues, setRecoveryFormValues] = useState({
        user: "0",
        email: "",
        token: "",
        dateTime: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState (false)

    useEffect(() => {
        setInfo();
    }, []);

    const setInfo = () => {
        let user = "0";
        let email = "";
        let token = uuidv4(); 
        const dateTime = new Date().toISOString(); 

        if (window.location.search[0] === "?") {
            user = window.location.search[1];
            email = decodeURIComponent(window.location.search.substring(2));
        } else {
            user = window.location.search[0];
            email = decodeURIComponent(window.location.search.substring(1));
        }

        setRecoveryFormValues({
            user: user,
            email: email,
            token: token,
            dateTime: dateTime
        });
    };

    const toggleAlert = () => {
        setShowAlert(!showAlert);
    };

    const handleClick = () => {
        setButtonDisabled(true)
            UserData.recoveryPass(recoveryFormValues, (args) => {
                if (args) {
                    setMessage("El correo de recuperación ha sido enviado correctamente.");
                    window.close();
                } else {
                    setMessage("Ha ocurrido un error al enviar el correo de recuperación.");
                }
                toggleAlert();
            });
            window.location.href = "https://www.google.com/search"
    };

    return (
        <div>
            {showAlert && <Alert message={message} onClose={toggleAlert} />}
            <MiddleLogoContainer></MiddleLogoContainer>
            <div className='shadow-md rounded-lg p-4'>
            <form>
                <fieldset>
                    <legend className="log_in">
                        <span style={{ color: "#3D00B7" }}>Restablecer</span>{" "}
                        <span style={{ color: "#55ACEE" }}>contraseña</span>
                    </legend>
                    <h5>Al presionar el botón, recibirás un correo con las instrucciones.</h5>
                    <h5>Si no lo encuentras, revisa tu carpeta de spam.</h5>
                    <h5>Este enlace será deshabilitado en 15 minutos.</h5>
                    <button
                        style={{ margin: 10, display: "block", width: "100%" }}
                        className="btne"
                        onClick={handleClick}
                        type="button"
                        disabled={buttonDisabled === true}
                    >
                        {buttonDisabled ? 'Enviado (Puedes cerrar la pestaña)' : 'Enviar'}
                    </button>
                </fieldset>
            </form>
            </div>
        </div>
    );
};

export default RecoveryPassword;
