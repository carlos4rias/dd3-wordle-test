import rawWords from './rawWords.json';

export const GUESS_MAXIMUM_LENGTH = 5;
export const MAXIMUM_TRIES = 5;

export enum BoxState {
  MissMatch,
  Match,
  WrongPlace
} 

function getRandomWord() {
  const index = Math.floor(Math.random() * rawWords.length);
  return rawWords[index];
}

export function assignBoxesState(guessedWord: string, targetWord: string): BoxState[] {
  const guessedWordArray = guessedWord.split('');
  const targetWordArray = targetWord.split('');
  const boxesState: BoxState[] = [];

  if (guessedWord.length < targetWord.length) return boxesState;

  for (let idx = 0; idx < GUESS_MAXIMUM_LENGTH; idx += 1) {
    const guessedChar = guessedWordArray[idx];
    const targetChar = targetWordArray[idx];
    console.log(guessedChar, targetChar)
    if (guessedChar === targetChar) {
      boxesState.push(BoxState.Match);
    } else if (targetWord.indexOf(guessedChar) !== -1) {
      boxesState.push(BoxState.WrongPlace);
    } else {
      boxesState.push(BoxState.MissMatch);
    }
  }

  return boxesState;
}

export default getRandomWord;