import { useEffect, useRef, useState } from "react"
import GameOverModal from "./GameOverModal";
import Header from "./Header"
import Row from "./Row"
import { useStore } from "./stores/gameStore";
import { GUESS_MAXIMUM_LENGTH, MAXIMUM_TRIES } from "./utils/words";

function App() {
  const gameState = useStore();
  const {guessRows, gameState: gameStatus} = gameState
  const [guessWord, setGuessWord] = useGuessWord();
  let rows = [...guessRows];



  
  if (rows.length < MAXIMUM_TRIES) {
    rows.push({guess: guessWord});
  }
  
  const remainingTries = MAXIMUM_TRIES - rows.length;
  console.log(guessRows)
  
  rows = rows.concat(Array(remainingTries).fill(''));
  const gameIsOver = gameStatus !== 'playing';
  
  return (
    <div className="mx-auto w-64 relative h-screen mt-12">
      <Header />
      <main className="grid grid-rows-5 gap-2 my-2">
        {rows.map(({guess, boxStates}, index) => (
            <Row key={index} guess={guess} boxStates={boxStates} />
        ))}
      </main>
      {gameIsOver && <GameOverModal gameStatus={gameStatus} />}
    </div>
  )
}

function useGuessWord() {
  const addGuessWord = useStore(store => store.addNewGuess);
  const [guessWord, setGuessWord] = useState('');
  const previousGuessWord = usePrevious(guessWord);

  const onkeydown = (evt: KeyboardEvent) => {
    const char = evt.key;

    setGuessWord((curGuessWord) => {
      const newGuessWord = char.length === 1 ? `${curGuessWord}${char}` : curGuessWord;

      switch (char) {
        case 'Backspace':
          return newGuessWord.slice(0, -1);
        case 'Enter':
          if (newGuessWord.length === GUESS_MAXIMUM_LENGTH) {
            return '';
          }
        }
        
        if (curGuessWord.length === GUESS_MAXIMUM_LENGTH)
        return curGuessWord;
        
        return newGuessWord;
      });
    }
    
    useEffect(() => {
      document.addEventListener('keydown', onkeydown);

      return () => {
        document.removeEventListener('keydown', onkeydown);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
      if (guessWord.length === 0 && previousGuessWord?.length === GUESS_MAXIMUM_LENGTH)
        addGuessWord(previousGuessWord);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessWord]);

  return [guessWord, setGuessWord];
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default App
