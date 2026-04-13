import React from 'react';
import { Target, Rocket, Shield, Diamond, Award, Users, Globe, Clock } from 'lucide-react';
import { Container, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import ClientLayout from '../../layouts/ClientLayout';

const CheckCircle2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

export default function AboutUs() {
  return (
    <ClientLayout>
      <main className="py-20 bg-slate-50/50 min-h-screen">
        <Container maxWidth="lg">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              <Award size={12} /> Established Industry Leader
            </div>
            <Typography variant="h1">
              About <span className="text-primary italic">Quinca Paradi</span>
            </Typography>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            <p className="max-w-2xl mx-auto text-slate-500 font-medium">
              We are a premium e-commerce platform by PARADI-BOUNTY Co. LTD, dedicated to modernizing the construction marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Vision & Mission */}
            <div className="md:col-span-8 flex flex-col gap-8">
              <Card className="p-10 border-none shadow-premium bg-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-10 space-y-10">
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:rotate-12 transition-transform">
                      <Globe size={28} />
                    </div>
                    <div className="space-y-3">
                      <Typography variant="h4" className="text-secondary tracking-tight">Our Vision</Typography>
                      <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-4">
                        "Globalization of market, and stabilization of price"
                      </p>
                    </div>
                  </div>

                  <Divider className="border-slate-50" />

                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0 group-hover:-rotate-12 transition-transform">
                      <Rocket size={28} />
                    </div>
                    <div className="space-y-3">
                      <Typography variant="h4" className="text-secondary tracking-tight">Our Mission</Typography>
                      <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-secondary/20 pl-4">
                        "Provision of all in common space"
                      </p>
                    </div>
                  </div>

                  <Divider className="border-slate-50" />

                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Target size={28} />
                    </div>
                    <div className="space-y-3">
                      <Typography variant="h4" className="text-secondary tracking-tight">Core Objectives</Typography>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500 font-medium">
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                           Unification of market & price standardization
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                           Attenuation of wasting time
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                           Minimizing procurement costs
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                           Promoting E-commerce technology
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-10 border-none shadow-premium bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Award size={24} />
                    </div>
                    <Typography variant="h4" className="text-white">Core Business</Typography>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-300 text-sm leading-relaxed">
                    <div className="space-y-4">
                      <p className="flex gap-3">
                        <span className="text-primary font-black">01</span>
                        Distribution, supply and import of construction, plumbing and electricity materials
                      </p>
                      <p className="flex gap-3">
                        <span className="text-primary font-black">02</span>
                        E-commerce of specialized building tools
                      </p>
                    </div>
                    <div className="space-y-4">
                      <p className="flex gap-3">
                        <span className="text-primary font-black">03</span>
                        Marketing and promotion of industrial goods
                      </p>
                      <p className="flex gap-3">
                        <span className="text-primary font-black">04</span>
                        Manufacturing and selling of premium furniture
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Values & Goals */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <Card className="p-10 border-none shadow-premium bg-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="space-y-8 text-center sm:text-left">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto sm:mx-0">
                    <Shield size={28} />
                  </div>
                  <Typography variant="h4" className="text-secondary tracking-tight">Core Values</Typography>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle2, label: 'Credibility', color: 'text-emerald-500' },
                      { icon: Diamond, label: 'Commitment', color: 'text-blue-500' },
                      { icon: Clock, label: 'Punctuality', color: 'text-amber-500' },
                      { icon: Users, label: 'Collaboration', color: 'text-primary' },
                      { icon: Award, label: 'Permanence', color: 'text-purple-500' }
                    ].map((val) => (
                      <div key={val.label} className="flex items-center gap-4 group/item">
                        <div className={`w-2 h-2 rounded-full bg-slate-100 group-hover/item:scale-150 transition-transform`} />
                        <span className="text-slate-500 font-bold group-hover/item:text-secondary transition-colors">{val.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-10 border-none shadow-premium bg-secondary text-white rounded-[2.5rem] relative overflow-hidden">
                <div className="space-y-8">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary animate-pulse">
                    <Target size={28} />
                  </div>
                  <Typography variant="h4" className="text-white">Achievements</Typography>
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-slate-400">
                      Our goals extend beyond business. We strive to be a pillar of our community.
                    </p>
                    <ul className="space-y-4 text-xs font-bold leading-relaxed text-slate-300">
                      <li className="flex items-start gap-3 italic">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                         Supporting our government far exceeding paying taxes
                      </li>
                      <li className="flex items-start gap-3 italic">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                         Promoting enduring social values and community resilience
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </ClientLayout>
  );
}

