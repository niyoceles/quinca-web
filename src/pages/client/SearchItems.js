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

  const [isFocused, setIsFocused] = useState(false);
  const searchRef = React.useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center gap-0 w-full relative">
        <div className="flex-grow flex items-center bg-slate-50 border-2 border-primary/20 rounded-full hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm overflow-hidden h-12">
          <div className="pl-5 text-slate-400">
            <SearchIcon size={20} />
          </div>
          <input
            type="text"
            value={searchValue}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (e.target.value) {
                dispatch(searchItems({ search: e.target.value }));
                setSubmitted(true);
              } else {
                setSubmitted(false);
              }
            }}
            placeholder="What construction materials are you looking for today?"
            className="w-full bg-transparent border-none py-3 px-4 text-sm font-bold text-secondary focus:ring-0 placeholder:text-slate-400"
          />
          <button 
            type="submit"
            className="bg-primary text-white px-6 h-full font-black text-sm hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Dropdown */}
      {(isFocused || searchValue) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300 max-h-[70vh] flex flex-col">
          <div className="flex-grow overflow-y-auto p-6 bg-white">
            {!searchValue ? (
              <div className="space-y-8">
                {/* Trending Searches */}
                <div>
                  <h4 className="font-black text-secondary flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest">
                    <Flame size={14} className="text-primary" /> Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map(term => (
                      <button 
                        key={term}
                        onClick={() => {
                          setSearchValue(term);
                          dispatch(searchItems({ search: term }));
                          setSubmitted(true);
                        }}
                        className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {results && results !== 'No Item found' 
                      ? `Found ${results.length} Materials` 
                      : 'Search Results'
                    }
                  </p>
                </div>

                {submitted && !results ? (
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-4 animate-pulse">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl" />
                        <div className="flex-grow space-y-2 py-2">
                          <div className="h-4 bg-slate-100 rounded w-3/4" />
                          <div className="h-3 bg-slate-100 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : results && results === 'No Item found' ? (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary opacity-50">
                      <SearchIcon size={24} />
                    </div>
                    <h3 className="text-sm font-black text-secondary mb-2">No Materials Found</h3>
                    <p className="text-xs text-slate-500">
                      Try adjusting your keywords for "{searchValue}".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results && results.slice(0, 6).map(item => (
                      <ReactLink 
                        to={`/view/${item.id}`} 
                        key={item.id}
                        onClick={() => setIsFocused(false)}
                        className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-slate-100">
                          <img src={item.itemImage} alt={item.itemName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="py-1">
                          <p className="text-sm font-black text-secondary group-hover:text-primary transition-colors line-clamp-1">{item.itemName}</p>
                          <p className="text-xs font-bold text-slate-500 mt-1">RWF {item.itemPrice.toLocaleString()}</p>
                          <p className="text-[10px] font-black text-primary uppercase tracking-tighter mt-1">{item.category}</p>
                        </div>
                      </ReactLink>
                    ))}
                  </div>
                )}
                {results && results.length > 6 && (
                   <button className="w-full mt-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 hover:text-primary transition-colors">
                     View All Results
                   </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
