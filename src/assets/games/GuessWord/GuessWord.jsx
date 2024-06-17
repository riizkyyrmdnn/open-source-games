import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useRandomBg from "@util/hooks/useRandomBg";
import useConfirm from "@util/hooks/useConfirm";
import ConfirmPopup from "@component/PopUp/Popup";
import HomeButton from "@component/Buttons/HomeButton/HomeBtn";
import "@style/main.scss";

GuessWordGame.propTypes = {
  wordGame: PropTypes.shape({
    guessWords: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      level: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
    })).isRequired,
  }).isRequired,
};

export default function GuessWordGame(props) {
  const { guessWords } = props.wordGame;

  const [word, setWord] = useState("");
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [hintWord, setHintWord] = useState("");

  const [inputValues, setInputValues] = useState([]);
  const [newCurrentInput, setNewCurrentInput] = useState([]);
  const [wordList, setWordList] = useState([...guessWords]);
  const [usedWords, setUsedWords] = useState([]);

  const [wordLevel, setWordLevel] = useState("");
  const [wordClue, setWordClue] = useState("");

  const [nextButton, setNextButton] = useState(true);
  const [startButton, setStartButton] = useState(false);
  const [resetButton, setResetButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(true);
  const [readonlyInput, setReadonlyInput] = useState(true);

  const [wrongGuess, setWrongGuess] = useState(0);
  const [correctGuess, setCorrectGuess] = useState(0);
  const [wordValidation, setWordValidation] = useState("");
  const [validationAlert, setValidationAlert] = useState(false);
  const [remainingGuess, setRemainingGuess] = useState(3);
  const [remainingWords, setRemainingWords] = useState(guessWords.length);

  const randomBg = useRandomBg();

  const { isOpen, openConfirm, closeConfirm, handleConfirm } = useConfirm();

  const shuffleWord = (word) => {
    const shuffledWord = word.split("").sort(() => Math.random() - 0.5).join("");
    if (shuffledWord === word) {
      return shuffleWord(word);
    }
    return shuffledWord;
  };

  const randomWord = () => {
    if (wordList.length === 0) {
      alert("Congrats! You finished all the words");
      return;
    }

    const randomWordIndex = Math.floor(Math.random() * wordList.length);
    const randomItem = wordList[randomWordIndex];
    const newWord = randomItem.word.toLowerCase();

    setNextButton(true);
    setReadonlyInput(false);
    setWordClue(shuffleWord(newWord));
    setWord(newWord);
    setHintWord(randomItem.hint);
    setInputValues(newWord.split("").map(() => ""));
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setNewCurrentInput(newWord.split("").map(() => ""));
    setRemainingGuess(3);
    setWordLevel(randomItem.level);
    setWordList(wordList.filter((_, index) => index !== randomWordIndex));
    setUsedWords([...usedWords, randomItem]);
    setWordValidation("");
    setValidationAlert(false);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.toLowerCase();
    if (value.trim() !== "") {
      setSubmitButton(false);
      setWordValidation("");
      setValidationAlert(false);
    }
    const otherInput = [...newCurrentInput];
    otherInput[index] = value;
    setNewCurrentInput(otherInput);
  };

  const handleStart = () => {
    setStartButton(true);
    setResetButton(false);
    setReadonlyInput(false);
    randomWord();
  };

  const handleReset = () => {
    openConfirm(() => window.location.reload());
  };

  const handleWin = () => {
    setReadonlyInput(true);
    setSubmitButton(true);
    setNextButton(false);
    setCorrectGuess(correctGuess + 1);
    setRemainingWords(Math.max(remainingWords - 1, 0));
  };

  const handleLose = () => {
    setWrongGuess(wrongGuess + 1);
    setRemainingWords(Math.max(remainingWords - 1, 0));
    setReadonlyInput(true);
    setNextButton(false);
    setSubmitButton(true);
  };

  const handleSubmit = () => {
    const newValues = [...inputValues];
    let newCorrectLetters = [...correctLetters];
    let newIncorrectLetters = [...incorrectLetters];
    newCurrentInput.forEach((letter, index) => {
      if (word[index] === letter) {
        newValues[index] = letter;
        if (!newCorrectLetters.includes(letter)) {
          newCorrectLetters.push(letter);
        }
      } else if (!word.includes(letter) && !newIncorrectLetters.includes(letter)) {
        setWordValidation("Wrong!");
        setValidationAlert(true);
        setStartButton(true);
        setResetButton(true);
        setReadonlyInput(true);
        setTimeout(() => {
          setValidationAlert(false);
          setResetButton(false);
          setReadonlyInput(false);
        }, 2000);
        newIncorrectLetters.push(letter);
      }
    });
    setInputValues(newValues);
    setCorrectLetters(newCorrectLetters);
    setIncorrectLetters(newIncorrectLetters);

    if (newValues.join("") === word) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      handleWin();
    } else {
      if (remainingGuess - 1 === 0) {
        alert(`The correct word was: ${word.toUpperCase()}`);
        handleLose();
      }
      setRemainingGuess(remainingGuess - 1);
    }
  };

  useEffect(() => {
    if (word) {
      setInputValues(word.split("").map(() => ""));
      setNewCurrentInput(word.split("").map(() => ""));
      setWordValidation("");
      setValidationAlert(false);
    }
  }, [word]);

  return (
    <div className="wrapper" style={{ background: randomBg }}>
      <section className="guess-word-game">
        <div className="game-container">
          <div className="content">
            <div className="scores">
              <div className="scores--incorrect">Incorrect: <span className="wrong">{wrongGuess}</span></div>
              <div className="scores--correct">Correct: <span className="correct">{correctGuess}</span></div>
              <div className="scores--remaining">Remaining: <span className="remaining">{remainingGuess}</span></div>
              <div className="scores--point">Words complete:{" "}<span className="complete">{guessWords.length - remainingWords}</span>{" "} / <span className="word-total">{guessWords.length}</span>
              </div>
            </div>
            <h5 className="word-level">Word Level: <span>{wordLevel}</span></h5>
            <div className="inputs">
              {inputValues.map((val, index) => (
                <input key={index} type="text" maxLength={1} readOnly={readonlyInput} value={newCurrentInput[index] || ""} onChange={(e) => handleInputChange(e, index)} className={correctLetters.includes(val) ? "correct" : ""} autoComplete="off" spellCheck="false" placeholder={index + 1} />
              ))}
            </div>
            <h6 className="word-hint">Hint: <span>{hintWord}</span></h6>
            <h6 className="word-clue">Clue: <span>{wordClue}</span></h6>
            <button className="submit-btn" onClick={handleSubmit} disabled={submitButton}>Submit</button>
            <div className="buttons">
              <button className="buttons-button-reset" onClick={handleReset} disabled={resetButton}>Reset Game</button>
              <button className="buttons-button-next" onClick={randomWord} disabled={nextButton}>Next Word</button>
              <button className="buttons-button-start" onClick={handleStart} disabled={startButton}>Start Game</button>
              <HomeButton />
            </div>
          </div>
          <div className={`game-container--input-status ${validationAlert ? 'active' : ''}`}>{wordValidation}</div>
        </div>
        <ConfirmPopup
          isOpen={isOpen}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
      </section>
    </div>
  );
}
