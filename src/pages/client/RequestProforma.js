import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FileText, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ChevronRight,
  ShoppingCart,
  Send
} from 'lucide-react';
import moment from 'moment';
import { getAllItems, requestProforma } from '../../redux/actions';
import ProformaItems from '../../components/client/ProformaItems';
import PersonalInfoWidget from '../../components/SidebarWidget/PersonalInfoWidget';
import CartLayout from '../../layouts/ClientLayout';
import { Container, Grid, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import Button from '../../components/Ui/Button';
import Spinner from '../../components/Ui/Spinner/Spinner';

const RequestProforma = () => {
  const requestedItems = JSON.parse(localStorage.getItem('proformaSummary'));
  const [selectedDate] = useState(moment());
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment());
  const [snack, setSnack] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [proformaInfo, setProformaInfo] = useState({
    pickupDate: selectedDate,
    deadline: selectedDate,
    names: '',
    email: '',
    phoneNumber: '',
    address: '',
    location: '',
  });

  const items = useSelector((state) => state.item.allItems);
  const dispatch = useDispatch();
  const [proformaSummary, setProformaSummary] = useState(
    requestedItems !== null ? requestedItems : []
  );

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

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
    await dispatch(requestProforma(requestInfo));
    // Success redirect or additional UI feedback would happen here
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
      <main className="min-h-screen bg-slate-50 pb-24 pt-10">
        <Container>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-[1.5rem] text-primary">
                <FileText size={32} />
              </div>
              <div>
                <Typography variant="h2">Request <span className="text-primary italic">Proforma</span></Typography>
                <p className="text-slate-400 font-medium">Add materials to your list and get a custom quote.</p>
              </div>
            </div>
            {proformaSummary.length > 0 && (
              <button 
                onClick={handleCancelProforma}
                className="hidden md:flex items-center gap-2 text-xs font-black text-slate-400 hover:text-accent uppercase tracking-widest transition-colors"
              >
                <X size={14} /> Clear List
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
              <Card className="p-8 border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <h3 className="font-black text-secondary flex items-center gap-2 mb-8">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-[10px]">1</span>
                  Selected Materials
                </h3>

                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {proformaSummary.length > 0 ? (
                    proformaSummary.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all group">
                        <div className="flex-grow">
                          <p className="font-bold text-secondary text-sm group-hover:text-primary transition-colors line-clamp-1">{item.itemName}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                             RWF {item.itemPrice.toLocaleString()} <span className="mx-1 text-slate-300">|</span> <span className="text-primary">{item.itemNumber} Units</span>
                          </p>
                        </div>
                        <button 
                          onClick={(e) => handleRemoveItem(e, item.id)}
                          className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-300 hover:text-accent hover:shadow-md transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                        <ShoppingCart size={24} />
                      </div>
                      <p className="text-xs font-bold text-slate-400">Your list is currently empty.</p>
                    </div>
                  )}
                </div>

                <Divider className="border-slate-50 mb-8" />
                
                <h3 className="font-black text-secondary flex items-center gap-2 mb-8">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-[10px]">2</span>
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

                <div className="pt-10 space-y-4">
                  <Button
                    variant="primary"
                    className="w-full rounded-2xl h-14 font-black text-lg shadow-premium"
                    onClick={handlePayLater}
                    disabled={proformaSummary.length === 0}
                    icon={Send}
                  >
                    Send Request
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-slate-400 font-bold"
                    onClick={handleCancelProforma}
                  >
                    Discard Selections
                  </Button>
                </div>
              </Card>

              {/* Trust Tag */}
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm transition-transform group-hover:scale-110">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">Verified Quote</p>
                  <p className="text-[10px] text-emerald-600 font-medium">Review by experts within 24h.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* Custom Toast Notification */}
      {snack && (
        <div className="fixed bottom-10 left-10 z-[100] animate-in slide-in-from-left-10 duration-500">
          <div className="bg-secondary text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="font-black text-sm tracking-tight text-white">Item Added!</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Added to proforma summary</p>
            </div>
            <button 
              onClick={() => setSnack(false)}
              className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={14} className="text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </CartLayout>
  );
};

export default RequestProforma;
