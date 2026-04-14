import React, { useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

import { loginUser } from '../../redux/actions';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import Checkbox from '../Ui/Checkbox';
import { Divider } from '../Ui/Layout';

import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const logging = useSelector(state => state.auth.loginData);
  const loginFailure = useSelector(state => state.auth.loginFailure);
  const loginSuccess = useSelector(state => state.auth.loginSuccess);
  const userType = useSelector(state => state.auth.user?.userType);

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(user => ({ ...user, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (user.email && user.password) {
      dispatch(loginUser(user));
    }
  };

  if (loginSuccess) {
    if (userType === 'client') return <Navigate to="/" />;
    return <Navigate to="/account/supplier/dashboard" />;
  }

  return (
    <div className="w-full relative px-4 py-8 sm:px-0">
      {/* Premium ambient light effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply blur-[64px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-400/10 rounded-full mix-blend-multiply blur-[64px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <RouterLink to="/">
          <div className="p-2 bg-white rounded-2xl shadow-premium shadow-primary/10 mb-10 transform hover:scale-105 transition-all duration-500 ease-out">
            <img src={Hadiwa_logo} alt="Hadiwa" className="h-12 w-auto rounded-xl" />
          </div>
        </RouterLink>

        <div className="text-center mb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-4xl font-black tracking-tight text-secondary mb-3">Welcome Back</h2>
          <p className="text-slate-400 font-bold text-sm">Sign in to your Hadiwa account</p>
        </div>

        <form className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200" noValidate onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={user.email}
              onChange={handleChange}
              error={submitted && !user.email ? 'Email is required' : null}
              className="text-base"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
              error={submitted && !user.password ? 'Password is required' : null}
              className="text-base"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <Checkbox label={<span className="text-slate-500 font-bold text-sm">Remember me</span>} id="remember-me" />
            <RouterLink
              to="/forgot-password"
              className="text-sm font-black text-primary hover:text-[#ff6600] transition-colors"
            >
              Forgot password?
            </RouterLink>
          </div>

          {loginFailure && (
            <div className="bg-red-50/80 backdrop-blur border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="bg-white p-1.5 rounded-full shadow-sm text-red-500">
                <ShieldCheck size={18} />
              </div>
              {loginFailure}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={logging}
            className="h-14 rounded-2xl bg-gradient-to-r from-primary to-[#ff6600] text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 font-black tracking-wide text-base transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </Button>

          <div className="mt-8 text-center bg-slate-50/50 rounded-2xl py-4 border border-slate-100/50">
            <p className="text-sm font-bold text-slate-500">
              {"Don't have an account? "}
              <RouterLink to="/signup" className="text-primary font-black hover:text-[#ff6600] ml-1 transition-colors">
                Sign Up Free
              </RouterLink>
            </p>
          </div>

          <Divider className="my-8 opacity-50" />

          <RouterLink
            to="/"
            className="flex items-center justify-center gap-2 text-sm text-slate-400 font-black hover:text-secondary group transition-colors"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> 
            Back to Marketplace
          </RouterLink>
        </form>
      </div>
    </div>
  );
};

export default Login;