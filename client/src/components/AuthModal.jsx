import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, Lock, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authStep,
    setAuthStep,
    phoneOrEmail,
    setPhoneOrEmail,
    loginWithPhone,
    verifyOtp,
  } = useAuth();

  const [inputVal, setInputVal] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmitInput = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setError('Please enter your mobile number or email.');
      return;
    }
    setError('');
    loginWithPhone(inputVal.trim());
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpVal.trim() || otpVal.length < 4) {
      setError('Please enter the 4-digit verification code.');
      return;
    }
    verifyOtp(otpVal.trim());
    setInputVal('');
    setOtpVal('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setAuthStep('login');
            setError('');
          }}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="bg-zinc-950 p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-2">
            LEO CLUB MEMBERSHIP
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-white font-display">
            Unlock Exclusive Perks
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Get instant ₹100 welcome credit, fast checkout & live order tracking.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {authStep === 'login' ? (
            <form onSubmit={handleSubmitInput} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. 9876543210 or name@domain.com"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
                {error && <p className="text-xs text-rose-600 mt-1.5 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-zinc-500">
                By continuing, you agree to LEO's{' '}
                <a href="#terms" className="underline font-semibold text-zinc-700">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="#privacy" className="underline font-semibold text-zinc-700">
                  Privacy Policy
                </a>.
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center pb-2">
                <p className="text-xs text-zinc-600">
                  We sent a 4-digit verification code to:
                </p>
                <p className="text-sm font-bold text-zinc-900 mt-0.5">{phoneOrEmail}</p>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                  (Simulated mode: enter any 4 digits, e.g. 1234)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5 text-center">
                  Enter 4-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  placeholder="• • • •"
                  value={otpVal}
                  onChange={(e) => setOtpVal(e.target.value)}
                  className="w-full text-center text-2xl tracking-[0.5em] font-black py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-black focus:bg-white"
                />
                {error && <p className="text-xs text-rose-600 mt-1.5 font-medium text-center">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Verify & Enter LEO <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-center text-xs text-zinc-500 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthStep('login')}
                  className="hover:underline text-zinc-700 font-semibold"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={() => alert("Simulated OTP resent!")}
                  className="hover:underline text-zinc-700 font-semibold"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
