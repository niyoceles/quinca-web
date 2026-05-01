import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FileText, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ChevronRight,
  ShoppingCart,
  Send,
  Loader2
} from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getAllItems, requestProforma, resetRequestStatus } from '../../redux/actions';
import ProformaItems from '../../components/client/ProformaItems';
import PersonalInfoWidget from '../../components/SidebarWidget/PersonalInfoWidget';
import CartLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';
import Spinner from '../../components/Ui/Spinner/Spinner';

const SuccessView = ({ names, onReset }) => (
  <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-700">
    <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-6 shadow-xl shadow-emerald-500/10">
      <CheckCircle size={40} strokeWidth={2.5} />
    </div>
    <Typography variant="h2" className="text-center mb-3 text-secondary">Request <span className="text-primary italic">Sent!</span></Typography>
    <p className="text-slate-500 font-medium text-center max-w-md mx-auto mb-8 leading-relaxed text-sm">
      Thank you, <span className="text-secondary font-black">{names || 'valued customer'}</span>! Your request has been successfully dispatched. We'll get back to you within 24 hours.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
      <Button 
        variant="primary" 
        className="w-full rounded-2xl h-12 font-black shadow-lg shadow-primary/20"
        onClick={onReset}
      >
        Track My Requests
      </Button>
      <Button 
        variant="ghost" 
        className="w-full rounded-2xl h-12 font-bold text-slate-400"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </Button>
    </div>
  </div>
);

