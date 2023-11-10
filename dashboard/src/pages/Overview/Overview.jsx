import React, { useEffect, useState } from 'react';

// Importando Components
import PageTitle from '../../Components/PageTitle/PageTitle';
import LineChartCompoenent from '../../Components/LineChart';

// Importando Imagens
import Humidity from '../../icons/humidity.svg';
import Temperature from '../../icons/temperature.svg';

import './_overview.scss';

const Overview = () => {
  return (
    <div>
      <PageTitle PageTitle="Resumo diário" />
      <div className="top-container">
        <div className="temperature-humidity-container">
          <img src={Humidity} alt="humidity icon" className="humidity-icon" />
          <div className="data-temp-humi-container">
            <p className="data-temp-humi">90,0%</p>
            <p className="data-temp-humi-desc">Máximo de Humidade</p>
          </div>
        </div>
        <div className="temperature-humidity-container">
          <img
            src={Temperature}
            alt="temperature icon"
            className="humidity-icon"
          />
          <div className="data-temp-humi-container">
            <p className="data-temp-humi">23,4</p>
            <p className="data-temp-humi-desc">Média de Temperatura</p>
          </div>
        </div>
      </div>
      <LineChartCompoenent />
    </div>
  );
};

export default Overview;
