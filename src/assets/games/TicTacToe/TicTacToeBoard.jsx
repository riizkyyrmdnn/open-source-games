import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const TicTacToeBoard = ({ size, squares, onClick, isGameOver }) => {
  const renderSquare = useCallback(
    (i) => {
      const isWinningSquare = squares[i]?.includes("*");
      const isClicked = squares[i] !== null;

      return (
        <button
          key={i}
          className={`square ${isWinningSquare ? "winning" : ""}`}
          onClick={() => onClick(i)}
          disabled={isGameOver}
        >
          {isClicked ? (
            <span className="symbol">{squares[i]?.replace("*", "")}</span>
          ) : null}
        </button>
      );
    },
    [isGameOver, onClick, squares]
  );

  const boardRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(renderSquare(i * size + j));
      }
      rows.push(
        <div
          key={i * size}
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {row}
        </div>
      );
    }
    return rows;
  }, [size, renderSquare]);

  return <div className="board">{boardRows}</div>;
};

TicTacToeBoard.propTypes = {
  size: PropTypes.number.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool
};

export default TicTacToeBoard;
