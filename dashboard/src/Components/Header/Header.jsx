import React from 'react';
import Button from '@mui/material/Button';

// Importando estilos
import './_header.scss';

// Importando imagens
import logo from '../../../public/logo.svg';
import menu from '../../icons/menu.svg';

// Importando Components
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <div className="header-container">
      <div className="container-logo">
        <img src={logo} alt="logo image" className="logo-img" />
      </div>
      <Navbar />
      <Button className="button-menu">
        <img src={menu} alt="menu icon" className="menu-icon" />
      </Button>
    </div>
  );
};

export default Header;
