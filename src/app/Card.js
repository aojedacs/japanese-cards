export default function Card({ item, isFlipped, onClick }) {
    return (
      <div 
        className={`
          cursor-pointer 
          h-24 
          flex 
          items-center 
          justify-center 
          text-2xl 
          rounded-lg 
          ${isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-200'}
          transition-all 
          duration-300 
          transform 
          hover:scale-105
        `}
        onClick={onClick}
      >
        {isFlipped ? item : '?'}
      </div>
    );
  }
