import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { 
  ChevronRight, 
  Flame, 
  Zap, 
  TrendingUp, 
  Star,
  ShoppingBag,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { getHomeItems } from '../../redux/actions';
import { HomeSlide } from '../../components/client';
import ClientLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography, SectionTitle } from '../../components/Ui/Typography';
import { Card, CardMedia, CardContent } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';
import { ProductCard } from '../../components/Ui/ProductCard';
import { ProductSkeleton, CategorySkeleton } from '../../components/Ui/SkeletonLoader';

import itemImage from '../../assets/images/home/construction.jpeg';
import materials from '../../assets/images/home/material.jpeg';

const CategoryItem = ({ name, url }) => (
  <ReactLink 
    to={url} 
    className="group flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all duration-200"
  >
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
      <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
        {name}
      </span>
    </div>
    <ChevronRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
  </ReactLink>
);

export default function LandingPage() {
  const categories = [
    { name: 'All Categories', url: '/categories' },
    { name: 'Construction Materials', url: '/category/construction' },
    { name: 'Plumbing Materials', url: '/category/plumbing' },
    { name: 'Electricity Materials', url: '/category/electricity' },
    { name: 'Interior Design', url: '/category/interior' },
    { name: 'Painting & Deco', url: '/category/painting' },
    { name: 'Solar Energy', url: '/category/solar' },
  ];

  const constructionItems = useSelector(state => state.client.homeItems.construction);
  const plumbingItems = useSelector(state => state.client.homeItems.plumbing);
  const electricityItems = useSelector(state => state.client.homeItems.electricity);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeItems());
  }, [dispatch]);

  return (
    <ClientLayout>
      {/* Hero & Content Section */}
      <section className="bg-slate-50 pt-4 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: Categories - Sticky */}
            <div className="hidden md:block md:col-span-3 lg:col-span-2 sticky top-24 z-30">
              <Card hover={false} className="p-2 border-none shadow-premium-sm bg-white overflow-hidden">
                <div className="p-3 border-b border-slate-50 mb-2">
                  <h3 className="font-black text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" /> Categories
                  </h3>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <CategoryItem key={cat.name} {...cat} />
                  ))}
                </div>
                <div className="p-3 mt-4">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-xs font-bold text-orange-600 mb-2">Welcome Offer</p>
                    <p className="text-[10px] text-orange-800">Get 20% off on your first proforma request today!</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Area (Slide + Featured Sections) */}
            <div className="col-span-1 md:col-span-9 lg:col-span-10">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* Middle: Slider */}
                <div className="lg:col-span-7">
                  <HomeSlide />
                  
                  {/* Quick Perks Bar */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 border border-slate-50">
                      <Zap className="text-orange-500 fill-orange-500/20" size={24} />
                      <div>
                        <p className="text-xs font-black text-secondary">Flash Deals</p>
                        <p className="text-[10px] text-slate-400">Ends in 04:22:10</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 border border-slate-50">
                      <Flame className="text-accent fill-accent/20" size={24} />
                      <div>
                        <p className="text-xs font-black text-secondary">Hot Materials</p>
                        <p className="text-[10px] text-slate-400">Low stock alert</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 border border-slate-50">
                      <Star className="text-yellow-500 fill-yellow-500/20" size={24} />
                      <div>
                        <p className="text-xs font-black text-secondary">Best Choice</p>
                        <p className="text-[10px] text-slate-400">Top rated items</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 border border-slate-50">
                      <ShieldCheck className="text-emerald-500 fill-emerald-500/20" size={24} />
                      <div>
                        <p className="text-xs font-black text-secondary">Verified Shop</p>
                        <p className="text-[10px] text-slate-400">RCA Certified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Featured Banners */}
                <div className="hidden lg:block lg:col-span-3 space-y-4">
                  <div className="relative group overflow-hidden rounded-2xl h-[142px] shadow-sm">
                    <img src={itemImage} alt="Construction" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <p className="text-primary text-xs font-black uppercase mb-1">Big Sale</p>
                      <h4 className="text-white font-black text-lg mb-2">Construction Essentials</h4>
                      <ReactLink to="/category/construction" className="text-white/80 text-xs font-bold flex items-center gap-1 hover:text-white transition-colors">
                        Explore Now <ArrowRight size={14} />
                      </ReactLink>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl h-[142px] shadow-sm">
                    <img src={materials} alt="Plumbing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <p className="text-emerald-400 text-xs font-black uppercase mb-1">New Arrival</p>
                      <h4 className="text-white font-black text-lg mb-2">Modern Plumbing Kit</h4>
                      <ReactLink to="/category/plumbing" className="text-white/80 text-xs font-bold flex items-center gap-1 hover:text-white transition-colors">
                        Explore Now <ArrowRight size={14} />
                      </ReactLink>
                    </div>
                  </div>
                </div>
              </div>

              {/* Most Featured Materials - Now Under Slider */}
              <div className="mt-8">
                <SectionTitle 
                  title="Most Featured Materials" 
                  subtitle="Direct from the best regional suppliers at unbeatable factory prices."
                  className="mb-6"
                />
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {constructionItems ? (
                    constructionItems.map(card => (
                      <ProductCard key={card.id} {...card} />
                    ))
                  ) : (
                    Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
                  )}
                </div>
                
                <div className="mt-6 flex justify-start">
                  <Button variant="outline" className="px-8 py-2 rounded-full font-black text-xs">
                    View All Materials
                  </Button>
                </div>
              </div>

              {/* Featured Professional Tools - Now Under Slider */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <SectionTitle 
                  title="Featured Professional Tools" 
                  subtitle="Equip your team with industrial-grade tools designed for durability."
                  className="mb-6"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {plumbingItems ? (
                    plumbingItems.map(card => (
                      <ProductCard key={card.id} {...card} />
                    ))
                  ) : (
                    Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
                  )}
                </div>
              </div>

              {/* More For You - Now Under Slider */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-xl font-black text-secondary uppercase tracking-tight">More For You</h2>
                    <p className="text-slate-500 text-xs mt-1">Personalized recommendations based on your recent activity.</p>
                  </div>
                  <ReactLink to="/categories" className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
                    View more <ArrowRight size={18} />
                  </ReactLink>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {electricityItems ? (
                    electricityItems.map(card => (
                      <ProductCard key={card.id} {...card} />
                    ))
                  ) : (
                    Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </ClientLayout>
  );
}
