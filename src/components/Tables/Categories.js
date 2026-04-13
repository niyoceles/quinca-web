import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
  Hash, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const Categories = ({ category }) => {
  dayjs.extend(relativeTime);
  const { id, name, status, createdAt } = category;

  return (
    <tr key={id} className="group hover:bg-slate-50/80 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
            <Hash size={20} />
          </div>
          <div>
            <p className="font-black text-secondary group-hover:text-primary transition-colors capitalize">{name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Classification Type</p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight transition-all duration-300 ${
          status 
            ? 'bg-emerald-50 text-emerald-600' 
            : 'bg-slate-100 text-slate-400 opacity-60'
        }`}>
          {status ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {status ? 'Active' : 'Hidden'}
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="flex flex-col items-end">
          <p className="text-xs font-bold text-slate-600">{dayjs(createdAt).format('MMM DD, YYYY')}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-1">
            <Clock size={10} /> {dayjs(createdAt).fromNow()}
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-slate-300 hover:text-primary transition-all hover:bg-primary/5 rounded-xl">
            <MoreVertical size={16} />
          </button>
          <div className="p-2 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1 duration-500">
            <ChevronRight size={16} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Categories;
