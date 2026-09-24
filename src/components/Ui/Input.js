import React from 'react';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  fullWidth = false,
  helperText,
  icon: Icon,
  variant,
  endAdornment,
  ...props 
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';
  const isTextarea = variant === 'textarea';
  
  return (
    <div className={`mb-4 ${widthStyle} ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-secondary mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-4 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} text-slate-500 group-focus-within:text-primary transition-colors pointer-events-none`}>
            <Icon size={18} />
          </div>
        )}
        {isTextarea ? (
          <textarea
            id={id}
            className={`
              block w-full ${Icon ? 'pl-11' : 'px-4'} ${endAdornment ? 'pr-11' : 'px-4'} py-3 text-secondary bg-white border-2 rounded-xl transition-all duration-200
              ${error 
                ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                : 'border-slate-100 focus:border-primary focus:ring-primary/10'}
              placeholder:text-slate-500 focus:outline-none focus:ring-4
              disabled:bg-slate-50 disabled:text-slate-600
            `}
            {...props}
          />
        ) : (
          <input
            id={id}
            className={`
              block w-full ${Icon ? 'pl-11' : 'px-4'} ${endAdornment ? 'pr-11' : 'px-4'} py-3 text-secondary bg-white border-2 rounded-xl transition-all duration-200
              ${error 
                ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                : 'border-slate-100 focus:border-primary focus:ring-primary/10'}
              placeholder:text-slate-500 focus:outline-none focus:ring-4
              disabled:bg-slate-50 disabled:text-slate-600
            `}
            {...props}
          />
        )}
        {endAdornment && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 text-xs ml-1 ${error ? 'text-red-500 font-medium' : 'text-slate-600'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
