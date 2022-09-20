import React, { useEffect, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_WINNER = 'SET_WINNER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;

      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};

function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, recentCell, turn } = state;

  useEffect(() => {
    const [row, cell] = recentCell;

    if (row < 0) return;

    let win = false;

    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    console.log(win);

    if (win) {
      dispatch({
        type: SET_WINNER,
        winner: turn,
      });

      dispatch({
        type: RESET_GAME,
      });
    } else {
      let all = true;

      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });

      if (all === false) {
        dispatch({
          type: CHANGE_TURN,
        });
      } else {
        dispatch({
          type: RESET_GAME,
        });
      }
    }
  }, [recentCell]);

  return (
    <div className="ttc-container">
      <h2 className="ttc-title">틱택토 게임</h2>
      <Table tableData={tableData} dispatch={dispatch}></Table>
      {winner && <p className="ttc-text">🎉 {winner}님의 승리입니다. </p>}
    </div>
  );
}

export default TicTacToe;
