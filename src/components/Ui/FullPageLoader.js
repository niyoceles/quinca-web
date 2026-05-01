import React from 'react';
import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 scale-150 opacity-20">
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping" />
        </div>
        
        {/* Logo Container */}
        <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl animate-pulse">
          <img src={Hadiwa_logo} alt="Hadiwa" className="h-16 w-auto object-contain" />
        </div>
      </div>
      
      {/* Loading Bar */}
      <div className="mt-12 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-progress-loading" />
      </div>
      
      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">
        Hadiwa Experience
      </p>
      
      <style>{`
        @keyframes progress-loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-loading {
          animation: progress-loading 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
