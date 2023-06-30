import { BoxState } from "./utils/words";

interface BoxProps {
  char?: string;
  state?: BoxState;
}

function Box({char, state}: BoxProps) {
  const boxBgColor = state == null ? 'bg-box-no-set' : boxStateBg[state];
  const boxBorderColor = state === '' ? ' border border-black' : '';
  console.log(boxBgColor)
  return (
    <div className={`inline-block rounded p-3 before:inline-block before:content-['_'] uppercase font-bold text-center text-1xl  ${boxBgColor} ${boxBorderColor}`}>
      {char}
    </div>
  )
}

const boxStateBg = {
  [BoxState.Match]: 'bg-green-400',
  [BoxState.MissMatch]: 'bg-gray-400',
  [BoxState.WrongPlace]: 'bg-yellow-400',
}

export default Box;