import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Modal } from '../Ui/Modal';
import Input from '../Ui/Input';
import Button from '../Ui/Button';

export default function DialogQuantity(props) {
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState('10'); // Default as in original

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (quantity) {
      props.addcart(e, props.selected, quantity);
    }
  };

  return (
    <Modal 
      open={props.open} 
      onClose={props.close} 
      title="Add to Shopping Cart"
      maxWidth="sm"
    >
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-2xl mb-6">
          <div className="flex gap-4 items-center">
            {props.selected?.itemImage && (
              <img 
                src={props.selected.itemImage} 
                alt={props.selected.itemName} 
                className="w-20 h-20 object-cover rounded-xl shadow-sm"
              />
            )}
            <div>
              <p className="font-black text-secondary line-clamp-2">{props.selected?.itemName}</p>
              <p className="text-primary font-bold text-lg mt-1">RWF {props.selected?.itemPrice}</p>
            </div>
          </div>
        </div>

        <Input
          label="Purchase Quantity"
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={submitted && !quantity ? 'Please specify quantity' : null}
          autoFocus
          required
          min="1"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={props.close}
            className="flex-1 font-bold text-slate-400"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={ShoppingCart}
            className="flex-[2] font-black rounded-xl shadow-premium"
          >
            Confirm Add
          </Button>
        </div>
      </form>
    </Modal>
  );
}
