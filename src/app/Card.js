export default function Card({ item, onClick, type, isSelected, isMatched, isIncorrect, isDisabled }) {
  return (
    <div 
      className={`
        ${isMatched ? 'scale-0 w-0 h-0 m-0 p-0 opacity-0' : isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'} 
        aspect-square
        flex 
        items-center 
        justify-center 
        text-8xl
        font-regular
        rounded-lg 
        ${type === 'hiragana' 
          ? isIncorrect
            ? 'bg-red-400 text-white scale-110 shadow-[0_0_15px_rgba(239,68,68,0.7)]'
            : isSelected
              ? 'bg-green-400 text-black scale-110 shadow-[0_0_15px_rgba(74,222,128,0.7)]' 
              : 'bg-green-200 text-black'
          : isIncorrect
            ? 'bg-red-400 text-white scale-110 shadow-[0_0_15px_rgba(239,68,68,0.7)]'
            : isSelected
              ? 'bg-blue-400 text-black scale-110 shadow-[0_0_15px_rgba(96,165,250,0.7)]' 
              : 'bg-blue-200 text-black'
        }
        transition-colors
        transition-transform
        duration-300
        ease-in-out
      `}
      onClick={() => !isMatched && !isDisabled && onClick()}
    >
      {item}
    </div>
  );
}
