import React, {useContext} from 'react';
import { AuthContext } from '../providers/userProvider';

const Navbar = ({ links, brandName, logoUrl }) => {
  const { isLoggedIn, userData, logout} = useContext(AuthContext)
  console.log(userData);
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
      <a className="btne" href="/log-in">Log in</a>
      <a className="btne_dark" href="/sign-up">Sign up</a>
    </>
  ): (
    <>
      <p style={{display: "inline-block", marginRight: "10px"}}>{userData.name}</p>
      <button className='btne' onClick={() => logout()}>log out</button>
    </>
    
  
  )
  }
  
  </div>

</header>

  );
};

export default Navbar;
