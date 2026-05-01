import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  ShoppingCart, 
  Bell, 
  User, 
  Globe, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  ClipboardList, 
  HelpCircle,
  Phone,
  Mail,
  ChevronDown
} from 'lucide-react';
import { logoutUser } from '../redux/actions';
import { getMyNotifications, markAsRead } from '../redux/actions/notificationActions';
import { Container } from './Ui/Layout';
import Button from './Ui/Button';
import SearchItems from '../pages/client/SearchItems';
import cartImage from '../assets/images/cart.svg';
import Hadiwa_logo from '../assets/images/hadiwa-logo.png';
import userImage from '../assets/images/account.svg';

const NavLink = ({ to, children, className = '' }) => (
  <Link to={to} className={`text-sm font-medium hover:text-primary transition-colors duration-200 ${className}`}>
    {children}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('common');
  
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const userInformation = JSON.parse(localStorage.getItem('userInfo'));
  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const orderedItems = JSON.parse(localStorage.getItem('orderSummary'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    if (isAuthenticated) dispatch(getMyNotifications());
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => dispatch(logoutUser());
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <header className="relative w-full z-50">
      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-slate-100 hidden md:block py-1">
        <Container className="flex justify-between items-center text-slate-600 text-xs font-bold">
          <div className="flex items-center gap-6">
            <NavLink to="/">{t('home')}</NavLink>
            <NavLink to="/contact-us">{t('help')}</NavLink>
            <NavLink to="/terms-and-conditions">{t('terms')}</NavLink>
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-primary" />
              <span>+250 788 550 184</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Language Selector commented out for now 
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Globe size={14} />
                <span>{i18n.language.toUpperCase()}</span>
                <ChevronDown size={14} />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-[60]">
                  {['en', 'rw', 'fr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 hover:text-primary capitalize"
                    >
                      {lang === 'en' ? 'English' : lang === 'rw' ? 'Kinyarwanda' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            */}

            {isAuthenticated && userInformation && (
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={14} className="text-primary" />
                <span>{userInformation.email}</span>
                <span className="mx-1 text-slate-500">|</span>
                <span className="font-bold">{userInformation.names}</span>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="flex items-center gap-4">
                <NavLink to="/login" className="text-primary font-bold">Sign In</NavLink>
                <Link to="/signup">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tight">Join Free</span>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Main Header Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-md py-2 sticky top-0' 
            : 'bg-white py-3'
        }`}
      >
        <Container className="flex items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Hadiwa_logo} alt="Hadiwa" className="h-8 md:h-10 w-auto rounded-lg shadow-sm" />
          </Link>

          {/* Search Bar - Permanent */}
          <div className="flex-grow max-w-2xl hidden md:block">
            <SearchItems />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {/* Request Proforma Button */}
            <Link to="/request" className="hidden lg:block">
              <Button size="sm" className="rounded-full px-6 font-bold shadow-premium bg-primary hover:bg-primary-dark">
                Request Proforma
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 group">
              <div className="bg-slate-50 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <ShoppingCart className="text-secondary group-hover:text-primary transition-colors" size={24} />
              </div>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {orderedItems?.length || 0}
              </span>
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors relative"
                >
                  <Bell className="text-secondary" size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-accent h-2.5 w-2.5 rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>
                {/* Notifications Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                      <span className="font-bold text-secondary">Notifications</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              dispatch(markAsRead(notif.id));
                              setIsNotifOpen(false);
                            }}
                            className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-primary/5' : ''}`}
                          >
                            <p className="text-sm font-bold text-secondary">{notif.title}</p>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-1">{notif.message}</p>
                            <span className="text-[10px] text-slate-600 font-bold mt-2 block">{new Date(notif.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-10 text-center text-slate-600 font-bold">
                          <Bell className="mx-auto mb-3 opacity-40 text-primary" size={40} />
                          <p className="text-sm">Stay tuned! No notifications yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-3 bg-slate-50 rounded-full hover:shadow-sm border border-slate-100 transition-all"
                >
                  <img src={userImage} alt="" className="h-7 w-7 opacity-75" />
                  <span className="text-xs font-bold text-secondary hidden md:block">Account</span>
                  <ChevronDown size={14} className="text-slate-600" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-50 mb-2">
                      <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold text-secondary truncate">{userInformation?.names || 'User'}</p>
                    </div>
                    <Link to="/me" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                      <User size={18} /> My Profile
                    </Link>
                    {userInformation?.userType === 'supplier' && (
                      <Link to="/account/supplier/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors font-black text-primary">
                        <Settings size={18} /> Supplier Dashboard
                      </Link>
                    )}
                    <Link to="/my-proforma" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                      <ClipboardList size={18} /> My Proforma
                    </Link>
                    <Link to="/bookings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                      <ClipboardList size={18} /> My Bookings
                    </Link>
                    <div className="h-px bg-slate-50 my-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="w-4/5 h-full bg-white shadow-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <img src={Hadiwa_logo} alt="Hadiwa" className="h-8 w-auto" />
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <nav className="space-y-6">
              <Link to="/me" className="flex items-center gap-4 text-lg font-bold text-secondary">
                <User size={24} className="text-primary" /> Profile
              </Link>
              <Link to="/my-proforma" className="flex items-center gap-4 text-lg font-bold text-secondary">
                <ClipboardList size={24} className="text-primary" /> My Proforma
              </Link>
              <Link to="/bookings" className="flex items-center gap-4 text-lg font-bold text-secondary">
                <ClipboardList size={24} className="text-primary" /> Bookings
              </Link>
              <Link to="/contact-us" className="flex items-center gap-4 text-lg font-bold text-secondary">
                <HelpCircle size={24} className="text-primary" /> Help Center
              </Link>
              <div className="h-px bg-slate-100" />
              {isAuthenticated ? (
                <button onClick={handleLogout} className="flex items-center gap-4 text-lg font-bold text-red-500">
                  <LogOut size={24} /> Logout
                </button>
              ) : (
                <div className="space-y-4 pt-4">
                  <Link to="/login" className="block w-full text-center py-3 bg-primary text-white rounded-xl font-bold">Login</Link>
                  <Link to="/signup" className="block w-full text-center py-3 border-2 border-primary text-primary rounded-xl font-bold">Register</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
