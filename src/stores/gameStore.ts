import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import getRandomWord, { assignBoxesState, BoxState, MAXIMUM_MINUTES, MAXIMUM_TRIES } from '../utils/words';

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
  showInstructions: boolean;
  firstTimePlaying: boolean;
  showStatistics: boolean;
  expireGameTime: number;
  addNewGuess: (guess: string) => void;
  startNewGame: () => void;
  setFirstTimePlaying: () => void;
  setShowInstructions: (value: boolean) => void;
  setShowStatistics: (value: boolean) => void;
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
      firstTimePlaying: true,
      showInstructions: false,
      showStatistics: false,
      expireGameTime: (new Date().getTime()) + MAXIMUM_MINUTES,
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
        }));
      },
      startNewGame: () => {
        set({
          targetWord: getRandomWord(),
          guessRows: [],
          gameState: 'playing',
          usedKeys: {},
          showInstructions: false,
          expireGameTime: (new Date().getTime()) + MAXIMUM_MINUTES,
        })
      },

      setFirstTimePlaying() {
        set((state: GameStore) => ({
          ...state,
          firstTimePlaying: false,
        }))
      },

      setShowInstructions(value: boolean) {
        set((state: GameStore) => ({
          ...state,
          showInstructions: value,
        }))
      },

      setShowStatistics(value: boolean) {
        set((state: GameStore) => ({
          ...state,
          showStatistics: value,
        }))
      },

      setGameStatus(status: string) {
        set((state: GameStore) => ({
          ...state,
          gameState: status,
        }))
      },

    }),
    {
      name: 'wordle',
    }
  )
);

// useStore.persist.clearStorage();
