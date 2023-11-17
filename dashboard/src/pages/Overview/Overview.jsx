import React, { useEffect, useState } from 'react';

import db from '../../api/database.js';
import { getAverage } from '../../util/math.js';

// Importando Components
import PageTitle from '../../Components/PageTitle';
import LineChartTemperature from '../../Components/LineChartTemperature';
import SideBar from '../../Components/SideBar';

// Importando Imagens
import Humidity from '../../icons/humidity.svg';
import Temperature from '../../icons/temperature.svg';

import './_overview.scss';

const Overview = () => {
  const [humid, setHumid] = useState([]);
  const [temp, setTemp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(true);

  useEffect(() => {
    async function getRawData() {
      const rawData = await db.getAverageData();
      let data = getAverage(rawData);
      setHumid(data[1].media.toFixed(1));
      setTemp(data[0].media.toFixed(1));
      setIsLoading(false);
    }

    getRawData();
  }, [triggerUpdate]);

  return (
    <div className="">
      <PageTitle PageTitle="Resumo diário" />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="top-container">
            <div className="temperature-humidity-container">
              <img
                src={Humidity}
                alt="humidity icon"
                className="humidity-icon"
              />
              <div className="data-temp-humi-container">
                <p className="data-temp-humi">{humid}%</p>
                <p className="data-temp-humi-desc">Média de Humidade</p>
              </div>
            </div>
            <div className="temperature-humidity-container">
              <img
                src={Temperature}
                alt="temperature icon"
                className="humidity-icon"
              />
              <div className="data-temp-humi-container">
                <p className="data-temp-humi">{temp}°C</p>
                <p className="data-temp-humi-desc">Média de Temperatura</p>
              </div>
            </div>
          </div>
          <LineChartTemperature />
        </div>
        <div className="side-bar-container">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Overview;
