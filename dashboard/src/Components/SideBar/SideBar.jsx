import React, { useEffect, useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import moment from 'moment';
import 'moment/min/locales.min';
moment.locale('pt-br');

// Importando estilos
import './_sideBar.scss';

import db from '../../api/database';

// Importando imagens

// const data = [
//   {
//     date: '09 / 11 / 2023',
//     hour: '12:00',
//     status: 'aberto',
//   },
// ];

const SideBar = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(true);

  useEffect(() => {
    async function getRawData() {
      const rawData = await db.getAverageData();
      setData(rawData);
      setIsLoading(false);
    }

    getRawData();
  }, [triggerUpdate]);

  return (
    <div className="side-bar-content">
      <p className="side-bar-title">Claraboia</p>
      <Table aria-label="sample table">
        <TableHead>
          <TableRow>
            <TableHeader>Data</TableHeader>
            <TableHeader>Horario</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry) => {
            return (
              <TableRow key={entry.id}>
                <TableCell className="cells-title-style-maintenance">
                  {moment(entry.createdat).format('MMMM Do')}
                </TableCell>
                <TableCell className="cells-title-style-maintenance">
                  {moment(entry.createdat).format('h:mm a')}
                </TableCell>
                <TableCell className="cells-title-style-maintenance">
                  {entry.servoopen ? 'Aberto' : 'Fechado'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SideBar;
