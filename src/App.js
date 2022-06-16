/* 
    Nested Keys
    Value on div for e.target.value
    Pass by reference
*/

import React, { useState } from "react";
import "./App.css";

const wordleArr = ["flame", "focus", "react"];
const rand = Math.floor(Math.random() * wordleArr.length);
const answer = wordleArr[rand];

const defaultGuessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const keyBoardArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Delete", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

function App() {
  const [wordleGuessList, setWordleGuessList] = useState(JSON.parse(JSON.stringify(defaultGuessList)));
  const [wordleGuessIndex, setWordleGuessIndex] = useState(0);
  const [wordleLetterIndex, setWordleLetterIndex] = useState(0);

  const handleKeyEvent = (newLetter) => {
    const updatedWordleGuessList = JSON.parse(JSON.stringify(wordleGuessList));

    const newWordleRow = updatedWordleGuessList[wordleGuessIndex];
    newWordleRow[wordleLetterIndex] = newLetter;

    if (wordleLetterIndex < 4) {
      setWordleLetterIndex(wordleLetterIndex + 1);
    }
    setWordleGuessList(updatedWordleGuessList)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {answer}</div>
        <ColumnComponent wordleGuessList={wordleGuessList} />
        <KeyBoardComponent handleKeyEvent={handleKeyEvent} />
      </header>
    </div>
  );
}

const SquareComponent = (props) => {
  return <div className="Wordle-square">{props.square}</div>;
};

const RowComponent = (props) => {
  return (
    <div className="Wordle-row">
      {props.row.map((square, index) => {
        return (
          <SquareComponent
            key={`square-component-${index}`}
            square={square}
          ></SquareComponent>
        );
      })}
    </div>
  );
};

const ColumnComponent = (props) => {
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

const KeyComponent = ({handleKeyEvent, letter}) => {
  return (
    <div
      className="Keyboard-key"
      onClick={(e)=>{
        handleKeyEvent(letter)
      }}
    >
      {letter}
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

const KeyBoardComponent = (props) => {
  return (
    <div className="Keyboard-grid">
      {keyBoardArr.map((row, index) => {
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

const setKeyValue = (newGuess, indexCoord) => {
  if (newGuess === "Delete") {
    return "";
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    return newGuess;
  }
  return;
};

const setIndexValue = (newGuess, indexCoord) => {
  if (newGuess === "Delete") {
    return indexCoord;
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    return newGuess;
  }
  return indexCoord + 1;
  /* if (indexCoord <= 4 && newGuess === "Delete") {
    return indexCoord;
  }
  if (indexCoord <= 4 && newGuess !== "Delete" && newGuess !== "Enter") {
    return indexCoord + 1;
  }
  return indexCoord; */
};

const handleDelete = (newGuess, indexToSet) => {
  /* if (newGuess === "Delete") {
    return indexCoord;
  }
  if (newGuess === "Enter") {
    // Do Something
    return;
  }
  if (indexCoord <= 4) {
    return newGuess;
  }
  return indexCoord + 1; */
  if (newGuess === "Delete" && indexToSet > 0 && indexToSet <= 5) {
    return indexToSet - 1;
  }
  return indexToSet;
};

export default App;
