import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Typography } from './Typography';

export const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  maxWidth = 'md' 
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full ${maxWidthClasses[maxWidth] || maxWidthClasses.md} bg-white rounded-3xl shadow-premium animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 overflow-hidden flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <Typography variant="h4" className="font-black text-secondary">{title}</Typography>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-secondary transition-all"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
