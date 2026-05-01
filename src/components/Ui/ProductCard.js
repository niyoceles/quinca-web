import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Typography } from './Typography';

export const ProductCard = ({ id, itemName, itemImage, itemPrice, category, rating = 4.9, onAdd }) => (
  <Card className="h-full overflow-hidden flex flex-col group border-none shadow-sm hover:shadow-xl transition-all duration-300">
    <ReactLink to={`/view/${id}`} className="relative block overflow-hidden aspect-[1/1.1]">
      <img 
        src={itemImage} 
        alt={itemName} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      {/* Tags */}
      <div className="absolute top-2 left-2 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-tighter bg-accent text-white px-2 py-0.5 rounded shadow-sm">
          Choice
        </span>
      </div>
    </ReactLink>
    <CardContent className="flex-grow flex flex-col pt-4 px-4 pb-4">
      <div className="flex items-center justify-between mb-1">
        <Typography variant="caption" className="text-slate-500 font-bold">
          {category}
        </Typography>
        <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500">
          <Star size={12} className="fill-orange-500 text-orange-500" /> {rating}
        </div>
      </div>
      
      <Typography variant="subtitle2" className="line-clamp-2 mb-4 group-hover:text-primary transition-colors min-h-[2.5rem] leading-tight font-bold">
        {itemName}
      </Typography>
      
      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold text-accent line-through opacity-60">RWF {(itemPrice * 1.2).toFixed(0)}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-primary italic">RWF</span>
            <span className="text-lg font-black text-primary leading-none">{itemPrice}</span>
          </div>
        </div>
        <button 
          onClick={(e) => {
            if (onAdd) {
              e.preventDefault();
              onAdd(e);
            }
          }}
          className="bg-primary/5 p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </CardContent>
  </Card>
);
