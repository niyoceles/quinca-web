import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  Package,
  Hash
} from 'lucide-react';

import { getSingleProforma } from '../../redux/actions';
import CartLayout from '../../layouts/CartLayout';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import { Card } from '../Ui/Card';

const SingleProforma = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const myprofroma = useSelector(state => state.client.proformaItem.oneproforma);
  const items = useSelector(state => state.client.proformaItem.proformaItems);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProforma(id));
    }
  }, [dispatch, id]);

  const StatusBadge = ({ status }) => {
    const isApproved = status === 'approved' || status === 'paid';
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
        isApproved 
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
          : 'bg-amber-50 text-amber-600 border border-amber-100'
      }`}>
        {isApproved ? <CheckCircle2 size={12} /> : <Clock size={12} />}
        {status}
      </div>
    );
  };

  return (
    <CartLayout>
      <div className="max-w-6xl mx-auto py-12 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-4">
            <Link to="/my-proforma" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Inquiries
            </Link>
            <div className="space-y-1">
              <Typography variant="h1">
                Inquiry <span className="text-primary italic">Detail</span>
              </Typography>
              <div className="flex items-center gap-3">
                <StatusBadge status={myprofroma?.status || 'Pending'} />
                <span className="text-sm font-bold text-slate-300">#PRO-{id?.substring(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-2xl px-6 py-3 font-bold" onClick={() => window.print()}>
              Export PDF
            </Button>
            <Button variant="primary" className="rounded-2xl px-8 py-3 shadow-premium font-black">
              Update Request
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Client & Inquiry Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 border-none shadow-premium bg-white rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Client Profile</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Account Holder</p>
                        <p className="text-sm font-black text-secondary">{myprofroma?.client?.names || '...'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Mobile</p>
                        <p className="text-sm font-black text-secondary">{myprofroma?.client?.phoneNumber || '...'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Email Index</p>
                        <p className="text-sm font-black text-secondary truncate w-48">{myprofroma?.client?.email || '...'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-50" />

                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Timeline & Logistics</p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Need From</span>
                        </div>
                      </div>
                      <p className="text-xs font-black text-secondary">
                        {myprofroma?.needDate ? moment(myprofroma.needDate).format('MMM Do YY, h:mm a') : '...'}
                      </p>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary">
                          <Package size={14} /> <span className="text-[10px] font-black uppercase tracking-wider">Deadline</span>
                        </div>
                      </div>
                      <p className="text-xs font-black text-primary">
                        {myprofroma?.deadline ? moment(myprofroma.deadline).format('MMM Do YY, h:mm a') : '...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {!myprofroma?.isPaid && (
              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-amber-700">
                  <XCircle size={20} />
                  <p className="text-xs font-black">Requires Immediate Approval</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 bg-white hover:bg-slate-50 text-slate-600 py-3 rounded-xl border-none">Cancel</Button>
                  <Button variant="primary" className="flex-1 py-3 rounded-xl shadow-lg">Approve</Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                <Typography variant="h4" className="text-secondary">Requested <span className="text-primary italic">Items</span></Typography>
                <div className="flex items-center gap-2 text-[10px] bg-white border border-slate-100 px-3 py-1 rounded-full font-black text-slate-400">
                  <Hash size={12} /> {myprofroma?.itemsArray?.length || 0} Line Items
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Material Component</th>
                      <th className="px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Price (RWF)</th>
                      <th className="px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Qty</th>
                      <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {myprofroma?.itemsArray?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                              <img src={item.itemImage || "https://res.cloudinary.com/quincaparadi/image/upload/v1614163900/placeholder.jpg"} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-black text-secondary">{item.itemName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-sm font-bold text-slate-500">{item.itemPrice.toLocaleString()}</td>
                        <td className="px-8 py-6 text-center">
                          <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-secondary">{item.itemNumber}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-sm font-black text-secondary italic">{(item.itemNumber * item.itemPrice).toLocaleString()}</span>
                        </td>
                      </tr>
                    ))}
                    {!myprofroma?.itemsArray?.length && (
                      <tr>
                        <td colSpan="4" className="px-8 py-20 text-center text-slate-300 italic">
                          <p className="text-lg font-bold">No items found in this inquiry</p>
                          <p className="text-xs">It seems this request was finalized without specific line components.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {myprofroma?.itemsArray?.length > 0 && (
                    <tfoot className="bg-slate-900 text-white">
                      <tr>
                        <td colSpan="3" className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inquiry Valuation (Grand Total)</td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-xl font-black italic tracking-tight">
                            {myprofroma.itemsArray.reduce((sum, item) => sum + (item.itemNumber * item.itemPrice), 0).toLocaleString()}
                            <span className="text-[10px] ml-2 opacity-50 not-italic">RWF</span>
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="secondary" 
                fullWidth 
                className="py-10 rounded-[2.5rem] bg-white border-2 border-slate-100 hover:border-primary/20 flex-col gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={24} className="text-slate-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Return to Portal</span>
              </Button>
              <Button 
                variant="primary" 
                fullWidth 
                className="py-10 rounded-[2.5rem] flex-col gap-2 shadow-premium"
                onClick={() => window.location.href = '/contact-us'}
              >
                <Mail size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Inquiry Support</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CartLayout>
  );
};

export default SingleProforma;
