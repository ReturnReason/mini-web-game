import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

export const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return;
  }
};

function TTC() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickTable = useCallback(() => {
    dispatch({
      type: SET_WINNER,
      winner: 'O',
    });
  }, []);

  return (
    <div>
      <Table onClick={onClickTable} tableData={state.tableData}></Table>
      {state.winner && <p> {state.winner}님이 승리</p>}
    </div>
  );
}

export default TTC;
