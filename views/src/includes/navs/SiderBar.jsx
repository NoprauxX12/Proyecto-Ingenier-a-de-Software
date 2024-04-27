/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../providers/userProvider';
import Urls from '../../util/urls';
import UserData from '../../services/user';

import "../../styles/siderBar.css"

const SiderBar = () => {
    const [isActive, setIsActive] = useState(false);
    const params= new URLSearchParams(window.location.search);
    const {userData, logout} = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState([]);
    const [searchVal, setSearchVal] = useState(params.get("search"));
    document.body.style.marginLeft = "90px";
    const handleLogout = (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        logout(); // Realizar la lógica de logout
        // Redirigir al usuario después de cerrar sesión
        // Aquí puedes usar window.location.href o cualquier método de navegación que utilices en tu aplicación
        setTimeout(() => {
        window.location.href = "/"; // Por ejemplo, redirigir a la página de inicio después de 1 segundo
        }, 1000); // Cambia el tiempo de espera según tus necesidades
    };
    useEffect(()=>{
        const getPhoto= async ()=> {
            UserData.fetchProfilePhoto({id: userData.idCard,user:userData.user}, (res)=>{
                if(res.response) setPhoto(res.profilePhoto);
            })
        }
        if(userData){
            setName(userData.name.split(" "));
            getPhoto();
        }
        
    },[photo, userData])

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

        return (
    <div>
        <div className={`sidebar ${isActive ? 'active' : ''}`}>
            <div className="top">
                <div className="logo">
                    <i className="bx bx-hard-hat" style={{color: '#000'}} />
                    <span>Freelancer</span>
                </div>
                <i className="bx bx-menu" id="btn" onClick={toggleSidebar} style={{fontSize: '2.3rem', color:"#fff"}} />
            </div>
            <div className="user">
                {photo!==null? (<>
                    <div style={{ width: "50px", height: "50px",minWidth: "50px", mineight: "50px", overflow: "hidden", borderRadius: "50%" }}>
                    <img 
                        src={`data:image/jpeg;base64,${photo}`} 
                        alt="user" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                </div>

                </>):(<>
                    <img src="/images/defaultUser.png" alt="user" className="user-img" />
                </>)}
                
                <div className="letter">
                    <p className="bold">{name[0]}</p>
                    <p style={{color: "#fff"}}>carpintera</p>
                </div>
            </div>
            <ul> 
                
                {userData.user==="1" ? (<>
                <li>
                    <a href={Urls.home}>
                    <i className="bx bx-cog" />
                    <span className="nav-item">Ofertas</span>
                    </a>
                    <span className="tooltip">Ofertas</span>
                </li>
                </>):(<>
                <li>
                    <a href={Urls.home}>
                    <i className="bx bx-home-alt-2" style={{color: 'rgba(255,255,255,0.29)'}} />

                    <span className="nav-item">Home</span>
                    </a>
                    <span className="tooltip">Home</span>
                </li>
                </>)}
                
                <li>
                    <a href="#">
                    <i className="bx bx-notepad"/>
                    <span className="nav-item">Contratos</span>
                    </a>
                    <span className="tooltip">Contratos</span>
                </li>
                <li>
                    <a href={Urls.chat}>
                    <i className="bx bx-message-square-dots" />
                    <span className="nav-item">Cotizaciones</span>
                    </a>
                    <span className="tooltip">Cotizaciones</span>
                </li>
                <li>
                    <a href='/' onClick={(e) => handleLogout(e)}>
                    <i className="bx bx-log-out" />
                    <span className="nav-item">Logout</span>
                    </a>
                    <span className="tooltip">Logout</span>
                </li>
            </ul>
        </div>
        {document.title!=="chat"&& (<>
            <div className="navBar">
            <h1 className="pageTitle" style={{color: '#3D00B7'}}>El Que <span style={{color: '#55ACEE'}}>Sabe</span></h1>
            <div className="searchBox">
                <form action="/" method='GET'>
                <input type="text" onChange={(e)=>{
                    setSearchVal(e.target.value);}} 
                    placeholder="Buscar..." 
                    className="searchInput" 
                    value={searchVal}
                    name='search'/>
                <i className="bx bx-search searchIcon"></i>
                </form>
            </div>
        </div>
        </>)}  
    </div>

        );
    }


export default SiderBar;