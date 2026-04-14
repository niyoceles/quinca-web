import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { 
  ArrowLeft, 
  Layers, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Clock,
  FileText,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { getSingleProforma } from '../../redux/actions';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import Button from '../../components/Ui/Button';

const ViewProforma = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const proforma = useSelector(state => state.client.proformaItem.oneproforma);
  
  useEffect(() => {
    dispatch(getSingleProforma(id));
  }, [dispatch, id]);

  if (!proforma) {
    return (
      <SupplierLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
            <Layers size={32} />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Proforma Details...</p>
        </div>
      </SupplierLayout>
    );
  }

  const calculateTotal = () => {
    return proforma.itemsArray.reduce((acc, item) => acc + (item.itemNumber * item.itemPrice), 0);
  };

  return (
    <SupplierLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/account/supplier/proforma')}
              className="rounded-xl border border-slate-100 hover:bg-white text-slate-400"
              icon={ArrowLeft}
            >
              All Inquiries
            </Button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden md:block" />
            <div>
              <Typography variant="h3">Inquiry #{proforma.id.slice(-8).toUpperCase()}</Typography>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                <Clock size={12} /> Requested {dayjs(proforma.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!proforma.isPaid && (
              <>
                <Button variant="ghost" size="sm" className="rounded-2xl px-6 text-rose-500 hover:bg-rose-50" icon={XCircle}>
                  Decline Inquiry
                </Button>
                <Button variant="primary" size="sm" className="rounded-2xl px-10 shadow-premium" icon={CheckCircle}>
                  Issue Invoice
                </Button>
              </>
            )}
            {proforma.status === 'approved' && (
              <div className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ring-1 ring-emerald-100">
                <ShieldCheck size={14} /> Inquiry Handled
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 space-y-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 text-slate-50/50 -mr-4 -mt-4">
                <FileText size={120} />
              </div>

              <div>
                <Typography variant="h4" className="mb-6 flex items-center gap-2">
                  <User size={18} className="text-primary" /> Potential Client
                </Typography>
                <div className="space-y-5 relative z-10">
                  <div className="group">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Full Name</p>
                    <p className="text-sm font-black text-secondary break-words">{proforma.client.names}</p>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Contact Email</p>
                    <p className="text-sm font-black text-secondary break-words">{proforma.client.email}</p>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Phone Number</p>
                    <p className="text-sm font-black text-secondary">{proforma.client.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                <Typography variant="h4" className="mb-6 flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> Timing Requirements
                </Typography>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Need</span>
                    <span className="text-xs font-black text-secondary">{dayjs(proforma.deadline).format('MMM DD, YYYY')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validity Date</span>
                    <span className="text-xs font-black text-secondary">{dayjs(proforma.pickupDate).format('MMM DD, YYYY')}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-secondary p-8 text-white">
              <Typography variant="h4" className="text-white mb-6 flex items-center gap-2">
                <CreditCard size={18} className="text-primary" /> Estimated Quote
              </Typography>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total Valuation</span>
                  <span className="text-xl font-black">{calculateTotal().toLocaleString()} Rwf</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Inquiry Status</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-white/10 text-white/80`}>
                    {proforma.status}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Requested Items */}
          <Card hover={false} className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <Typography variant="h4">Inquiry Materials</Typography>
              <div className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {proforma.itemsArray.length} Proposed Items
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Material Item</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-right">Market Price</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-right">Quantity</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-right">Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {proforma.itemsArray.map((item, idx) => {
                    const price = Number(item.itemPrice || item.expectedPrice || item.price || 0);
                    const qty = Number(item.itemNumber || item.quantity || 1);
                    return (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Layers size={18} />
                          </div>
                          <p className="font-black text-secondary">{item.itemName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right font-bold text-slate-500">
                        {price.toLocaleString()} Rwf
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-secondary">
                          {qty}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-secondary">
                        {(qty * price).toLocaleString()} Rwf
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/30">
                    <td colSpan={3} className="px-8 py-8 text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Estimated Quote</p>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <p className="text-2xl font-black text-primary">{calculateTotal().toLocaleString()} Rwf</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </SupplierLayout>
  );
};

export default ViewProforma;
