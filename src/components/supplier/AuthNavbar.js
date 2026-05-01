import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  BellDot,
  Search,
  Settings,
  X
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { MainNav, SecondaryNav } from './LeftSideBar';
import { toggleSidebar } from '../../redux/actions/uiActions';
import Logout from '../Auth/Logout';
import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

export default function AuthNavbar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen);
  const user = useSelector(state => state.auth.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Safety check for token
  let decodedToken = { email: 'User', userType: 'supplier' };
  try {
    if (localStorage.IdToken) {
      decodedToken = jwtDecode(localStorage.IdToken);
    }
  } catch (err) {
    console.error('Invalid token');
  }

  // Determine user type from Redux or Token
  const currentUserType = user?.userType || decodedToken?.userType;

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  return (
    <Fragment>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-white border-b border-slate-100 z-[60] px-6">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleToggleSidebar}
              className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-secondary transition-all active:scale-95"
            >
              <Menu size={22} />
            </button>
            <Link to="/" className="flex items-center gap-3 group">
              <img src={Hadiwa_logo} alt="Hadiwa" className="h-16 md:h-18 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="hidden md:block">
                <span className="font-black text-secondary tracking-tight block leading-none">Hadiwa</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  {currentUserType === 'admin' ? 'Admin Center' : 'Supplier Center'}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/20 transition-all">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none text-sm font-medium w-full focus:ring-0 placeholder:text-slate-300"
              />
            </div>

            {/* Notifications */}
            <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all ${
                  isProfileOpen ? 'bg-slate-50 border-primary/20 bg-primary/5' : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/20">
                  {(user?.email || decodedToken?.email)?.[0].toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-black text-secondary truncate max-w-[120px] uppercase tracking-tight">
                    {(user?.email || decodedToken?.email)?.split('@')[0] || 'User'}
                  </p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-50 overflow-hidden py-3 animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
                  <div className="px-6 py-4 border-b border-slate-50 mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="font-bold text-secondary truncate">{user?.email || decodedToken?.email}</p>
                  </div>
                  <Link to="/account/supplier/myaccount" className="flex items-center gap-4 px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary transition-all">
                    <User size={18} className="text-slate-400" />
                    <span className="font-bold text-sm">My Profile</span>
                  </Link>
                  <Link to="/account/supplier/settings" className="flex items-center gap-4 px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary transition-all">
                    <Settings size={18} className="text-slate-400" />
                    <span className="font-bold text-sm">Settings</span>
                  </Link>
                  <div className="mt-2 pt-2 border-t border-slate-50">
                    <Logout variant="sidebar" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[70] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-24 bottom-0 left-0 bg-white border-r border-slate-100 z-[50] transition-all duration-500 overflow-y-auto ${
          isSidebarOpen ? 'w-[280px]' : 'w-0 -translate-x-full md:w-0'
        }`}
      >
        <div className="h-full flex flex-col pt-4">
          <MainNav />
          <div className="flex-grow" />
          <SecondaryNav />
          <div className="p-8 border-t border-slate-50">
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BellDot size={12} className="text-primary" /> System Status
              </p>
              <p className="text-[11px] font-bold text-emerald-500 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Operational
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu FAB */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center md:hidden z-[100] active:scale-95 transition-all"
      >
        <Menu size={24} />
      </button>
    </Fragment>
  );
}
