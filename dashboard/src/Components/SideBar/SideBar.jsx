import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';

// Importando estilos
import './_sideBar.scss';

// Importando imagens

// const data = [
//   {
//     date: '09 / 11 / 2023',
//     hour: '12:00',
//     status: 'aberto',
//   },
// ];

const SideBar = () => {
  return (
    <div className="side-bar-content">
      <p className="side-bar-title">Claraboia</p>
      <Table aria-label="sample table">
        <TableHead>
          <TableRow>
            <TableHeader>Data</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Horario</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="cells-title-style-maintenance">
              09/11/2023
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              12:00
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              Aberto
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="cells-title-style-maintenance">
              09/11/2023
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              13:00
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              Fechado
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="cells-title-style-maintenance">
              10/11/2023
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              16:00
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              Aberto
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="cells-title-style-maintenance">
              10/11/2023
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              18:00
            </TableCell>
            <TableCell className="cells-title-style-maintenance">
              Fechado
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SideBar;
