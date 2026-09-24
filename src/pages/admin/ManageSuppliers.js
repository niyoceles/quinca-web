import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import {
  Truck,
  Mail,
  MapPin,
  ShieldCheck,
  UserCheck,
  ShieldAlert,
  BadgeCheck,
  Clock,
  Search,
  Phone,
  Building2,
} from 'lucide-react';
import { getAllSuppliers, toggleSupplierStatus, verifySupplier } from '../../redux/actions';

const StatusBadge = ({ isVerified, status }) => {
  if (!isVerified) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider">
        <Clock size={10} />
        Pending Verification
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
      status
        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
        : 'bg-rose-50 border border-rose-200 text-rose-600'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      {status ? 'Active' : 'Suspended'}
    </span>
  );
};

const ManageSuppliers = () => {
  const dispatch = useDispatch();
  const { allSuppliers } = useSelector(state => state.supplier);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | pending | active | suspended
  const [confirmAction, setConfirmAction] = useState(null); // { type, supplier }

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  const suppliers = Array.isArray(allSuppliers) ? allSuppliers : [];

  const filtered = suppliers.filter(s => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (s.organization || '').toLowerCase().includes(q) ||
      (s.names || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && !s.isVerified) ||
      (filter === 'active' && s.isVerified && s.status) ||
      (filter === 'suspended' && s.isVerified && !s.status);

    return matchesSearch && matchesFilter;
  });

  const pendingCount = suppliers.filter(s => !s.isVerified).length;

  const handleConfirm = () => {
    if (!confirmAction) return;
    const { type, supplier } = confirmAction;
    if (type === 'verify') {
      dispatch(verifySupplier(supplier.id));
    } else if (type === 'toggle') {
      dispatch(toggleSupplierStatus(supplier.id));
    }
    setConfirmAction(null);
  };

  return (
    <SupplierLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Typography variant="h3">Suppliers Management</Typography>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Review and manage all registered hardware suppliers
            </p>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-2xl">
              <Clock size={14} className="text-amber-600" />
              <span className="text-xs font-black text-amber-700">
                {pendingCount} pending verification{pendingCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, company or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-100 bg-white text-sm font-medium text-secondary placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'active', 'suspended'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  filter === f
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-white border border-slate-100 text-slate-400 hover:text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <Card className="col-span-full border-none shadow-premium rounded-[2.5rem] bg-white p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
                <Truck size={32} />
              </div>
              <Typography variant="h4">No Suppliers Found</Typography>
              <p className="text-sm font-medium text-slate-400 mt-1">
                {search || filter !== 'all'
                  ? 'Try adjusting your search or filter.'
                  : 'There are currently no suppliers registered in the system.'}
              </p>
            </Card>
          ) : (
            filtered.map(supplier => (
              <Card
                key={supplier.id}
                className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 group hover:ring-2 hover:ring-primary/10 transition-all"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-primary/20 transition-colors">
                      {supplier.profile ? (
                        <img src={supplier.profile} alt={supplier.organization} className="w-full h-full object-cover" />
                      ) : (
                        <Truck size={24} className="text-slate-300" />
                      )}
                    </div>
                    <div>
                      <Typography variant="h4" className="text-secondary">
                        {supplier.organization || supplier.names}
                      </Typography>
                      <div className="mt-1">
                        <StatusBadge isVerified={supplier.isVerified} status={supplier.status} />
                      </div>
                    </div>
                  </div>
                  {supplier.isVerified && (
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-500" title="Verified Supplier">
                      <BadgeCheck size={18} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Mail size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Email</p>
                      <p className="text-xs font-bold text-secondary">{supplier.email}</p>
                    </div>
                  </div>

                  {supplier.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Phone size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Phone</p>
                        <p className="text-xs font-bold text-secondary">{supplier.phoneNumber}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Location</p>
                      <p className="text-xs font-bold text-secondary">{supplier.city || supplier.location || 'Not Specified'}</p>
                    </div>
                  </div>

                  {supplier.organization && supplier.names && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Contact Person</p>
                        <p className="text-xs font-bold text-secondary">{supplier.names}</p>
                      </div>
                    </div>
                  )}
                </div>

                {supplier.description && (
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 mb-6">
                    <p className="text-xs font-medium text-slate-500 line-clamp-2 italic leading-relaxed">
                      {supplier.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Verify Button — only show when not yet verified */}
                  {!supplier.isVerified && (
                    <button
                      onClick={() => setConfirmAction({ type: 'verify', supplier })}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-200"
                    >
                      <ShieldCheck size={14} />
                      Verify Account
                    </button>
                  )}

                  {/* Suspend / Activate — only after verified */}
                  {supplier.isVerified && (
                    <button
                      onClick={() => setConfirmAction({ type: 'toggle', supplier })}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        supplier.status
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {supplier.status ? (
                        <><ShieldAlert size={14} /> Suspend</>
                      ) : (
                        <><UserCheck size={14} /> Activate</>
                      )}
                    </button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
              confirmAction.type === 'verify'
                ? 'bg-emerald-50 text-emerald-600'
                : confirmAction.supplier.status
                ? 'bg-rose-50 text-rose-600'
                : 'bg-emerald-50 text-emerald-600'
            }`}>
              {confirmAction.type === 'verify' ? (
                <ShieldCheck size={26} />
              ) : confirmAction.supplier.status ? (
                <ShieldAlert size={26} />
              ) : (
                <UserCheck size={26} />
              )}
            </div>

            <Typography variant="h4" className="text-center text-secondary mb-2">
              {confirmAction.type === 'verify'
                ? 'Verify Supplier Account?'
                : confirmAction.supplier.status
                ? 'Suspend Supplier?'
                : 'Activate Supplier?'}
            </Typography>
            <p className="text-sm text-slate-400 text-center font-medium mb-6">
              {confirmAction.type === 'verify'
                ? `This will verify and activate the account for "${confirmAction.supplier.organization || confirmAction.supplier.names}" and send them a confirmation email.`
                : confirmAction.supplier.status
                ? `This will suspend "${confirmAction.supplier.organization || confirmAction.supplier.names}" and prevent them from accessing their account.`
                : `This will reactivate "${confirmAction.supplier.organization || confirmAction.supplier.names}".`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="flex-1 py-3 rounded-2xl border border-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all ${
                  confirmAction.type === 'verify' || !confirmAction.supplier.status
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-rose-500 hover:bg-rose-600'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </SupplierLayout>
  );
};

export default ManageSuppliers;