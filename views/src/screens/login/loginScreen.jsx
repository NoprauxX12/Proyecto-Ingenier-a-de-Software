import "../../styles/register.css";
import React, { useEffect } from "react";
//components
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";
import FormularioLogIn from "../../includes/forms/logInForm";

function LoginScreen() {
    useEffect(()=>{
        document.title="log in";
    }, []);
    return (
        <div>
            <MiddleLogoContainer/>
            <div className="mitad div__form">
                <FormularioLogIn/>
            </div>
        </div>
    )
}

export default LoginScreen;