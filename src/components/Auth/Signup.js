import React, { useState } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

import { signupUser } from '../../redux/actions/authActions';
import { Card } from '../Ui/Card';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';

import Quinca_logo from '../../assets/images/quinca-logo.jpeg';

const Signup = () => {
  const [user, setUser] = useState({
    names: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const registering = useSelector(state => state.auth.signupData);
  const registerFailure = useSelector(state => state.auth.signupFailure);
  const registerSuccess = useSelector(state => state.auth.signupSuccess);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (user.names && user.phoneNumber && user.email && user.password) {
      dispatch(signupUser(user));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <RouterLink to="/">
        <img src={Quinca_logo} alt="Quinca Paradi" className="h-16 w-auto rounded-2xl shadow-premium mb-10 transition-transform hover:scale-105 duration-300" />
      </RouterLink>

      <div className="text-center mb-10">
        <Typography variant="h2" className="mb-3">Join the Community</Typography>
        <Typography variant="body1" className="text-slate-500 max-w-sm mx-auto">
          Start your journey with Quinca Paradi and build the future together.
        </Typography>
      </div>

      {registerSuccess && (
        <div className="w-full space-y-4 mb-10 animate-in zoom-in-95 duration-500">
          <div className="bg-emerald-50 border border-emerald-100/50 text-emerald-700 px-6 py-5 rounded-[2rem] flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-100 p-2 rounded-full">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-black text-lg">Inquiry Success!</p>
              <p className="text-sm font-medium opacity-80">{registerSuccess}</p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/10 text-primary px-6 py-5 rounded-[2rem] shadow-sm flex items-start gap-4">
            <ShieldCheck size={20} className="mt-0.5" />
            <p className="text-sm font-bold leading-relaxed italic">
              Please check your inbox to verify your account before logging in.
            </p>
          </div>
        </div>
      )}

      <form className="w-full space-y-6" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            name="names"
            id="names"
            placeholder="e.g. Jean Damascene"
            value={user.names}
            onChange={handleChange}
            error={submitted && !user.names ? 'Your name is required' : null}
            required
            icon={User}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
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
          id="email"
          placeholder="name@company.rw"
          value={user.email}
          onChange={handleChange}
          error={submitted && !user.email ? 'Email address is required' : null}
          required
          icon={Mail}
        />

        <Input
          label="Secure Password"
          type="password"
          name="password"
          id="password"
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
          className="rounded-[1.5rem] shadow-premium font-black text-lg py-7 mt-4 transition-all hover:-translate-y-1 active:scale-[0.98]"
        >
          Create Marketplace Account
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
            <ArrowLeft size={14} /> Back to Marketplace
          </RouterLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
