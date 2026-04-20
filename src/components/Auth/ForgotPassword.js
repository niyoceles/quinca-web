import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { forgotPassword } from '../../redux/actions/authActions';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';
import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.forgotPasswordLoading);
    const success = useSelector(state => state.auth.forgotPasswordSuccess);
    const failure = useSelector(state => state.auth.forgotPasswordFailure);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (email) {
            dispatch(forgotPassword({ email }));
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-500 shadow-inner">
                        <CheckCircle2 size={40} />
                    </div>
                </div>
                <div className="space-y-3">
                    <Typography variant="h2" className="text-secondary">Check your email</Typography>
                    <Typography variant="body1" className="text-slate-500 max-w-sm mx-auto">
                        We've sent a password reset link to <span className="font-bold text-secondary">{email}</span>. Please check your inbox and follow the instructions.
                    </Typography>
                </div>
                <div className="pt-6">
                    <Button 
                        variant="white" 
                        fullWidth 
                        size="lg" 
                        className="rounded-2xl py-4"
                        onClick={() => window.location.href = '/login'}
                    >
                        Back to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto px-4">
            <div className="flex flex-col items-center mb-10">
                <RouterLink to="/login" className="mb-8">
                    <div className="p-2 bg-white rounded-2xl shadow-premium shadow-primary/10 transition-transform hover:scale-105 duration-300">
                        <img src={Hadiwa_logo} alt="Hadiwa" className="h-12 w-auto" />
                    </div>
                </RouterLink>
                <Typography variant="h2" className="mb-3 text-center">Forgot Password?</Typography>
                <Typography variant="body1" className="text-slate-500 text-center font-medium">
                    No worries! Enter your email below and we'll send you instructions to reset your password.
                </Typography>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.rw"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={submitted && !email ? 'Email address is required' : null}
                    icon={Mail}
                    required
                />

                {failure && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 px-5 py-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-shake">
                        <AlertCircle size={18} />
                        {failure}
                    </div>
                )}

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={loading}
                    className="rounded-2xl shadow-premium font-black text-lg py-7 mt-4"
                >
                    Send Reset Link
                </Button>

                <div className="pt-10 flex justify-center">
                    <RouterLink 
                        to="/login" 
                        className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] hover:text-primary transition-all"
                    >
                        <ArrowLeft size={14} /> Back to Sign In
                    </RouterLink>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
