import React from 'react';

export const Typography = ({ 
  variant = 'body', 
  children, 
  className = '', 
  component: Component,
  ...props 
}) => {
  const variants = {
    h1: 'text-3xl md:text-4xl font-black text-secondary leading-tight',
    h2: 'text-2xl md:text-3xl font-extrabold text-secondary leading-tight',
    h3: 'text-xl md:text-2xl font-bold text-secondary tracking-tight',
    h4: 'text-lg md:text-xl font-bold text-secondary',
    h5: 'text-base md:text-lg font-bold text-secondary',
    h6: 'text-sm md:text-base font-bold text-secondary uppercase tracking-wider',
    subtitle1: 'text-base font-semibold text-secondary leading-snug',
    subtitle2: 'text-sm font-semibold text-secondary leading-snug',
    body: 'text-sm text-slate-700 leading-snug',
    body2: 'text-[13px] text-slate-600 leading-snug',
    caption: 'text-[10px] text-slate-500 font-bold tracking-wide uppercase',
  };

  const ResolvedComponent = Component || (variant.startsWith('h') ? variant : 'p');

  return (
    <ResolvedComponent className={`${variants[variant] || variants.body} ${className}`} {...props}>
      {children}
    </ResolvedComponent>
  );
};

export const SectionTitle = ({ title, subtitle, center = false, className = '' }) => {
  return (
    <div className={`mb-6 ${center ? 'text-center' : ''} ${className}`}>
      <Typography variant="h3" className="mb-1">{title}</Typography>
      {subtitle && <Typography variant="body2" className="max-w-2xl mx-auto">{subtitle}</Typography>}
      <div className={`mt-2 h-1 w-12 bg-primary rounded-full ${center ? 'mx-auto' : ''}`} />
    </div>
  );
};
