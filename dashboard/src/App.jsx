// Importando Libs
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Importando paginas
import Overview from './pages/Overview';
import About from './pages/About';

// Importando Compotens
import Header from './Components/Header/Header';

// Importando Estilo
import './app.scss';
const App = () => {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Header />
      <div className="container-principal">
        <Routes>
          <Route index path="/" Component={Overview} />
          <Route index path="/about" Component={About} />
        </Routes>
      </div>
    </>
  );
};

export default App;
