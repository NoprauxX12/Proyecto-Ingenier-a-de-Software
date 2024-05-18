import React, { useState, useContext, useEffect } from "react";
import "../../styles/register.css";
//includes
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";
import FrirstStep from "../../includes/forms/sign-up/firsStepSU";
//data
import userData from "../../services/user"
import TownData from "../../services/towns";
import Urls from "../../util/urls";
import { AuthContext } from "../../providers/userProvider";
import SecondStep from "../../includes/forms/sign-up/seconStep";
import ThirdStep from "../../includes/forms/sign-up/thrisdStep";

const users= {"0": "Seleccione tipo usuario",
"1": "Freelancer",
"2":"Cliente"
};


function SignUpScreen() {
    const {login} = useContext(AuthContext);
  const [step, setStep] = useState(1); 
  const [err, setErr] = useState(null);
  const [cityes, setCytyes] = useState([]);
  const [formValues, setFormValues] = useState({
    user: "0",
    name: "",
    idCard: "",
    telphone: "",
    cellphone: "",
    adress: "",
    email: "",
    password1: "",
    password2:"",
    idCity: "",
  });

  useEffect(()=>{
    document.title="sign up";
    const fetchCityes = async () => {
      try {
        TownData.fetchCityes((res) => {
          setCytyes(res); // Aquí accedes a res.data en lugar de res
        });
      } catch (error) {
        console.log(error);
      }
    };
    
    if(formValues.password1 !== formValues.password2){
      setErr("las contraseñas no coinciden");
    }else if((!formValues.email.includes("@") || !formValues.email.includes(".com")) && formValues.email.length > 0){
        setErr("ingrese un email valido por favor");
    }else if(formValues.cellphone.length < 10 && formValues.cellphone.length > 0){
        setErr("ingrese un telefono valido");
    }else if (formValues.cellphone[0]!=="3" && formValues.cellphone.length > 0){
      setErr("ingrese un telefono valido");
    } else if(formValues.idCard.length> 0 &&formValues.idCard.length < 4){
      setErr("ingrese una cedula valida");
    } else{
      setErr(null);
    }

    fetchCityes();
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
  };

  const handleSubmit = (e) => {
    if(err===null){
      e.preventDefault();
      userData.verifyForSigunUp({idCard: formValues.idCard, user: formValues.user, email: formValues.email},(res)=>{
        if(res.result){
          login(formValues);
          window.location.href = Urls.photo;
        }else{
          alert(res.error);
        }
      });
    }
    
  };

  const nextStep = () => {

    switch (step) {
      case 1:
        if((formValues.password1.length + formValues.password2.length) < 16){
          setErr("La contraseña debe contener minimo 8 caracteres.")
        }else if(err===null){
          if(formValues.user!=="0"){
            setErr(null);
            setStep(step + 1);
          }else{
            setErr("debe seleccionar un usuario")
          }
        }
        break;

      case 2:
        if(formValues.idCity===""){
          setErr("debe elegir una ciudad");
        }else if(formValues.cellphone==="" && formValues.telphone===""){
          setErr("debe agregar almenos un # de contacto");
        }else{
          setStep(step+1);
        }
        break;
      case 3: 
        if(formValues.adress===""){
          setErr("debe agregar una dirección");
        }
        break;
    
      default:
        break;
    }
    
  };
  const prevStep = () => {
      setStep(step - 1);
    

  };
    
    return (
        <div>
            <MiddleLogoContainer />
            <div className="mitad div__form">
            <div>
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <FrirstStep formValues={formValues} users={users} handleChange={handleChange} step={step}/>
                )}
                {step === 2 && (
                    <SecondStep formValues={formValues} cityes={cityes} handleChange={handleChange} step={step} />
                )}
                {step === 3 && (
                    <ThirdStep formValues={formValues} handleChange={handleChange} step={step} />
                )}
                {err !== null && (<p className="error-message" style={{marginLeft: "3.8em", color: "red"}}>{err}</p>)}
                <div className="buttonsContainer"> 
                {step !== 1 && (
                <button className="btne_dark" type="button" style={{margin: 10, display: "inline"}} onClick={prevStep}>
                    Anterior
                </button>
                )}
                
                {step !== 3 ? (
                <button style={{margin: 10, display: "inline"}} className="btne" type="button" onClick={nextStep}>
                    Siguiente
                </button>
                ) : (
                <button style={{margin: 10, display: "inline"}} className="btne_dark" type="submit">Siguiente</button>
                )}
                </div>
            </form>
            </div>
  
            </div>
        </div>

    )
}

export default SignUpScreen;