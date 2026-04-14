import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Tag, Info, ArrowLeft } from 'lucide-react';
import { getCategoryItems } from '../../redux/actions';
import ClientLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';

export default function CategoryItems() {
  const { category } = useParams();
  const categoryitems = useSelector(state => state.client.categoryItems.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryItems(category));
  }, [category, dispatch]);

  const CategoryHeader = () => (
    <div className="bg-secondary py-16 relative overflow-hidden mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <Container className="relative z-10">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Market
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Tag className="text-primary" size={24} />
                <Typography variant="h1" className="text-white capitalize">
                  {category.replace('-', ' ')} <span className="text-primary italic">Materials</span>
                </Typography>
              </div>
              <p className="text-slate-400 font-medium max-w-xl">
                Exploring high-quality components and tools curated specifically for the {category.replace('-', ' ')} industry.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-white text-xs font-bold">
              <ShoppingBag size={14} className="text-primary" />
              {categoryitems?.[0]?.items?.length || 0} Products available
            </div>
          </div>
        </div>
      </Container>
    </div>
  );

  return (
    <ClientLayout>
      <main className="bg-slate-50 min-h-screen pb-24">
        <CategoryHeader />
        
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {categoryitems && categoryitems.map(i =>
              i.items.map(card => (
                <Link key={card.id} to={`/view/${card.id}`} className="group">
                  <Card className="h-full border-none shadow-premium hover:shadow-2xl transition-all duration-300 rounded-[2rem] overflow-hidden bg-white flex flex-col">
                    {/* Image Area */}
                    <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                      <img 
                        src={card.itemImage} 
                        alt={card.itemName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{card.category}</p>
                        <Typography variant="h4" className="text-secondary line-clamp-1 group-hover:text-primary transition-colors">
                          {card.itemName}
                        </Typography>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Premium Price</p>
                          <p className="text-sm font-black text-secondary">RWF {card.itemPrice.toLocaleString()}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}

            {(!categoryitems || categoryitems[0]?.items?.length === 0) && (
              <div className="col-span-full py-32 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <ShoppingBag size={48} />
                </div>
                <div className="space-y-2">
                  <Typography variant="h3">Inventory Empty</Typography>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto">
                    We're currently restocking items for this category. Please check back later or explore other categories.
                  </p>
                </div>
                <Button variant="secondary" className="rounded-2xl" onClick={() => window.location.href = '/'}>
                  Browse Marketplace
                </Button>
              </div>
            )}
          </div>
        </Container>
      </main>
    </ClientLayout>
  );
}
