import React, { useState, useEffect } from "react";
import {
  GAME_STATE_ENUM,
  createEmptyGuessesArray,
  dayIncrementor,
  pickWordleAnswer,
  createWordleMessage,
  deepClone,
  checkIsValidGuess,
  checkGameState,
  createWordleLetter,
  calculateGuessResult,
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
  const todaysWordleAnswer = pickWordleAnswer();

  const wordleGuessListLS = JSON.parse(localStorage.getItem("wordleGuessList"));
  const wordleGuessIndexLS = parseInt(localStorage.getItem("wordleGuessIndex"));
  const wordleLetterIndexLS = parseInt(localStorage.getItem("wordleLetterIndex"));
  const gameStateLS = localStorage.getItem("gameState");
  const gameMessageLS = localStorage.getItem("gameMessage");

  const [wordleGuessList, setWordleGuessList] = useState(
    wordleGuessListLS
      ? wordleGuessListLS
      : deepClone(createEmptyGuessesArray(guesses, lettersPerGuess))
  );
  const [wordleGuessIndex, setWordleGuessIndex] = useState(
    wordleGuessIndexLS ? wordleGuessIndexLS : 0
  );
  const [wordleLetterIndex, setWordleLetterIndex] = useState(
    wordleLetterIndexLS ? wordleLetterIndexLS : 0
  );
  const [gameState, setGameState] = useState(
    gameStateLS ? gameStateLS : GAME_STATE_ENUM.playing
  ); //"playing", "won", "lost"
  const [gameMessage, setGameMessage] = useState(
    gameMessageLS
      ? gameMessageLS
      : createWordleMessage(GAME_STATE_ENUM.playing, todaysWordleAnswer)
  );

  const [wordleAnswer, setWordleAnswer] = useState(todaysWordleAnswer);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [wordleLetterIndex, wordleGuessIndex]);

  const handleKeyPress = ({ key }) => {
    if (key === "Enter") {
      console.log("Enter key handler");
      handleEnterKey();
    }
    if (key === "Backspace") {
      console.log("Backspace key handler");
      handleBackspace();
    }
    if (letters.includes(key.toUpperCase())) {
      handleKeyEvent(key.toUpperCase());
    }
  };

  const handleKeyEvent = (letter) => {
    const newLetter = createWordleLetter(letter.toUpperCase(), null);
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
    const wordleGuessListCopy = deepClone(wordleGuessList);
    const currentGuess = wordleGuessList[wordleGuessIndex];
    const currentGuessWord = currentGuess
      .map(({ letter }) => letter)
      .join("")
      .toLowerCase();
    const isValidGuess = checkIsValidGuess(currentGuessWord);
    const newGameState = checkGameState(
      currentGuessWord,
      wordleAnswer,
      wordleGuessIndex
    );

    if (!isValidGuess) {
      //ToDo: refactor to use createWordleMessage
      setGameMessage("Your guess was not valid. Please try again!");
      return;
    }

    if (gameState !== GAME_STATE_ENUM.playing) {
      return;
    }

    const newGameMessage = createWordleMessage(newGameState, wordleAnswer);
    const guessResult = calculateGuessResult(currentGuess, wordleAnswer);
    wordleGuessListCopy[wordleGuessIndex] = guessResult;

    setWordleGuessList(wordleGuessListCopy);
    localStorage.setItem(
      "wordleGuessList",
      JSON.stringify(wordleGuessListCopy)
    );

    //Set guess to next row
    setWordleGuessIndex(wordleGuessIndex + 1);
    setWordleLetterIndex(0);
    localStorage.setItem("wordleGuessIndex", wordleGuessIndex + 1);
    localStorage.setItem("wordleLetterIndex", 0);

    //Set game message
    setGameMessage(newGameMessage);
    localStorage.setItem("gameMessage", newGameMessage);

    //Update game state
    setGameState(newGameState);
    localStorage.setItem("gameState", newGameState);
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
  return (
    <div
      className={`Wordle-square Wordle-square-${
        props.letterObject.color ? props.letterObject.color : "empty"
      }`}
    >
      {props.letterObject.letter}
    </div>
  );
};

const RowComponent = (props) => {
  return (
    <div className="Wordle-row">
      {props.row.map((letterObject, index) => {
        return (
          <LetterComponent
            key={`square-component-${index}`}
            letterObject={letterObject}
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
