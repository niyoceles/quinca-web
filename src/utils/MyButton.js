import React from 'react';

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <div className={`relative group inline-block ${tipClassName}`}>
    <button
      onClick={onClick}
      className={`p-2 rounded-xl transition-all duration-200 hover:bg-slate-100/50 active:scale-95 text-slate-500 hover:text-primary ${btnClassName}`}
    >
      {children}
    </button>
    {tip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-xl pointer-events-none">
        {tip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-secondary" />
      </div>
    )}
  </div>
);

export default MyButton;
