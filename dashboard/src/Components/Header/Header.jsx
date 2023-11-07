import React from 'react';

// Importando estilos
import './_header.scss';

// Importando imagens

// Importando Icons

const Header = () => {
  return (
    <div className="header-container">
      <div className="container-user">
        <div
          style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}
        >
          <p className="user-name">ALO</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
