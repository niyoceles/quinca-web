import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Phone, 
  Mail, 
  Menu, 
  User, 
  List as ListIcon, 
  LogOut, 
  HelpCircle, 
  Info,
  X,
  ChevronRight
} from 'lucide-react';
import { logoutUser } from '../redux/actions';
import Quinca_logo from '../assets/images/quinca-logo.jpeg';
import { Container } from './Ui/Layout';
import Button from './Ui/Button';

export default function NavbarLogo() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.authenticated);
  const userinformation = JSON.parse(localStorage.getItem('userInfo'));
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDrawerOpen(false);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Help', path: '/contact-us' },
  ];

  const authLinks = [
    isAuthenticated ? { title: 'Profile', path: '/me', icon: User } : null,
    isAuthenticated ? { title: 'My Proforma', path: '/my-proforma', icon: ListIcon } : null,
    isAuthenticated ? { title: 'My Bookings', path: '/bookings', icon: ListIcon } : null,
    { title: 'Contact Us', path: '/contact-us', icon: Phone },
    { title: 'About Us', path: '/about-us', icon: Info },
  ].filter(Boolean);

  return (
    <Fragment>
      {/* Top Bar - Micro Info */}
      <div className="bg-white border-b border-slate-50 py-2 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {navLinks.map(link => (
                <Link 
                  key={link.title} 
                  to={link.path} 
                  className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-secondary'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <Phone size={12} className="text-primary" />
                <span>+250 788 550 184</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Mail size={12} />
                    <span>{userinformation?.email}</span>
                  </div>
                  <span className="text-slate-200">|</span>
                  <span className="text-secondary uppercase tracking-tight">{userinformation?.names}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="text-[10px] font-black uppercase tracking-widest rounded-full px-6">
                      Join Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Bar - Branding */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <Container>
          <div className="h-16 md:h-20 flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 -ml-2 text-secondary hover:bg-slate-50 rounded-xl transition-all"
            >
              <Menu size={24} />
            </button>

            {/* Centered/Left Logo */}
            <div className="flex-grow flex justify-center md:justify-start">
              <Link to="/" className="block">
                <img src={Quinca_logo} alt="Quinca Paradi" className="h-10 md:h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Action Group (User/Search/Cart can go here) */}
            <div className="flex items-center gap-2 md:hidden w-10" />
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 overflow-hidden ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-secondary/40 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-500 flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-black text-secondary tracking-tight">Navigation</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-1">
            {authLinks.map(link => (
              <Link 
                key={link.title} 
                to={link.path} 
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 group transition-all"
              >
                <div className="p-2 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  <link.icon size={20} />
                </div>
                <span className="font-bold text-slate-600 group-hover:text-primary transition-colors">{link.title}</span>
                <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
              </Link>
            ))}
            
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-accent/5 group transition-all text-left"
              >
                <div className="p-2 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-accent group-hover:text-white transition-all">
                  <LogOut size={20} />
                </div>
                <span className="font-bold text-slate-600 group-hover:text-accent transition-colors">Logout</span>
              </button>
            )}
          </div>

          {!isAuthenticated && (
            <div className="p-6 border-t border-slate-50 space-y-3">
              <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="block">
                <Button variant="outline" className="w-full rounded-2xl font-black">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsDrawerOpen(false)} className="block">
                <Button className="w-full rounded-2xl font-black shadow-premium">Join Now</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
