import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

function Td({ cellData, cellIndex, dispatch, rowIndex }) {
  const clickCell = useCallback(() => {
    if (cellData) return;

    dispatch({
      type: CLICK_CELL,
      row: rowIndex,
      cell: cellIndex,
    });
  }, [cellData]);

  return (
    <td className="ttc-ox" onClick={clickCell}>
      {cellData}
    </td>
  );
}

export default memo(Td);
