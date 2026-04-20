import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import { Users, Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
import { getCustomers } from '../../redux/actions';

const CustomersPage = () => {
    const dispatch = useDispatch();
    const { customers } = useSelector(state => state.supplier);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const customerList = Array.isArray(customers) ? customers : [];

    return (
        <SupplierLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant="h3">Customers Management</Typography>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {user?.userType === 'admin' ? 'Viewing all system clients' : 'Your customer relationships'}
                        </p>
                    </div>
                </div>
                
                <Card hover={false} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Info</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Details</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Orders</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {customerList.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                                <Users size={32} />
                                            </div>
                                            <p className="font-bold text-slate-400">No customers found.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    customerList.map((customer) => (
                                        <tr key={customer.email} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-sm">
                                                        {customer.names?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm text-secondary">{customer.names}</p>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${customer.status ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                                                {customer.status ? 'Active Account' : 'Inactive'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors cursor-pointer">
                                                        <Mail size={12} className="text-slate-300" />
                                                        <span className="text-xs font-bold">{customer.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <Phone size={12} className="text-slate-300" />
                                                        <span className="text-xs font-bold">{customer.phoneNumber}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-secondary">{customer.address || 'No Address'}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{customer.location}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-secondary border border-slate-100">
                                                    <ShoppingBag size={12} className="text-slate-300" />
                                                    <span className="text-xs font-black">{customer.client?.length || 0}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </SupplierLayout>
    );
};

export default CustomersPage;
