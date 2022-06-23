import React, { useState, useEffect } from "react";
import {
  GAME_STATE_ENUM,
  createEmptyGuessesArray,
  dayIncrementor,
  pickWordleAnswer,
  createWordleMessage,
  deepClone,
  checkIsValidGuess,
  checkGameState
} from "./Utils";
import "./App.css";

const keyBoardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Delete", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

const letters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

function App() {

  const guesses = 6;
  const lettersPerGuess = 5;
  const todaysWordleAnswer = pickWordleAnswer()

  const [wordleGuessList, setWordleGuessList] = useState(
    deepClone(createEmptyGuessesArray(guesses, lettersPerGuess))
  );
  const [wordleGuessIndex, setWordleGuessIndex] = useState(0);
  const [wordleLetterIndex, setWordleLetterIndex] = useState(0);
  const [gameState, setGameState] = useState(GAME_STATE_ENUM.playing); //"playing", "won", "lost"
  const [wordleAnswer, setWordleAnswer] = useState(todaysWordleAnswer);
  const [gameMessage, setGameMessage] = useState(createWordleMessage(GAME_STATE_ENUM.playing, todaysWordleAnswer));

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [wordleLetterIndex, wordleGuessIndex]);

  const handleKeyPress = ({ key }) => {
    if (key === "Enter") {
      console.log("Enter key handler");
      handleEnterKey()
    }
    if (key === "Backspace") {
      console.log("Backspace key handler");
      handleBackspace()
    }
    if (letters.includes(key.toUpperCase())) {
      handleKeyEvent(key.toUpperCase());
    }
  };

  const handleKeyEvent = (letter) => {

    const newLetter = letter.toUpperCase();
    const wordleGuessListCopy = deepClone(wordleGuessList);

    wordleGuessListCopy[wordleGuessIndex][wordleLetterIndex] = newLetter;

    
    if (wordleLetterIndex === 5) {
      return;
    }

    setWordleGuessList(wordleGuessListCopy);
    setWordleLetterIndex(wordleLetterIndex + 1);
  };

  const handleBackspace = () => {
    if (wordleLetterIndex === 0) {
      return;
    }
    const wordleGuessListCopy = deepClone(wordleGuessList);
    wordleGuessListCopy[wordleGuessIndex][wordleLetterIndex - 1] = "";

    setWordleGuessList(wordleGuessListCopy);
    setWordleLetterIndex(wordleLetterIndex - 1);

  };
  const handleEnterKey = () => {
    const currentGuess = wordleGuessList[wordleGuessIndex].join("").toLowerCase()
    const isValidGuess = checkIsValidGuess(currentGuess);
    const newGameState = checkGameState(currentGuess, wordleAnswer, wordleGuessIndex)

    if (!isValidGuess) {
      //ToDo: refactor to use createWordleMessage
      setGameMessage("Your guess was not valid. Please try again!")
      return;
    }

    if (gameState === GAME_STATE_ENUM.playing) {
      setWordleGuessIndex(wordleGuessIndex + 1)
      setWordleLetterIndex(0)
    }

    const newGameMessage = createWordleMessage(newGameState, wordleAnswer)

    setGameState(newGameState)
    setGameMessage(newGameMessage)
  };
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <h2>{gameMessage}</h2>
        <GridComponent wordleGuessList={wordleGuessList} />
        <KeyBoardComponent
          handleKeyEvent={handleKeyEvent}
          keyBoardArr={keyBoardArr}
        />
      </header>
    </div>
  );
}

const LetterComponent = (props) => {
/*   let letterClass = "Wordle-square-grey";
  if (props.letterObject.isCorrect === true) {
    letterClass = "Wordle-square-green";
  }
  if (props.letterObject.isCorrect === false) {
    letterClass = "Wordle-square-red";
  } */
  return (
    <div className={`Wordle-square`}>
      {props.letter}
    </div>
  );
};

const RowComponent = (props) => {
  return (
    <div className="Wordle-row">
      {props.row.map((letter, index) => {
        return (
          <LetterComponent
            key={`square-component-${index}`}
            letter={letter}
          ></LetterComponent>
        );
      })}
    </div>
  );
};

const GridComponent = (props) => {
  return (
    <div className="Wordle-column">
      {props.wordleGuessList.map((row, index) => {
        return (
          <RowComponent
            key={`row-component-${index}`}
            rowIndex={index}
            row={row}
          ></RowComponent>
        );
      })}
    </div>
  );
};

const KeyBoardComponent = (props) => {
  return (
    <div className="Keyboard-grid">
      {props.keyBoardArr.map((row, index) => {
        return (
          <KeyRowComponent
            key={index}
            keyRow={row}
            handleKeyEvent={props.handleKeyEvent}
          ></KeyRowComponent>
        );
      })}
    </div>
  );
};

const KeyRowComponent = (props) => {
  return (
    <div className="Keyboard-row">
      {props.keyRow.map((letter) => {
        return (
          <KeyComponent
            key={letter}
            letter={letter}
            handleKeyEvent={props.handleKeyEvent}
          ></KeyComponent>
        );
      })}
    </div>
  );
};

const KeyComponent = (props) => {
  return (
    <div
      className="Keyboard-key"
      onClick={() => {
        props.handleKeyEvent(props.letter);
      }}
    >
      {props.letter}
    </div>
  );
};

export default App;
