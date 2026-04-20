import React from 'react';
import { CheckCircle2, LogIn, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Typography } from '../../components/Ui/Typography';
import Button from '../../components/Ui/Button';
import { Card } from '../../components/Ui/Card';

export default function VerifiedAccount() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <Card hover={false} className="max-w-xl w-full p-12 text-center border-none shadow-premium rounded-[3rem] bg-white overflow-hidden relative">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-8 animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            
            <div className="space-y-4">
              <Typography variant="h2" className="text-secondary tracking-tight">
                Account Verified!
              </Typography>
              <Typography variant="body1" className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                Congratulations! Your Hadiwa account is now active and ready for business.
              </Typography>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100/50">
              <p className="text-sm font-bold text-slate-600 mb-6 flex items-center justify-center gap-2">
                Secure access enabled <ArrowRight size={14} className="text-primary" />
              </p>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full rounded-2xl shadow-premium font-black text-lg py-7"
                onClick={() => window.location.href = '/login'}
                icon={LogIn}
              >
                Sign In to Your Account
              </Button>
            </div>

            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              Identity Verified via Email System
            </p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
