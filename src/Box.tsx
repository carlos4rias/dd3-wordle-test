import { BoxState } from "./utils/words";

interface BoxProps {
  char?: string;
  state?: BoxState;
}

function Box({char, state}: BoxProps) {
  const boxBgColor = state == null ? 'box-no-set' : boxStateBg[state];
  console.log(boxBgColor)
  return (
    <div className={`inline-block mx-1 rounded p-4 uppercase font-bold text-center text-2xl before:inline-block before:content-['_'] ${boxBgColor}`}>
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