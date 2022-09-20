import React from 'react';
import Tr from './Tr';

function Table({ tableData, dispatch }) {
  return (
    <table className="ttc-table">
      <tbody>
        {tableData.map((row, i) => {
          return <Tr key={`${i}번째 tr`} rowData={row} rowIndex={i} dispatch={dispatch}></Tr>;
        })}
      </tbody>
    </table>
  );
}

export default Table;
