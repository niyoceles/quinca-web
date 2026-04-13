import React from 'react';
import NavbarLogo from '../components/NavbarLogo';
import Footer from '../components/Footer';

const CartLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavbarLogo />
      <main className="flex-grow py-8 md:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CartLayout;
