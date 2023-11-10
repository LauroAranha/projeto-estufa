import React from 'react';
import ReactDOM from 'react-dom/client';
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';

// Importando estilos
import './_lineChart.scss';

const data = [
  {
    group: 'Humidade',
    key: '12:00',
    value: 50,
  },
  {
    group: 'Humidade',
    key: '13:00',
    value: 52,
  },
  {
    group: 'Humidade',
    key: '14:00',
    value: 54,
  },
  {
    group: 'Humidade',
    key: '15:00',
    value: 54,
  },
  {
    group: 'Humidade',
    key: '16:00',
    value: 52,
  },
];

const options = {
  title: 'Soma de Humidade por Data',
  axes: {
    bottom: {
      title: 'Horário',
      mapsTo: 'key',
      scaleType: 'labels',
    },
    left: {
      mapsTo: 'value',
      title: 'Soma de humidade',
      scaleType: 'linear',
    },
  },
  height: '400px',
};

const LineChartHumidity = () => {
  return (
    <div className="line-chart-container">
      <LineChart data={data} options={options}></LineChart>
    </div>
  );
};

export default LineChartHumidity;
