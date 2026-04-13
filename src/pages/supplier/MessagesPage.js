import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MessageSquare,
  Search,
  Send,
  Clock,
  Phone,
  Mail,
  MoreVertical,
  Paperclip,
  Smile,
  Loader,
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import {
  getConversations,
  getThread,
  sendMessage,
} from '../../redux/actions/messageActions';

dayjs.extend(relativeTime);

const AvatarPlaceholder = ({ name = '', online, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-10 h-10 text-xs';

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black`}
      >
        {initials}
      </div>
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
};

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { conversations, thread, loading } = useSelector(state => state.message);
  const myId = useSelector(state => state.auth.user?.id);

  const [activeConv, setActiveConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (activeConv) {
      dispatch(getThread(activeConv.partnerId));
    }
  }, [dispatch, activeConv]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread]);

  const handleSelectConv = (conv) => {
    setActiveConv(conv);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConv) return;
    dispatch(sendMessage(activeConv.partnerId, newMessage.trim()));
    setNewMessage('');
  };

  const filtered = conversations.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);

  return (
    <SupplierLayout>
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <MessageSquare size={18} />
        </div>
        <Typography variant="h2">Messages</Typography>
        {totalUnread > 0 && (
          <span className="ml-1 px-2.5 py-0.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            {totalUnread} New
          </span>
        )}
      </div>

      <Card hover={false} className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
        <div className="flex h-[70vh]">
          {/* Sidebar: Conversation List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-slate-50 flex flex-col flex-shrink-0">
            {/* Search */}
            <div className="p-4 border-b border-slate-50">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
                <Search size={16} className="text-slate-300 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent text-xs font-bold w-full focus:outline-none placeholder:text-slate-300 text-secondary"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-grow overflow-y-auto">
              {loading && conversations.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-slate-300">
                  <Loader size={24} className="animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2 text-slate-300 px-4 text-center">
                  <MessageSquare size={32} />
                  <p className="text-xs font-bold">No conversations yet</p>
                </div>
              ) : (
                filtered.map(conv => (
                  <button
                    key={conv.partnerId}
                    onClick={() => handleSelectConv(conv)}
                    className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50/50 ${
                      activeConv?.partnerId === conv.partnerId
                        ? 'bg-primary/5 border-l-2 border-l-primary'
                        : ''
                    }`}
                  >
                    <AvatarPlaceholder name={conv.name} />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-black text-secondary truncate">{conv.name}</p>
                        <span className="text-[10px] font-bold text-slate-300 flex-shrink-0 ml-2">
                          {dayjs(conv.lastMessageTime).fromNow()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate font-medium">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          {activeConv ? (
            <div className="flex-grow flex flex-col min-w-0">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 bg-white">
                <div className="flex items-center gap-4">
                  <AvatarPlaceholder name={activeConv.name} size="lg" />
                  <div>
                    <p className="font-black text-secondary text-sm">{activeConv.name}</p>
                    {activeConv.organization && (
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {activeConv.organization}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-primary">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-primary">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-primary">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <Loader size={32} className="animate-spin" />
                  </div>
                ) : thread.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-300">
                    <MessageSquare size={40} />
                    <p className="text-sm font-bold">Start the conversation</p>
                  </div>
                ) : (
                  thread.map(msg => {
                    const isMe = msg.senderId === myId;
                    const senderName = msg.sender?.names || '';
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                      >
                        {!isMe && <AvatarPlaceholder name={senderName} />}
                        <div className={`max-w-[65%] flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                              isMe
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white text-secondary shadow-sm rounded-bl-none border border-slate-100'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className={`flex items-center gap-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                            <Clock size={10} className="text-slate-300" />
                            <span className="text-[10px] text-slate-300 font-bold">
                              {dayjs(msg.createdAt).format('h:mm A')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSend} className="px-6 py-4 border-t border-slate-50 bg-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="p-2 text-slate-300 hover:text-primary transition-colors rounded-xl hover:bg-slate-50"
                  >
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-secondary focus:outline-none focus:ring-2 focus:ring-primary/10 placeholder:text-slate-300 pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
                    >
                      <Smile size={18} />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center bg-slate-50/30">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                  <MessageSquare size={40} />
                </div>
                <p className="font-black text-slate-400">Select a conversation</p>
                <p className="text-sm text-slate-300 mt-1">to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </SupplierLayout>
  );
};

export default MessagesPage;
