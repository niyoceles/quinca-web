import React, {
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import SupplierLayout from '../../layouts/SupplierLayout';
import {
    Card
} from '../../components/Ui/Card';
import {
    Typography
} from '../../components/Ui/Typography';
import {
    Truck,
    Mail,
    Globe,
    MapPin,
    ShieldCheck,
    UserCheck,
    ShieldAlert
} from 'lucide-react';
import {
    getAllSuppliers,
    toggleSupplierStatus
} from '../../redux/actions';

const ManageSuppliers = () => {
    const dispatch = useDispatch();
    const {
        allSuppliers
    } = useSelector(state => state.supplier);

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, [dispatch]);

    const handleToggleStatus = (id) => {
        dispatch(toggleSupplierStatus(id));
    };

    const suppliers = Array.isArray(allSuppliers) ? allSuppliers : [];

    return ( <
        SupplierLayout >
        <
        div className = "space-y-6" >
        <
        div >
        <
        Typography variant = "h3" > Suppliers Management < /Typography> <
        p className = "text-xs font-bold text-slate-400 uppercase tracking-widest mt-1" >
        Review and manage all registered hardware suppliers <
        /p> < /
        div >

        <
        div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" > {
            suppliers.length === 0 ? ( <
                Card className = "col-span-full border-none shadow-premium rounded-[2.5rem] bg-white p-20 flex flex-col items-center justify-center text-center" >
                <
                div className = "w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200" >
                <
                Truck size = {
                    32
                }
                /> < /
                div > <
                Typography variant = "h4" > No Suppliers Found < /Typography> <
                p className = "text-sm font-medium text-slate-400" > There are currently no suppliers registered in the system. < /p> < /
                Card >
            ) : (
                suppliers.map((supplier) => ( <
                    Card key = {
                        supplier.id
                    }
                    className = "border-none shadow-premium rounded-[2.5rem] bg-white p-8 group hover:ring-2 hover:ring-primary/5 transition-all" >
                    <
                    div className = "flex items-start justify-between mb-6" >
                    <
                    div className = "flex items-center gap-4" >
                    <
                    div className = "w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-primary/20 transition-colors" > {
                        supplier.profile ? ( <
                            img src = {
                                supplier.profile
                            }
                            alt = {
                                supplier.organization
                            }
                            className = "w-full h-full object-cover" / >
                        ) : ( <
                            Truck size = {
                                24
                            }
                            className = "text-slate-300" / >
                        )
                    } <
                    /div> <
                    div >
                    <
                    Typography variant = "h4"
                    className = "text-secondary" > {
                        supplier.organization || supplier.names
                    } < /Typography> <
                    div className = "flex items-center gap-1.5 mt-0.5" >
                    <
                    div className = {
                        `w-1.5 h-1.5 rounded-full ${supplier.status ? 'bg-emerald-500' : 'bg-rose-500'}`
                    }
                    /> <
                    span className = {
                        `text-[10px] font-black uppercase tracking-tight ${supplier.status ? 'text-emerald-600' : 'text-rose-600'}`
                    } > {
                        supplier.status ? 'Verified' : 'Suspended'
                    } <
                    /span> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "p-2 rounded-xl bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" >
                    <
                    UserCheck size = {
                        18
                    }
                    /> < /
                    div > <
                    /div>

                    <
                    div className = "space-y-3 mb-8" >
                    <
                    div className = "flex items-center gap-3" >
                    <
                    div className = "w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400" >
                    <
                    Mail size = {
                        14
                    }
                    /> < /
                    div > <
                    div >
                    <
                    p className = "text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1" > Email Address < /p> <
                    p className = "text-xs font-bold text-secondary" > {
                        supplier.email
                    } < /p> < /
                    div > <
                    /div> <
                    div className = "flex items-center gap-3" >
                    <
                    div className = "w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400" >
                    <
                    MapPin size = {
                        14
                    }
                    /> < /
                    div > <
                    div >
                    <
                    p className = "text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1" > Company Location < /p> <
                    p className = "text-xs font-bold text-secondary" > {
                        supplier.location || 'Not Specified'
                    } < /p> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "p-6 rounded-3xl bg-slate-50/50 border border-slate-50" >
                    <
                    p className = "text-xs font-medium text-slate-500 line-clamp-2 italic leading-relaxed" >
                    "{supplier.description || 'No company description provided yet.'}" <
                    /p> < /
                    div >

                    <
                    div className = "mt-8 flex items-center gap-3" >
                    <
                    button onClick = {
                        () => handleToggleStatus(supplier.id)
                    }
                    className = {
                        `flex-grow py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                                        supplier.status 
                                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                    }`
                    } > {
                        supplier.status ? 'Suspend Account' : 'Activate Supplier'
                    } <
                    /button> <
                    button className = "px-6 py-4 rounded-2xl bg-secondary text-white font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all" >
                    Details <
                    /button> < /
                    div > <
                    /Card>
                ))
            )
        } <
        /div> < /
        div > <
        /SupplierLayout>
    );
};

export default ManageSuppliers;