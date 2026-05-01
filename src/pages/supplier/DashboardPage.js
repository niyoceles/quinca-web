import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  Box, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Zap
} from 'lucide-react';
import dayjs from 'dayjs';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import Button from '../../components/Ui/Button';
import { getAllOrders } from '../../redux/actions/orderActions';
import { getMyProfile } from '../../redux/actions/supplierActions';

const COLORS = ['#ff4400', '#1e293b', '#64748b', '#94a3b8'];

const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
  <Card hover className="p-4 border-none shadow-premium rounded-3xl group overflow-hidden relative bg-white">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors" />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-secondary leading-none">{value}</h3>
        {change && (
          <div className="flex items-center gap-1.5 mt-2">
            {trend === 'up' ? (
              <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={10} /> {change}
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                <ArrowDownRight size={10} /> {change}
              </span>
            )}
            <span className="text-[10px] font-bold text-slate-300 tracking-tight italic">vs last month</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-slate-50 rounded-2xl text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-500">
        <Icon size={20} />
      </div>
    </div>
  </Card>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  
  const allOrders = useSelector(state => state.order.allOrders || []);
  const profileState = useSelector(state => state.supplier.profile);
  
  // Safely extract items from profile response
  const myItems = useMemo(() => {
    return profileState?.items || [];
  }, [profileState]);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getMyProfile());
  }, [dispatch]);

  // Compute metrics from real data
  const { totalRevenue, activeOrdersCount } = useMemo(() => {
    let revenue = 0;
    let active = 0;
    
    // Safety check in case allOrders is not an array for some reason
    const ordersList = Array.isArray(allOrders) ? allOrders : [];

    ordersList.forEach(order => {
      if (order.isPaid) revenue += parseFloat(order.amount || 0);
      if (['active', 'pending', 'confirmed'].includes(order.status)) active++;
    });

    return { totalRevenue: revenue, activeOrdersCount: active };
  }, [allOrders]);

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `RWF ${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `RWF ${(amount / 1000).toFixed(1)}K`;
    return `RWF ${amount}`;
  };

  // Group orders by last 7 days for the Area Chart
  const salesData = useMemo(() => {
    const ordersList = Array.isArray(allOrders) ? allOrders : [];
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = dayjs().subtract(6 - i, 'day');
      return {
        date: d.format('YYYY-MM-DD'),
        name: d.format('ddd'),
        sales: 0,
        orders: 0
      };
    });

    ordersList.forEach(order => {
      const orderDate = dayjs(order.createdAt).format('YYYY-MM-DD');
      const dayData = days.find(d => d.date === orderDate);
      if (dayData) {
        dayData.orders += 1;
        if (order.isPaid) {
          dayData.sales += parseFloat(order.amount || 0);
        }
      }
    });

    return days;
  }, [allOrders]);

  // Group user items by category for the Bar Chart
  const categoryData = useMemo(() => {
    const grouped = myItems.reduce((acc, item) => {
      const cat = item.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4); // Top 4 categories
  }, [myItems]);

  return (
    <SupplierLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Activity size={18} />
            </div>
            <Typography variant="h2">Supplier Analytics</Typography>
          </div>
          <p className="text-slate-400 font-medium text-xs">Live metrics from your database</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl font-bold bg-white h-9 text-[11px]">Download CSV</Button>
          <Button size="sm" className="rounded-xl font-black shadow-premium h-9 text-[11px]" onClick={() => {
            dispatch(getAllOrders());
            dispatch(getMyProfile());
          }}>Sync Data</Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          change="+8.4%" 
          icon={DollarSign} 
          trend="up" 
        />
        <MetricCard 
          title="Active Orders" 
          value={activeOrdersCount} 
          icon={ShoppingBag} 
          trend="up" 
        />
        <MetricCard 
          title="Items Listed" 
          value={myItems.length} 
          icon={Box} 
          trend="up" 
        />
        <MetricCard 
          title="Total Inquiries" 
          value={Array.isArray(allOrders) ? allOrders.length : 0} 
          change="+12.1%" 
          icon={TrendingUp} 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-8">
          <Card hover={false} className="p-6 border-none shadow-premium rounded-[2rem] h-full bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-secondary uppercase tracking-widest text-[11px] flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                7-Day Revenue & Orders
              </h3>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4400" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff4400" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                    dy={16}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                    dx={-16}
                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
                  />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      backgroundColor: '#1e293b', color: '#fff', padding: '1rem'
                    }}
                    itemStyle={{color: '#fff', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase'}}
                    labelStyle={{color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginBottom: '4px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em'}}
                  />
                  <Area 
                    type="monotone" dataKey="sales" stroke="#ff4400" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)"
                    dot={{ r: 4, fill: '#ff4400', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 0, fill: '#ff4400' }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Order Distribution Chart */}
        <div className="lg:col-span-4">
          <Card hover={false} className="p-6 border-none shadow-premium rounded-[2rem] h-full bg-white">
            <h3 className="font-black text-secondary uppercase tracking-widest text-[11px] flex items-center gap-2 mb-6">
              <div className="w-1.5 h-6 bg-secondary rounded-full" />
              Category Inventory
            </h3>
            
            <div className="h-[200px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={16} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {categoryData.length === 0 ? (
                 <p className="text-xs text-center text-slate-400 font-bold">No items found</p>
              ) : categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-secondary">{item.value} Items</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </SupplierLayout>
  );
};

export default DashboardPage;
