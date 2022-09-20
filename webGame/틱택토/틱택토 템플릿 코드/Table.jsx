import React from 'react';
import Tr from './Tr';

function Table({ onClick, tableData }) {
  return (
    <table onClick={onClick}>
      {tableData.map((tr, i) => {
        return <Tr key={`${i}번째 tr`} rowData={tr}></Tr>;
      })}
    </table>
  );
}

export default Table;
