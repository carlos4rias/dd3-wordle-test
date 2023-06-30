import QuestionMarkIcon, { ChartDuoToneIcon } from './utils/sgvIcons';

function Header() {

  return (
    <header className="flex justify-center items-center bg-gray-300">
      {QuestionMarkIcon}
      <h2 className="text-lg">WORDLE</h2>
      <div className="flex justify-center items-center">
        {ChartDuoToneIcon}
        <label htmlFor="switch-theme">
          <input type="checkbox" id="switch-theme" className="cursor-pointer h-4 w-8 rounded-full appearance-none bg-light-bg bg-opacity-100 checked:bg-dark-bg transition duration-200  relative " />
        </label>
      </div>
    </header>
  )
}

export default Header;