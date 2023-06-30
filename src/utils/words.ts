import rawWords from './rawWords.json';

function getUnusedRandomWord() {
  const index = Math.floor(Math.random() * rawWords.length);
  return rawWords[index];
}

export default getUnusedRandomWord;