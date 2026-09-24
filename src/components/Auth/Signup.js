import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

import { signupUser } from '../../redux/actions/authActions';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const Signup = () => {
  const [role, setRole] = useState('client'); // 'client' or 'supplier'
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
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
    city: 'Kigali',
    address: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const registering = useSelector(state => state.auth.signupData);
  const registerFailure = useSelector(state => state.auth.signupFailure);
  const registerSuccess = useSelector(state => state.auth.signupSuccess);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // Clean phone number helper
  const normalizePhoneNumber = (raw) => {
    if (!raw) return '';
    let cleaned = raw.trim().replace(/[\s-]/g, '');
    if (/^07[2389]\d{7}$/.test(cleaned)) {
      return '+25' + cleaned;
    }
    if (/^2507[2389]\d{7}$/.test(cleaned)) {
      return '+' + cleaned;
    }
    if (/^7[2389]\d{7}$/.test(cleaned)) {
      return '+250' + cleaned;
    }
    return cleaned;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!user.names || user.names.trim().length < 3) {
      newErrors.names = 'Full name must be at least 3 characters';
    } else if (user.names.length > 60) {
      newErrors.names = 'Full name must be less than 60 characters';
    }

    const normalizedPhone = normalizePhoneNumber(user.phoneNumber);
    const phoneRegex = /^\+2507[2389]\d{7}$/;
    if (!user.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(normalizedPhone)) {
      newErrors.phoneNumber = 'Enter a valid Rwandan phone number (e.g. +250 788 123 456 or 0788...)';
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!user.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = 'Enter a valid email address (e.g. name@example.com)';
    }

    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if (!user.password) {
      newErrors.password = 'Password is required';
    } else if (!pwdRegex.test(user.password)) {
      newErrors.password = 'Must be 8+ chars with uppercase, lowercase, number, and special character (e.g. Pass@123)';
    }

    if (role === 'supplier') {
      if (!user.organization || user.organization.trim().length < 2) {
        newErrors.organization = 'Company or store name is required';
      }
      if (!user.nationalId || user.nationalId.trim().length < 4) {
        newErrors.nationalId = 'TIN number or National ID is required';
      }
      if (!user.city || user.city.trim().length < 2) {
        newErrors.city = 'City or district is required';
      }
      if (!user.address || user.address.trim().length < 2) {
        newErrors.address = 'Street address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      const normalizedPhone = normalizePhoneNumber(user.phoneNumber);
      const payload = {
        ...user,
        userType: role,
        phoneNumber: normalizedPhone,
        country: user.country || 'Rwanda',
        city: user.city || 'Kigali',
        address: user.address,
        location: user.location || user.address || user.city || 'Kigali',
        description: user.description || (user.organization ? `${user.organization} supplier of construction materials` : 'Construction materials supplier'),
      };
      dispatch(signupUser(payload));
    }
  };

  const handleRoleChange = newRole => {
    setRole(newRole);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-8">
      <RouterLink to="/" className="mb-6">
        <img src={Hadiwa_logo} alt="Hadiwa" className="h-16 w-auto rounded-2xl shadow-premium transition-transform hover:scale-105 duration-300" />
      </RouterLink>

      <div className="text-center mb-8">
        <Typography variant="h2" className="mb-2">
          {role === 'client' ? 'Join as a Customer' : 'Register as a Supplier'}
        </Typography>
        <Typography variant="body1" className="text-slate-500 max-w-md mx-auto font-medium text-sm">
          {role === 'client' 
            ? 'Find quality construction materials, request proformas, and connect with trusted suppliers.' 
            : 'List your materials, receive proforma requests, and grow your hardware business across Rwanda.'}
        </Typography>
      </div>

      {/* Role Selector */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8 w-full max-w-sm shadow-inner">
        <button
          type="button"
          onClick={() => handleRoleChange('client')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all ${
            role === 'client' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Customer
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('supplier')}
          className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all ${
            role === 'supplier' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Supplier
        </button>
      </div>

      {/* Success View */}
      {registerSuccess ? (
        <div className="w-full bg-white rounded-3xl border border-emerald-100 p-8 shadow-premium text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-secondary mb-2">Welcome to Hadiwa!</h3>
            <p className="text-slate-600 text-sm font-medium">{registerSuccess}</p>
          </div>

          {role === 'supplier' ? (
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 text-left flex items-start gap-4">
              <ShieldCheck className="text-primary mt-1 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="font-bold text-sm text-secondary">Verify Your Email Address</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We sent a confirmation link to <span className="font-bold text-secondary">{user.email}</span>. Click the link in your email to verify and activate your store before logging in.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-left flex items-start gap-4">
              <ShieldCheck className="text-emerald-600 mt-1 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="font-bold text-sm text-emerald-900">Account Ready</p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your customer account has been created successfully. You can now explore products, request quotes, and manage your proformas.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              fullWidth
              size="lg"
              onClick={() => navigate('/login')}
              className="rounded-xl font-bold py-4"
            >
              Go to Login <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              fullWidth
              size="lg"
              onClick={() => {
                setUser({
                  names: '',
                  phoneNumber: '',
                  email: '',
                  password: '',
                  organization: '',
                  nationalId: '',
                  description: '',
                  country: 'Rwanda',
                  city: 'Kigali',
                  address: '',
                  location: '',
                });
                setSubmitted(false);
                setErrors({});
                dispatch({ type: 'REGISTER_FAILURE', payload: null });
              }}
              className="rounded-xl font-bold py-4"
            >
              Register Another Account
            </Button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form className="w-full space-y-6" noValidate onSubmit={handleSubmit}>
          {registerFailure && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-shake">
              <div className="bg-rose-100 p-1.5 rounded-full shrink-0">
                <AlertCircle size={18} />
              </div>
              <div className="flex-1 text-left">{registerFailure}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="names"
              placeholder={role === 'client' ? 'e.g. Jean Damascene' : 'Contact Person Full Name'}
              value={user.names}
              onChange={handleChange}
              error={submitted ? errors.names : null}
              required
              icon={User}
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="+250 788 123 456"
              value={user.phoneNumber}
              onChange={handleChange}
              error={submitted ? errors.phoneNumber : null}
              helperText={!errors.phoneNumber ? 'Accepts +250 7... or 07...' : null}
              required
              icon={Phone}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={handleChange}
            error={submitted ? errors.email : null}
            required
            icon={Mail}
          />

          {/* Supplier Specific Fields */}
          {role === 'supplier' && (
            <div className="space-y-5 p-5 bg-slate-50/70 border border-slate-100 rounded-3xl animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={18} className="text-primary" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Business Details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Company / Hardware Store Name"
                  name="organization"
                  placeholder="e.g. Quincaillerie Moderne Ltd"
                  value={user.organization}
                  onChange={handleChange}
                  error={submitted ? errors.organization : null}
                  required
                  icon={Building2}
                />
                <Input
                  label="TIN Number / National ID"
                  name="nationalId"
                  placeholder="e.g. 100123456"
                  value={user.nationalId}
                  onChange={handleChange}
                  error={submitted ? errors.nationalId : null}
                  required
                  icon={FileText}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="City / District"
                  name="city"
                  placeholder="e.g. Kigali / Gasabo"
                  value={user.city}
                  onChange={handleChange}
                  error={submitted ? errors.city : null}
                  required
                  icon={MapPin}
                />

                <Input
                  label="Physical Address"
                  name="address"
                  placeholder="e.g. KG 11 Ave, Remera"
                  value={user.address}
                  onChange={handleChange}
                  error={submitted ? errors.address : null}
                  required
                  icon={Globe}
                />
              </div>

              <Input
                label="Landmark / Store Location"
                name="location"
                placeholder="e.g. Near Kisimenti Commercial Center"
                value={user.location}
                onChange={handleChange}
                icon={MapPin}
              />

              <Input
                label="Business Description"
                name="description"
                variant="textarea"
                rows="3"
                placeholder="Briefly describe the materials and hardware products your store provides..."
                value={user.description}
                onChange={handleChange}
                icon={Briefcase}
              />
            </div>
          )}

          {/* Password Input with Show/Hide toggle */}
          <div className="space-y-1.5">
            <Input
              label="Secure Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={user.password}
              onChange={handleChange}
              error={submitted ? errors.password : null}
              required
              icon={Lock}
              endAdornment={
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 p-1 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <p className="text-[11px] text-slate-400 ml-1">
              Must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol (e.g. Hadiwa@2026).
            </p>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={registering}
            className="rounded-2xl shadow-premium font-black text-lg py-6 mt-4 transition-all hover:-translate-y-0.5 active:scale-[0.99]"
          >
            {role === 'client' ? 'Create Customer Account' : 'Register Supplier Account'}
          </Button>

          <div className="pt-8 space-y-5">
            <p className="text-sm text-center text-slate-400 font-bold">
              Already have an account?{' '}
              <RouterLink to="/login" className="text-primary font-black hover:underline transition-all underline-offset-4">
                Sign In
              </RouterLink>
            </p>
            
            <div className="h-[1px] w-full bg-slate-100" />

            <RouterLink 
              to="/" 
              className="flex items-center justify-center gap-2 text-xs text-slate-400 font-bold hover:text-secondary transition-all"
            >
              <ArrowLeft size={14} /> Back to Home
            </RouterLink>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
