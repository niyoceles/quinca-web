import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  Package, 
  Eye, 
  Clock,
  ExternalLink
} from 'lucide-react';
import Button from '../Ui/Button';

const RequestedProforma = ({ oneRequest }) => {
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  
  const {
    id,
    client: { names, email, phoneNumber },
    itemsArray,
    createdAt,
  } = oneRequest;

  const handleClickView = () => {
    navigate(`/proforma/${id}`);
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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Official Requester</p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Phone size={12} className="text-slate-300" />
            {phoneNumber}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
            <Mail size={12} className="text-slate-200" />
            {email}
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-right font-black text-secondary">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-sm">
            <Package size={14} className="text-primary/40" />
            {itemsArray.length}
          </div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.1em] mt-1">Materials</span>
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
        <Button 
          onClick={handleClickView}
          variant="outline"
          size="sm"
          className="rounded-xl font-black border-slate-100 hover:border-primary/20 hover:bg-white text-slate-400 hover:text-primary transition-all group/btn"
          icon={Eye}
        >
          Details
        </Button>
      </td>
    </tr>
  );
};

export default RequestedProforma;
