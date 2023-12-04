// Importando Libs
import React, { useEffect, useState } from 'react';
import { LineChart as CarbonLineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import moment from 'moment';
import 'moment/min/locales.min';

// Importando API
import db from '../../api/database.js';

// Importando estilos
import './_lineChart.scss';

const options = {
  title: '',
  axes: {
    bottom: {
      title: 'Horário',
      mapsTo: 'key',
      scaleType: 'labels',
    },
    left: {
      mapsTo: 'value',
      title: 'Temperatura/Humidade',
      scaleType: 'linear',
    },
  },
  height: '400px',
  width: '750px',
};

const LineChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(true);

  useEffect(() => {
    async function getRawData() {
      const rawData = await db.getDashboardData();
      const humidData = rawData.map((entry) => {
        moment.locale('pt-br');
        return {
          group: 'Humidade',
          key: moment(entry.createdat).format('LT'),
          value: entry.humid,
        };
      });

      const tempData = rawData.map((entry) => {
        moment.locale('pt-br');
        return {
          group: 'Temperatura',
          key: moment(entry.createdat).format('LT'),
          value: entry.temperature,
        };
      });
      var finalData = humidData.concat(tempData);
      finalData = finalData.reverse();
      //console.log(finalData);
      setData(finalData);
      setIsLoading(false);
    }

    getRawData();
  }, [triggerUpdate]);

  return (
    <div className="line-chart-container">
      {!isLoading ? (
        <CarbonLineChart data={data} options={options}></CarbonLineChart>
      ) : null}
    </div>
  );
};

export default LineChart;
