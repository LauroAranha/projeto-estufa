import React, { useEffect, useState } from 'react';
import {
  Pagination,
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

const SideBar = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);

  useEffect(() => {
    async function getRawData() {
      const rawData = await db.getAverageData();
      setData(rawData);
      setTotalItems(rawData.length);
      setIsLoading(false);
    }

    getRawData();
  }, [triggerUpdate]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber.page);
    if (pageNumber.pageSize !== pageSize) {
      setPageSize(pageNumber.pageSize);
      setTotalItems(data.length);
      setCurrentPage(1);
    }
  };

  const renderBody = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    return currentData.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{moment(row.createdat).format('MMMM Do')}</TableCell>
        <TableCell>{moment(row.createdat).format('h:mm a')}</TableCell>
        <TableCell>{row.servoopen ? 'Aberto' : 'Fechado'}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="side-bar-content">
      <div>
        <p className="side-bar-title">Claraboia</p>
        <Table aria-label="sample table " className="table-skylight">
          <TableHead>
            <TableRow>
              <TableHeader>Data</TableHeader>
              <TableHeader>Horario</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>{renderBody()}</TableBody>
        </Table>
        <Pagination
          page={currentPage}
          pageNumberText="Page Number"
          pageSize={pageSize}
          pageSizes={[5, 10, 20, 50]}
          totalItems={totalItems}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SideBar;
