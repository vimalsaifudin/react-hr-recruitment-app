import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({onUpdate, type, mode, ...rest}) => {
  const { headers, rows } = rest;

  return (
    <div>
      <table className="table table-bordered table-hover">
      <TableHeader headers={headers}></TableHeader>
      <TableBody headers={headers} type={type} rows={rows} mode={mode} onUpdate={onUpdate}></TableBody>
      </table>
    </div>
  );
}

export default Table;