import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  Truck, 
  RotateCcw, 
  Award,
  Info
} from "lucide-react";

import { viewItem, relatedItems } from "../../redux/actions";
import ClientLayout from "../../layouts/ClientLayout";
import AddCart from "../../components/client/AddCart";
import RelatedItems from "../../components/client/RelatedItems";
import { Container, Grid, Divider } from "../../components/Ui/Layout";
import { Typography } from "../../components/Ui/Typography";
import { Card } from "../../components/Ui/Card";
import Button from "../../components/Ui/Button";

const ViewItem = () => {
  const { id } = useParams();
  const bookedItems = JSON.parse(localStorage.getItem("orderSummary"));
  const [snack, setSnack] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const itemDetails = useSelector((state) => state.supplier.supplier);
  const related = useSelector((state) => state.item.relatedItems);
  const dispatch = useDispatch();

  const [orderSummary, setOrderSummary] = useState(
    bookedItems !== null ? bookedItems : []
  );

  const handleToggleModal = (item) => {
    setSubmitted(false);
    setSelectedItem(item);
  };

  const handleAddItemCart = (e, item, itemNumber) => {
    const { id, itemName, itemPrice } = item;
    const orderItem = {
      id,
      itemName,
      itemPrice: itemPrice * 1,
      itemNumber: itemNumber * 1,
    };
    const ordered = orderSummary.findIndex((order) => order.id === id);
    let updatedOrder = [...orderSummary];

    if (ordered >= 0) {
      updatedOrder[ordered] = orderItem;
    } else updatedOrder = [...orderSummary, orderItem];

    setOrderSummary(updatedOrder);
    localStorage.setItem("orderSummary", JSON.stringify(updatedOrder));
    
    const totArray = updatedOrder.map(
      (order) => order.itemPrice * order.itemNumber
    );
    const total = totArray.reduce((x, y) => x + y, 0);

    localStorage.setItem("totalPrice", total);
    setSnack(true);
    setTimeout(() => setSnack(false), 3000);
  };

  useEffect(() => {
    if (id) {
      dispatch(viewItem(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (itemDetails.category) {
      dispatch(relatedItems(itemDetails.category));
    }
  }, [dispatch, itemDetails.category]);

  if (!itemDetails.id) {
    return (
      <ClientLayout>
        <Container className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <Typography variant="body1" className="text-slate-400 font-bold">Loading product details...</Typography>
          </div>
        </Container>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <main className="bg-slate-50 pb-20">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-slate-100 mb-8 py-4">
          <Container>
            <nav className="flex items-center gap-2 text-sm font-medium">
              <RouterLink to="/" className="text-slate-400 hover:text-primary transition-colors">Home</RouterLink>
              <ChevronRight size={14} className="text-slate-300" />
              <RouterLink to={`/category/${itemDetails.category}`} className="text-slate-400 hover:text-primary transition-colors">
                {itemDetails.category}
              </RouterLink>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-secondary font-bold line-clamp-1">{itemDetails.itemName}</span>
            </nav>
          </Container>
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-6 xl:col-span-7">
              <Card hover={false} className="p-4 bg-white border-none shadow-premium overflow-hidden rounded-[2rem]">
                <div className="aspect-square relative overflow-hidden rounded-2xl group">
                  <img 
                    src={itemDetails.itemImage} 
                    alt={itemDetails.itemName} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  />
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm text-primary">
                      <Star size={24} className="fill-primary" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Features */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 text-center">
                  <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                    <Truck size={24} />
                  </div>
                  <p className="text-xs font-black text-secondary">Fast Delivery</p>
                  <p className="text-[10px] text-slate-400 mt-1">Across Rwanda</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 text-center">
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <RotateCcw size={24} />
                  </div>
                  <p className="text-xs font-black text-secondary">7 Days return</p>
                  <p className="text-[10px] text-slate-400 mt-1">Conditions apply</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 text-center">
                  <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <p className="text-xs font-black text-secondary">Secure Pay</p>
                  <p className="text-[10px] text-slate-400 mt-1">100% Protected</p>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-premium border-none sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Official store
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-orange-500 ml-auto">
                    <Star size={16} className="fill-orange-500" /> 4.9 (124 Reviews)
                  </div>
                </div>

                <Typography variant="h2" className="mb-4 leading-tight">{itemDetails.itemName}</Typography>
                
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-50">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <Award className="text-secondary" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier</p>
                    <p className="text-sm font-bold text-secondary">{itemDetails.owner.organization}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Market Price</p>
                  <div className="flex items-baseline gap-2">
                    <Typography variant="h1" className="text-primary font-black">
                      RWF {itemDetails.itemPrice}
                    </Typography>
                    <span className="text-slate-400 line-through text-sm font-bold">RWF {(itemDetails.itemPrice * 1.5).toFixed(0)}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In stock - Ready to ship
                  </div>
                </div>

                <AddCart
                  addItemCart1={handleAddItemCart}
                  selected1={itemDetails}
                  checkSubmitted1={submitted}
                />

                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-4 text-secondary font-black">
                    <Info size={18} /> Description
                  </div>
                  <Typography variant="body1" className="text-slate-500 leading-relaxed">
                    {itemDetails.itemDescription}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <RelatedItems
        items={related ? related.relatedItems : null}
        addItemCart={handleAddItemCart}
        setDialog={false}
        openDialog={handleToggleModal}
        closeDialog={() => {}}
        selected={selectedItem}
        checkSubmitted={submitted}
      />

      {/* Cart Notification Snack (Custom Tailwind) */}
      {snack && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
          <div className="bg-secondary text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-black text-sm">Success!</p>
              <p className="text-xs text-slate-300 font-medium">Item added to your shopping cart.</p>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default ViewItem;
