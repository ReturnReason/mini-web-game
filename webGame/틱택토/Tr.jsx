import React from 'react';
import Td from './Td';

function Tr({ rowData }) {
  return (
    <tr>
      {rowData.map((td, i) => {
        return <Td key={`${i}번째 td`}></Td>;
      })}
    </tr>
  );
}

export default Tr;
