import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { 
  Calendar, 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Construction,
  Bookmark
} from 'lucide-react';
import { getBookings } from '../../redux/actions/clientActions';
import SingleBooking from './SingleBooking';
import ClientLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';

const Bookings = () => {
  const [open, setOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const myBookings = useSelector((state) => state.client.bookedItems);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.client.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const handleClickOpen = (bookingInfo) => {
    setBookingDetails(bookingInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <ClientLayout>
      <main className="min-h-screen bg-slate-50/50 pb-24 pt-10">
        <SingleBooking close={handleClose} open={open} details={bookingDetails} />
        
        <Container>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-primary p-4 rounded-[1.5rem] text-white shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Bookmark size={32} />
            </div>
            <div>
              <Typography variant="h2">My <span className="text-primary italic">Rentals</span></Typography>
              <p className="text-slate-400 font-medium">Manage your active material bookings and equipment rentals.</p>
            </div>
          </div>

          <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Equipment / Material</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Period</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-right">Cost</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {myBookings && myBookings.length > 0 ? (
                    myBookings.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((booking) => (
                      <tr 
                        key={booking.id} 
                        onClick={() => handleClickOpen(booking)}
                        className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                      >
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                               <Construction size={24} />
                             </div>
                             <div className="flex flex-col">
                               <span className="text-sm font-black text-secondary group-hover:text-primary transition-colors">
                                 {booking.items?.itemName || 'Material Item'}
                               </span>
                               <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight flex items-center gap-1">
                                 <CreditCard size={10} /> {booking.paymentType || 'Standard Payment'}
                               </span>
                             </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                              <span className="text-emerald-500">In:</span> {moment(booking.startDate).format('MMM DD, YYYY')}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                              <span className="text-accent">Out:</span> {moment(booking.endDate).format('MMM DD, YYYY')}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col gap-2">
                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit ${getStatusStyle(booking.status)}`}>
                              {booking.status || 'Pending'}
                            </span>
                            <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                              {booking.isPaid ? (
                                <CheckCircle2 size={12} className="text-emerald-500" />
                               ) : (
                                <Clock size={12} className="text-amber-500" />
                               )}
                               <span className="text-[9px] font-black uppercase text-slate-500">{booking.isPaid ? 'Payment Confirmed' : 'Payment Pending'}</span>
                            </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <p className="text-sm font-black text-secondary">RWF {booking.amount?.toLocaleString() || '0'}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <ChevronRight size={18} />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-32 text-center">
                        {loading ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Syncing Rentals...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-6 text-slate-300">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center">
                              <AlertCircle size={40} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-secondary font-black text-lg text-secondary">Your rental history is empty</p>
                              <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">Explore equipment and materials available for rental on the marketplace.</p>
                            </div>
                            <Button 
                              variant="primary" 
                              className="rounded-2xl"
                              onClick={() => window.location.href = '/'}
                            >
                              Browse Equipment
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {myBookings?.length > rowsPerPage && (
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, myBookings.length)} of {myBookings.length}
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
                     disabled={(page + 1) * rowsPerPage >= myBookings.length}
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

export default Bookings;
