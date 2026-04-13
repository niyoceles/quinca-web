import React from 'react';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import { Building, Users, CheckCircle2 } from 'lucide-react';
import BackgroundImg from '../../assets/images/construction.jpg';

export default function Informing() {
  return (
    <div 
      className="hidden md:flex md:col-span-7 relative flex-col items-center justify-center p-12 overflow-hidden bg-secondary text-white"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark modern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/80 to-primary/20 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-lg text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-in slide-in-from-top-4 duration-700">
            <CheckCircle2 size={12} /> Established Industry Leader
          </div>
          <Typography variant="h1" className="text-white drop-shadow-2xl">
            Quinca <span className="text-primary italic">Paradi</span>
          </Typography>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
          <Typography variant="h3" className="text-white mb-4 italic font-black">
            "Let us Build the world together"
          </Typography>
          <p className="text-slate-300 text-sm font-medium leading-relaxed">
            Join the fastest growing construction marketplace in the region. Whether you're a high-volume supplier or a precision builder, we have the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-8">
          <Button 
            className="rounded-2xl py-4 bg-white text-secondary hover:bg-slate-100 shadow-xl"
            icon={Users}
          >
            I'm a Client
          </Button>
          <Button 
            className="rounded-2xl py-4 bg-primary text-white hover:bg-primary-dark shadow-xl"
            icon={Building}
          >
            I'm a Supplier
          </Button>
        </div>
      </div>

      {/* Modern abstract shape */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
