import React from 'react';

export const Typography = ({ 
  variant = 'body', 
  children, 
  className = '', 
  component: Component,
  ...props 
}) => {
  const variants = {
    h1: 'text-4xl md:text-5xl font-black text-secondary leading-tight',
    h2: 'text-3xl md:text-4xl font-extrabold text-secondary leading-tight',
    h3: 'text-2xl md:text-3xl font-bold text-secondary tracking-tight',
    h4: 'text-xl md:text-2xl font-bold text-secondary',
    h5: 'text-lg md:text-xl font-bold text-secondary',
    h6: 'text-base md:text-lg font-bold text-secondary uppercase tracking-wider',
    subtitle1: 'text-lg font-semibold text-secondary leading-relaxed',
    subtitle2: 'text-base font-semibold text-secondary leading-relaxed',
    body: 'text-base text-slate-700 leading-relaxed',
    body2: 'text-sm text-slate-600 leading-relaxed',
    caption: 'text-xs text-slate-500 font-bold tracking-wide uppercase',
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
    <div className={`mb-10 ${center ? 'text-center' : ''} ${className}`}>
      <Typography variant="h2" className="mb-3">{title}</Typography>
      {subtitle && <Typography variant="body" className="max-w-2xl mx-auto">{subtitle}</Typography>}
      <div className={`mt-4 h-1 w-20 bg-primary rounded-full ${center ? 'mx-auto' : ''}`} />
    </div>
  );
};
