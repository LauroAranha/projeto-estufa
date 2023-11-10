import React from 'react';
import ReactDOM from 'react-dom/client';
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';

// Importando estilos
import './_lineChart.scss';

const data = [
  {
    group: 'Temperatura',
    key: '12:00',
    value: 34,
  },
  {
    group: 'Temperatura',
    key: '13:00',
    value: 36,
  },
  {
    group: 'Temperatura',
    key: '14:00',
    value: 35,
  },
  {
    group: 'Temperatura',
    key: '15:00',
    value: 32,
  },
  {
    group: 'Temperatura',
    key: '16:00',
    value: 30,
  },
];

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
};

const LineChartCompoenent = () => {
  return (
    <div className="line-chart-container">
      <LineChart data={data} options={options}></LineChart>
    </div>
  );
};

export default LineChartCompoenent;
