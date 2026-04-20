import React from 'react';

export const Container = ({ children, className = '', maxWidth = '2xl', fluid = false, ...props }) => {
  const maxWidths = {
    xs: 'max-w-xs',
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const chosenWidth = fluid ? 'max-w-none' : (maxWidths[maxWidth] || maxWidths['2xl']);

  return (
    <div 
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${chosenWidth} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Grid = ({ 
  children, 
  className = '', 
  container = false, 
  item = false, 
  spacing = 4, 
  cols = { base: 1, sm: 2, md: 3, lg: 4 },
  ...props 
}) => {
  if (container) {
    const spacingClasses = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    };

    return (
      <div 
        className={`grid ${spacingClasses[spacing] || 'gap-6'} ${className}`}
        style={{
          gridTemplateColumns: `repeat(${cols.base}, minmax(0, 1fr))`,
        }}
        {...props}
      >
        {/* Note: In a real implementation we'd use responsive classes like md:grid-cols-3 */}
        {children}
      </div>
    );
  }

  return <div className={`${className}`} {...props}>{children}</div>;
};

// Simplified Flex Box equivalent
export const Box = ({ children, className = '', ...props }) => {
  return <div className={`${className}`} {...props}>{children}</div>;
};

export const Divider = ({ className = '' }) => {
  return <hr className={`border-t border-slate-100 my-4 ${className}`} />;
};
