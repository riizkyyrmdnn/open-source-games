import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ModeChoices, rules } from "./RPSData";
import useRandomBg from "@util/hooks/useRandomBg";
import useConfirm from "@util/hooks/useConfirm";
import ConfirmPopup from "@component/PopUp/Popup";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import Overlay from "@component/Overlay/Overlay";
import "@style/main.scss";

const scores = { computerScore: 0, playerScore: 0, drawScore: 0, invalidScore: 0 };

const minimax = (currentChoice, playerChoice, isMaximizing) => {
  const scoreValues = { win: 1, lose: -1, draw: 0 };
  if (currentChoice === playerChoice) return scoreValues.draw;
  if (rules[currentChoice].includes(playerChoice)) {
    return isMaximizing ? scoreValues.win : scoreValues.lose;
  }
  return isMaximizing ? scoreValues.lose : scoreValues.win;
};

const YOUR_CHANCE_TO_WIN = 0.00000001;

const randomChoice = (difficulty) => {
  const choices = ModeChoices[difficulty];
  return choices[Math.floor(Math.random() * choices.length)];
};

const getComputerChoice = (difficulty, playerChoice) => {
  if (!difficulty) return null;

  if (Math.random() < YOUR_CHANCE_TO_WIN) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (const move of ModeChoices[difficulty]) {
      const score = minimax(move.title, playerChoice, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove || randomChoice(difficulty);
  } else {
    return randomChoice(difficulty);
  }
};

const getWinner = (playerChoice, computerChoice) => {
  if (!computerChoice) {
    scores.invalidScore++;
    document.querySelector(".invalid-score").textContent = scores.invalidScore;
    return "Invalid result";
  }

  if (playerChoice === computerChoice.title) {
    scores.drawScore++;
    document.querySelector(".draw-score").textContent = scores.drawScore;
    return "Draw";
  }

  if (rules[playerChoice].includes(computerChoice.title)) {
    scores.playerScore++;
    document.querySelector(".player-score").textContent = scores.playerScore;
    return "Player wins";
  }

  scores.computerScore++;
  document.querySelector(".computer-score").textContent = scores.computerScore;
  return "Computer wins";
};

const PlayerChoice = ({ choice, onClick, disabled }) => (
  <button className="element" onClick={() => onClick(choice)} disabled={disabled}>
    <img src={choice.image} alt={choice.title} className="img" />
  </button>
);
PlayerChoice.propTypes = {
  choice: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default function RockPaperScissorsGame() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [isComputerChoosing, setIsComputerChoosing] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  
  const [modesBtn, setModesBtn] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const [choiceBtn, setChoiceBtn] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);
  const [changeBtn, setChangeBtn] = useState(true);
  const [restartBtn, setRestartBtn] = useState(true);
  
  const [result, setResult] = useState("");
  const [alert, setAlert] = useState(false);

  const randomBg = useRandomBg();

  const { isOpen, openConfirm, closeConfirm, handleConfirm } = useConfirm();

  useEffect(() => {
    if (playerChoice && difficulty) {
      setIsComputerChoosing(true);
      setComputerChoice({ title: "...", image: "..." });
      setResult("...");
      setChoiceBtn(true);

      const timeoutId = setTimeout(() => {
        const choice = getComputerChoice(difficulty, playerChoice.title);
        setComputerChoice(choice);
        const resultText = getWinner(playerChoice.title, choice);
        setResult(resultText);
        setAlert(true);
        setTimeout(() => setAlert(false), 2000);
        setNextBtn(false);
        setChangeBtn(false);
        setIsComputerChoosing(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [difficulty, playerChoice]);

  const handleNext = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setChoiceBtn(false);
    setNextBtn(true);
    setChangeBtn(true);
  };

  const handleChoiceClick = (choice) => setPlayerChoice(choice);

  const handleDifficultyClick = (level) => {
    setDifficulty(level);
    setStartBtn(false);
  };

  const handleMode = () => {
    setModesBtn(false);
    setChangeBtn(true);
    setRestartBtn(true);
    setNextBtn(true);
    setPlayerChoice(null);
    setComputerChoice(null);
  };

  const handleStart = () => {
    setChoiceBtn(false);
    setStartBtn(true);
    setModesBtn(true);
    setRestartBtn(false);
  };

  const handleReset = () => {
    openConfirm(() => window.location.reload());
  };

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="rock-paper-scissors-game">
        <div className="game-container">
          <h2>Game Mode</h2>
          <div className="buttons-mode">
            <button onClick={() => handleDifficultyClick("easy")} className="buttons-mode--button" disabled={modesBtn}>Easy</button>
            <button onClick={() => handleDifficultyClick("medium")} className="buttons-mode--button" disabled={modesBtn}>Medium</button>
            <button onClick={() => handleDifficultyClick("hard")} className="buttons-mode--button" disabled={modesBtn}>Hard</button>
          </div>
          <h2>Game Options</h2>
          <div className="buttons-options">
            <button onClick={handleReset} disabled={restartBtn} className="buttons-options--button">Restart</button>
            <button onClick={handleNext} disabled={nextBtn} className="buttons-options--button">Next</button>
            <button onClick={handleStart} disabled={startBtn} className="buttons-options--button">Start</button>
            <button onClick={handleMode} disabled={changeBtn} className="buttons-options--button">Change Mode</button>
          </div>
          <div className="score-display">
            <div className="score">
              <span className="player-score score--number">0</span>
              <p className="score--title">Player</p>
            </div>
            <div className="score">
              <span className="computer-score score--number">0</span>
              <p className="score--title">Computer</p>
            </div>
            <div className="score">
              <span className="draw-score score--number">0</span>
              <p className="score--title">Draw</p>
            </div>
          </div>
          <div className="player-vs-computer">
            <div className="player-display">
              <h4>Player</h4>
              <div className="dis">
                <div id="player-choice">
                  {playerChoice && (
                    <img src={playerChoice.image} alt={playerChoice.title} className="img" />
                  )}
                </div>
                <p className="player-element">{playerChoice?.title ?? ""}</p>
              </div>
            </div>
            <h1 className="middle-text">VS</h1>
            <div className="computer-display">
              <h4>Computer</h4>
              <div className="dis">
                <div id="computer-choice">
                  {isComputerChoosing ? (
                    <img src="https://th.bing.com/th/id/OIP.zeau7EitMnZxcNIswKMZwgHaHa?rs=1&pid=ImgDetMain" alt="Computer choice" className="img" />
                  ) : (
                    computerChoice && <img src={computerChoice.image} alt={computerChoice.title} className="img" />
                  )}
                </div>
                <p className="computer-element">
                  {isComputerChoosing ? "..." : computerChoice?.title ?? ""}
                </p>
              </div>
            </div>
          </div>
          <div className="element-display">
            {difficulty &&
              ModeChoices[difficulty].map((choice) => (
                <PlayerChoice
                  key={choice.title}
                  choice={choice}
                  onClick={handleChoiceClick}
                  disabled={choiceBtn}
                />
              ))}
          </div>
          {alert && (
            <>
              <div className={`status ${alert ? 'active' : ''}`}>{result}</div>
              <Overlay />
            </>
          )}
        </div>
      </section>
      <ConfirmPopup
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
      <HomeButton />
    </div>
  );
}
