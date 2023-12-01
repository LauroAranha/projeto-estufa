import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import './app.scss';
import { Helmet } from 'react-helmet';

// Importando Compotens
import Header from './Components/Header/Header';

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
        </Routes>
      </div>
    </>
  );
};

export default App;
