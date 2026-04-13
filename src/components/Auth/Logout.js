import React from 'react';
import { useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logoutUser } from '../../redux/actions';

export default function Logout({ variant = 'default', className = '' }) {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  if (variant === 'sidebar' || variant === 'nav') {
    return (
      <button 
        onClick={handleSignout} 
        className={`w-full flex items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 transition-all font-bold text-sm ${className}`}
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignout}
      className={`flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors ${className}`}
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  );
}
