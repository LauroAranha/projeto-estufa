import React from 'react';

// Importando estilos
import './_header.scss';

// Importando imagens
import logo from '../../../public/logo.svg';

// Importando Components
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <div className="header-container">
      <div className="container-logo">
        <img src={logo} alt="logo image" className="logo-img" />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
