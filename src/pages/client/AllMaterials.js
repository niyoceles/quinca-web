import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

import { getAllItems } from '../../redux/actions';
import ClientLayout from '../../layouts/ClientLayout';
import { Container } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { ProductCard } from '../../components/Ui/ProductCard';
import { ProductSkeleton } from '../../components/Ui/SkeletonLoader';
import Button from '../../components/Ui/Button';

export default function AllMaterials() {
  const dispatch = useDispatch();
  const allItems = useSelector(state => state.item.allItems);
  const items = Array.isArray(allItems) ? allItems : [];
  const hasLoaded = Array.isArray(allItems);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <ClientLayout>
      <main className="bg-slate-50 min-h-screen pb-24">
        <div className="bg-secondary py-16 mb-12">
          <Container>
            <div className="space-y-4">
              <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Market
              </Link>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <Typography variant="h1" className="text-white mb-2">
                    All Materials
                  </Typography>
                  <p className="text-slate-400 font-medium max-w-2xl">
                    Browse every available construction, plumbing, electrical, and finishing material from verified suppliers.
                  </p>
                  <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-white text-xs font-bold">
                  <ShoppingBag size={14} className="text-primary" />
                  {items.length} Products available
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container maxWidth="lg">
          {hasLoaded && items.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map(item => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          )}

          {!hasLoaded && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {hasLoaded && items.length === 0 && (
            <div className="py-32 text-center space-y-6">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ShoppingBag size={48} />
              </div>
              <div className="space-y-2">
                <Typography variant="h3">No Materials Available</Typography>
                <p className="text-slate-400 font-medium max-w-sm mx-auto">
                  Materials are currently being updated. Please check back later or browse categories.
                </p>
              </div>
              <Button as={Link} to="/categories" variant="secondary" className="rounded-2xl">
                Browse Categories
              </Button>
            </div>
          )}
        </Container>
      </main>
    </ClientLayout>
  );
}
