import { useState, useEffect, useCallback } from "react";
import FlipBombBoard from "./FlipBombBoard";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import Overlay from "@component/Overlay/Overlay";
import useCountdownTimer from "@util/hooks/useTimer";
import useRandomBg from "@util/hooks/useRandomBg";

import "@style/main.scss";

export default function FlipBombGame() {
  const [gameMode, setGameMode] = useState("easy");
  const [boardSize, setBoardSize] = useState(4);
  const [cards, setCards] = useState(FlipBombBoard(boardSize));
  const [flippingCardId, setFlippingCardId] = useState(null);
  const [bombFlipped, setBombFlipped] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const randomBg = useRandomBg();

  const onGameWin = useCallback(() => {
    setGameOver(true);
    alert("Congratulations! You win the Game!");
  }, []);

  const onGameOver = useCallback(() => {
    setGameOver(true);
    alert("Game Over! You hit the bomb.");
  }, []);

  useEffect(() => {
    const nonBombCards = cards.filter((card) => !card.hasBomb);
    const allNonBombFlipped = nonBombCards.every((card) => card.image.matched);
    if (allNonBombFlipped) {
      setTimeout(() => onGameWin(), 500);
    }
  }, [cards, onGameWin]);

  const updateCards = (prevCards, id) => prevCards.map((card) => card.id === id ? { ...card, image: { ...card.image, matched: true }} : card);

  const handleCardClick = (id) => {
    const card = cards.find((card) => card.id === id);
    if (card && !card.image.matched) {
      setFlippingCardId(id);
      setTimeout(() => {
        setFlippingCardId(null);
        if (card.hasBomb) {
          setBombFlipped(true);
          setTimeout(() => onGameOver(), 500);
        } else {
          setCards((prevCards) => updateCards(prevCards, id));
        }
      }, 100);
    }
  };

  useEffect(() => {
    let size;
    switch (gameMode) {
      case "easy":
        size = 4;
        break;
      case "medium":
        size = 6;
        break;
      case "hard":
        size = 8;
        break;
      default:
        size = 4;
    }
    setBoardSize(size);
    setCards(FlipBombBoard(size));
  }, [gameMode]);

  const handleStart = useCallback(() => {
    setStartGame(true);
    setBombFlipped(false);
    setGameOver(false);
  }, []);

  const handleRestart = () => {
    setStartGame(false);
    setGameOver(false);
    setBombFlipped(false);
    setCards(FlipBombBoard(boardSize));
  };

  const handleModeChange = (difficulty) => {
    setGameMode(difficulty);
    setBombFlipped(false);
  };

  const { timeStart, isCounting, startCountdown } = useCountdownTimer(3, handleStart);

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="flip-bomb-game">
        <div className="game-container">
          {!startGame && !isCounting && !gameOver && (
            <>
              <div className="setup">
                <div className="buttons-mode">
                  <button onClick={() => handleModeChange("easy")} className="buttons-mode--button">Easy</button>
                  <button onClick={() => handleModeChange("medium")} className="buttons-mode--button">Medium</button>
                  <button onClick={() => handleModeChange("hard")} className="buttons-mode--button">Hard</button>
                </div>
                  <button className="start-btn" onClick={startCountdown}>Start Game</button>
              </div>
              <Overlay />
            </>
          )}
          {isCounting && (
            <span className="start-timer">{timeStart}</span>
          )}
          <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, clamp(2.8125rem, 2.3661rem + 2.2321vw, 3.75rem))` }}>
            {cards.map((card) => (
              <button
                key={card.id}
                className={`card ${ card.image.matched || (card.hasBomb && bombFlipped) ? "flipped" : ""} ${flippingCardId === card.id ? "flipping" : ""}`} onClick={() => handleCardClick(card.id)} disabled={ isCounting || card.image.matched || (card.hasBomb && bombFlipped) || gameOver }>
                <div className="card-inner">
                  <div className="card-front"></div>
                  <div className="card-back">
                    {card.image.matched || (card.hasBomb && bombFlipped) ? (<img src={card.image.image} alt={card.hasBomb ? "Bomb" : "Card"} className="card-img" />) : ("")}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {gameOver ? <button onClick={handleRestart} className="restart-btn">Restart</button> : null}
        </div>
      </section>
      {!startGame && !isCounting && <HomeButton />}
    </div>
  );
}
