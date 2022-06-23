import { answerList, wordList } from "./wordleWords";

export const GAME_STATE_ENUM = {
  playing: "PLAYING",
  won: "WON",
  lost: "LOST",
  menu: "MENU",
};

export const createEmptyGuessesArray = (numGuesses, numLetters) => {
  const guesses = [];
  for (let i = 0; i < numGuesses; i++) {
    const newGuess = Array.from({ length: numLetters }, () => "");
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

export const checkGameState = (currentGuess, currentAnswer, wordleGuessIndex) => {
  if (currentGuess === currentAnswer.toLowerCase()) {
    return GAME_STATE_ENUM.won;
  }
  if (wordleGuessIndex === 5) {
    return GAME_STATE_ENUM.lost;
  }
  return GAME_STATE_ENUM.playing;
};
