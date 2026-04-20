import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PlusCircle, 
  CheckCircle, 
  Tag, 
  X,
  Loader2
} from 'lucide-react';
import { addCategory } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import { Typography } from '../Ui/Typography';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categorySubmitted = useSelector(
    state => state.category.addCategorySuccess
  );
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setSubmitted(false);
    setIsSubmitting(false);
    // window.location.reload(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (name) {
      setIsSubmitting(true);
      dispatch(addCategory({ name }));
    }
  };

  if (categorySubmitted && open) {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }

  return (
    <Fragment>
      <Button 
        onClick={handleOpen}
        variant="primary"
        className="rounded-2xl font-black shadow-premium"
        icon={PlusCircle}
      >
        Add Category
      </Button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        title="Add Material Category"
        maxWidth="md"
      >
        {categorySubmitted ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
              <CheckCircle size={40} />
            </div>
            <Typography variant="h3" className="mb-2">Category Created!</Typography>
            <p className="text-slate-500 font-medium">New material type has been added.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                  <Tag size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-secondary">Categorization</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Define new material groupings</p>
                </div>
              </div>

              <Input
                label="Category Name"
                placeholder="e.g. Electrical Tools, Masonry Materials..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={submitted && !name ? "Classification name is required" : null}
                className="bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
              <Button 
                type="button" 
                variant="ghost" 
                className="rounded-2xl px-8"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-2xl px-12 font-black shadow-premium"
                loading={isSubmitting}
              >
                Create Category
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </Fragment>
  );
};

export default AddCategory;
