import React, { useCallback, memo } from 'react';
import Td from './Td';

function Tr({ rowData, rowIndex, dispatch }) {
  return (
    <tr>
      {rowData.map((cell, i) => {
        return <Td key={`${i}번째 td`} dispatch={dispatch} cellData={cell} cellIndex={i} rowIndex={rowIndex}></Td>;
      })}
    </tr>
  );
}

export default memo(Tr);
