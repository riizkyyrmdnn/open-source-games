import { useState, useEffect, useRef, useCallback } from "react";
import useCountdownTimer from "@util/hooks/useTimer";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import Overlay from "@component/Overlay/Overlay";
import Pipe from "./image/pipe.png";
import "@style/main.scss";

export default function FlappyBirdGame() {
  const BIRD_SIZE = 32;
  const GRAVITY = 8;
  const JUMP_HEIGHT = 50;
  const PIPE_WIDTH = 48;
  const SPEED = 22;
  const FRAME_RATE = 1000 / 60;
  const initialPipeFrequency = 2000;
  const pipeFrequencyDecreaseRate = 100;
  const minPipeFrequency = 1000;

  const [gameWidth, setGameWidth] = useState(window.innerWidth);
  const [gameHeight, setGameHeight] = useState(window.innerHeight);
  const gameInterval = useRef(null);
  const gameDurationInterval = useRef(null);
  const adjustGameHeight = gameHeight - BIRD_SIZE;

  const [score, setScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(gameHeight / 2);
  const [jump, setJump] = useState(false);
  const [jumpStartPosition, setJumpStartPosition] = useState(0);
  const [jumpStartTime, setJumpStartTime] = useState(0);
  
  const [pipes, setPipes] = useState([{ height: 200, left: gameWidth }]);
  const [pipeFrequency, setPipeFrequency] = useState(initialPipeFrequency);
  const pipeMovementInterval = useRef(null);
  const pipeGenerateInterval = useRef(null);
  
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const Bird = "https://orig00.deviantart.net/a839/f/2015/213/c/a/flappy_bird_by_jubaaj-d93bpnj.png";

  useEffect(() => {
    const handleResize = () => {
      setGameWidth(window.innerWidth);
      setGameHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updatePipes = (pipes) =>
    pipes.map((pipe) => ({
      ...pipe,
      left: pipe.left - 5,
    }));

  useEffect(() => {
    if (startGame && !gameOver) {
      pipeMovementInterval.current = setInterval(() => {
        setPipes(updatePipes);
      }, SPEED);
      return () => clearInterval(pipeMovementInterval.current);
    }
  }, [startGame, gameOver, gameWidth]);

  useEffect(() => {
    if (startGame && !gameOver) {
      pipeGenerateInterval.current = setInterval(() => {
        setPipes((pipes) => [
          ...pipes,
          {
            height: Math.floor(Math.random() * (gameHeight - 200)),
            left: gameWidth,
          },
        ]);
      }, pipeFrequency);
      return () => clearInterval(pipeGenerateInterval.current);
    }
  }, [startGame, gameOver, pipeFrequency, gameHeight, gameWidth]);

  useEffect(() => {
    if (startGame && !gameOver) {
      gameDurationInterval.current = setInterval(() => {
        setPipeFrequency((prev) =>
          Math.max(prev - pipeFrequencyDecreaseRate, minPipeFrequency)
        );
      }, 30000);
      return () => clearInterval(gameDurationInterval.current);
    }
  }, [startGame, gameOver]);

  useEffect(() => {
    if (startGame && birdPosition < adjustGameHeight) {
      const gravityEffect = () => {
        setBirdPosition((prev) => {
          if (jump) {
            const elapsed = Date.now() - jumpStartTime;
            const progress = elapsed / 200;
            const newPosition = jumpStartPosition - JUMP_HEIGHT * progress;
            if (progress < 1) {
              return newPosition;
            } else {
              setJump(false);
              return prev + GRAVITY;
            }
          } else {
            return prev + GRAVITY;
          }
        });
      };
      gameInterval.current = setInterval(gravityEffect, FRAME_RATE);
      return () => clearInterval(gameInterval.current);
    } else if (startGame) {
      setGameOver(true);
      clearInterval(gameInterval.current);
      clearInterval(pipeMovementInterval.current);
      clearInterval(pipeGenerateInterval.current);
      clearInterval(gameDurationInterval.current);
    }
  }, [birdPosition, adjustGameHeight, jump, jumpStartPosition, jumpStartTime, startGame, FRAME_RATE]);

  const handleClick = useCallback(() => {
    if (startGame && !gameOver && birdPosition > 0) {
      setJumpStartPosition(birdPosition);
      setJumpStartTime(Date.now());
      setJump(true);
    }
  }, [startGame, gameOver, birdPosition]);

  useEffect(() => {
    pipes.forEach((pipe) => {
      const hasCollidedWithPipe = pipe.left >= 0 && pipe.left <= PIPE_WIDTH && (birdPosition < pipe.height || birdPosition > pipe.height + 200 - BIRD_SIZE);
      const hasHitGrass = birdPosition >= adjustGameHeight;

      if (hasCollidedWithPipe || hasHitGrass) {
        setGameOver(true);
        clearInterval(gameInterval.current);
        clearInterval(pipeMovementInterval.current);
        clearInterval(pipeGenerateInterval.current);
        clearInterval(gameDurationInterval.current);
      }
    });

    if (pipes.length > 0 && pipes[0].left <= -PIPE_WIDTH) {
      setPipes(pipes.slice(1));
      setScore((score) => score + 1);
    }
  }, [pipes, birdPosition, adjustGameHeight]);

  const handleStart = useCallback(() => {
    setStartGame(true);
    setGameOver(false);
    setBirdPosition(gameHeight / 2);
    setPipes([{ height: 200, left: gameWidth }]);
    setScore(0);
    setPipeFrequency(initialPipeFrequency);
  }, [gameHeight, gameWidth]);

  const handleRestart = () => {
    setGameOver(false);
    setBirdPosition(gameHeight / 2);
    setPipes([{ height: 200, left: gameWidth }]);
    setScore(0);
    setStartGame(false);
    setPipeFrequency(initialPipeFrequency);
  };

  const { timeStart, isCounting, startCountdown } = useCountdownTimer(3, handleStart);

  return (
    <div className="wrapper">
      <section className="flappy-bird-game">
        <div className="game-container">
          {isCounting && <span className="start-timer">{timeStart}</span>}
          <div role="button" tabIndex="0" className="game-controller" onClick={handleClick} style={{ width: gameWidth, height: gameHeight }} disabled={isCounting}>
            {!startGame && !isCounting && (
              <>
                <div className="control-container">
                  <button onClick={startCountdown} className="control-container-start-btn">Start Game</button>
                </div>
                <Overlay />
              </>
            )}
            <img className="game-controller--bird" src={Bird} alt="Bird" style={{ width: BIRD_SIZE, height: BIRD_SIZE, top: birdPosition }} />
            <div className="game-controller--score">{score}</div>
            {pipes.map((pipe) => (
              <div key={`${pipe.left}-${pipe.height}`}>
                <img className="game-controller--pipe-top" src={Pipe} alt="Pipes top" style={{ width: PIPE_WIDTH, height: pipe.height, left: pipe.left }} />
                <img className="game-controller--pipe-bottom" src={Pipe} alt="Pipes bottom" style={{ width: PIPE_WIDTH, height: gameHeight - pipe.height - 200, left: pipe.left, top: pipe.height + 200 }} />
              </div>
            ))}
            <div className="game-controller--grass" style={{ width: gameWidth }}></div>
            {gameOver && (
              <>
                <div className="game-controller--status">Game Over</div>
                <button onClick={handleRestart} className="game-controller-restart-btn">Restart Game</button>
                <Overlay />
              </>
            )}
          </div>
        </div>
      </section>
      {!startGame && !isCounting && <HomeButton />}
    </div>
  );
}
