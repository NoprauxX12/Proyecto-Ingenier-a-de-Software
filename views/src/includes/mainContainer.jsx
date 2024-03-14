/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import { useEffect } from "react";
import Card from "./card";
import InfoContainer from "./infoContainer";

//info acces
import TownData from "../services/towns";
import userData from "../services/user";

const ClientsMainContainer=()=>{
    const [freelancers, setFreelancers] = useState([]);
    const [cityes, setCytyes] = useState([]);
    const [name, setName]= useState("Medellin");
    const [selectedCity, setSelectedCity] = useState("5001");
    const [search, setSearch] = useState(null);
    const text= "Resultados de ";
  useEffect(() => {
    const fetchCityes = async () => {
        TownData.fetchCityes((res) => {
          setCytyes(res); // Aquí accedes a res.data en lugar de res
        });
      
    };

    const fetchFreelancers = async () => {
      userData.fetchFreelancers({keyword: search, city: selectedCity}, (res)=>{
        setFreelancers(res);
      })
    };
    fetchCityes();
    fetchFreelancers();
    const params = new URLSearchParams(window.location.search);
    const valor = params.get('search'); // Suponiendo que el parámetro se llama 'nombre'
    
    // Actualizar el estado con el valor obtenido
    setSearch(valor);
  },[search, selectedCity]); 
    return (
      <div>
        {search===null && (
          <>
          <InfoContainer/>
          </>
        )}

        <div className="discoberDontainer">
          <h2>
            {search===null ? (
              <>
              Explora todos los freelancers en: 
              </>
            ):(
              <>
              {text+search+" en: "}
              </>
            )}
             
            <div className="dropdown" style={{ display: "inline-block" }}>
              <button className="btne dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ display: "inline", fontSize: "0.5em" }}>
                {name}
              </button>
              <ul className="dropdown-menu dropdown-menu-start" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {cityes.length > 0 ? (
                cityes.map((city) => (
                  <li key={city.idCity}>
                    <a className="dropdown-item" href="#" onClick={() => { 
                      setName(city.name);
                      setSelectedCity(city.idCity);
                    }}>
                      {city.name}
                    </a>
                  </li>
                ))
              ) : (
                <li>No hay ciudades disponibles</li>
              )}
            </ul>

            </div>
          </h2>
        </div>
  
        <div className="card text-center shadow-none border-none" style={{width: "95%", margin: "auto"}}>
          <div className="card-header border-none" style={{paddingLeft: "2em"}}>
            <ul className="nav nav-pills card-header-pills">
              <li className="nav-item">
                <a className="btne" href="/">Active</a>
              </li>
              <li className="nav-item">
                <a className="btne" href="/">Link</a>
              </li>
              <li className="nav-item">
                <a className=" btne" aria-disabled="true" href="/">Disabled</a>
              </li>
            </ul>
          </div>
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding: "2em", }}>
      
              {freelancers.length>0 ? (
                <>
                {freelancers.map((freelancer) => (
                  <Card freelancer={freelancer}/>    
                ))}
                
              </>
              ): (
              <>
              </>)}
          </div>

        </div>

    </div>

    );
}

export default ClientsMainContainer;