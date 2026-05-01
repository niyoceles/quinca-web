import React, { useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import Button from '../Ui/Button';
import Input from '../Ui/Input';

const AddCart = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState('10'); // Default as in original

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (quantity) {
      props.addItemCart1(e, props.selected1, quantity);
    }
  };

  const handleBuyNow = (e) => {
    // Buy Now logic (usually add to cart + redirect)
    props.addItemCart1(e, props.selected1, quantity);
    // The link wrapper in parent or here will handle redirect
  };

  return (
    <div className="mt-8 select-none">
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="w-32">
            <Input
              label="Quantity"
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              error={submitted && !quantity ? 'Required' : null}
              className="mb-0"
              min="1"
            />
          </div>
          
          <div className="flex-grow flex gap-3">
            <Button
              type="submit"
              variant="outline"
              size="md"
              className="flex-1 font-black rounded-xl border-primary text-primary hover:bg-primary/5 shadow-sm h-11"
              icon={ShoppingCart}
            >
              Add to Cart
            </Button>
            
            <Button
              type="button"
              variant="primary"
              size="md"
              className="flex-1 font-black rounded-xl shadow-premium bg-gradient-to-r from-primary to-orange-600 border-none h-11"
              onClick={handleBuyNow}
              icon={Zap}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </form>
      
      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap gap-4 items-center border-t border-slate-50 pt-4">
        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Secure Transaction
        </div>
        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Buyer Protection
        </div>
        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Verified Shop
        </div>
      </div>
    </div>
  );
};

export default AddCart;
