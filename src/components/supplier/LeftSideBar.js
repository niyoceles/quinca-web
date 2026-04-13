import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Layers, 
  Box, 
  Tags, 
  BarChart3,
  Users,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export const MainNav = () => {
  const location = useLocation();
  
  const links = [
    { title: 'Dashboard', path: '/account/supplier/dashboard', icon: LayoutDashboard },
    { title: 'Orders', path: '/account/supplier/orders', icon: ShoppingCart },
    { title: 'Proforma', path: '/account/supplier/proforma', icon: Layers },
    { title: 'Materials', path: '/account/supplier/items', icon: Box },
    { title: 'Categories', path: '/account/supplier/categories', icon: Tags },
    { title: 'Customers', path: '/account/supplier/customers', icon: Users },
  ];

  return (
    <div className="space-y-1.5 p-4">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.title}
            to={link.path}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
              isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
            }`}
          >
            <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
              <link.icon size={20} />
            </div>
            <span className="font-bold text-sm tracking-tight flex-grow">{link.title}</span>
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white/50" />}
          </Link>
        );
      })}
    </div>
  );
};

export const SecondaryNav = () => {
  const links = [
    { title: 'Reports', path: '/account/supplier/reports', icon: BarChart3 },
    { title: 'Messages', path: '/account/supplier/messages', icon: MessageSquare },
  ];

  return (
    <div className="space-y-1.5 p-4 mt-6">
      <p className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Insights & Tools</p>
      {links.map((link) => (
        <Link
          key={link.title}
          to={link.path}
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-secondary transition-all group"
        >
          <div className="text-slate-400 group-hover:text-primary transition-all group-hover:scale-110">
            <link.icon size={20} />
          </div>
          <span className="font-bold text-sm tracking-tight">{link.title}</span>
        </Link>
      ))}
    </div>
  );
};
