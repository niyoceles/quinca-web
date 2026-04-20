import React from 'react';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  fullWidth = false,
  helperText,
  ...props 
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthStyle} ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-secondary mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`
            block w-full px-4 py-3 text-secondary bg-white border-2 rounded-xl transition-all duration-200
            ${error 
              ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
              : 'border-slate-100 focus:border-primary focus:ring-primary/10'}
            placeholder:text-slate-400 focus:outline-none focus:ring-4
            disabled:bg-slate-50 disabled:text-slate-500
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 text-xs ml-1 ${error ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
