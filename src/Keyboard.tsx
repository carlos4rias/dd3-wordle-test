import { useStore } from "./stores/gameStore";
import { BoxState } from "./utils/words";

function Keyboard({onClickAction}: {onClick: (char: string) => void}) {
  const usedKeys =  useStore(state => state.usedKeys);
  const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    let char = evt.currentTarget.textContent;
    if (char === '⌫') char = 'Backspace';
    console.log(char)
    onClickAction(char);
  }
  console.log(usedKeys)

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded">
      {
        keyboardKeys.map((keys, ridx) => {
          return (
            <div key={ridx} className={`flex justify-center my-1 space-x-1`}>
              {
                keys.map((key, kidx) => {
                  let keyBgColor = 'bg-gray-300';
                  if (usedKeys.hasOwnProperty(key))
                    keyBgColor = keyboardStateBg[usedKeys[key]];
                  let buttonStyles = `uppercase font-bold text-xs rounded flex-1 py-1 ${keyBgColor}`
                  return (
                    <button 
                      key={kidx} 
                      className={buttonStyles}
                      onClick={onClick }
                    >
                        {key}
                    </button>
                  )
                  }
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
];

const keyboardStateBg = {
  [BoxState.Match]: 'bg-green-400',
  [BoxState.MissMatch]: 'bg-gray-400',
  [BoxState.WrongPlace]: 'bg-yellow-400',
}

export default Keyboard;