import React, { useState, Fragment } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ShieldCheck, 
  Clock,
  Car as CarIcon,
  ArrowRight
} from 'lucide-react';
import NavBar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Container } from '../../Ui/Layout';
import { Card } from '../../Ui/Card';
import { Typography } from '../../Ui/Typography';
import Button from '../../Ui/Button';
import Input from '../../Ui/Input';
import { Modal } from '../../Ui/Modal';

const Slides = () => {
  const images = [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1011&q=80',
    'https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <div className="rounded-[2.5rem] overflow-hidden shadow-premium bg-slate-100">
      <Carousel autoPlay={9000} infinite slidesPerPage={1} slidesPerScroll={1}>
        {images.map((img, i) => (
          <div key={i} className="h-[400px] w-full">
            <img src={img} alt="Transport Service" className="w-full h-full object-cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white hover:border-primary/20 transition-all mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-black text-secondary tracking-tight uppercase text-xs">{title}</span>
        {isOpen ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
          <Typography variant="body1" className="text-slate-500 leading-relaxed">
            {children}
          </Typography>
        </div>
      )}
    </div>
  );
};

const CarDetail = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locations, setLocations] = useState({ pickup: '', dropoff: '' });

  return (
    <Fragment>
      <NavBar />
      <main className="pt-24 pb-20 bg-slate-50 min-h-screen">
        <Container>
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="bg-primary/10 text-primary p-2 rounded-xl">
                <CarIcon size={20} />
              </div>
              <Typography variant="h2">Premium Transport Service</Typography>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Reliable material logistics for your construction site</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Gallery & Details */}
            <div className="lg:col-span-8 space-y-10">
              <Slides />
              
              <div className="space-y-4">
                <AccordionItem title="Service Description">
                  Professional transport service specialized in heavy construction materials. Our fleet is equipped to handle everything from cement bags to structural steel, ensuring on-time delivery to your site with maximum safety and efficiency.
                </AccordionItem>
                <AccordionItem title="Privacy & Logistics Policy">
                  We value your site security. All deliveries are tracked in real-time. Please ensure offloading personnel are available at the destination. Cancellation policies apply for delays exceeding 2 hours at the pickup point.
                </AccordionItem>
              </div>
            </div>

            {/* Right Column: Booking Card */}
            <div className="lg:col-span-4">
              <Card className="p-8 border-none shadow-premium rounded-[2.5rem] bg-white sticky top-28">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Typography variant="h4" className="text-secondary font-black tracking-tight">Booking</Typography>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-black uppercase tracking-tight">Available</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pickup Schedule</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                          type="datetime-local" 
                          defaultValue="2026-05-24T10:30"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Estimated Return</label>
                      <div className="relative group">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                          type="datetime-local" 
                          defaultValue="2026-05-24T15:30"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full rounded-2xl py-4 border-slate-100 font-bold group"
                      onClick={() => setLocationModalOpen(true)}
                    >
                      <MapPin size={18} className="mr-2 text-primary" />
                      {locations.pickup ? `${locations.pickup} → ${locations.dropoff}` : 'Select Service Locations'}
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starting Price</p>
                      <h4 className="text-2xl font-black text-secondary">$6.7<span className="text-xs text-slate-300 font-bold ml-1">/ trip</span></h4>
                    </div>
                    <Button 
                      className="rounded-2xl px-10 shadow-premium font-black active:scale-95 transition-all"
                      icon={ArrowRight}
                    >
                      Book Now
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <Info size={16} className="text-slate-300 shrink-0" />
                    <p className="text-[10px] font-bold text-slate-400 leading-tight">Additional fuel surcharges may apply for deliveries exceeding 50km from city center.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      <Footer />

      {/* Location Selector Modal */}
      <Modal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Route Logistics"
        maxWidth="sm"
      >
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pickup Hub</label>
              <select 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                value={locations.pickup}
                onChange={(e) => setLocations(prev => ({ ...prev, pickup: e.target.value }))}
              >
                <option value="">Select Pickup Location</option>
                <option value="Remera">Remera Distribution Center</option>
                <option value="Nyabugogo">Nyabugogo Logistics Hub</option>
                <option value="Kicukiro">Kicukiro Construction Park</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Drop-off Destination</label>
              <select 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                value={locations.dropoff}
                onChange={(e) => setLocations(prev => ({ ...prev, dropoff: e.target.value }))}
              >
                <option value="">Select Destination</option>
                <option value="Remera">Remera Site</option>
                <option value="Nyabugogo">Nyabugogo Central</option>
                <option value="Kicukiro">Kicukiro Phase II</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
            <Button variant="ghost" className="flex-1 rounded-2xl" onClick={() => setLocationModalOpen(false)}>Close</Button>
            <Button variant="primary" className="flex-1 rounded-2xl shadow-premium font-black" onClick={() => setLocationModalOpen(false)}>Save Route</Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CarDetail;
