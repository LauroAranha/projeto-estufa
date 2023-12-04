import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// Importando Imagens
import dashboard from '../../icons/dashboard.svg';
import about from '../../icons/about.svg';
// import history from '../../icons/history.svg';
// import economy from '../../icons/economy.svg';

import './_navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <Button
        className="cells-container-overview"
        variant="text"
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={dashboard} alt="dashboard icon" className="dashboard-icon" />
        Visão Geral
      </Button>
      <Button
        className="cells-container-about"
        variant="text"
        onClick={() => {
          navigate('/about');
        }}
      >
        <img src={about} alt="dashboard icon" className="dashboard-icon" />
        Sobre
      </Button>
      {/* <Button className="cells-container-history" variant="text">
        <img src={history} alt="History icon" className="history-icon" />
        Histórico
      </Button>
      <Button className="cells-container-economy" variant="text">
        <img src={economy} alt="Economy Icon" className="economy-icon" />
        Economia
      </Button> */}
    </div>
  );
};

export default Navbar;
