import { useEffect, useRef, useState } from "react"
import GameOverModal from "./GameOverModal";
import Header from "./Header"
import Keyboard from "./Keyboard";
import Row from "./Row"
import { useStore } from "./stores/gameStore";
import { GUESS_MAXIMUM_LENGTH, isAWordFromDictionary, MAXIMUM_TRIES } from "./utils/words";

function App() {
  const gameState = useStore();
  const {guessRows, gameState: gameStatus} = gameState
  const [guessWord, setGuessWord, addCurrentGuessChar] = useGuessWord();
  const [showInvalidGuessModal, setShowInvalidGuessModal] = useState(false);

  const addGuessWord = useStore(store => store.addNewGuess);
  const previousGuessWord = usePrevious(guessWord);
  
  let rows = [...guessRows];

  useEffect(() => {
    if (guessWord.length === 0 && previousGuessWord?.length === GUESS_MAXIMUM_LENGTH) {
      if (isAWordFromDictionary(previousGuessWord)) {
        setShowInvalidGuessModal(false);
        addGuessWord(previousGuessWord);
      } else {
        setShowInvalidGuessModal(true);
        setGuessWord(previousGuessWord);
      }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [guessWord]);

  
  if (rows.length < MAXIMUM_TRIES) {
    rows.push({guess: guessWord});
  }
  
  const remainingTries = MAXIMUM_TRIES - rows.length;
  console.log(guessRows)
  
  rows = rows.concat(Array(remainingTries).fill(''));
  const gameIsOver = gameStatus !== 'playing';
  
  return (
    <div className="mx-auto w-64 mt-12">
      <Header />
      <main className="grid grid-rows-5 gap-2 my-2">
        {rows.map(({guess, boxStates}, index) => (
            <Row key={index} guess={guess} boxStates={boxStates} />
        ))}
      </main>
      <section>
        <Keyboard onClickAction={char => {
          addCurrentGuessChar(char);
        }} />
      </section>
      {gameIsOver && <GameOverModal gameStatus={gameStatus} />}
    </div>
  )
}

function useGuessWord() {
  const [guessWord, setGuessWord] = useState('');

  const addCurrentGuessChar = (char: string) => {
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

  const onkeydown = (evt: KeyboardEvent) => {
    const char = evt.key;
    addCurrentGuessChar(char);
    
  }
    
    useEffect(() => {
      document.addEventListener('keydown', onkeydown);

      return () => {
        document.removeEventListener('keydown', onkeydown);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

  return [guessWord, setGuessWord, addCurrentGuessChar];
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default App
