import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import getRandomWord, { assignBoxesState, BoxState, MAXIMUM_TRIES } from '../utils/words';

interface GuessRow {
  guess: string;
  boxStates?: BoxState[];
}

interface GameStore {
  targetWord: string;
  guessRows: GuessRow[];
  gameState: 'winner' | 'loser' | 'playing';
  victories: number;
  totalGames: number;
  usedKeys: {[char: string]: BoxState};
  addNewGuess: (guess: string) => void;
  startNewGame: () => void;
}

export const useStore = create<GameStore>(
  persist(
    (set, get) => ({
      targetWord: getRandomWord(),
      guessRows: [],
      gameState: 'playing',
      victories: 0,
      totalGames: 0,
      usedKeys: {},
      addNewGuess: (guess: string) => {
        const boxesState = assignBoxesState(guess, get().targetWord);
        const newGuessRows = [...get().guessRows, {
          guess, 
          boxStates: boxesState
        }];
        const newGameState = boxesState.every(boxState => boxState === BoxState.Match);
        const status = newGameState ? 'winner' : newGuessRows.length === MAXIMUM_TRIES ? 'loser' : 'playing';
        
        const newUsedKeys = get().usedKeys;
        for(let idx = 0; idx < guess.length; ++idx) {
          newUsedKeys[guess[idx]] = boxesState[idx];
        }

        set((state: GameStore) => ({
          guessRows: newGuessRows,
          gameState: status,
          usedKeys: newUsedKeys,
          victories: state.victories + ((status === 'winner') ? 1 : 0),
          totalGames: state.totalGames + ((status !== 'playing')? 1 : 0),
        }))
      },
      startNewGame: () => {
        set({
          targetWord: getRandomWord(),
          guessRows: [],
          gameState: 'playing',
          usedKeys: {},
        })
      }

    }),
    {
      name: 'wordle',
    }
  )
);

// useStore.persist.clearStorage();
