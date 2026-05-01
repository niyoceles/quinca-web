import React from 'react';

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-xl border border-slate-100 shadow-premium transition-all duration-300 ${hover ? 'hover:shadow-premium-hover hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`p-5 flex justify-between items-start ${className}`}>
      <div>
        <h3 className="text-lg font-bold text-secondary">{title}</h3>
        {subtitle && <p className="text-sm text-slate-600 mt-1 font-medium">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`px-5 pb-5 ${className}`}>
      {children}
    </div>
  );
};

export const CardMedia = ({ image, title, className = '', height = 'h-48' }) => {
  return (
    <div className={`relative overflow-hidden rounded-t-xl ${height} ${className}`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export const CardActions = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-t border-slate-50 flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
};
