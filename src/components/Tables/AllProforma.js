import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  FileText,
  Filter,
  Download
} from 'lucide-react';
import { getAllProforma } from '../../redux/actions';
import { Card } from '../Ui/Card';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import Requested from './RequestedProforma';

const AllProforma = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const proformas = useSelector(state => state.proforma.allProforma);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProforma());
  }, [dispatch]);

  const proformaList = useMemo(() => (Array.isArray(proformas) ? proformas : []), [proformas]);
  const statusOptions = useMemo(() => {
    const knownStatuses = ['pending', 'confirmed', 'cancelled', 'active', 'approved'];
    const dataStatuses = proformaList
      .map((proforma) => proforma.status || 'pending')
      .filter(Boolean)
      .map((status) => status.toLowerCase());

    return Array.from(new Set([...knownStatuses, ...dataStatuses]));
  }, [proformaList]);

  const filteredProformas = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return proformaList.filter((proforma) => {
      const client = proforma.client || {};
      const currentStatus = (proforma.status || 'pending').toLowerCase();
      const searchableText = [
        proforma.id,
        client.names,
        client.email,
        client.phoneNumber,
        currentStatus
      ].filter(Boolean).join(' ').toLowerCase();

      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [proformaList, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredProformas.length / rowsPerPage);
  
  const paginatedProformas = filteredProformas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (page > 0 && page >= totalPages) {
      setPage(Math.max(totalPages - 1, 0));
    }
  }, [page, totalPages]);

  const getProformaTotal = (proforma) => {
    return (proforma.itemsArray || []).reduce((total, item) => {
      const quantity = Number(item.itemNumber || item.quantity || 0);
      const price = Number(item.itemPrice || item.expectedPrice || item.price || 0);
      return total + (quantity * price);
    }, 0);
  };

  const escapeCsvValue = (value) => {
    const stringValue = String(value ?? '');
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const handleExport = () => {
    if (filteredProformas.length === 0) return;

    const headers = [
      'Proforma ID',
      'Requester',
      'Email',
      'Phone',
      'Items',
      'Estimated Total Rwf',
      'Status',
      'Received At'
    ];

    const rows = filteredProformas.map((proforma) => {
      const client = proforma.client || {};
      return [
        proforma.id,
        client.names,
        client.email,
        client.phoneNumber,
        (proforma.itemsArray || []).length,
        getProformaTotal(proforma),
        proforma.status || 'pending',
        proforma.createdAt ? new Date(proforma.createdAt).toLocaleString() : ''
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proforma-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3">Proforma Requests</Typography>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Total {filteredProformas.length} inquiries received
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={Filter}
            onClick={() => setShowFilters((current) => !current)}
          >
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={Download}
            onClick={handleExport}
            disabled={filteredProformas.length === 0}
          >
            Export
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card hover={false} className="border-none shadow-premium rounded-[2rem] bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-4 md:items-end">
            <label className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Requests</span>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setPage(0);
                  }}
                  placeholder="Requester, email, phone, status, or ID"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-bold text-secondary outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(0);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-secondary outline-none transition-all focus:border-primary/30 focus:bg-white focus:ring-2 focus:ring-primary/10"
              >
                <option value="all">All Requests</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status.toLowerCase()}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <Button 
              variant="ghost" 
              size="sm" 
              className="h-11 rounded-2xl px-5 font-black uppercase tracking-widest"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </div>
        </Card>
      )}

      <Card hover={false} className="border-none shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Requester</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Items</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Received</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProformas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                      <FileText size={24} />
                    </div>
                    <p className="font-bold text-slate-400">No proforma requests found.</p>
                  </td>
                </tr>
              ) : (
                paginatedProformas.map((item) => (
                  <Requested key={item.id} oneRequest={item} />
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
              className="bg-white border border-slate-200 rounded-xl text-xs font-black px-4 py-2 focus:ring-2 focus:ring-primary/10 transition-all outline-none"
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

export default AllProforma;
