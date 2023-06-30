import QuestionMarkIcon, { ChartDuoToneIcon } from './utils/sgvIcons';

function Header() {

  return (
    <div className="flex justify-center items-center">
      {QuestionMarkIcon}
      <span>WORDLE</span>
      <div className="flex justify-center items-center">
        {ChartDuoToneIcon}
        <label htmlFor="switch-theme">
          <input type="checkbox" id="switch-theme" className="cursor-pointer h-4 w-8 rounded-full appearance-none bg-light-bg bg-opacity-60 checked:bg-dark-bg transition duration-200  relative " />
        </label>
      </div>
    </div>
  )
}

export default Header;