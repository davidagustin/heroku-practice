import React, { useState, useEffect } from 'react';

// Sample Sudoku puzzles for different difficulties
const SAMPLE_PUZZLES = {
  easy: [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ],
  medium: [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ],
  hard: [
    [0,0,0,6,0,0,4,0,0],
    [7,0,0,0,0,3,6,0,0],
    [0,0,0,0,9,1,0,8,0],
    [0,0,0,0,0,0,0,0,0],
    [0,5,0,1,8,0,0,0,3],
    [0,0,0,3,0,6,0,4,5],
    [0,4,0,2,0,0,0,6,0],
    [9,0,3,0,0,0,0,0,0],
    [0,2,0,0,0,0,1,0,0]
  ]
};

const SOLUTIONS = {
  easy: [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ],
  medium: [
    [4,3,5,2,6,9,7,8,1],
    [6,8,2,5,7,1,4,9,3],
    [1,9,7,8,3,4,5,6,2],
    [8,2,6,1,9,5,3,4,7],
    [3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],
    [5,1,9,3,2,6,8,7,4],
    [2,4,8,9,5,7,1,3,6],
    [7,6,3,4,1,8,2,5,9]
  ],
  hard: [
    [5,8,1,6,7,2,4,3,9],
    [7,9,2,8,4,3,6,5,1],
    [3,6,4,5,9,1,7,8,2],
    [4,3,8,9,5,7,2,1,6],
    [2,5,6,1,8,4,9,7,3],
    [1,7,9,3,2,6,8,4,5],
    [8,4,5,2,1,9,3,6,7],
    [9,1,3,7,6,5,2,8,4],
    [6,2,7,4,3,8,1,9,5]
  ]
};

function App() {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameStatus, setGameStatus] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    newGame();
  }, [difficulty]);

  const newGame = () => {
    const puzzle = SAMPLE_PUZZLES[difficulty];
    const puzzleSolution = SOLUTIONS[difficulty];
    
    setBoard(puzzle.map(row => [...row]));
    setSolution(puzzleSolution.map(row => [...row]));
    setInitialBoard(puzzle.map(row => [...row]));
    setSelectedCell(null);
    setGameStatus('');
    setIsComplete(false);
  };

  const handleCellClick = (row, col) => {
    // Don't allow editing initial cells
    if (initialBoard[row][col] !== 0) return;
    
    setSelectedCell({ row, col });
  };

  const handleKeyPress = (e) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = e.key;

    if (key >= '1' && key <= '9') {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = parseInt(key);
      setBoard(newBoard);
      
      // Check if the move is correct
      if (newBoard[row][col] === solution[row][col]) {
        setGameStatus('Correct!');
        setTimeout(() => setGameStatus(''), 1000);
      } else {
        setGameStatus('Incorrect!');
        setTimeout(() => setGameStatus(''), 1000);
      }
      
      // Check if puzzle is complete
      if (isPuzzleComplete(newBoard)) {
        setIsComplete(true);
        setGameStatus('Congratulations! Puzzle completed!');
      }
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = 0;
      setBoard(newBoard);
      setGameStatus('');
    }
  };

  const isPuzzleComplete = (currentBoard) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== solution[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const solvePuzzle = () => {
    setBoard(solution.map(row => [...row]));
    setIsComplete(true);
    setGameStatus('Puzzle solved!');
  };

  const clearBoard = () => {
    setBoard(initialBoard.map(row => [...row]));
    setSelectedCell(null);
    setGameStatus('');
    setIsComplete(false);
  };

  const getCellClass = (row, col) => {
    let className = 'sudoku-cell';
    
    if (initialBoard[row][col] !== 0) {
      className += ' initial';
    }
    
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      className += ' selected';
    }
    
    if (board[row][col] !== 0 && board[row][col] !== solution[row][col]) {
      className += ' error';
    }
    
    // Highlight same number
    if (selectedCell && board[selectedCell.row][selectedCell.col] !== 0 && 
        board[row][col] === board[selectedCell.row][selectedCell.col]) {
      className += ' highlighted';
    }
    
    return className;
  };

  return (
    <div className="app" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="header">
        <h1 className="title">Sudoku</h1>
        <p className="subtitle">Challenge your mind with this classic puzzle game</p>
      </div>
      
      <div className="sudoku-container">
        <div className="difficulty-selector">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={isComplete}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div className="sudoku-grid">
          {board.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={getCellClass(rowIndex, colIndex)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={initialBoard[rowIndex][colIndex] !== 0}
              >
                {cell !== 0 ? cell : ''}
              </button>
            ))
          )}
        </div>
        
        <div className="controls">
          <button className="btn btn-primary" onClick={newGame}>
            New Game
          </button>
          <button className="btn btn-secondary" onClick={clearBoard}>
            Clear
          </button>
          <button className="btn btn-danger" onClick={solvePuzzle}>
            Solve
          </button>
        </div>
        
        {gameStatus && (
          <div className={`status ${isComplete ? 'success' : gameStatus.includes('Incorrect') ? 'error' : ''}`}>
            {gameStatus}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 