import Row from "./Row";
import { useStore } from "./stores/gameStore";
import { BoxState } from "./utils/words";

function InstructionsModal() {
  const gameStatus = useStore();

  const matchWord = 'gatos';
  const state1 = [BoxState.Match, '', '', '', ''];
  
  const wrongPlaceWord = 'vocal';
  const state2 = ['', '', BoxState.WrongPlace, '', ''];
  
  const missMatchWord = 'canto';
  const state3 = ['', '', '', '', BoxState.MissMatch];

  return (
    <div role="modal" className="text-xs absolute z-100 bg-white rounded border border-black left-0 right-0 top-6 p-8 w-3/4 mx-auto">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold">Cómo jugar</h2>
        <p>
          Adivina la palabra oculta en cinco intentos.
        </p>
        <p>
          Cada intento debe ser una palabra válida de 5 letras.
        </p>
        <p>
          Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
        </p>
        <p className="font-bold">
          Ejemplos
        </p>

        <div>
          {
            <Row guess={matchWord} boxStates={state1} />
          }
        </div>

        <p>
          La letra <strong>G</strong> está en la palabra y en la posición correcta.
        </p>

        <div>
          {
            <Row guess={wrongPlaceWord} boxStates={state2} />
          }
        </div>

        <p>
          La letra <strong>C</strong> está en la palabra pero en la posición incorrecta.
        </p>

        <div>
          {
            <Row guess={missMatchWord} boxStates={state3} />
          }
        </div>

        <p>
        La letra <strong>O</strong> no está en la palabra..
        </p>
        <p>
          Puede haber letras repetidas. Las pistas son independientes para cada letra.
        </p>

        <p className="text-center">
          ¡Una palabra nueva cada 5 minutos!
        </p>
        <button 
          className="bg-green-500 mt-3 mb-3 p-1 text-white rounded w-1/2 mx-auto font-bold "
          onClick={() => {
            gameStatus.setFirstTimePlaying();
            gameStatus.setShowInstructions(false);
          }}
        >!JUGAR¡</button>
      </div>
        
    </div>
  )
}

export default InstructionsModal;