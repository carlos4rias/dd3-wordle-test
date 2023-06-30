import { useState } from "react"
import GameOverModal from "./GameOverModal";
import Header from "./Header"
import Row from "./Row"
import { useStore } from "./stores/gameStore";
import { GUESS_MAXIMUM_LENGTH, MAXIMUM_TRIES } from "./utils/words";

function App() {
  const gameState = useStore();
  const {guessRows, gameState: gameStatus} = gameState
  const [guessWord, setGuessWord] = useState('');
  let rows = [...guessRows];

  const onChange = (e) => {
    const currentGuess = e.target.value;
    if (currentGuess.length === GUESS_MAXIMUM_LENGTH) {
      gameState.addNewGuess(currentGuess);
      setGuessWord('');
      return;
    }
    setGuessWord(currentGuess);
  }

  
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
      <div>
        <input type="text" className="border-2" value={guessWord} onChange={onChange} disabled={gameIsOver} /> 
      </div>
      <main className="grid grid-rows-5 gap-2 my-2">
        {rows.map(({guess, boxStates}, index) => (
            <Row key={index} guess={guess} boxStates={boxStates} />
        ))}
      </main>
      {gameIsOver && <GameOverModal gameStatus={gameStatus} />}
    </div>
  )
}

export default App
