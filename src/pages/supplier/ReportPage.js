import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import { BarChart3, TrendingUp, DollarSign, Calendar, Package } from 'lucide-react';
import { getAllOrders } from '../../redux/actions/orderActions';
import dayjs from 'dayjs';

const ReportPage = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.order.allOrders || []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { paidRevenue, unpaidAmount, orderCount } = useMemo(() => {
    let paid = 0, unpaid = 0;
    const ordersList = Array.isArray(allOrders) ? allOrders : [];
    
    ordersList.forEach(order => {
      const amt = parseFloat(order.amount || 0);
      if (order.isPaid) paid += amt;
      else unpaid += amt;
    });

    return { paidRevenue: paid, unpaidAmount: unpaid, orderCount: ordersList.length };
  }, [allOrders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(amount);
  };

  const statusColors = {
    active: 'bg-blue-50 text-blue-600',
    pending: 'bg-amber-50 text-amber-600',
    confirmed: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-rose-50 text-rose-600'
  };

  return (
    <SupplierLayout>
      <div className="space-y-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <BarChart3 size={18} />
            </div>
            <Typography variant="h2">Financial Reports</Typography>
          </div>
          <p className="text-slate-400 font-medium">Analyze your business growth and sales metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover={false} className="p-6 border-none shadow-premium rounded-[2rem] bg-gradient-to-br from-primary to-[#ff6600] text-white">
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Total Confirmed Revenue</p>
            <h3 className="text-3xl font-black mb-4">{formatCurrency(paidRevenue)}</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full w-max text-xs font-bold">
              <TrendingUp size={14} /> +15.3% this month
            </div>
          </Card>
          
          <Card hover={false} className="p-6 border-none shadow-premium rounded-[2rem] bg-white">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending / Unpaid Orders</p>
            <h3 className="text-3xl font-black text-secondary mb-4">{formatCurrency(unpaidAmount)}</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full w-max text-xs font-bold">
              <DollarSign size={14} /> Outstanding Balances
            </div>
          </Card>

          <Card hover={false} className="p-6 border-none shadow-premium rounded-[2rem] bg-secondary text-white">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Order Volume</p>
            <h3 className="text-3xl font-black mb-4">{orderCount} <span className="text-xl text-slate-500 font-medium">Orders</span></h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full w-max text-xs font-bold">
              <Package size={14} /> Across all statuses
            </div>
          </Card>
        </div>
        
        <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8">
          <h3 className="font-black text-secondary uppercase tracking-widest text-[11px] flex items-center gap-2 mb-8">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            Recent Transaction History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  <th className="pb-4 pr-6">Order ID</th>
                  <th className="pb-4 px-6">Date</th>
                  <th className="pb-4 px-6">Client Email</th>
                  <th className="pb-4 px-6 text-right">Amount</th>
                  <th className="pb-4 pl-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(allOrders) ? allOrders : []).slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-6">
                      <span className="text-xs font-bold font-mono text-slate-500">{order.id.split('-')[0]}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                        <Calendar size={14} className="text-slate-300" />
                        {dayjs(order.createdAt).format('MMM DD, YYYY')}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-secondary">{order.clientEmail}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm font-black text-secondary">
                        {new Intl.NumberFormat('en-RW').format(parseFloat(order.amount || 0))} 
                        <span className="text-xs text-slate-400 ml-1">RWF</span>
                      </span>
                    </td>
                    <td className="py-4 pl-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[order.status] || 'bg-slate-100 text-slate-500'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!allOrders || allOrders.length === 0) && (
              <div className="py-12 text-center text-slate-400 font-bold text-sm">
                No orders discovered in database
              </div>
            )}
          </div>
        </Card>
      </div>
    </SupplierLayout>
  );
};

export default ReportPage;
