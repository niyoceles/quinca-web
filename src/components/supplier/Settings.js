import React, { useState } from 'react';
import { 
  Bell, 
  Lock, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail, 
  CreditCard,
  Save
} from 'lucide-react';
import { Card } from '../Ui/Card';
import { Typography } from '../Ui/Typography';
import Button from '../Ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-50">
        <div>
          <Typography variant="h2">Account Settings</Typography>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Manage your preferences and configurations
          </p>
        </div>
        <Button variant="primary" icon={Save} className="rounded-2xl px-8 font-black shadow-premium">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <Card className="lg:col-span-3 border-none shadow-premium rounded-[2.5rem] bg-white p-8 md:p-10">
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <Bell size={24} />
                </div>
                <div>
                  <Typography variant="h3">Notification Preferences</Typography>
                  <p className="text-sm text-slate-500">Control how and when you receive updates.</p>
                </div>
              </div>

              <div className="space-y-6">
                <SettingToggle 
                  icon={Mail} 
                  title="Email Notifications" 
                  description="Receive daily summaries and critical alerts via email." 
                  defaultChecked={true} 
                />
                <SettingToggle 
                  icon={Smartphone} 
                  title="Push Notifications" 
                  description="Get real-time updates on orders and messages." 
                  defaultChecked={true} 
                />
                <SettingToggle 
                  icon={Bell} 
                  title="Marketing Updates" 
                  description="Receive news, feature updates, and promotional offers." 
                  defaultChecked={false} 
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <Typography variant="h3">Security & Privacy</Typography>
                  <p className="text-sm text-slate-500">Manage your account security and authentication.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-secondary text-sm">Change Password</h4>
                    <p className="text-xs text-slate-500 mt-1">Ensure your account uses a strong, unique password.</p>
                  </div>
                  <Button variant="outline" className="rounded-xl px-6">Update Password</Button>
                </div>

                <SettingToggle 
                  icon={Lock} 
                  title="Two-Factor Authentication (2FA)" 
                  description="Add an extra layer of security to your account." 
                  defaultChecked={false} 
                />
              </div>
            </div>
          )}

          {(activeTab === 'preferences' || activeTab === 'billing') && (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6">
                <Globe size={40} />
              </div>
              <Typography variant="h3" className="text-slate-700">Coming Soon</Typography>
              <p className="text-sm text-slate-400 max-w-sm mt-2">
                This configuration section is currently under development and will be available in a future update.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

const SettingToggle = ({ icon: Icon, title, description, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-start md:items-center justify-between p-5 border border-slate-50 bg-slate-50/30 rounded-3xl hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 mt-1 md:mt-0 shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-bold text-secondary text-sm">{title}</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>
        </div>
      </div>
      
      <button 
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0 mt-3 md:mt-0 ${
          checked ? 'bg-primary' : 'bg-slate-200'
        }`}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`} 
        />
      </button>
    </div>
  );
};

export default Settings;
