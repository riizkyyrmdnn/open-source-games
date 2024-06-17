import { useState, useEffect, useRef, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import "@style/main.scss";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(5000);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [controlType, setControlType] = useState("buttons");

  const snakeSize = 16;
  const foodSize = 16;

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.canvas.width = width;
      ctx.canvas.height = height;
    }
  }, [ctx, width, height]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    if (controlType === 'keyboard') {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, controlType]);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const draw = useCallback((snake) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'green';
    snake.forEach((segment, index) => {
      ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
      if (index === 0) {
        ctx.fillStyle = 'rgb(255, 218, 41)';
        ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
      } else if (index === snake.length - 1) {
        ctx.fillStyle = 'rgba(255, 218, 41, 0.2)';
        ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
      }
    });

    const apple = new Image();
    apple.src = "https://www.svgrepo.com/show/489696/apple.svg";
    ctx.drawImage(apple, food.x * snakeSize, food.y * snakeSize, foodSize, foodSize);
  }, [ctx, width, height, food.x, food.y, snakeSize, foodSize]);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood({ x: Math.floor(Math.random() * width / snakeSize), y: Math.floor(Math.random() * height / snakeSize) });
      setSpeed(speed => Math.max(speed - 5, 50));
    } else {
      newSnake.pop();
    }

    if (head.x < 0 || head.x >= width / snakeSize || head.y < 0 || head.y >= height / snakeSize || newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
      draw(newSnake);
    }
  }, [direction.x, direction.y, draw, food.x, food.y, height, snake, width, snakeSize]);

  useEffect(() => {
    if (gameOver) {
      setGameOver(true);
    }
    const interval = setInterval(moveSnake, speed / 60);
    return () => clearInterval(interval);
  }, [snake, direction, speed, gameOver, moveSnake]);

  const handleDirection = useCallback((newDirection) => {
    switch (newDirection) {
      case "UP":
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case "DOWN":
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case "LEFT":
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case "RIGHT":
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [direction.x, direction.y]);

  const handleSwipe = useCallback((e) => {
    const touchStartX = e.changedTouches[0].clientX;
    const touchStartY = e.changedTouches[0].clientY;
    
    const handleTouchMove = (moveEvent) => {
      const touchEndX = moveEvent.changedTouches[0].clientX;
      const touchEndY = moveEvent.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaX > 0 ? handleDirection("RIGHT") : handleDirection("LEFT");
      } else {
        deltaY > 0 ? handleDirection("DOWN") : handleDirection("UP");
      }
      window.removeEventListener('touchmove', handleTouchMove);
    };
    window.addEventListener('touchmove', handleTouchMove);
  }, [handleDirection]);

  useEffect(() => {
    if (controlType === 'swipe') {
      window.addEventListener('touchstart', handleSwipe);
    }
    return () => window.removeEventListener('touchstart', handleSwipe);
  }, [controlType, handleSwipe]);

  const handleStart = () => {
    setStartGame(true);
  };

  const handleControl = (control) => {
    setControlType(control);
  }

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 0 });
    setSpeed(4000);
    setGameOver(false);
    setStartGame(false);
  }

  return (
    <div className="wrapper">
      <section className="snake-eat-game">
        <div className="game-container">
          <canvas ref={canvasRef}></canvas>
          {gameOver && <button onClick={handleRestart} className="button-restart">Restart</button>}
          {!startGame && <div className="buttons">
            {isDesktopOrLaptop && <button onClick={() => handleControl("keyboard")} className="buttons--button">Keyboard</button>}
            {!isDesktopOrLaptop && <button onClick={() => handleControl("swipe")} className="buttons--button">Swipe</button>}
            <button onClick={() => handleControl("buttons")} className="buttons--button">Buttons</button>
            <button className="buttons-start-btn" onClick={handleStart}>Start Game</button>
          </div>}
          {controlType === "buttons" && startGame && !gameOver && (
            <div className="buttons-control">
              <button onClick={() => handleDirection("UP")} disabled={!startGame || gameOver}>T</button>
              <button onClick={() => handleDirection("LEFT")} disabled={!startGame || gameOver}>L</button>
              <button onClick={() => handleDirection("RIGHT")} disabled={!startGame || gameOver}>R</button>
              <button onClick={() => handleDirection("DOWN")} disabled={!startGame || gameOver}>B</button>
            </div>
          )}
        </div>
      </section>
      {!startGame && <HomeButton />}
    </div>
  );
}
