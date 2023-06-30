import Box from "./Box";
import { BoxState, GUESS_MAXIMUM_LENGTH } from "./utils/words";

interface RowProps {
  guess: string;
  boxStates?: BoxState[];
}

function Row({guess = '', boxStates = []}: RowProps) {
  const guessRemaining = GUESS_MAXIMUM_LENGTH - guess.length;
  const guessBoxes = guess.split('').concat(Array(guessRemaining).fill(''));
  
  console.log(guess)
  console.log(boxStates)
  return (
    <div className="grid grid-cols-5 gap-0">
      {guessBoxes.map((letter, idx) =>  (
        <span key={idx}>
          <Box char={letter} state={boxStates[idx]} />
        </span>
      ))}
    </div>
  )
}

export default Row;