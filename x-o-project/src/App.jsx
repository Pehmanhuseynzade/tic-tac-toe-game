// src/App.js
import React, { useState } from 'react';
import './index.css';

const INITIAL_BOARD = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (calculateWinner() || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const winner = calculateWinner();
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
      ? 'It\'s a draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <body>
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
    </body>
  );
};

export default App;
