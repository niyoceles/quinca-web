import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Trash2, 
  AlertTriangle, 
  X, 
  Check,
  Package
} from 'lucide-react';
import { deleteItem } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

const DeleteItem = ({ itemId, itemName, itemPrice }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemSubmitted = useSelector(state => state.item.deletedItem);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsDeleting(false);
    // window.location.reload(); 
  };

  const handleSubmit = () => {
    setIsDeleting(true);
    if (itemId) {
      dispatch(deleteItem(itemId));
    }
  };

  if (itemSubmitted && open) {
    setTimeout(() => {
      handleClose();
    }, 1500);
  }

  return (
    <Fragment>
      <button 
        onClick={handleOpen}
        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        title="Delete Material"
      >
        <Trash2 size={16} />
      </button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        title="Confirm Deletion"
        maxWidth="sm"
      >
        {itemSubmitted ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 border border-rose-100">
              <Check size={32} />
            </div>
            <Typography variant="h4" className="mb-1 text-slate-800">Deleted Successfully</Typography>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory updated</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
              <div className="p-2 bg-white rounded-xl text-rose-500 shadow-sm">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-rose-900 leading-tight">Permanent Removal</p>
                <p className="text-xs font-medium text-rose-700 mt-1">This action cannot be undone. The material will be removed from the marketplace.</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                  <Package size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Material Name</p>
                  <p className="text-sm font-bold text-secondary mt-1">{itemName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                  <p className="font-black text-[10px] uppercase">RWF</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Listed Price</p>
                  <p className="text-sm font-bold text-secondary mt-1">{Number(itemPrice).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-2xl"
                onClick={handleClose}
                disabled={isDeleting}
              >
                Keep Material
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 rounded-2xl bg-rose-500 hover:bg-rose-600 border-none shadow-lg shadow-rose-200"
                onClick={handleSubmit}
                loading={isDeleting}
                icon={Trash2}
              >
                Delete Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default DeleteItem;
