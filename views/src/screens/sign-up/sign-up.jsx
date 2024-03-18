import React, { useEffect } from "react";
import "../../styles/register.css";
//includes
import Formulario from "../../includes/forms/signUpForm";
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";

function SignUpScreen() {
    useEffect(()=>{
        document.title="sign up";
    }, []);
    
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