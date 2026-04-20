import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
  Eye, 
  User, 
  Phone, 
  Mail, 
  Clock,
  Package,
  ChevronRight
} from 'lucide-react';
import Button from '../Ui/Button';

const RequestedOrder = ({ oneRequest }) => {
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  const {
    id,
    client: { names, email, phoneNumber },
    itemsArray = [],
    createdAt,
  } = oneRequest;

  const handleView = () => {
    navigate(`/order/${id}`);
  };

  return (
    <tr key={id} className="group hover:bg-slate-50/80 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
            <User size={20} />
          </div>
          <div>
            <p className="font-black text-secondary group-hover:text-primary transition-colors">{names}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Quinca Customer</p>
          </div>
        </div>
      </td>
      
      <td className="px-8 py-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Phone size={12} className="text-slate-300" /> {phoneNumber}
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Mail size={12} className="text-slate-300" /> {email}
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-secondary uppercase tracking-tight">
          <Package size={12} className="text-primary" /> {itemsArray.length} {itemsArray.length === 1 ? 'Item' : 'Items'}
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-xl font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary hover:text-white"
            onClick={handleView}
            icon={Eye}
          >
            Details
          </Button>
          <div className="p-2 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1 duration-500">
            <ChevronRight size={16} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RequestedOrder;
