import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Save, X, AlertCircle } from 'lucide-react';
import { updateCategory, resetCategoryStatus, clearErrors } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import { Typography } from '../Ui/Typography';

const EditCategory = ({ name: initialName, itemId }) => {
  const [newName, setNewName] = useState(initialName || '');
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const itemSubmitted = useSelector(state => state.category.updateCategorySuccess);
  const uiError = useSelector(state => state.ui.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialName) setNewName(initialName);
  }, [initialName]);

  const handleOpen = () => {
    setNewName(initialName || '');
    dispatch(clearErrors());
    dispatch(resetCategoryStatus());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
    dispatch(clearErrors());
    dispatch(resetCategoryStatus());
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    
    if (newName.trim()) {
      const itemData = { name: newName };
      dispatch(updateCategory(itemId, itemData));
    }
  };

  return (
    <Fragment>
      <button 
        onClick={handleOpen}
        className="p-2 rounded-xl hover:bg-primary/5 text-slate-400 hover:text-primary transition-all active:scale-95"
        title="Edit Category"
      >
        <Edit2 size={18} />
      </button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        title="Update Category Details"
        maxWidth="sm"
      >
        <div className="space-y-6">
          {itemSubmitted && (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-widest">{itemSubmitted}</p>
            </div>
          )}

          {uiError && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 animate-in fade-in zoom-in-95 duration-300">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wide">{uiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Category Name"
              name="name"
              placeholder="e.g. Construction Materials"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              error={submitted && !newName.trim() ? "Category name is required" : null}
              icon={Edit2}
            />

            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
              <Button 
                variant="outline" 
                className="flex-1 rounded-2xl"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 rounded-2xl shadow-premium font-black"
                type="submit"
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default EditCategory;
