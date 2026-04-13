import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { 
  Box, 
  Image as ImageIcon,
  Clock,
  ExternalLink,
  Tag
} from 'lucide-react';
import DeleteItem from '../Modals/DeleteItem';
import EditItem from '../Modals/EditItem';

const Items = ({ item }) => {
  dayjs.extend(relativeTime);
  const {
    id,
    itemName,
    itemImage,
    itemImage2,
    category,
    itemDescription,
    status,
    itemPrice,
    createdAt,
  } = item;

  return (
    <tr key={id} className="group hover:bg-slate-50/80 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
            <Box size={20} />
          </div>
          <div>
            <p className="font-black text-secondary group-hover:text-primary transition-colors">{itemName}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">ID: {id ? id.substring(0, 8) : 'N/A'}...</p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 group-hover:border-primary/20 transition-all shadow-sm">
          {itemImage ? (
            <img 
              src={itemImage} 
              alt={itemName} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-200">
              <ImageIcon size={16} />
            </div>
          )}
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tight">
          <Tag size={10} className="text-secondary" /> {category}
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="font-black text-secondary">
          {itemPrice ? (
            <span className="flex items-center justify-end gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">RWF</span>
              {Number(itemPrice).toLocaleString()}
            </span>
          ) : (
            <span className="text-xs italic text-slate-400 font-medium">Negotiable</span>
          )}
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="flex flex-col items-end">
          <p className="text-xs font-bold text-slate-600">{dayjs(createdAt).format('MMM DD')}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-1">
            <Clock size={10} /> {dayjs(createdAt).fromNow()}
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <EditItem
            itemId={id}
            itemName={itemName}
            category={category}
            itemPrice={itemPrice}
            itemImage={itemImage}
            itemImage2={itemImage2}
            itemDescription={itemDescription}
            status={status}
          />
          <DeleteItem 
            itemId={id} 
            itemName={itemName} 
            itemPrice={itemPrice} 
          />
          <button 
            className="p-2 text-slate-300 hover:text-primary transition-all hover:bg-primary/5 rounded-xl"
            title="Open Public Link"
            onClick={() => window.open(`/view/${id}`, '_blank')}
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Items;
