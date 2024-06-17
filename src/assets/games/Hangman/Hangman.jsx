import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useConfirm from "@util/hooks/useConfirm";
import ConfirmPopup from "@component/PopUp/Popup";
import useRandomBg from "@util/hooks/useRandomBg";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import "@style/main.scss";

import hangman0 from "./images/hangman0.svg";
import hangman1 from "./images/hangman1.svg";
import hangman2 from "./images/hangman2.svg";
import hangman3 from "./images/hangman3.svg";
import hangman4 from "./images/hangman4.svg";
import hangman5 from "./images/hangman5.svg";
import hangman6 from "./images/hangman6.svg";

HangmanGame.propTypes = {
  propsHangmanGame: PropTypes.shape({
    guessWords: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      level: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
    })).isRequired,
  }).isRequired,
};

export default function HangmanGame(props) {
  const { guessWords } = props.propsHangmanGame;
  
  const [word, setWord] = useState("");
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wordHint, setWordHint] = useState("");
  
  const [inputValues, setInputValues] = useState([]);
  const [currentInput, setCurrentInput] = useState([]);
  const [wordList, setWordList] = useState([...guessWords]);
  const [usedWords, setUsedWords] = useState([]);
  
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [remainingWords, setRemainingWords] = useState(guessWords.length);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const [wordLevel, setWordLevel] = useState("");
  const [nextButton, setNextButton] = useState(true);
  const [startButton, setStartButton] = useState(false);
  const [resetButton, setResetButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(true);
  const [readonlyInput, setReadonlyInput] = useState(true);

  const maxGuesses = 7;

  const randomBg = useRandomBg();

  const { isOpen, openConfirm, closeConfirm, handleConfirm } = useConfirm();

  const randomWord = () => {
    if (wordList.length === 0) {
      alert("You have guessed all words!");
      return;
    }
    const ranIndex = Math.floor(Math.random() * wordList.length);
    const ranItem = wordList[ranIndex];
    const newWord = ranItem.word.toLowerCase();
    setWord(newWord);
    setWordHint(ranItem.hint);
    setInputValues(newWord.split("").map(() => ""));
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setCurrentInput(newWord.split("").map(() => ""));
    setWrongGuessCount(0);
    setWordLevel(ranItem.level);
    setUsedWords([...usedWords, ranItem]);
    setWordList(wordList.filter((_, index) => index !== ranIndex));
  };

  const handleStart = () => {
    setStartButton(true);
    setResetButton(false);
    setReadonlyInput(false);
    randomWord();
  }

  function handleReset() {
    openConfirm(() => window.location.reload());
  }

  const handleWin = () => {
    setReadonlyInput(true);
    setSubmitButton(true);
    setNextButton(false);
    setTotalCorrect(totalCorrect + 1);
    setRemainingWords(Math.max(remainingWords - 1, 0));
  };

  const handleLose = () => {
    setTotalIncorrect(totalIncorrect + 1);
    setRemainingWords(Math.max(remainingWords - 1, 0));
    setReadonlyInput(true);
    setNextButton(false);
    setSubmitButton(true);
  };

  const handleNext = () => {
    setNextButton(true);
    randomWord();
  };

  function handleInputChange(e, index) {
    const value = e.target.value.toLowerCase();
    const updatedInput = [...currentInput];
    const updatedIncorrectLetters = [...incorrectLetters];

    if (value && !word[index].includes(value) && !updatedIncorrectLetters.includes(value)) {
      updatedIncorrectLetters.push(value);
      setWrongGuessCount((prevCount) => prevCount + 1);
    }

    if (value.trim() !== "") setSubmitButton(false);

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      updatedInput[index] = "";
    } else {
      updatedInput[index] = value;
    }
    setCurrentInput(updatedInput);
    setIncorrectLetters(updatedIncorrectLetters);

    if (updatedIncorrectLetters.length >= maxGuesses) {
      alert(`The correct word was: ${word.toUpperCase()}`);
      handleLose();
    }
  }

  function handleSubmit() {
    const updatedValues = [...inputValues];
    let updatedCorrectLetters = [...correctLetters];
    let updatedIncorrectLetters = [...incorrectLetters];
    let newWrongGuessCount = wrongGuessCount;
    currentInput.forEach((letter, index) => {
      if (word[index] === letter) {
        updatedValues[index] = letter;
        if (!updatedCorrectLetters.includes(letter)) {
          updatedCorrectLetters.push(letter);
        }
      } else if (!word.includes(letter) && !updatedIncorrectLetters.includes(letter)) {
        updatedIncorrectLetters.push(letter);
        newWrongGuessCount++;
      }
    });

    setWrongGuessCount(newWrongGuessCount);
    setInputValues(updatedValues);
    setCorrectLetters(updatedCorrectLetters);
    setIncorrectLetters(updatedIncorrectLetters);

    if (updatedValues.join("") === word) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      handleWin();
    } else if (newWrongGuessCount >= maxGuesses) {
      alert(`The correct word was: ${word.toUpperCase()}`);
      handleLose();
    } else {
      alert("Wrong!");
    }
  }

  useEffect(() => {
    const hangmanImage = document.querySelector(".hangman-image");
    switch (wrongGuessCount) {
      case 1:
        hangmanImage.src = hangman1;
        break;
      case 2:
        hangmanImage.src = hangman2;
        break;
      case 3:
        hangmanImage.src = hangman3;
        break;
      case 4:
        hangmanImage.src = hangman4;
        break;
      case 5:
        hangmanImage.src = hangman5;
        break;
      case 6:
        hangmanImage.src = hangman6;
        break;
      default:
        hangmanImage.src = hangman0;
        break;
    }
  }, [wrongGuessCount]);

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="hangman-game">
        <div className="game-container">
          <img src={hangman0} alt="Hangman" className="hangman-image" />
          <div className="inputs-container">
            <div className="scores">
              <div className="scores--incorrect">Incorrect: <span className="wrong">{totalIncorrect}</span></div>
              <div className="scores--correct">Correct: <span className="correct">{totalCorrect}</span></div>
              <div className="scores--remaining">Remaining: <span className="remaining">{wrongGuessCount}</span> / {maxGuesses}</div>
              <div className="scores--words">Total Words: <b>{guessWords.length - remainingWords}</b> / <b>{guessWords.length}</b></div>
            </div>
            <h5 className="word-level">Word Level: {wordLevel}</h5>
            <h6 className="hint-text">Hint: <b>{wordHint}</b></h6>
            <div className="word-display">
              {inputValues.map((val, index) => (
                <input key={index} type="text" maxLength={1} readOnly={readonlyInput} value={currentInput[index] || ""} onChange={(e) => handleInputChange(e, index)} className={correctLetters.includes(val) ? "correct" : ""} autoComplete="off" spellCheck="false" placeholder={index + 1} />
              ))}
            </div>
            <button className="submit-btn" onClick={handleSubmit} disabled={submitButton}>Submit</button>
            <div className="buttons">
              <button className="buttons-button-reset" onClick={handleReset} disabled={resetButton}>Reset Game</button>
              <button className="buttons-button-next" onClick={handleNext} disabled={nextButton}>Next Word</button>
              <button className="buttons-button-start" onClick={handleStart} disabled={startButton}>Start Game</button>
            </div>
          </div>
        </div>
        <ConfirmPopup
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
      </section>
      <HomeButton />
    </div>
  );
}
