import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Tag, 
  Trash2, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck,
  Building2 
} from 'lucide-react';
import Modal from '../../components/Ui/Modal';
import { Typography } from '../../components/Ui/Typography';
import Button from '../../components/Ui/Button';
import { Divider } from '../../components/Ui/Layout';

const SingleBooking = (props) => {
  const { details, open, close } = props;

  if (!details || !details.items) return null;

  const item = details.items;

  return (
    <Modal open={open} onClose={close} title="Rental Details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-inner group relative">
            <img 
              src={item.itemImage} 
              alt={item.itemName} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
               <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${details.isPaid ? 'bg-emerald-500/80 text-white border-white/20' : 'bg-white/80 text-secondary border-white/50'}`}>
                 {details.isPaid ? 'Payment Received' : 'Payment Required'}
               </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guaranteed Service</p>
              <p className="text-xs font-bold text-secondary">Rent with confidence via Quinca</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
               <Tag size={12} /> {item.category}
            </div>
            <Typography variant="h2" className="text-secondary leading-tight">{item.itemName}</Typography>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-secondary">RWF {item.itemPrice?.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">/ day</span>
            </div>
          </div>

          <Divider className="border-slate-100" />

          {/* Details Grid */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Supplier Information</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Organization</p>
                  <p className="text-sm font-bold text-secondary">{item.owner?.organization || 'Private Supplier'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Phone Contact</p>
                  <p className="text-sm font-bold text-secondary">{item.owner?.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email Address</p>
                  <p className="text-sm font-bold text-secondary">{item.owner?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-end">
            {!details.isPaid ? (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="ghost" 
                  className="rounded-2xl h-14 font-black transition-all hover:bg-red-50 hover:text-red-500"
                  icon={Trash2}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="rounded-2xl h-14 font-black shadow-premium"
                  icon={CreditCard}
                  onClick={() => alert('Payment redirection logic here')}
                >
                  Pay Now
                </Button>
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-center gap-3 text-emerald-600">
                <CheckCircle2 size={24} />
                <span className="font-black text-sm uppercase tracking-widest">Transaction Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SingleBooking;
