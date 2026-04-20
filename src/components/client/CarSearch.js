import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Car } from 'lucide-react';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

export default function CarSearch() {
  const [selectedDate, setSelectedDate] = useState('2024-08-18');
  const [selectedTime, setSelectedTime] = useState('10:00');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Pickup & Dropoff Location */}
      <div className="lg:col-span-4 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <MapPin size={12} className="text-primary" /> Pickup
          </label>
          <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
            <option value="">Select location</option>
            <option value="Remera">Remera</option>
            <option value="Nyabugogo">Nyabugogo</option>
            <option value="Kicukiro">Kicukiro</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <MapPin size={12} className="text-secondary" /> Dropoff
          </label>
          <select className="w-full bg-slate-100/50 border border-slate-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
            <option value="">Select location</option>
            <option value="Remera">Remera</option>
            <option value="Nyabugogo">Nyabugogo</option>
            <option value="Kicukiro">Kicukiro</option>
          </select>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <Calendar size={12} className="text-primary" /> Rental Date
          </label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
            <Clock size={12} className="text-primary" /> Collection Time
          </label>
          <input 
            type="time" 
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer outline-none"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="lg:col-span-3 flex items-center gap-3">
        <Button 
          variant="secondary" 
          fullWidth
          className="rounded-2xl py-4 shadow-lg font-black bg-secondary hover:bg-slate-800"
          icon={Car}
        >
          Rent Logistics
        </Button>
      </div>
    </div>
  );
}