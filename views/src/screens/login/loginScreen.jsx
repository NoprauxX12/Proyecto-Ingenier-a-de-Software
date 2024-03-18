import "../../styles/register.css";
import React from "react";
//components
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";
import FormularioLogIn from "../../includes/forms/logInForm";

function LoginScreen() {
    
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