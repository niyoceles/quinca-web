import React from 'react';
import AuthNavbar from '../components/supplier/AuthNavbar';
import { Container } from '../components/Ui/Layout';

const SupplierLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthNavbar />
      
      {/* 
          Main Content Wrapper 
          Using pt-20 to account for fixed top navbar (h-20)
      */}
      <div className="flex flex-grow pt-20">
        {/* Supporting content area with responsive padding-left for the fixed sidebar */}
        <main className="flex-grow min-w-0 transition-all duration-500">
          <Container className="py-8 md:py-12">
            <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-700">
              {children}
            </div>

            <footer className="mt-20 py-8 border-t border-slate-100">
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                Copyright &copy; {new Date().getFullYear()} Quinca Paradi<br />
                <span className="text-primary/40">Powered by Advanced Supply Chain Logistics</span>
              </p>
            </footer>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default SupplierLayout;
