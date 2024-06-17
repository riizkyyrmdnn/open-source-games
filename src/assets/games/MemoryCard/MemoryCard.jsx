import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { cardImages } from "@asset/data/CardImages";
import useRandomBg from "@util/hooks/useRandomBg";
import useCountdownTimer from "@util/hooks/useTimer";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import Overlay from "@component/Overlay/Overlay";
import "@style/main.scss";

Card.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    matched: PropTypes.bool.isRequired
  }).isRequired,
  handleSelectedCards: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
};

function Card({ item, handleSelectedCards, toggled, disabled }) {
  return (
    <button
      className={`card ${item.matched ? "matched" : ""} ${
        toggled ? "toggled" : ""
      }`}
      onClick={() => !item.matched && handleSelectedCards(item)}
      disabled={disabled || item.matched}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img className="card-img" src={item.image} alt="Memory card" />
        </div>
      </div>
    </button>
  );
}

function getUniqueImages(excludedImages) {
  const uniqueImages = new Set(cardImages.map((card) => card.image));
  return Array.from(uniqueImages).filter(
    (image) => !excludedImages.includes(image)
  );
}

function filterCards(uniqueCards, maxDuplicates) {
  return uniqueCards.filter((card, index, self) => {
    const isDuplicate = self.findIndex((c) => c.image === card.image) !== index;
    if (isDuplicate && maxDuplicates > 2) {
      const excludedImages = uniqueCards.map((card) => card.image);
      const newImage = getUniqueImages(excludedImages)[0];
      return { ...card, image: newImage };
    }
    return isDuplicate || maxDuplicates <= 2;
  });
}

function MemoryCardBoard(gridSize) {
  const shuffledImage = [...cardImages].sort(() => 0.5 - Math.random());
  const uniqueCards = shuffledImage.slice(0, (gridSize * gridSize) / 2);
  const uniqueImages = new Set(uniqueCards.map((card) => card.image));
  const maxDuplicates = Math.max(
    ...Array.from(uniqueImages).map(
      (image) => uniqueCards.filter((card) => card.image === image).length
    )
  );

  const filteredCards = filterCards(uniqueCards, maxDuplicates);
  const doubledCards = [...filteredCards, ...filteredCards];

  return doubledCards
    .toSorted(() => 0.5 - Math.random())
    .map((item, index) => ({ ...item, id: index, matched: false }));
}

export default function MemoryCardGame() {
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [cardsArray, setCardsArray] = useState(MemoryCardBoard(gridSize));
  const [mode, setMode] = useState("easy");
  const [flip, setFlip] = useState(true);
  const [won, setWon] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const randomBg = useRandomBg();

  useEffect(() => {
    let newGridSize;
    switch (mode) {
      case "easy":
        newGridSize = 4;
        break;
      case "medium":
        newGridSize = 6;
        break;
      case "hard":
        newGridSize = 8;
        break;
      default:
        newGridSize = 4;
    }
    setGridSize(newGridSize);
    setCardsArray(MemoryCardBoard(newGridSize));
  }, [mode]);

  const NewGame = useCallback(() => {
    setCardsArray(MemoryCardBoard(gridSize));
    setMoves(0);
    setFirstCard(null);
    setSecondCard(null);
    setWon(false);
    setFlip(false);
    setStopFlip(false);
  }, [gridSize]);

  const startNewGame = useCallback(() => {
    setStartGame(true);
    NewGame();
  }, [NewGame]);

  const handleRestart = () => {
    setStartGame(false);
    setWon(false);
    NewGame();
  };

  function handleSelectedCards(item) {
    if (!firstCard) {
      setFirstCard(item);
    } else if (firstCard.id !== item.id && !secondCard && !stopFlip) {
      setSecondCard(item);
      setStopFlip(true);
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setTimeout(() => {
        if (firstCard.image === secondCard.image) {
          const updatedCards = cardsArray.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          );
          setCardsArray(updatedCards);
          setWon(
            updatedCards.filter((card) => card.matched).length ===
              updatedCards.length
          );
          setFirstCard(null);
          setSecondCard(null);
        } else {
          setTimeout(() => {
            setFirstCard(null);
            setSecondCard(null);
          }, 500);
        }
        setStopFlip(false);
        setMoves((prevMoves) => prevMoves + 1);
      }, 1000);
    }
  }, [firstCard, secondCard, cardsArray]);

  const handleModeChange = (difficulty) => {
    setMode(difficulty);
  };

  const { timeStart, isCounting, startCountdown } = useCountdownTimer(3, startNewGame);

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="memory-card-game">
        <div className="game-container">
          {!startGame && !isCounting && (
            <>
              <div className="setup">
                <div className="buttons-mode">
                  <button onClick={() => handleModeChange("easy")} className="buttons-mode--button">Easy</button>
                  <button onClick={() => handleModeChange("medium")} className="buttons-mode--button">
                    Medium
                  </button>
                  <button onClick={() => handleModeChange("hard")} className="buttons-mode--button">Hard</button>
                </div>
                  <button className="start-btn" onClick={startCountdown}>
                    Start Game
                  </button>
              </div>
              <Overlay />
            </>
          )}
          {isCounting && (
            <strong className="start-timer">{timeStart}</strong>
          )}
          <div
            className="board"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, clamp(2.8125rem, 2.3661rem + 2.2321vw, 3.75rem))`,
            }}
          >
            {cardsArray.map((item) => (
              <Card
                key={item.id}
                item={item}
                handleSelectedCards={handleSelectedCards}
                toggled={
                  item === firstCard || item === secondCard || item.matched
                }
                stopflip={stopFlip}
                disabled={flip}
              />
            ))}
          </div>
          <div className="comments">
            {!won ? (
              `Moves: ${moves}`
            ) : (
              <>
                <p>You Won in {moves} moves!</p>
                <button onClick={handleRestart} className="button">
                  Restart Game
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <HomeButton />
    </div>
  );
}
