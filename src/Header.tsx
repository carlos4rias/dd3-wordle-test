import { useStore } from './stores/gameStore';
import QuestionMarkIcon, { ChartDuoToneIcon } from './utils/sgvIcons';

function Header() {
  const gameStatus = useStore();
  return (
    <header className="flex flex-row justify-center bg-header rounded h-12">
      <button onClick={() => {
        gameStatus.setShowInstructions(true);
      }}>
        {QuestionMarkIcon}
      </button>
      <h2 className="text-lg">WORDLE</h2>
      <div className="flex align-center">
        <button onClick={() => {
          gameStatus.setShowStatistics(true);
        }}>
          {ChartDuoToneIcon}
        </button>
        <label htmlFor="switch-theme">
          <input type="checkbox" id="switch-theme" className="cursor-pointer h-4 w-8 rounded-full appearance-none bg-light-bg bg-opacity-100 checked:bg-dark-bg transition duration-200  relative " />
        </label>
      </div>
    </header>
  )
}

export default Header;