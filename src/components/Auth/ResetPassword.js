import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '../../redux/actions/authActions';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Typography } from '../Ui/Typography';
import Hadiwa_logo from '../../assets/images/hadiwa-logo.png';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const loading = useSelector(state => state.auth.resetPasswordLoading);
    const success = useSelector(state => state.auth.resetPasswordSuccess);
    const failure = useSelector(state => state.auth.resetPasswordFailure);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        
        if (password && password === confirmPassword) {
            dispatch(resetPassword(token, { password }));
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
                    <Typography variant="h2" className="text-secondary">Password Reset Successfully</Typography>
                    <Typography variant="body1" className="text-slate-500 max-w-sm mx-auto">
                        Your password has been updated. You can now log in with your new credentials.
                    </Typography>
                </div>
                <div className="pt-6">
                    <Button 
                        fullWidth 
                        size="lg" 
                        className="rounded-2xl py-4 font-black shadow-premium"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
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
                <Typography variant="h2" className="mb-3 text-center">Reset Password</Typography>
                <Typography variant="body1" className="text-slate-500 text-center font-medium">
                    Choose a strong new password to protect your account.
                </Typography>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Input
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={submitted && !password ? 'Password is required' : null}
                        icon={Lock}
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[42px] text-slate-400 hover:text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={submitted && password !== confirmPassword ? 'Passwords do not match' : null}
                    icon={Lock}
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
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
