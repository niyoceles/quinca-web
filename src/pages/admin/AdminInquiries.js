import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Mail, 
  MessageSquare, 
  User, 
  Calendar, 
  CheckCircle, 
  Trash2, 
  Eye, 
  Filter,
  Search,
  ArrowRight,
  Inbox
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import { Container, Divider } from '../../components/Ui/Layout';
import Button from '../../components/Ui/Button';
import Spinner from '../../components/Ui/Spinner/Spinner';
import { getInquiries, markInquiryRead } from '../../redux/actions/contactAction';

dayjs.extend(relativeTime);

const AdminInquiries = () => {
  const dispatch = useDispatch();
  const { inquiries, inquiryLoading } = useSelector(state => state.contact);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getInquiries());
  }, [dispatch]);

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      dispatch(markInquiryRead(msg.id));
    }
  };

  const filteredInquiries = inquiries.filter(msg => {
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'unread' ? !msg.isRead : 
      msg.isRead;
    
    const matchesSearch = 
      msg.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = inquiries.filter(m => !m.isRead).length;

  return (
    <SupplierLayout>
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 text-primary rounded-[1.5rem] shadow-sm">
            <Inbox size={32} />
          </div>
          <div>
            <Typography variant="h2">Public <span className="text-primary italic">Inquiries</span></Typography>
            <p className="text-slate-400 font-medium">Manage messages from the contact form.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-50">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'all' ? 'bg-secondary text-white shadow-md' : 'text-slate-400 hover:text-secondary'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${filter === 'unread' ? 'bg-secondary text-white shadow-md' : 'text-slate-400 hover:text-secondary'}`}
            >
              Unread {unreadCount > 0 && <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
            </button>
            <button 
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filter === 'read' ? 'bg-secondary text-white shadow-md' : 'text-slate-400 hover:text-secondary'}`}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List */}
        <div className="lg:col-span-12 space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or subject..."
              className="w-full bg-white border-none shadow-sm rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {inquiryLoading ? (
            <div className="py-20 flex justify-center">
              <Spinner />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <Card className="p-20 text-center border-none shadow-premium bg-white rounded-[3rem]">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mx-auto mb-6">
                <Mail size={40} />
              </div>
              <h3 className="font-black text-secondary text-lg mb-2">No messages found</h3>
              <p className="text-slate-400 text-sm font-medium">When users contact Hadiwa, their messages will appear here.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  className={`w-full group text-left p-6 bg-white rounded-[2rem] border-2 transition-all flex items-center gap-6 ${
                    !msg.isRead ? 'border-primary/20 shadow-lg shadow-primary/5 ring-1 ring-primary/5' : 'border-transparent shadow-sm hover:border-slate-100'
                  } ${selectedMessage?.id === msg.id ? 'border-secondary scale-[1.01]' : ''}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${!msg.isRead ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400'}`}>
                    <User size={24} />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-black text-secondary text-sm truncate">{msg.names}</p>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter shrink-0">{dayjs(msg.createdAt).fromNow()}</p>
                    </div>
                    <p className={`text-xs font-black mb-1 truncate ${!msg.isRead ? 'text-primary' : 'text-slate-500'}`}>{msg.subject}</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate italic line-clamp-1 opacity-70">"{msg.message}"</p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Modal Overlay */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" onClick={() => setSelectedMessage(null)} />
          
          <Card className="relative w-full max-w-xl bg-white border-none shadow-2xl rounded-[3rem] overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-500">
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Mail size={28} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Public Inquiry</p>
                      <h3 className="font-black text-secondary text-xl">Message Preview</h3>
                   </div>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><User size={10} className="text-primary"/> From</p>
                      <p className="text-xs font-black text-secondary">{selectedMessage.names}</p>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar size={10} className="text-primary"/> Date</p>
                      <p className="text-xs font-black text-secondary">{dayjs(selectedMessage.createdAt).format('MMM DD, YYYY')}</p>
                   </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50 group">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Mail size={10} className="text-primary"/> Contact Email</p>
                   <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-100 shadow-sm transition-all group-hover:border-primary/30">
                      <p className="text-xs font-bold text-secondary">{selectedMessage.email}</p>
                      <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline" onClick={() => window.open(`mailto:${selectedMessage.email}`)}>Quick Reply</button>
                   </div>
                </div>

                <div className="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-5">
                      <MessageSquare size={80} />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Message Context</p>
                   <p className="text-secondary font-bold text-sm leading-relaxed relative z-10">
                      <span className="text-primary text-lg font-black mr-2">Subject:</span> 
                      {selectedMessage.subject}
                   </p>
                   <Divider className="my-6 border-slate-50" />
                   <p className="text-slate-500 font-medium text-sm leading-relaxed whitespace-pre-wrap relative z-10">
                      {selectedMessage.message}
                   </p>
                </div>
              </div>

              <div className="pt-4">
                 <Button 
                    variant="secondary" 
                    fullWidth 
                    className="rounded-2xl h-16 font-black text-md shadow-premium bg-secondary hover:bg-secondary-dark"
                    onClick={() => setSelectedMessage(null)}
                  >
                  Close Inquiry
                 </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </SupplierLayout>
  );
};

export default AdminInquiries;