const RequestProforma = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let requestedItems = [];
  try {
    const stored = localStorage.getItem('proformaSummary');
    requestedItems = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing proformaSummary from localStorage', e);
  }
  
  const [selectedDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [checkInDate, setCheckInDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [checkOutDate, setCheckOutDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [snack, setSnack] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [proformaInfo, setProformaInfo] = useState({
    pickupDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    deadline: moment().format('YYYY-MM-DD HH:mm:ss'),
    names: '',
    email: '',
    phoneNumber: '',
    address: '',
    location: '',
  });

  const items = useSelector((state) => state.item.allItems);
  const requestSuccess = useSelector((state) => state.client.requestSuccess);
  
  const [proformaSummary, setProformaSummary] = useState(
    requestedItems !== null ? requestedItems : []
  );

  useEffect(() => {
    dispatch(getAllItems());
    return () => {
      dispatch(resetRequestStatus());
    };
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetRequestStatus());
    navigate('/account/client/proforma');
  };

  const handleAddItem = (e, item, itemNumber) => {
    const { id, itemName, itemPrice } = item;
    const requestItem = {
      id,
      itemName,
      itemPrice: itemPrice * 1,
      itemNumber,
    };
    if (itemNumber) {
      const requestedIndex = proformaSummary.findIndex((bk) => bk.id === id);
      let updatedProforma = [...proformaSummary];
      
      if (requestedIndex >= 0) {
        updatedProforma[requestedIndex] = requestItem;
      } else {
        updatedProforma = [...proformaSummary, requestItem];
      }
      
      setProformaSummary(updatedProforma);
      localStorage.setItem('proformaSummary', JSON.stringify(updatedProforma));
      setSnack(true);
      setTimeout(() => setSnack(false), 3000);
    }
  };

  const handleRemoveItem = (e, itemId) => {
    const updatedProforma = proformaSummary.filter((bk) => bk.id !== itemId);
    setProformaSummary(updatedProforma);
    localStorage.setItem('proformaSummary', JSON.stringify(updatedProforma));
  };

  const handleOnChange = (e) => {
    setProformaInfo({ ...proformaInfo, [e.target.name]: e.target.value });
  };

  const onDateChange = (name, dateValue) => {
    if (name === 'pickupDate') setCheckInDate(dateValue);
    else setCheckOutDate(dateValue);

    setProformaInfo({
      ...proformaInfo,
      [name]: moment(dateValue).format('YYYY-MM-DD HH:mm:ss')
    });
  };

  useEffect(() => {
    localStorage.setItem('proformaExtras', JSON.stringify(proformaInfo));
  }, [proformaInfo]);

  const handlePayLater = async () => {
    if (!proformaInfo.names || !proformaInfo.email || !proformaInfo.phoneNumber) {
      setSubmitted(true);
      return;
    }

    const requestInfo = {
      ...proformaInfo,
      itemsArray: proformaSummary,
    };
    
    setIsRequesting(true);
    try {
      await dispatch(requestProforma(requestInfo));
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCancelProforma = () => {
    localStorage.removeItem('proformaSummary');
    setProformaSummary([]);
  };

  const handleToggleModal = (item) => {
    setSubmitted(false);
    setSelectedItem(item);
  };

  if (!items || items.length === 0) return <Spinner />;

  return (
    <CartLayout>
      <main className="min-h-screen bg-slate-50 pb-8 pt-4">
        <Container>
          {requestSuccess ? (
            <SuccessView names={proformaInfo.names} onReset={handleReset} />
          ) : (
            <Fragment>
              {/* Loading Overlay */}
              {isRequesting && (
                <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-300">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-premium flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="font-black text-secondary text-sm uppercase tracking-widest">Processing Request</p>
                    <p className="text-slate-400 text-[10px] font-bold mt-2">Connecting to Hadiwa...</p>
                  </div>
                </div>
              )}

              {/* Page Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-[1.5rem] text-primary">
                    <FileText size={28} />
                  </div>
                  <div>
                    <Typography variant="h3">Request <span className="text-primary italic">Proforma</span></Typography>
                    <p className="text-slate-600 font-bold text-xs">Add materials and get a custom quote.</p>
                  </div>
                </div>
                {proformaSummary.length > 0 && (
                  <button 
                    onClick={handleCancelProforma}
                    className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-accent uppercase tracking-widest transition-colors"
                  >
                    <X size={14} /> Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Items Browser */}
                <div className="lg:col-span-8">
                  <ProformaItems
                    items={items}
                    addItem={handleAddItem}
                    openDialog={handleToggleModal}
                    closeDialog={() => setSubmitted(false)}
                    selected={selectedItem}
                    checkSubmitted={submitted}
                  />
                </div>

                {/* Right Column: Sidebar Summary */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                  <Card className="p-4 border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    
                    <h3 className="font-black text-secondary flex items-center gap-2 mb-3 text-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-[9px]">1</span>
                      Selected Materials
                    </h3>

                    <div className="space-y-3 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {proformaSummary.length > 0 ? (
                        proformaSummary.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all group">
                            <div className="flex-grow">
                              <p className="font-bold text-secondary text-xs group-hover:text-primary transition-colors line-clamp-1">{item.itemName}</p>
                              <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mt-1">
                                 RWF {item.itemPrice.toLocaleString()} <span className="mx-1 text-slate-500">|</span> <span className="text-primary">{item.itemNumber} Units</span>
                              </p>
                            </div>
                            <button 
                              onClick={(e) => handleRemoveItem(e, item.id)}
                              className="w-7 h-7 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-accent hover:shadow-md transition-all"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-300">
                            <ShoppingCart size={20} />
                          </div>
                          <p className="text-[10px] font-black text-slate-500">List is empty.</p>
                        </div>
                      )}
                    </div>

                    <Divider className="border-slate-50 mb-3" />
                    
                    <h3 className="font-black text-secondary flex items-center gap-2 mb-3 text-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-white text-[9px]">2</span>
                       Procurement Details
                    </h3>

                    <PersonalInfoWidget
                      selectedDate={selectedDate}
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                      onDateChange={onDateChange}
                      handleOnChange={handleOnChange}
                      onSubmitForm={handlePayLater}
                      checkValue={proformaInfo}
                      checkHelperText={proformaInfo}
                      checkSubmitted={submitted}
                      error={proformaInfo}
                    />

                    <div className="pt-6 space-y-3">
                      <Button
                        variant="primary"
                        className="w-full rounded-2xl h-12 font-black text-base shadow-premium"
                        onClick={handlePayLater}
                        disabled={proformaSummary.length === 0 || isRequesting}
                        icon={isRequesting ? Loader2 : Send}
                        iconClassName={isRequesting ? 'animate-spin' : ''}
                      >
                        {isRequesting ? 'Sending...' : 'Send Request'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-slate-500 font-black"
                        onClick={handleCancelProforma}
                        disabled={isRequesting}
                      >
                        Discard Selections
                      </Button>
                    </div>
                  </Card>

                  {/* Trust Tag */}
                  <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm transition-transform group-hover:scale-110">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Verified Quote</p>
                      <p className="text-[9px] text-emerald-600 font-medium">Expert review in 24h.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Container>
      </main>

      {/* Custom Toast Notification */}
      {snack && (
        <div className="fixed bottom-10 left-10 z-[100] animate-in slide-in-from-left-10 duration-500">
          <div className="bg-secondary text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="font-black text-xs tracking-tight text-white">Item Added!</p>
              <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Added to proforma</p>
            </div>
            <button 
              onClick={() => setSnack(false)}
              className="ml-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={12} className="text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </CartLayout>
  );
};

export default RequestProforma;
