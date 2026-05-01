import React from 'react';
import { Card } from './Ui/Card';
import { Typography } from './Ui/Typography';
import Button from './Ui/Button';
import { Calendar, User, MapPin, CreditCard, DollarSign, ChevronRight } from 'lucide-react';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h3">Recent Activity</Typography>
        <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right">
          View Detailed Reports
        </Button>
      </div>

      <Card hover={false} className="border-none shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Transaction Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Shipment Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Payment</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <Calendar size={14} className="text-slate-500" />
                      {row.date}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-sm font-black text-secondary">
                      <User size={14} className="text-primary/40" />
                      {row.name}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <MapPin size={14} className="text-slate-500" />
                      {row.shipTo}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-xs font-black text-slate-500">
                      <CreditCard size={14} className="text-slate-400" />
                      {row.paymentMethod}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit ml-auto">
                      <DollarSign size={14} />
                      {row.amount.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}