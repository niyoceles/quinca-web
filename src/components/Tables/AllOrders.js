import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Filter,
  Download,
  Search,
  ArrowUpDown
} from 'lucide-react';
import { getAllOrders } from '../../redux/actions';
import { Card } from '../Ui/Card';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import RequestedOrder from './RequestedOrder';

const AllOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const orders = useSelector(state => state.order.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const orderList = Array.isArray(orders) ? orders : [];
  const totalPages = Math.ceil(orderList.length / rowsPerPage);
  
  const paginatedOrders = orderList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3">Requested Orders</Typography>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Total {orderList.length} orders found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Filter}>Filter</Button>
          <Button variant="outline" size="sm" icon={Download}>Export</Button>
        </div>
      </div>

      <Card hover={false} className="border-none shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Items</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Created</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orderList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                      <Search size={24} />
                    </div>
                    <p className="font-bold text-slate-400">No orders found.</p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((item) => (
                  <RequestedOrder key={item.id} oneRequest={item} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination */}
        <div className="px-8 py-6 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rows per page:</span>
            <select 
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(0);
              }}
              className="bg-white border border-slate-200 rounded-xl text-xs font-black px-4 py-2 focus:ring-2 focus:ring-primary/10 focus:border-primary/20 transition-all outline-none"
            >
              {[5, 10, 25, 50].map(val => <option key={val} value={val}>{val}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 tracking-tight mr-4">
              Page <span className="text-secondary">{page + 1}</span> of <span className="text-secondary">{totalPages || 1}</span>
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(0)}
                disabled={page === 0}
                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronsLeft size={16} />
              </button>
              <button 
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => setPage(totalPages - 1)}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllOrders;
