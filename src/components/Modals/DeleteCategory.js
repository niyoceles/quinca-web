import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { deleteCategory } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

const DeleteCategory = ({ itemId, itemName, itemPrice }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (itemId) {
      dispatch(deleteCategory(itemId));
      handleClose();
    }
  };

  return (
    <Fragment>
      <button 
        onClick={handleOpen}
        className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-95"
        title="Delete Category"
      >
        <Trash2 size={18} />
      </button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        title="Confirm Deletion"
        maxWidth="sm"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <div className="bg-rose-100 p-2 rounded-xl text-rose-500 flex-shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-rose-600 uppercase tracking-widest">Warning</p>
              <p className="text-sm font-bold text-rose-500/80">This action cannot be undone.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="body1" className="text-slate-500">
              Are you sure you want to remove this category from the system?
            </Typography>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</p>
              <p className="text-sm font-black text-secondary">{itemName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
            <Button 
              variant="ghost" 
              className="flex-1 rounded-xl py-3" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1 rounded-xl py-3 bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200" 
              onClick={handleSubmit}
              icon={Trash2}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteCategory;
