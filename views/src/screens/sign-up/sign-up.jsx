import React from "react";
import MiddleLogoContainer from "../../includes/middleLogoContainer";
import "../../styles/register.css";
import Formulario from "../../includes/signUpForm";

function SignUpScreen() {
    
    
    return (
        <div>
            <MiddleLogoContainer />
            <div className="mitad div__form">
              <Formulario />  
            </div>
        </div>

    )
}

export default SignUpScreen;