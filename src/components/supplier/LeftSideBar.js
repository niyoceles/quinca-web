import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Layers, 
  Box, 
  Tags, 
  BarChart3,
  Users,
  MessageSquare,
  User,
  Inbox,
  Truck,
  TrendingUp
} from 'lucide-react';

const NavItem = ({ link }) => {
  const location = useLocation();
  const isActive = location.pathname === link.path;
  const Icon = link.icon;

  return (
    <Link
      to={link.path}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all group ${
        isActive 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
      }`}
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
        <Icon size={18} />
      </div>
      <span className="font-bold text-xs tracking-tight flex-grow">{link.title}</span>
      {isActive && <div className="w-1 h-4 rounded-full bg-white/40" />}
    </Link>
  );
};

const NavSection = ({ title, links }) => (
  <div className="mb-4 px-4">
    <p className="px-4 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{title}</p>
    <div className="space-y-1">
      {links.map((link) => (
        <NavItem key={link.title} link={link} />
      ))}
    </div>
  </div>
);

export const MainNav = () => {
  const { user } = useSelector(state => state.auth);
  const userType = user?.userType;

  const sections = [];

  if (userType === 'admin') {
    sections.push(
      {
        title: 'Global Management',
        links: [
          { title: 'System Dashboard', path: '/account/supplier/dashboard', icon: LayoutDashboard },
          { title: 'All Orders', path: '/account/supplier/orders', icon: ShoppingCart },
          { title: 'All Proformas', path: '/account/supplier/proforma', icon: Layers },
          { title: 'Manage Suppliers', path: '/account/admin/suppliers', icon: Truck },
        ]
      },
      {
        title: 'Inventory Control',
        links: [
          { title: 'Global Materials', path: '/account/supplier/items', icon: Box },
          { title: 'System Categories', path: '/account/supplier/categories', icon: Tags },
        ]
      },
      {
        title: 'Business Relations',
        links: [
          { title: 'All Customers', path: '/account/supplier/customers', icon: Users },
          { title: 'Public Inquiries', path: '/account/admin/inquiries', icon: Inbox },
          { title: 'System Messages', path: '/account/supplier/messages', icon: MessageSquare },
        ]
      }
    );
  } else if (userType === 'supplier') {
    sections.push(
      {
        title: 'My Operations',
        links: [
          { title: 'My Dashboard', path: '/account/supplier/dashboard', icon: LayoutDashboard },
          { title: 'My Orders', path: '/account/supplier/orders', icon: ShoppingCart },
          { title: 'Proforma Requests', path: '/account/supplier/proforma', icon: Layers },
        ]
      },
      {
        title: 'My Inventory',
        links: [
          { title: 'My Materials', path: '/account/supplier/items', icon: Box },
          { title: 'Item Categories', path: '/account/supplier/categories', icon: Tags },
        ]
      },
      {
        title: 'Relationships',
        links: [
          { title: 'My Customers', path: '/account/supplier/customers', icon: Users },
          // { title: 'Direct Messages', path: '/account/supplier/messages', icon: MessageSquare },
        ]
      }
    );
  } else {
    // Client view
    sections.push(
      {
        title: 'My Activity',
        links: [
          { title: 'Order History', path: '/orders', icon: ShoppingCart },
          { title: 'Proforma Requests', path: '/proforma', icon: Layers },
        ]
      }
    );
  }

  return (
    <div className="py-2">
      {sections.map(section => (
        <NavSection key={section.title} {...section} />
      ))}
    </div>
  );
};

export const SecondaryNav = () => {
  const { user } = useSelector(state => state.auth);
  const userType = user?.userType;

  const links = [];
  
  if (userType === 'admin') {
    links.push({ title: 'Reports & Analytics', path: '/account/supplier/reports', icon: TrendingUp });
  } else if (userType === 'supplier') {
    links.push({ title: 'Sales Performance', path: '/account/supplier/reports', icon: BarChart3 });
  }
  
  links.push({ title: 'Account Profile', path: '/account/supplier/myaccount', icon: User });

  return (
    <div className="p-4 bg-slate-50/50">
      <p className="px-4 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Management</p>
      <div className="space-y-1">
        {links.map((link) => (
          <NavItem key={link.title} link={link} />
        ))}
      </div>
    </div>
  );
};
