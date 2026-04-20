import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Building2,
  FileText,
  MapPin,
  Globe,
  Briefcase
} from 'lucide-react';

import { signupUser } from '../../redux/actions/authActions';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const Signup = () => {
  const [role, setRole] = useState('client'); // 'client' or 'supplier'
  const [user, setUser] = useState({
    names: '',
    phoneNumber: '',
    email: '',
    password: '',
    // Supplier specific
    organization: '',
    nationalId: '',
    description: '',
    country: 'Rwanda',
    city: '',
    address: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const registering = useSelector(state => state.auth.signupData);
  const registerFailure = useSelector(state => state.auth.signupFailure);
  const registerSuccess = useSelector(state => state.auth.signupSuccess);
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Handle role pre-selection from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'supplier') {
      setRole('supplier');
    } else if (type === 'client') {
      setRole('client');
    }
  }, [location.search]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    
    const requiredFields = role === 'client' 
      ? ['names', 'phoneNumber', 'email', 'password']
      : ['names', 'phoneNumber', 'email', 'password', 'organization', 'nationalId', 'city', 'address'];

    const isValid = requiredFields.every(field => user[field]);

    if (isValid) {
      dispatch(signupUser({ ...user, userType: role }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      <RouterLink to="/" className="mb-8">
        <img src={Hadiwa_logo} alt="Hadiwa" className="h-16 w-auto rounded-2xl shadow-premium transition-transform hover:scale-105 duration-300" />
      </RouterLink>

      <div className="text-center mb-8">
        <Typography variant="h2" className="mb-3">
          {role === 'client' ? 'Join as a Client' : 'Register as a Supplier'}
        </Typography>
        <Typography variant="body1" className="text-slate-500 max-w-sm mx-auto font-medium">
          {role === 'client' 
            ? 'Find premium construction materials and manage your proformas with ease.' 
            : 'Grow your business and reach more clients in the construction industry.'}
        </Typography>
      </div>

      {/* Role Selector */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-10 w-full max-w-sm">
        <button
          onClick={() => setRole('client')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all ${
            role === 'client' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Customer
        </button>
        <button
          onClick={() => setRole('supplier')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all ${
            role === 'supplier' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Supplier
        </button>
      </div>

      {registerSuccess && (
        <div className="w-full space-y-4 mb-10 animate-in zoom-in-95 duration-500">
          <div className="bg-emerald-50 border border-emerald-100/50 text-emerald-700 px-6 py-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-100 p-2 rounded-full">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-black text-lg">Welcome to Hadiwa!</p>
              <p className="text-sm font-medium opacity-80">{registerSuccess}</p>
            </div>
          </div>
          {role !== 'client' && (
            <div className="bg-primary/5 border border-primary/10 text-primary px-6 py-5 rounded-3xl shadow-sm flex items-start gap-4">
              <ShieldCheck size={20} className="mt-0.5" />
              <p className="text-sm font-bold leading-relaxed italic">
                Important: Please check your email and click the verification link to activate your account before logging in.
              </p>
            </div>
          )}
          {role === 'client' && (
            <div className="bg-primary/5 border border-primary/10 text-primary px-6 py-5 rounded-3xl shadow-sm flex items-start gap-4">
              <ShieldCheck size={20} className="mt-0.5" />
              <p className="text-sm font-bold leading-relaxed italic">
                Your account is ready! You can now <RouterLink to="/login" className="underline font-black hover:text-secondary transition-colors">log in</RouterLink> and start exploring.
              </p>
            </div>
          )}
        </div>
      )}

      <form className="w-full space-y-6" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="names"
            placeholder="e.g. Jean Damascene"
            value={user.names}
            onChange={handleChange}
            error={submitted && !user.names ? 'Your name is required' : null}
            required
            icon={User}
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            placeholder="+250 7..."
            value={user.phoneNumber}
            onChange={handleChange}
            error={submitted && !user.phoneNumber ? 'Contact number is required' : null}
            required
            icon={Phone}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="name@example.rw"
          value={user.email}
          onChange={handleChange}
          error={submitted && !user.email ? 'Email address is required' : null}
          required
          icon={Mail}
        />

        {role === 'supplier' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-500">
            <Input
              label="Company Name"
              name="organization"
              placeholder="Your Business Name"
              value={user.organization}
              onChange={handleChange}
              error={submitted && !user.organization ? 'Company name is required' : null}
              required
              icon={Building2}
            />
            <Input
              label="TIN NUMBER"
              name="nationalId"
              placeholder="119..."
              value={user.nationalId}
              onChange={handleChange}
              error={submitted && !user.nationalId ? 'TIN number is required' : null}
              required
              icon={FileText}
            />
            <Input
              label="City"
              name="city"
              placeholder="Kigali"
              value={user.city}
              onChange={handleChange}
              error={submitted && !user.city ? 'City is required' : null}
              required
              icon={MapPin}
            />
            <Input
              label="Address"
              name="address"
              placeholder="Street Address"
              value={user.address}
              onChange={handleChange}
              error={submitted && !user.address ? 'Address is required' : null}
              required
              icon={Globe}
            />
            <div className="md:col-span-2">
              <Input
                label="Business Description"
                name="description"
                variant="textarea"
                rows="3"
                placeholder="Tell us about your services and materials..."
                value={user.description}
                onChange={handleChange}
                icon={Briefcase}
              />
            </div>
          </div>
        )}

        <Input
          label="Secure Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={user.password}
          onChange={handleChange}
          error={submitted && !user.password ? 'Choose a secure password' : null}
          required
          icon={Lock}
        />

        {registerFailure && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-5 py-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-shake">
            <div className="bg-rose-100 p-1.5 rounded-full">
              <AlertCircle size={18} />
            </div>
            {registerFailure}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={registering}
          className="rounded-2xl shadow-premium font-black text-lg py-7 mt-4 transition-all hover:-translate-y-1 active:scale-[0.98]"
        >
          {role === 'client' ? 'Join Marketplace' : 'Register Business'}
        </Button>

        <div className="pt-10 space-y-6">
          <p className="text-sm text-center text-slate-400 font-bold">
            Already a member?{' '}
            <RouterLink to="/login" className="text-primary font-black hover:underline transition-all underline-offset-4">
              Sign In
            </RouterLink>
          </p>
          
          <div className="h-[1px] w-full bg-slate-50" />

          <RouterLink 
            to="/" 
            className="flex items-center justify-center gap-2 text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] hover:text-secondary transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </RouterLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
