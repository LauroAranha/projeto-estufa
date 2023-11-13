import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';

import db from '../../api/database.js'

// Importando estilos
import './_lineChart.scss';

const [data, setData] = useState([]);

useEffect(() => {
    async function getRawData(){
      await db.getDashboardData();
    }
    console.log(rawData)
    const rawData = getRawData();

    const humidData = rawData.map((entry) => {
      return {
        group: 'Humidity',
        key: entry.createdAt,
        value: entry.humid
      }
    });

    const tempData = rawData.map((entry) => {
      return {
        group: 'Temperature',
        key: entry.createdAt,
        value: entry.temperature
      }
    });

    setData(humidData.concat(tempData))
    console.log(data);    

}, [])


const options = {
  title: 'Soma de Temperatura por Data',
  axes: {
    bottom: {
      title: 'Horário',
      mapsTo: 'key',
      scaleType: 'labels',
    },
    left: {
      mapsTo: 'value',
      title: 'Soma de temperatura',
      scaleType: 'linear',
    },
  },
  height: '400px',
  width: '780px',
};

const LineChartTemperature = () => {
  return (
    <div className="line-chart-container">
      <LineChart data={data} options={options}></LineChart>
    </div>
  );
};

export default LineChartTemperature;
