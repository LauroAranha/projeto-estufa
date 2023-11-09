import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import './app.scss';

// Importando Compotens
import Header from './Components/Header/Header';

const App = () => {
  return (
    <>
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
