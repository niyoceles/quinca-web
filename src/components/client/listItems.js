import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Layers, 
  FileText 
} from 'lucide-react';

const NavItem = ({ icon: Icon, primary, active }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all cursor-pointer group ${
    active ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
  }`}>
    <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
      <Icon size={20} />
    </div>
    <span className="font-bold text-sm tracking-tight">{primary}</span>
  </div>
);

export const mainListItems = (
  <div className="space-y-1 p-2">
    <NavItem icon={LayoutDashboard} primary="Dashboard" active />
    <NavItem icon={ShoppingCart} primary="Orders" />
    <NavItem icon={Users} primary="Customers" />
    <NavItem icon={BarChart3} primary="Reports" />
    <NavItem icon={Layers} primary="Integrations" />
  </div>
);

export const secondaryListItems = (
  <div className="space-y-1 p-2 mt-6">
    <p className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Saved reports</p>
    <NavItem icon={FileText} primary="Current month" />
    <NavItem icon={FileText} primary="Last quarter" />
    <NavItem icon={FileText} primary="Year-end sale" />
  </div>
);