import MiddleLogoContainer from "../../includes/middleLogoContainer";
import FormularioLogIn from "../../includes/logInForm";
import "../../styles/register.css";
import React from "react";

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
