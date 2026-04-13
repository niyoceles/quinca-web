import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { 
  FileText, 
  ChevronRight, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Filter
} from 'lucide-react';
import { getMyProforma } from '../../redux/actions/clientActions';
import ClientLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';

const MyProforma = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  
  const myprofroma = useSelector((state) => state.client.proformaItems);
  const loading = useSelector((state) => state.auth.loading); // Use general loading or client-specific
  const error = useSelector((state) => state.client.error);

  useEffect(() => {
    dispatch(getMyProforma());
  }, [dispatch]);

  const handleRowClick = (id) => {
    history.push(`/my-proforma/${id}`);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <ClientLayout>
      <main className="min-h-screen bg-slate-50/50 pb-24 pt-10">
        <Container>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-4 rounded-[1.5rem] text-white shadow-lg">
                <FileText size={32} />
              </div>
              <div>
                <Typography variant="h2">My <span className="text-primary italic">Inquiries</span></Typography>
                <p className="text-slate-400 font-medium">Track and manage your material proforma requests.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="bg-white border border-slate-100 rounded-xl" icon={Filter}>Filter</Button>
              <Button onClick={() => history.push('/request-proforma')} icon={ArrowRight}>New Request</Button>
            </div>
          </div>

          <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Inquiry ID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Needed From</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Deadline</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Payment</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {myprofroma && myprofroma.length > 0 ? (
                    myprofroma.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((proforma) => (
                      <tr 
                        key={proforma.id} 
                        onClick={() => handleRowClick(proforma.id)}
                        className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                      >
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                             <span className="text-sm font-black text-secondary group-hover:text-primary transition-colors">#{proforma.id.slice(-8).toUpperCase()}</span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{proforma.paymentType || 'Standard'}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                            <Calendar size={14} className="text-slate-300" />
                            {moment(proforma.pickupDate).format('MMM DD, YYYY')}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                            <Clock size={14} className="text-slate-300" />
                            {moment(proforma.deadline).format('MMM DD, YYYY')}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(proforma.status)}`}>
                            {proforma.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                             {proforma.isPaid ? (
                               <CheckCircle2 size={16} className="text-emerald-500" />
                             ) : (
                               <CreditCard size={16} className="text-slate-300" />
                             )}
                             <span className={`text-[10px] font-black uppercase ${proforma.isPaid ? 'text-emerald-600' : 'text-slate-400'}`}>
                               {proforma.isPaid ? 'Paid' : 'Unpaid'}
                             </span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-32 text-center">
                        {loading ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Inquiries...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4 text-slate-300">
                            <AlertCircle size={48} />
                            <div className="space-y-1">
                              <p className="text-secondary font-black">No inquiries found</p>
                              <p className="text-sm text-slate-400 font-medium">You haven't requested any proforma yet.</p>
                            </div>
                            <Button 
                              variant="secondary" 
                              className="mt-4 rounded-2xl"
                              onClick={() => history.push('/request-proforma')}
                            >
                              Create New Request
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder (Custom Tailwind) */}
            {myprofroma?.length > rowsPerPage && (
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, myprofroma.length)} of {myprofroma.length}
                </p>
                <div className="flex gap-2">
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     className="bg-white border border-slate-100 rounded-xl disabled:opacity-50"
                     disabled={page === 0}
                     onClick={() => setPage(p => p - 1)}
                   >
                     Previous
                   </Button>
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     className="bg-white border border-slate-100 rounded-xl disabled:opacity-50"
                     disabled={(page + 1) * rowsPerPage >= myprofroma.length}
                     onClick={() => setPage(p => p + 1)}
                   >
                     Next
                   </Button>
                </div>
              </div>
            )}
          </Card>
        </Container>
      </main>
    </ClientLayout>
  );
};

export default MyProforma;
