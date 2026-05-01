import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  PackagePlus, 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { addItem } from '../../redux/actions';
import { Modal } from '../Ui/Modal';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import { Typography } from '../Ui/Typography';

const AddItem = () => {
    const [item, setItem] = useState({
        itemName: '',
        category: '',
        itemDescription: '',
        itemPrice: '',
    });
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const itemSubmitted = useSelector(state => state.item.addItemSuccess);
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        setItem(prev => ({ ...prev, [name]: value }));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setItem({ itemName: '', category: '', itemDescription: '', itemPrice: '' });
        setImageUrl('');
        setSubmitted(false);
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        
        // --- CLOUDINARY CONFIGURATION & LOGGING ---
        const cloudName = (process.env.REACT_APP_CLOUDINARY_NAME || 'dfsai53mw1').trim();
        const primaryPreset = (process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'QUINCAPARADI').trim();
        
        // Common fallback presets to try if the primary one fails
        const fallbacks = ['ml_default', 'quincaparadi', 'primary'];
        
        const performUpload = async (preset) => {
            let data = new FormData();
            data.append('file', file);
            data.append('upload_preset', preset);
            data.append('folder', 'QUINCAPARADI/ITEMS');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: 'POST', body: data }
            );
            const resData = await response.json();
            
            if (!response.ok) {
                return { success: false, data: resData };
            }
            return { success: true, data: resData };
        };

        try {
            // Attempt 1: Primary Preset
            let result = await performUpload(primaryPreset);
            
            // If primary fails with "not found", try fallbacks
            if (!result.success && result.data.error?.message?.includes('not found')) {
                for (const fallback of fallbacks) {
                    if (fallback === primaryPreset) continue;
                    result = await performUpload(fallback);
                    if (result.success) break;
                }
            }

            if (result.success) {
                setImageUrl(result.data.secure_url);
                localStorage.setItem('imageUrl', result.data.secure_url);
            } else {
                const errorMsg = result.data.error?.message || 'Upload failed';
                throw new Error(errorMsg);
            }
        } catch (err) {
            alert(`Cloudinary Error: ${err.message}`);
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
            dispatch(addItem(itemData));
        }
    };

    if (itemSubmitted && open) {
        setTimeout(() => {
            handleClose();
            localStorage.removeItem('imageUrl');
        }, 3000);
    }

    return (
        <Fragment>
            <Button 
                onClick={handleOpen}
                variant="primary"
                className="rounded-2xl font-black shadow-premium"
                icon={PackagePlus}
            >
                Add Material
            </Button>

            <Modal 
                open={open} 
                onClose={handleClose} 
                title="Register New Material"
                maxWidth="2xl"
            >
                {itemSubmitted ? (
                    <div className="py-12 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                            <Check size={40} />
                        </div>
                        <Typography variant="h3" className="mb-2">Material Registered!</Typography>
                        <p className="text-slate-500 font-medium">Inventory has been updated successfully.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <Input
                                    label="Material Name"
                                    name="itemName"
                                    placeholder="e.g. Premium Construction Cement"
                                    value={item.itemName}
                                    onChange={handleChange}
                                    error={submitted && !item.itemName ? "Material name is required" : null}
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
                                        <option value="">Select a category</option>
                                        <option value="construction">Construction</option>
                                        <option value="electrical">Electrical</option>
                                        <option value="plumbing">Plumbing</option>
                                        <option value="tools">Tools & Hardware</option>
                                    </select>
                                    {submitted && !item.category && <p className="text-[10px] font-bold text-rose-500 ml-1">Please select a category</p>}
                                </div>

                                <Input
                                    label="Price (RWF)"
                                    name="itemPrice"
                                    type="number"
                                    placeholder="0.00"
                                    value={item.itemPrice}
                                    onChange={handleChange}
                                    error={submitted && !item.itemPrice ? "Price is required" : null}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Visuals</label>
                                <div className={`relative border-2 border-dashed rounded-[2rem] h-[260px] flex flex-col items-center justify-center transition-all ${
                                    imageUrl ? 'border-primary/20 bg-slate-50' : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50/50'
                                }`}>
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="text-primary animate-spin" size={32} />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimizing Media...</p>
                                        </div>
                                    ) : imageUrl ? (
                                        <div className="w-full h-full p-4 group">
                                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                                            <button 
                                                type="button"
                                                onClick={() => setImageUrl('')}
                                                className="absolute top-6 right-6 p-2 bg-rose-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 p-8 text-center">
                                            <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300">
                                                <ImageIcon size={32} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-secondary">Drop product image here</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">PNG, JPG up to 10 MB</p>
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
                                {submitted && !imageUrl && (
                                    <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold ml-1 bg-rose-50 p-2 rounded-xl">
                                        <AlertCircle size={14} /> Material image is required
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <Input
                                label="Full Description"
                                name="itemDescription"
                                variant="textarea"
                                rows="4"
                                placeholder="Describe material specifications, dimensions, and unique features..."
                                value={item.itemDescription}
                                onChange={handleChange}
                                error={submitted && !item.itemDescription ? "Description is required" : null}
                            />

                            <div className="flex items-center justify-end gap-3 py-6 border-t border-slate-50 mt-8">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="rounded-2xl px-8"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="rounded-2xl px-12 font-black shadow-premium"
                                    loading={isUploading}
                                >
                                    Save Material
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Modal>
        </Fragment>
    );
};

export default AddItem;

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};