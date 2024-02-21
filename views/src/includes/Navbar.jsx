import React from 'react';

const Navbar = ({ links, brandName, logoUrl }) => {
  return (
    <header className="main-header">
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
  <div className="col-md-6">
    <form className="d-flex">
      <div className="search-container">
        <input className="form-control me-2 search__bar" type="search" placeholder="Buscar..." aria-label="Buscar" />
        <button className="btn" type="submit"><i className="bi bi-search" /></button>
      </div>
    </form>
  </div>
  <a className="btne" href="/log-in">Log in</a>
  <a className="btne_dark" href="/sign-up">Sign up</a>
</header>

  );
};

export default Navbar;
