import React, { useState } from 'react';
import { ShoppingBag, Truck, MapPin, Search, Users, Calendar } from 'lucide-react';
import CarSearch from './CarSearch';
import TourSearch from './TourSearch';
import Button from '../Ui/Button';

const SearchTab = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 border-b-2 ${
      active 
        ? 'border-primary text-primary bg-primary/5' 
        : 'border-transparent text-slate-400 hover:text-secondary hover:bg-slate-50'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

function MarketplaceSearch() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="lg:col-span-4 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <ShoppingBag size={12} className="text-primary" /> Product Name
        </label>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search by hardware or tool names..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-colors">
            <Search size={18} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" /> Warehouse Location
        </label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
          <option>All Locations</option>
          <option>Kigali main</option>
          <option>Musanze warehouse</option>
        </select>
      </div>

      <div className="lg:col-span-3 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <Users size={12} className="text-primary" /> Order Type
        </label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
          <option>Retail Order</option>
          <option>Bulk/Wholesale</option>
        </select>
      </div>

      <div className="lg:col-span-2">
        <Button 
          variant="primary" 
          fullWidth
          className="rounded-2xl py-4 shadow-lg font-black"
          icon={Search}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Marketplace', icon: ShoppingBag, component: <MarketplaceSearch /> },
    { label: 'Logistics', icon: Truck, component: <CarSearch /> },
    { label: 'Services', icon: MapPin, component: <TourSearch /> }
  ];

  return (
    <div className="w-[90%] lg:w-4/5 mx-auto mt-12 bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-top-8 duration-1000">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-50 bg-slate-50/30">
        {tabs.map((tab, idx) => (
          <SearchTab 
            key={tab.label}
            active={activeTab === idx}
            onClick={() => setActiveTab(idx)}
            icon={tab.icon}
            label={tab.label}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 md:p-12">
        {tabs[activeTab].component}
      </div>

      {/* Decorative Footer info */}
      <div className="hidden md:flex px-12 py-4 bg-slate-50/50 justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
        <span className="flex items-center gap-2">
          <Calendar size={10} /> Real-time availability
        </span>
        <span className="flex items-center gap-2">
          <Search size={10} /> Safe & Verified suppliers only
        </span>
      </div>
    </div>
  );
}
