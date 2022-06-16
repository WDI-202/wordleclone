import React, { useState } from "react";
import "./App.css";

const wordleArr = ["flame", "focus", "react"];
const rand = Math.floor(Math.random() * wordleArr.length);
const answer = wordleArr[rand];

const defaultGuessList = [
  ["R", "E", "A", "C", "T"],
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
    console.log("handleKeyEvent ", newLetter)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Cool">Wordle Copy</h1>
        <div>Answer: {answer}</div>
        <ColumnComponent wordleGuessList={wordleGuessList} />
        <KeyBoardComponent handleKeyEvent={handleKeyEvent} keyBoardArr={keyBoardArr}/>
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
      onClick={()=>{
        console.log("key component")
        props.handleKeyEvent(props.letter)
      }}
    >
      {props.letter}
    </div>
  );
};

export default App;
