import { answerList, wordList } from "./wordleWords";

export const GAME_STATE_ENUM = {
  playing: "PLAYING",
  won: "WON",
  lost: "LOST",
  menu: "MENU",
};

export const createWordleLetter = (letter, color) => {
  return {
    letter,
    color,
  };
};

export const createEmptyGuessesArray = (numGuesses, numLetters) => {
  const guesses = [];
  for (let i = 0; i < numGuesses; i++) {
    const newGuess = Array.from({ length: numLetters }, () =>
      createWordleLetter("", null)
    );
    guesses.push(newGuess);
  }
  return guesses;
};

export const dayIncrementor = () => {
  const startDate = new Date("6-10-2022");
  const today = new Date();
  const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return days;
};

export const pickWordleAnswer = () => answerList[dayIncrementor()];

export const createWordleMessage = (gameStateEnum, todaysWordleAnswer) => {
  if (gameStateEnum === GAME_STATE_ENUM.playing) {
    return `The Word To Guess Is: ${todaysWordleAnswer}`;
  }
  if (gameStateEnum === GAME_STATE_ENUM.won) {
    return "You won!";
  }
  if (gameStateEnum === GAME_STATE_ENUM.lost) {
    return "You lost :(";
  }
};

export const deepClone = (matrix) => {
  return JSON.parse(JSON.stringify(matrix));
};

export const checkIsValidGuess = (currentGuess) => {
  if (!answerList.includes(currentGuess) && !wordList.includes(currentGuess)) {
    return false;
  }
  return true;
};

export const checkGameState = (
  currentGuess,
  currentAnswer,
  wordleGuessIndex
) => {
  if (currentGuess === currentAnswer.toLowerCase()) {
    return GAME_STATE_ENUM.won;
  }
  if (wordleGuessIndex === 5) {
    return GAME_STATE_ENUM.lost;
  }
  return GAME_STATE_ENUM.playing;
};

export const calculateGuessResult = (currentGuessArray, wordleAnswer) => {
  const guessLetterCount = {};
  const answerLetterCount = {};
  const currentGuessArrayCopy = deepClone(currentGuessArray);

  //GreyCount Loop
  for (let i = 0; i < currentGuessArray.length; i++) {
    currentGuessArrayCopy[i] = {
      ...currentGuessArrayCopy[i],
      color: "grey",
    };

    const wordleAnswerLower = wordleAnswer[i].toLowerCase();
    if (!answerLetterCount.hasOwnProperty(wordleAnswerLower)) {
      answerLetterCount[wordleAnswerLower] = 1;
    } else {
      answerLetterCount[wordleAnswerLower]++;
    }
  }

  //GreenYellow Loop
  for (let i = 0; i < currentGuessArray.length; i++) {
    const letterLower = currentGuessArray[i].letter.toLowerCase();
    if (!guessLetterCount.hasOwnProperty(letterLower)) {
        guessLetterCount[letterLower] = 1;
    }

    if (wordleAnswer[i] === letterLower) {
      currentGuessArrayCopy[i] = {
        ...currentGuessArrayCopy[i],
        color: "green",
      };
      guessLetterCount[letterLower]--;
    }

    if (
      answerLetterCount.hasOwnProperty(letterLower) &&
      guessLetterCount[letterLower] > 0
    ) {
      currentGuessArrayCopy[i] = {
        ...currentGuessArrayCopy[i],
        color: "yellow",
      };
      guessLetterCount[letterLower]--;
    } 
  }
  return currentGuessArrayCopy;

  //GreyCount Loop
    //Flag Grey
    //If ! global answer counter hasOwnProperty(answer[i])
      //Add answer[i] to global answer counter
    //Else increment answer[i] in global answer counter

  //GreenYellow Loop
    //If ! global letter counter hasOwnProperty(letter)
      //Add letter to global letter counter
  
    //If letter === wordleAnswer @ index
      //Flag Green
      //Decrement global letter counter

    //If global answer counter hasOwnProperty(letter)
    //&& global counter [letter] > 0
      //Flag Yellow
      //Decrement global letter counter
};