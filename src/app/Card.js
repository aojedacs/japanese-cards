export default function Card({ item, onClick, type, isSelected, isMatched }) {
    return (
      <div 
        className={`
          ${isMatched ? 'scale-0 w-0 h-0 m-0 p-0 opacity-0' : 'cursor-pointer hover:scale-105'} 
          aspect-square
          flex 
          items-center 
          justify-center 
          text-xl
          rounded-lg 
          ${type === 'hiragana' 
            ? isSelected
              ? 'bg-pink-400 text-black scale-110 shadow-[0_0_15px_rgba(244,114,182,0.7)]' 
              : 'bg-pink-200 text-black'
            : isSelected
              ? 'bg-orange-300 text-black scale-110 shadow-[0_0_15px_rgba(253,186,116,0.7)]' 
              : 'bg-orange-200 text-black'
          }
          transition-all 
          duration-500 
          transform 
        `}
        onClick={() => !isMatched && onClick()}
      >
        {item}
      </div>
    );
  }