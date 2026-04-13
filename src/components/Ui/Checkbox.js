import React from 'react';

const Checkbox = ({ label, id, className = '', ...props }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="w-5 h-5 text-primary border-2 border-slate-200 rounded focus:ring-primary focus:ring-offset-0 cursor-pointer transition-colors duration-200"
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-secondary cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
