import { useStore } from "./stores/gameStore";

interface GameOverModalProps {
  gameStatus: 'winner' | 'loser';
  minutes?: number;
  seconds?: number;
}

function GameOverModal({gameStatus, minutes = 0, seconds = 0}: GameOverModalProps) {
  const gameStore = useStore();
  const {totalGames, victories, targetWord,} = gameStore;

  return (
    <div role="modal" className="absolute z-100 bg-white rounded border border-black text-center left-0 right-0 top-6 p-8 w-4/4 mx-auto">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Estadísticas</h2>
        <div className="flex flex-row justify-around mt-4 mb-12">
          <div><h2 className="text-xl font-bold">{totalGames}</h2><p className="text-xs">Jugadas</p></div>
          <div><h2 className="text-xl font-bold">{victories}</h2><p className="text-xs">Victorias</p></div>
        </div>
        {gameStatus === 'winner' && (
          <p className="text-xs uppercase mb-3">siguiente palabra</p>
        )}
        {gameStatus === 'loser' && (
          <p className="text-xs mb-3">La palabra era <span className="uppercase font-bold">{targetWord}</span></p>
        )}
        <p className="font-bold">{minutes}:{seconds}</p>
        <button 
            className="bg-green-500 mt-3 mb-3 p-1 text-white rounded w-1/2 mx-auto"
            onClick={() => {
              if(gameStatus !== 'playing') {
                gameStore.startNewGame();
              }
              gameStore.setShowStatistics(false);
            }}
          >Aceptar</button>

      </div>
        
    </div>
  )
}

export default GameOverModal;