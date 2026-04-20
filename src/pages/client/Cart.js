import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  ShoppingCart, 
  Trash2, 
  ShieldCheck, 
  Truck, 
  Zap, 
  ChevronRight,
  Info,
  Calendar,
  CreditCard,
  X
} from 'lucide-react';
import moment from 'moment';
import { createOrder } from '../../redux/actions';
import CartLayout from '../../layouts/CartLayout';
import PersonalInfoWidget from '../../components/SidebarWidget/PersonalInfoWidget';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';

const Cart = () => {
  const bookedItems = JSON.parse(localStorage.getItem('orderSummary'));
  let [totalPrice, setTotalPrice] = useState(
    (localStorage.getItem('totalPrice') || 0) * 1
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate] = useState(moment());
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment());

  const [open, setOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    needDate: selectedDate,
    deadline: selectedDate,
    names: '',
    email: '',
    phoneNumber: '',
    address: '',
    location: '',
  });

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const [orderSummary, setOrderSummary] = useState(
    bookedItems !== null ? bookedItems : []
  );

  const handleRemoveItem = (e, item) => {
    if (item) {
      const updatedOrder = orderSummary.filter((bk) => bk.id !== item.id);
      setOrderSummary(updatedOrder);
      if (updatedOrder.length === 0) {
        localStorage.removeItem('orderSummary');
        localStorage.removeItem('totalPrice');
        setTotalPrice(0);
      } else {
        localStorage.setItem('orderSummary', JSON.stringify(updatedOrder));
        const total = updatedOrder.reduce((acc, curr) => acc + (curr.itemPrice * curr.itemNumber), 0);
        localStorage.setItem('totalPrice', total);
        setTotalPrice(total);
      }
    }
  };

  const handleOnChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const onDateChange = (name, dateValue) => {
    if (name === 'needDate') setCheckInDate(moment(dateValue));
    else setCheckOutDate(moment(dateValue));

    setOrderInfo({ 
      ...orderInfo, 
      [name]: moment(dateValue).format('YYYY-MM-DD HH:mm:ss') 
    });
  };

  useEffect(() => {
    localStorage.setItem('orderExtras', JSON.stringify(orderInfo));
  }, [orderInfo]);

  const handlePayLater = async () => {
    if (!orderInfo.names || !orderInfo.email || !orderInfo.phoneNumber || !orderInfo.address) {
      setSubmitted(true);
      return;
    }

    const tempOrderInfo = JSON.parse(localStorage.getItem('orderSummary'));
    const tempOrderEtras = JSON.parse(localStorage.getItem('orderExtras'));
    const category = tempOrderInfo?.map((item) => item.category).toString();
    
    const bookInfo = {
      ...tempOrderEtras,
      itemsArray: tempOrderInfo,
      category,
    };
    
    setIsButtonDisabled(true);
    await dispatch(createOrder(bookInfo));
    setOpen(true);
    // Success handling would go here, e.g., redirect or confirmation view
  };

  const handleCancelOrder = () => {
    localStorage.removeItem('orderSummary');
    localStorage.removeItem('totalPrice');
    setOrderSummary([]);
    setTotalPrice(0);
  };

  return (
    <CartLayout>
      <Container>
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <ShoppingCart size={28} />
          </div>
          <div>
            <Typography variant="h2" className="leading-tight">Checkout</Typography>
            <p className="text-slate-400 font-medium">Finalize your proforma request</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items and Shipping */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Review Items */}
            <Card hover={false} className="p-8 border-none shadow-premium rounded-[2rem]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-secondary flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-[10px]">1</span>
                  Review your items
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {orderSummary.length} {orderSummary.length === 1 ? 'Item' : 'Items'} selected
                </span>
              </div>

              <div className="space-y-4">
                {orderSummary.length > 0 ? (
                  orderSummary.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 bg-slate-50/30 transition-all group">
                      <div className="flex-grow">
                        <p className="font-bold text-secondary group-hover:text-primary transition-colors">{item.itemName}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-xs font-medium text-slate-400">Qty: <span className="text-secondary font-black">{item.itemNumber}</span></p>
                          <p className="text-xs font-medium text-slate-400">Price: <span className="text-secondary font-black">RWF {item.itemPrice}</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-secondary">RWF {item.itemPrice * item.itemNumber}</p>
                        <button 
                          onClick={(e) => handleRemoveItem(e, item)}
                          className="mt-1 text-xs font-bold text-slate-400 hover:text-accent flex items-center gap-1 transition-colors ml-auto"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <ShoppingCart size={32} />
                    </div>
                    <Typography variant="h4" className="text-slate-400 mb-2">Your cart is empty</Typography>
                    <p className="text-slate-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
                    <Button variant="primary" className="rounded-full px-8" onClick={() => window.location.href = '/'}>
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* 2. Shipping Info */}
            {orderSummary.length > 0 && (
              <Card hover={false} className="p-8 border-none shadow-premium rounded-[2rem]">
                <h3 className="font-black text-secondary flex items-center gap-2 mb-8">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-[10px]">2</span>
                  Shipping & Delivery Info
                </h3>
                <PersonalInfoWidget
                  selectedDate={selectedDate}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onDateChange={onDateChange}
                  handleOnChange={handleOnChange}
                  onSubmitForm={handlePayLater}
                  checkValue={orderInfo}
                  checkHelperText={orderInfo}
                  checkSubmitted={submitted}
                  error={orderInfo}
                />
              </Card>
            )}
          </div>

          {/* Right Column: Summary */}
          {orderSummary.length > 0 && (
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <Card hover={false} className="p-8 border-none shadow-premium rounded-[2rem] bg-secondary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <h3 className="font-black text-sm uppercase tracking-widest opacity-60 mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60">Subtotal ({orderSummary.length} items)</span>
                    <span className="font-bold">RWF {totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60">Processing Fee</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60">Estimated Tax</span>
                    <span className="font-bold">RWF 0</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-black">RWF {totalPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full rounded-2xl bg-primary hover:bg-orange-600 border-none font-black shadow-2xl h-14"
                    onClick={handlePayLater}
                    disabled={isButtonDisabled}
                    icon={Zap}
                  >
                    Proceed to Proforma
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-2xl text-white/40 hover:text-white hover:bg-white/5 font-bold"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </Button>
                </div>

                {/* Trust Seals */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center justify-center opacity-40">
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                    <ShieldCheck size={14} /> Secure
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                    <Truck size={14} /> Trusted
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                    <CreditCard size={14} /> Verified
                  </div>
                </div>
              </Card>

              {/* Promo Banner */}
              <div className="bg-gradient-to-br from-primary/10 to-orange-500/10 p-6 rounded-3xl border border-primary/10">
                <div className="flex gap-4">
                  <div className="bg-white p-2 rounded-xl h-fit shadow-sm text-primary">
                    <Info size={18} />
                  </div>
                  <div>
                    <p className="font-black text-secondary text-sm">Need Help?</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Our support team is available 24/7 to help you with your order.
                    </p>
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest mt-3 flex items-center gap-1 hover:underline">
                      Contact Support <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Confirmation Modal (Future improvement: move to separate component) */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm animate-in fade-in" />
          <div className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-premium animate-in zoom-in-95 text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <Typography variant="h2" className="mb-4">Order Received!</Typography>
            <p className="text-slate-500 mb-8">
              Your proforma request has been successfully submitted. Our team will review it and contact you shortly.
            </p>
            <Button 
              className="w-full rounded-2xl font-black h-14"
              onClick={() => window.location.href = '/'}
            >
              Back to Marketplace
            </Button>
          </div>
        </div>
      )}
    </CartLayout>
  );
};

export default Cart;
