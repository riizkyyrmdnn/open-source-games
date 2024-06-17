import { useEffect, useState, useCallback, useRef } from "react";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import Overlay from "@component/Overlay/Overlay";
import "@style/main.scss";

export default function WhackAMoleGame() {
  const [holes, setHoles] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(0);
  const [moles, setMoles] = useState([]);
  const [lastHole, setLastHole] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [difficulty, setDifficulty] = useState("easy");
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const intervalRef = useRef(null);

  useEffect(() => {
    const holeElements = document.querySelectorAll(".hole");
    setHoles(Array.from(holeElements));

    const moleElements = document.querySelectorAll(".mole");
    setMoles(Array.from(moleElements));

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [difficulty, startGame]);

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  const randomHole = useCallback(() => {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    setLastHole(hole);
    return hole;
  }, [holes, lastHole]);

  const peep = useCallback(() => {
    let time;
    switch (difficulty) {
      case "easy":
        time = randomTime(800, 1000);
        break;
      case "medium":
        time = randomTime(600, 1000);
        break;
      case "hard":
        time = randomTime(300, 1000);
        break;
      default:
        time = randomTime(800, 1000);
    }
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
      hole.classList.remove("up");
      if (!timeUp) peep();
    }, time);
  }, [holes, randomHole, timeUp, difficulty]);

  let holeCount;
  switch (difficulty) {
    case "easy":
      holeCount = 9;
      break;
    case "medium":
      holeCount = 16;
      break;
    case "hard":
      holeCount = 25;
      break;
    default:
      holeCount = 9;
  }

  const handleStart = useCallback(() => {
    setScoreBoard(0);
    setTimeUp(false);
    setScoreBoard(0);
    setTimer(60);
    peep();
    setStartGame(true);
    setGameOver(false);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          setTimeUp(true);
          setStartGame(false);
          setGameOver(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  }, [peep]);

  const bonk = useCallback(
    (e) => {
      const mole = e.target;
      setScoreBoard((prevScore) => prevScore + 1);
      setScoreBoard((prevScoreBoard) => prevScoreBoard + 1);
      mole.parentNode.classList.remove("up");
    },
    []
  );

  useEffect(() => {
    moles.forEach((mole) => mole.addEventListener("click", bonk));
    return () => {
      moles.forEach((mole) => mole.removeEventListener("click", bonk));
    };
  }, [moles, bonk]);

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };

  const resetGame = () => {
    setScoreBoard(0);
    setTimeUp(true);
    setScoreBoard(0);
    setTimer(60);
    setStartGame(false);
    setGameOver(false);
    setLastHole(null);
    holes.forEach((hole) => hole.classList.remove("up"));
    clearInterval(intervalRef.current);
  };

  return (
    <div className="wrapper">
      <section className="whack-a-mole-game">
        <div className="game-container" style={{ width, height }}>
          <span className="score">{scoreBoard}</span>
          <span className="game-time">{timer}</span>
          {!startGame && !gameOver && (
            <>
              <div className="setup">
                <div className="buttons">
                  <button onClick={() => handleDifficulty("easy")} className="buttons--button">Easy</button>
                  <button onClick={() => handleDifficulty("medium")} className="buttons--button">Medium</button>
                  <button onClick={() => handleDifficulty("hard")} className="buttons--button">Hard</button>
                </div>
                <button onClick={handleStart} className="start-button">Start!</button>
              </div>
              <Overlay />
            </>
          )}
          {gameOver && (
            <>
              <div>Game Over</div>
              <button onClick={resetGame}>Restart</button>
            </>
          )}
          <div className={`game ${difficulty}`}>
            {Array.from({ length: holeCount }, (_, index) => (
              <div key={`hole-${index}`} className={`hole hole${index + 1}`}>
                <div className="hole-img">
                  <div className="holes"></div>
                </div>
                {!timeUp && <div className="mole"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeButton />
    </div>
  );
}
