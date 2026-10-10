import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StorefrontContainer from '../components/StorefrontContainer';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();

  const isSignupInit = location.pathname === '/signup';
  const [isSignup, setIsSignup] = useState(isSignupInit);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to account
  if (user) {
    navigate('/account');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        if (!name.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        await signup({ name, email: emailOrPhone, password });
      } else {
        await login({ email: emailOrPhone, password });
      }
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F7F8FA] py-12 flex items-center justify-center">
      <StorefrontContainer>
        <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          
          {/* Brand header */}
          <div className="text-center mb-6">
            <span className="text-2xl sm:text-3xl font-black text-[#282C3F] tracking-tighter uppercase font-display">
              LEO
            </span>
            <p className="text-xs text-[#666875] mt-1">
              {isSignup ? 'Create your LEO Men\'s Fashion Account' : 'Log in to your LEO Account'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => { setIsSignup(false); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                !isSignup ? 'bg-white text-[#212121] shadow-sm' : 'text-[#666875]'
              }`}
            >
              LOG IN
            </button>
            <button
              type="button"
              onClick={() => { setIsSignup(true); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                isSignup ? 'bg-white text-[#212121] shadow-sm' : 'text-[#666875]'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-bold uppercase text-[#212121] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-md text-xs font-semibold text-[#212121] focus:outline-none focus:border-[#282C3F]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-[#212121] mb-1">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 10-digit mobile"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-md text-xs font-semibold text-[#212121] focus:outline-none focus:border-[#282C3F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#212121] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-md text-xs font-semibold text-[#212121] focus:outline-none focus:border-[#282C3F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#282C3F] hover:bg-[#212121] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignup ? 'Create Account' : 'Log In'}
            </button>
          </form>

          {/* Trust badge */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-1.5 text-[11px] text-[#666875]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted & 100% Secure Authentication</span>
          </div>

        </div>
      </StorefrontContainer>
    </div>
  );
};

export default AuthPage;
