import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Info, X } from 'lucide-react';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import Modal from '../Ui/Modal';
import { Card } from '../Ui/Card';

const ProformaItems = ({ items, addItem }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setQuantity(10);
    setSubmitted(false);
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (quantity >= 10) {
      addItem(e, selectedItem, quantity);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Typography variant="h3">Available Materials</Typography>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">
          <Info size={12} /> Minimum 10 units per request
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items && items.map((item) => (
          <Card 
            key={item.itemName} 
            className="p-6 md:p-8 border-none shadow-premium hover:shadow-2xl transition-all duration-300 overflow-hidden relative group"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Image Section */}
              <div className="w-full md:w-64 h-48 rounded-3xl overflow-hidden relative bg-slate-100 flex-shrink-0">
                <img 
                  src={item.itemImage} 
                  alt={item.itemName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Section */}
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Typography variant="h4" className="text-secondary tracking-tight">
                      {item.itemName}
                    </Typography>
                    <div className="text-[10px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md font-bold inline-block uppercase tracking-wider">
                      Reference: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-2xl font-black shadow-lg">
                      {item.itemPrice} <span className="text-[10px] opacity-70">RWF</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl italic">
                  {item.itemDescription}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Button
                    onClick={() => handleOpenModal(item)}
                    className="rounded-2xl px-8 py-3.5 shadow-premium font-black group-hover:-translate-y-1 transition-all"
                    icon={ShoppingCart}
                  >
                    Add to Inquiry
                  </Button>
                  <button className="p-3 text-slate-300 hover:text-primary transition-colors border border-slate-50 hover:bg-slate-50 rounded-xl">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modern Modal Implementation */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Specify Quantity"
        maxWidth="md"
      >
        <div className="p-2 space-y-8">
          {selectedItem && (
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
              <img src={selectedItem.itemImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-black text-secondary">{selectedItem.itemName}</p>
                <p className="text-[10px] font-bold text-slate-400">Inventory match available</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <Input
                label="Required Amount"
                type="number"
                min="10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                error={submitted && quantity < 10 ? 'Minimum 10 items required' : null}
                placeholder="10"
                icon={Plus}
                required
              />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                Total Estimated: <span className="text-primary">{selectedItem ? (selectedItem.itemPrice * quantity).toLocaleString() : 0} RWF</span>
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="secondary" 
                className="flex-1 rounded-2xl py-4"
                onClick={() => setOpen(false)}
              >
                Go Back
              </Button>
              <Button 
                type="submit" 
                className="flex-[2] rounded-2xl py-4 shadow-xl"
                icon={ShoppingCart}
              >
                Confirm Request
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProformaItems;
