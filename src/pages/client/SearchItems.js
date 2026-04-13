import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search as SearchIcon, 
  X, 
  Flame, 
  History, 
  TrendingUp, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link as ReactLink } from 'react-router-dom';
import { searchItems } from '../../redux/actions';
import { Container, Grid } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { ProductCard } from '../../components/Ui/ProductCard';
import { ProductSkeleton } from '../../components/Ui/SkeletonLoader';
import Button from '../../components/Ui/Button';
import Input from '../../components/Ui/Input';

export default function SearchItems(props) {
  const [submitted, setSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const results = useSelector(state => state.client.searchResults);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (searchValue) {
      dispatch(searchItems({ search: searchValue }));
    }
  };

  const trendingSearches = [
    'Cement', 'Steel Bars', 'Pipes', 'Solar Panels', 'Paint', 'Safety Boots'
  ];

  // Lock body scroll when search is open
  useEffect(() => {
    if (props.openSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [props.openSearch]);

  if (!props.openSearch) {
    return (
      <button 
        onClick={props.handleOpenSearch}
        className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm"
      >
        <SearchIcon size={18} />
        <span>Search</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-bottom duration-500 flex flex-col">
      {/* Header / Search Bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 md:py-8 sticky top-0 z-10">
        <Container>
          <div className="flex items-center gap-6">
            <button 
              onClick={props.closeSearch}
              className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-secondary hover:bg-slate-100 transition-all"
            >
              <X size={24} />
            </button>
            
            <form onSubmit={handleSearch} className="flex-grow flex items-center gap-3 relative">
              <div className="absolute left-6 text-slate-400">
                <SearchIcon size={24} />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="What construction materials are you looking for today?"
                className="w-full bg-slate-50 border-none rounded-[2rem] py-5 px-16 text-lg font-bold text-secondary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-300 shadow-inner"
                autoFocus
              />
              <Button 
                type="submit" 
                className="hidden md:flex absolute right-4 rounded-full px-10 h-10 font-black shadow-premium"
                onClick={handleSearch}
              >
                Search
              </Button>
            </form>
          </div>
        </Container>
      </div>

      <div className="flex-grow overflow-y-auto bg-slate-50/50">
        <Container className="py-12">
          {!submitted && !searchValue ? (
            <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              {/* Trending Searches */}
              <div>
                <h4 className="font-black text-secondary flex items-center gap-2 mb-6 text-xs uppercase tracking-widest">
                  <Flame size={18} className="text-primary" /> Trending Searches
                </h4>
                <div className="flex flex-wrap gap-3">
                  {trendingSearches.map(term => (
                    <button 
                      key={term}
                      onClick={() => {
                        setSearchValue(term);
                        dispatch(searchItems({ search: term }));
                        setSubmitted(true);
                      }}
                      className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent History (Placeholder UI) */}
              <div>
                <h4 className="font-black text-secondary flex items-center gap-2 mb-6 text-xs uppercase tracking-widest">
                  <History size={18} className="text-slate-400" /> Recent History
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-slate-400 italic">No search history found.</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-10">
                <Typography variant="h3">
                  {results && results !== 'No Item found' 
                    ? `Found ${results.length} Materials` 
                    : 'Search Results'
                  }
                </Typography>
                {results && results !== 'No Item found' && (
                  <p className="text-sm font-bold text-slate-400">Results for "{searchValue}"</p>
                )}
              </div>

              {submitted && !results ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {Array(10).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
                </div>
              ) : results && results === 'No Item found' ? (
                <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <SearchIcon size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-secondary mb-4">No Materials Found</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
                    We couldn't find any items matching "{searchValue}". Try adjusting your keywords.
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-12"
                    onClick={() => {
                      setSubmitted(false);
                      setSearchValue('');
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in fade-in duration-700">
                  {results && results.map(card => (
                    <ProductCard 
                      key={card.id} 
                      {...card} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </div>

      {/* Quick Footer for Search */}
      <div className="bg-white border-t border-slate-100 p-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
            <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <ShieldCheck size={16} /> Verified regional construction material suppliers
            </p>
            <div className="flex items-center gap-6">
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Privacy Policy</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Help Center</button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
