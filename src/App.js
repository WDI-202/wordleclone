import {useState} from "react";
import './App.css';

const defaultGuessList = [
  ["R", "E", "A", "C", "T"],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]

function App() {
  const [wordleGuessList, setWordleGuessList] = useState([...defaultGuessList])
  return (
    <div className="App">
      <header className="App-header">
        <WordleHeader /> 
        <WordleGrid 
          wordleGuessList={wordleGuessList}
        />
      </header>
    </div>
  );
}

const WordleHeader = () => {
  return (
    <h1 className="wordle-header">
      Wordle Clone
    </h1>
  )
}

const WordleGrid = (props) => {
  // const { wordleGuessList } = props;
  return (
    <div className="wordle-grid">
      {props.wordleGuessList.map((wordleGuess)=>{
        return (
          <WordleGridRow wordleGuess={wordleGuess}/> 
        )
      })}
    </div>
  )
}

const WordleGridRow = (props) => {
  return (
    <div className="wordle-grid-row">
      {props.wordleGuess.map((wordleLetter)=>{
        return (
          <WordleGridLetter wordleLetter={wordleLetter} isCorrect={wordleLetter === "A" || wordleLetter === "E"}/> 
        )
      })}
    </div>
  )
}

const WordleGridLetter = (props) => {
  return (
    <div className={`wordle-grid-letter wordle-grid-letter-${props.isCorrect}`}>
      {props.wordleLetter}
    </div>
  )
}

export default App;

/*
Use import/export syntax with react
User require/module.export syntax with express

// Default Export / Only exporting 1 thing
export default App;
import App from "./app.js"

module.exports = App
const App = require("./app.js")

---

// Module Export / Exporting multiple things
export App
import { App } from "./app.js"

module.exports = {
  App: App
}
const { App } = require("./app.js") 
*/
