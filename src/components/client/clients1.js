import React from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ShoppingBag, 
  ArrowUpRight, 
  LayoutDashboard,
  Clock
} from 'lucide-react';
import ClientLayout from '../../layouts/ClientLayout';
import { Card } from '../Ui/Card';
import { Typography } from '../Ui/Typography';
import Features from '../Features';

const StatCard = ({ title, value, change, icon: Icon, color = "primary" }) => (
  <Card hover className="p-6 border-none shadow-premium rounded-[2rem] bg-white group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-${color}/10 transition-colors`} />
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black text-secondary leading-none">{value}</h3>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp size={10} /> {change}
          </span>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tight">vs last week</span>
        </div>
      </div>
      <div className={`p-3 bg-slate-50 text-${color} rounded-2xl group-hover:bg-${color} group-hover:text-white transition-all duration-500`}>
        <Icon size={20} />
      </div>
    </div>
  </Card>
);

export default function Dashboard() {
  return (
    <ClientLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <Typography variant="h2">Marketplace Console</Typography>
            </div>
            <p className="text-slate-400 font-medium">Monitoring your purchasing activity and active inquiries</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Updated</p>
              <p className="text-xs font-black text-secondary leading-none mt-1">14:32 PM • Online</p>
            </div>
            <Clock className="text-primary animate-pulse" size={20} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Total Spending" value="RWF 456,200" change="+12%" icon={Wallet} color="primary" />
          <StatCard title="Active Orders" value="12" change="+3" icon={ShoppingBag} color="secondary" />
          <StatCard title="Saved Items" value="48" change="+5%" icon={ArrowUpRight} color="primary" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-10">
          <Card hover={false} className="p-10 border-none shadow-premium bg-white rounded-[3rem]">
            <Features />
          </Card>
        </div>

        {/* Footer Area */}
        <div className="pt-10 border-t border-slate-100 flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose text-center">
            Hadiwa Purchasing Platform • Secured with Quantum-RSA v4<br />
            <span className="text-emerald-500/50 italic font-bold">Encrypted Communication Channel: Active</span>
          </p>
        </div>
      </div>
    </ClientLayout>
  );
}
