import Box from "./Box";
import { assignBoxesState, GUESS_MAXIMUM_LENGTH } from "./utils/words";

interface RowProps {
  guess: string;
}

function Row({guess = ''}: RowProps) {
  const guessRemaining = GUESS_MAXIMUM_LENGTH - guess.length;
  const guessBoxes = guess.split('').concat(Array(guessRemaining).fill(''));

  const guessBoxStates = assignBoxesState(guess);
  console.log(guessBoxStates)

  return (
    <div className="grid grid-cols-5 gap-3">
      {guessBoxes.map((letter, idx) =>  (
        <span key={idx}>
          <Box char={letter} state={guessBoxStates[idx]} />
        </span>
      ))}
    </div>
  )
}

export default Row;