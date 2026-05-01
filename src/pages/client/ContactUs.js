import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe, ShieldCheck } from 'lucide-react';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import ClientLayout from '../../layouts/ClientLayout';
import ContactForm from '../../components/client/ContactForm';

export default function ContactUs() {
  return (
    <ClientLayout>
      <main className="bg-slate-50 min-h-screen">
        {/* Banner Section */}
        <div className="bg-secondary py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          
          <Container className="relative z-10 text-center space-y-4">
            <Typography variant="h1" className="text-white">
              Get in <span className="text-primary italic">Touch</span>
            </Typography>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">
              Our professional support team is ready to assist you with any inquiries regarding our premium construction materials and services.
            </p>
          </Container>
        </div>

        <Container className="-mt-12 pb-24 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-8 border-none shadow-premium bg-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Global HQ</p>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4 group/item">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Pulse</p>
                          <p className="text-sm font-black text-secondary">+250 788 550 184</p>
                        </div>
                      </div>

                      <div className="flex gap-4 group/item">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cloud Mail</p>
                          <p className="text-sm font-black text-secondary">paradisebountyco@gmail.com</p>
                        </div>
                      </div>

                      <div className="flex gap-4 group/item">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Office Anchor</p>
                          <p className="text-sm font-black text-secondary">Kigali, Gasabo District, Gisozi</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider className="border-slate-50" />

                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Availability Matrix</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Clock size={12} /> <span className="text-[10px] font-bold uppercase tracking-widest">Mon - Fri</span>
                        </div>
                        <p className="text-[10px] font-black text-secondary">08:00 - 18:00</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Globe size={12} /> <span className="text-[10px] font-bold uppercase tracking-widest">Saturday</span>
                        </div>
                        <p className="text-[10px] font-black text-secondary">09:00 - 15:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>

            {/* Form Column */}
            <div className="lg:col-span-8">
              <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden">
                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </ClientLayout>
  );
}
