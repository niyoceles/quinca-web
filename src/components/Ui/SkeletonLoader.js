import React from 'react';

/**
 * Skeleton loader for product cards to improve perceived performance
 */
export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-50 h-full flex flex-col animate-pulse">
      {/* Image Area */}
      <div className="w-full h-[220px] bg-slate-100" />
      
      {/* Content Area */}
      <div className="p-6 space-y-4 flex-grow">
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded-full w-3/4" />
          <div className="h-3 bg-slate-50 rounded-full w-1/2" />
        </div>
        
        <div className="pt-4 flex items-center justify-between">
          <div className="h-4 bg-slate-100 rounded-full w-16" />
          <div className="h-10 bg-slate-100 rounded-2xl w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for category items
 */
export const CategorySkeleton = () => {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-10 h-10 bg-slate-100 rounded-xl" />
      <div className="space-y-2 flex-grow">
        <div className="h-3 bg-slate-100 rounded-full w-1/2" />
        <div className="h-2 bg-slate-50 rounded-full w-1/4" />
      </div>
    </div>
  );
};

/**
 * Table row skeleton for lists
 */
export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 animate-pulse">
      <div className="flex items-center gap-4 w-1/3">
        <div className="w-10 h-10 bg-slate-100 rounded-2xl" />
        <div className="h-4 bg-slate-100 rounded-full w-3/4" />
      </div>
      {Array.from({ length: columns - 1 }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-50 rounded-full w-24" />
      ))}
    </div>
  );
};
