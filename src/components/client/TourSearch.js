import React from "react";
import { Search, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import Button from "../Ui/Button";

export default function TourSearch() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Location Search */}
      <div className="lg:col-span-3 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-primary" /> Destination
        </label>
        <div className="relative group">
          <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
            <option>Search by city name</option>
            <option>Muhanga</option>
            <option>Kigali</option>
            <option>Musanze</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
            <Search size={16} />
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="lg:col-span-3 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <Calendar size={12} className="text-primary" /> Travel Date
        </label>
        <input 
          type="date" 
          defaultValue="2024-05-24"
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
        />
      </div>

      {/* Guest Count */}
      <div className="lg:col-span-2 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <Users size={12} className="text-primary" /> Guests
        </label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
          <option>Guest</option>
          <option>1 Guest</option>
          <option>2 Guests</option>
          <option>3+ Guests</option>
        </select>
      </div>

      {/* Tour Type */}
      <div className="lg:col-span-2 space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <Briefcase size={12} className="text-primary" /> Category
        </label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
          <option>Select Type</option>
          <option>Private</option>
          <option>Educational</option>
          <option>Group Tour</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="lg:col-span-2">
        <Button 
          variant="primary" 
          fullWidth
          className="rounded-2xl py-4 shadow-lg font-black"
          icon={Search}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
