import { useState, useEffect } from "react";
import useCountdownTimer from "@util/hooks/useTimer";
import useRandomBg from "@util/hooks/useRandomBg";
import TicTacToeBoard from "./TicTacToeBoard";
import Overlay from "@component/Overlay/Overlay";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import "@style/main.scss";

export default function TicTacToeGame() {
  const [size, setSize] = useState(3);
  const [squares, setSquares] = useState(Array(3 * 3).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scoreBoard, setScoreBoard] = useState({ X: 0, O: 0, draw: 0 });
  const [playAgainstBot, setPlayAgainstBot] = useState(false);
  const [gameMode, setGameMode] = useState("easy");

  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const randomBg = useRandomBg();

  useEffect(() => {
    setSquares(Array(size * size).fill(null));
  }, [size]);

  const handleClick = (i) => {
    if (!startGame || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    const winnerPattern = checkWin(newSquares, size);
    if (winnerPattern) {
      markWinningCells(newSquares, winnerPattern);
      alert(`Player ${xIsNext ? "X" : "O"} wins!`);
      const newScoreBoard = { ...scoreBoard };
      newScoreBoard[xIsNext ? "X" : "O"]++;
      setScoreBoard(newScoreBoard);
      setStartGame(false);
      setGameOver(true);
    } else if (newSquares.every((square) => square !== null)) {
      alert("It's a draw!");
      const newScoreBoard = { ...scoreBoard };
      newScoreBoard.draw++;
      setScoreBoard(newScoreBoard);
      setStartGame(false);
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
      if (playAgainstBot) {
        makeBotMove(newSquares);
      }
    }
  };

  const makeBotMove = (currentSquares) => {
    let emptyIndices = currentSquares
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
    if (emptyIndices.length > 0) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      currentSquares[randomIndex] = "O";
      setSquares(currentSquares);
      const winnerPattern = checkWin(currentSquares, size);
      if (winnerPattern) {
        markWinningCells(currentSquares, winnerPattern);
        alert(`Player O wins!`);
        const newScoreBoard = { ...scoreBoard };
        newScoreBoard.O++;
        setScoreBoard(newScoreBoard);
        setStartGame(false);
        setGameOver(true);
      } else if (currentSquares.every((square) => square !== null)) {
        alert("It's a draw!");
        const newScoreBoard = { ...scoreBoard };
        newScoreBoard.draw++;
        setScoreBoard(newScoreBoard);
        setStartGame(false);
        setGameOver(true);
      } else {
        setXIsNext(true);
      }
    }
  };

  useEffect(() => {
    let size;
    switch (gameMode) {
      case "easy":
        size = 3;
        break;
      case "medium":
        size = 5;
        break;
      case "hard":
        size = 7;
        break;
      default:
        size = 3;
    }
    setSize(size);
    setSquares(Array(size * size).fill(null));
  }, [gameMode]);

  const handleStart = () => {
    setStartGame(true);
    setGameOver(false);
  };

  const handleReset = () => {
    setXIsNext(true);
    setGameOver(false);
  };

  const handleGameMode = (difficulty) => {
    setGameMode(difficulty);
  };

  const checkWin = (squares, size) => {
    const winLength = size >= 6 ? 4 : 3;
  
    // horizontal
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - winLength; col++) {
        const symbol = squares[row * size + col];
        if (symbol && squares.slice(row * size + col, row * size + col + winLength).every((s) => s === symbol)) {
          return squares.slice(row * size + col, row * size + col + winLength).map((_, i) => row * size + col + i);
        }
      }
    }
  
    // vertical
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - winLength; row++) {
        const symbol = squares[row * size + col];
        if (symbol && Array.from({ length: winLength }, (_, i) => squares[(row + i) * size + col]).every((s) => s === symbol)) {
          return Array.from({ length: winLength }, (_, i) => (row + i) * size + col);
        }
      }
    }
  
    // main diagonal
    for (let row = winLength - 1; row < size; row++) {
      for (let col = 0; col <= size - winLength; col++) {
        const symbol = squares[row * size + col];
        if (symbol && Array.from({ length: winLength }, (_, i) => squares[(row - i) * size + col + i]).every((s) => s === symbol)) {
          return Array.from({ length: winLength }, (_, i) => (row - i) * size + col + i);
        }
      }
    }
  
    // Secondary diagonal
    for (let row = 0; row <= size - winLength; row++) {
      for (let col = winLength - 1; col < size; col++) {
        const symbol = squares[row * size + col];
        if (symbol && Array.from({ length: winLength }, (_, i) => squares[(row + i) * size + col - i]).every((s) => s === symbol)) {
          return Array.from({ length: winLength }, (_, i) => (row + i) * size + col - i);
        }
      }
    }
  
    return null;
  };

  const markWinningCells = (squares, pattern) => {
    const newSquares = squares.slice();
    pattern.forEach((index) => {
      newSquares[index] = newSquares[index] + "*";
    });
    setSquares(newSquares);
    setGameOver(true);
    setStartGame(false);
  };

  const { timeStart, isCounting, startCountdown } = useCountdownTimer(
    3,
    handleStart
  );

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="tic-tac-toe-game">
        <div className="game-container">
          {isCounting && (
            <strong className="start-timer">{timeStart}</strong>
          )}
          {!startGame && !isCounting && (
            <>
              <div className="controls">
                <div className="buttons-mode">
                  <button onClick={() => handleGameMode("easy")} className="buttons-mode--button">Easy (3x3)</button>
                  <button onClick={() => handleGameMode("medium")} className="buttons-mode--button">Medium (6x6)</button>
                  <button onClick={() => handleGameMode("hard")} className="buttons-mode--button">Hard (9x9)</button>
                </div>
                <div className="buttons-choice">
                  <button onClick={() => setPlayAgainstBot(!playAgainstBot)} className="buttons-choice--button">A.I</button>
                  <button onClick={() => setPlayAgainstBot(playAgainstBot)} className="buttons-choice--button">Player</button>
                </div>
                <button onClick={startCountdown} className="start-btn">Start Game</button>
              </div>
              <Overlay />
            </>
          )}
          {gameOver && (
            <>
              <div className="game-info">
                <div>{`Next player: ${xIsNext ? "X" : "O"}`}</div>
                <div>
                  <div>X: {scoreBoard.X}</div>
                  <div>O: {scoreBoard.O}</div>
                  <div>Draws: {scoreBoard.draw}</div>
                </div>
              </div>
              <button className="reset-btn" onClick={handleReset}>
                Reset Game
              </button>
            </>
          )}
          <TicTacToeBoard size={size} squares={squares} onClick={handleClick} isGameOver={!startGame || gameOver} />
        </div>
      </section>
      {!startGame && !isCounting && <HomeButton />}
    </div>
  );
}
