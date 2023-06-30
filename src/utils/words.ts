import rawWords from './rawWords.json';

export const GUESS_MAXIMUM_LENGTH = 5;

export enum BoxState {
  MissMatch,
  Match,
  WrongPlace
} 

function getRandomWord() {
  const index = Math.floor(Math.random() * rawWords.length);
  return rawWords[index];
}

const word = 'tstus';

export function assignBoxesState(guessedWord: string): BoxState[] {
  const targetWord = word;
  const guessedWordArray = guessedWord.split('');
  const targetWordArray = targetWord.split('');
  const boxesState: BoxState[] = [];

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