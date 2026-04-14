import React from 'react';
import { Link } from 'react-router-dom';
import Informing from '../components/Auth/Informing';
import { Typography } from '../components/Ui/Typography';

function Copyright() {
  return (
    <div className="mt-8 pt-8 border-t border-slate-50">
      <Typography variant="body2" className="text-slate-400 text-center">
        {'Copyright © '}
        <Link to="/" className="text-primary font-bold hover:underline transition-all">
          Hadiwa
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </div>
  );
}

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-white">
      {/* Visual Side */}
      <Informing />

      {/* Form Side */}
      <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
