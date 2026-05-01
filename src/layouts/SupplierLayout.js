import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavbar from '../components/supplier/AuthNavbar';
import { Container } from '../components/Ui/Layout';

const SupplierLayout = ({ children }) => {
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AuthNavbar />
      
      {/* 
          Main Content Wrapper 
          Using pt-24 to account for fixed top navbar (h-24)
      */}
      <div className="flex flex-grow pt-24">
        {/* Supporting content area with responsive padding-left for the fixed sidebar */}
        <main 
          className={`flex-grow min-w-0 transition-all duration-500 ${
            isSidebarOpen ? 'md:pl-[280px]' : 'pl-0'
          }`}
        >
          <Container className="py-6 md:py-8">
            <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-700">
              {children}
            </div>

            <footer className="mt-12 py-6 border-t border-slate-100">
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                Copyright &copy; {new Date().getFullYear()} Hadiwa<br />
              </p>
            </footer>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default SupplierLayout;
