import React, {useContext} from 'react';
import { AuthContext } from '../providers/userProvider';
import Urls from '../util/urls';


// Función para manejar el clic en el enlace de logout

const Navbar = ({ links, brandName, logoUrl }) => {
  
  const { isLoggedIn, userData, logout} = useContext(AuthContext)
  const handleLogout = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    logout(); // Realizar la lógica de logout
    // Redirigir al usuario después de cerrar sesión
    // Aquí puedes usar window.location.href o cualquier método de navegación que utilices en tu aplicación
    setTimeout(() => {
      window.location.href = "/"; // Por ejemplo, redirigir a la página de inicio después de 1 segundo
    }, 1000); // Cambia el tiempo de espera según tus necesidades
  };
  
  
   return (
    <header className="main-header">
      <div className='main-nav'>
        <h3><a className="pageTitle" href="/">El Que <span style={{color: '#55ACEE'}}>Sabe</span></a></h3>
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <a className="a__main-header" href="/">Clientes</a>
            </li>
            <li className="main-header__item">
              <a className="a__main-header" href="/">Freelancers</a>
            </li></ul>
        </nav>
      </div>
  <div className="col-md-6">
    <form className="d-flex" action='/' method='get'>
      <div className="search-container">
        <input className="form-control me-2 search__bar" name='search' type="search" placeholder="Buscar..." aria-label="Buscar" />
        <button className="btn" type="submit"><i className="bi bi-search" /></button>
      </div>
    </form>
  </div>
  <div className='button-container'>
  {!isLoggedIn ? (
    <>
      <a className="btne" href={Urls.logIn}>Log in</a>
      <a className="btne_dark" href={Urls.signUp}>Sign up</a>
    </>
  ) : (
    <>
      <a href={Urls.photo}><p style={{ display: "inline-block", marginRight: "10px", marginTop: "0.7em" }}>{userData.name}</p></a>
      <a href={Urls.home} onClick={(e) => handleLogout(e)}>
        <img src="/images/cerrar-sesion.png" alt="log out" className='icons'/>
      </a>
    </>
)}
  
  </div>

</header>

  );
};

export default Navbar;
