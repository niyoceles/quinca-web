import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  Globe, 
  MapPin, 
  Fingerprint, 
  Calendar, 
  Edit, 
  X,
  CreditCard,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { getMyProfile } from '../../redux/actions';
import { Card } from '../Ui/Card';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';
import EditProfile from './EditProfile';

const Profile = () => {
  const profile = useSelector(state => state.supplier.profile);
  const [showUpdate, setShowUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="text-primary animate-spin mb-4" size={40} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Synchronizing Account Data...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-50">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-primary/20 border-4 border-white">
            <User size={36} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h2">{profile.names}</Typography>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight flex items-center gap-1 ${
                profile.userType === 'supplier' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
              }`}>
                <ShieldCheck size={12} /> {profile.userType === 'supplier' ? 'Verified Supplier' : 'Verified Client'}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Member since {new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
        
        <Button
          variant={showUpdate ? "ghost" : "primary"}
          onClick={() => setShowUpdate(!showUpdate)}
          className={`rounded-2xl px-8 font-black ${!showUpdate ? 'shadow-premium' : ''}`}
          icon={showUpdate ? X : Edit}
        >
          {showUpdate ? 'Cancel Editing' : 'Update Profile'}
        </Button>
      </div>

      {showUpdate ? (
        <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8">
          <EditProfile user={profile} onCancel={() => setShowUpdate(false)} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* General Information */}
          <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              <InfoItem icon={Mail} label="Email Address" value={profile.email} />
              <InfoItem icon={Phone} label="Phone Number" value={profile.phoneNumber} />
              {profile.userType === 'supplier' && (
                <>
                  <InfoItem icon={Building} label="Company Name" value={profile.organization} />
                  <InfoItem icon={Fingerprint} label="TIN NUMBER" value={profile.nationalId} />
                  <InfoItem icon={Globe} label="Region" value={`${profile.state}, ${profile.country}`} />
                  <InfoItem icon={MapPin} label="Exact Location" value={profile.location} />
                </>
              )}
            </div>
            
            {profile.userType === 'supplier' && (
              <div className="pt-10 border-t border-slate-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <MapPin size={16} />
                  </div>
                  <Typography variant="h4">Street Address</Typography>
                </div>
                <p className="text-sm font-bold text-secondary leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100/50 italic">
                  "{profile.address || 'No detailed address provided.'}"
                </p>
              </div>
            )}
          </Card>

          {/* Account Status Card */}
          <div className="space-y-6">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-secondary p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:rotate-12 transition-transform duration-700">
                <CreditCard size={120} />
              </div>
              <Typography variant="h3" className="text-white mb-6">Account Status</Typography>
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Plan Type</p>
                  <p className="text-lg font-black capitalize">{profile.userType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Operational Status</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-2xl text-[10px] font-black uppercase ring-1 ring-emerald-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active & Reselling
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 border border-slate-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <Calendar size={20} />
                </div>
                <Typography variant="h4">System Log</Typography>
              </div>
              <div className="space-y-4">
                <LogEntry label="Account Created" date={new Date(profile.createdAt).toLocaleDateString()} />
                <LogEntry label="Last Interaction" date="Today" />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="space-y-2 group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
        <Icon size={16} />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none">{label}</p>
    </div>
    <p className="text-sm font-black text-secondary pl-11 group-hover:translate-x-1 transition-transform duration-300">{value || 'Not specified'}</p>
  </div>
);

const LogEntry = ({ label, date }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-secondary">{date}</span>
  </div>
);

export default Profile;
