import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  Pencil, 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Loader2,
  Save
} from 'lucide-react';
import { updateItem } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import { Typography } from '../Ui/Typography';

const {
  REACT_APP_CLOUDINARY_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} = process.env;

const EditItem = ({ 
  itemId, 
  itemName: initialName, 
  category: initialCategory, 
  itemDescription: initialDescription, 
  itemPrice: initialPrice, 
  itemImage: initialImage 
}) => {
  const [item, setItem] = useState({
    itemName: initialName,
    category: initialCategory,
    itemDescription: initialDescription,
    itemPrice: initialPrice,
  });
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImage);
  
  const itemSubmitted = useSelector(state => state.item.updateItemSuccess);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    let data = new FormData();
    data.append('file', file);
    data.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append('folder', 'QUINCAPARADI/ITEMS');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/image/upload`,
        { method: 'POST', body: data }
      );
      const resData = await response.json();
      setImageUrl(resData.secure_url);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (item.itemName && item.itemDescription && item.itemPrice && imageUrl) {
      const itemData = {
        ...item,
        itemImage: imageUrl,
        status: true,
      };
      dispatch(updateItem(itemId, itemData));
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
        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
        title="Edit Material"
      >
        <Pencil size={16} />
      </button>

      <Modal 
        open={open} 
        onClose={handleClose} 
        title="Edit Material Details"
        maxWidth="2xl"
      >
        {itemSubmitted ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
              <Check size={40} />
            </div>
            <Typography variant="h3" className="mb-2">Updates Saved!</Typography>
            <p className="text-slate-500 font-medium">Material information has been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Input
                  label="Material Name"
                  name="itemName"
                  value={item.itemName}
                  onChange={handleChange}
                  error={submitted && !item.itemName ? "Name is required" : null}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select
                    name="category"
                    value={item.category}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-2xl py-4 px-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 transition-all outline-none ${
                        submitted && !item.category ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 hover:border-slate-200 focus:border-primary/20'
                    }`}
                  >
                    <option value="construction">Construction</option>
                    <option value="electricity">Electricity</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="tools">Tools & Hardware</option>
                  </select>
                </div>

                <Input
                  label="Price (RWF)"
                  name="itemPrice"
                  type="number"
                  value={item.itemPrice}
                  onChange={handleChange}
                  error={submitted && !item.itemPrice ? "Price is required" : null}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Update Preview</label>
                <div className={`relative border-2 border-dashed rounded-[2rem] h-[260px] flex flex-col items-center justify-center transition-all ${
                  imageUrl ? 'border-primary/20 bg-slate-50' : 'border-slate-200 hover:border-primary/40'
                }`}>
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="text-primary animate-spin" size={32} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Replacing Media...</p>
                    </div>
                  ) : imageUrl ? (
                    <div className="w-full h-full p-4 group">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform group-hover:scale-[1.02]" />
                      <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-[2rem] m-4">
                        <div className="flex flex-col items-center gap-2 text-white">
                          <Upload size={24} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Change Image</span>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={uploadFile}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300">
                        <ImageIcon size={32} />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={uploadFile}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <Input
                label="Full Description"
                name="itemDescription"
                variant="textarea"
                rows="4"
                value={item.itemDescription}
                onChange={handleChange}
                error={submitted && !item.itemDescription ? "Description is required" : null}
              />

              <div className="flex items-center justify-end gap-3 py-6 border-t border-slate-50 mt-8">
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="rounded-2xl px-8"
                    onClick={handleClose}
                >
                    Discard
                </Button>
                <Button 
                    type="submit" 
                    className="rounded-2xl px-12 font-black shadow-premium"
                    loading={isUploading}
                    icon={Save}
                >
                    Update Material
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </Fragment>
  );
};

export default EditItem;

EditItem.propTypes = {
	updateItem: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};
