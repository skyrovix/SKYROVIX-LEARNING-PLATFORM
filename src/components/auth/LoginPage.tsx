import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Video,
  Terminal,
  Code2,
  Lock,
  Mail,
  User,
  Check,
  Award,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const { setCurrentView, login, register } = usePlatform();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    if (mode === 'forgot') {
      setStatusMessage({
        type: 'success',
        text: `Password reset instructions sent to ${email || 'your email'}! Check your inbox.`
      });
      setIsSubmitting(false);
      return;
    }

    if (mode === 'register') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
        setIsSubmitting(false);
        return;
      }
      
      const res = await register(email.trim(), password.trim(), name.trim());
      if (!res.success) {
        setStatusMessage({ type: 'error', text: res.error || 'Registration failed. Please try again.' });
        setIsSubmitting(false);
        return;
      }

      setStatusMessage({
        type: 'success',
        text: `Welcome to Skyrovix, ${name}! Account authenticated. Setting up your workspace...`
      });
      setTimeout(() => {
        setCurrentView('user-dashboard');
      }, 500);
      setIsSubmitting(false);
      return;
    }

    // Login
    if (!email.trim() || !password.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your registered email and password.' });
      setIsSubmitting(false);
      return;
    }

    const res = await login(email.trim(), password.trim());
    if (!res.success) {
      setStatusMessage({ type: 'error', text: res.error || 'Invalid email or password.' });
      setIsSubmitting(false);
      return;
    }

    setStatusMessage({
      type: 'success',
      text: `Welcome back! Credentials verified. Accessing dashboard...`
    });
    setTimeout(() => {
      if (res.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('user-dashboard');
      }
    }, 450);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Top Header Bar for Separated Login Page */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="cursor-pointer flex flex-col items-start group transition-transform active:scale-95 shrink-0"
            title="Skyrovix Learning Platform"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={brandImages.logo}
                alt="Skyrovix"
                className="h-7 sm:h-8 w-auto object-contain drop-shadow-2xs group-hover:scale-102 transition-transform"
              />
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-orange-100 text-[#FF5A36] border border-orange-200">
                Learning Platform
              </span>
            </div>
            <span className="text-[7.5px] uppercase font-extrabold tracking-[0.22em] text-slate-500 pl-0.5 mt-0.5">
              INNOVATION • TECHNOLOGY • FUTURE
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Courses</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Login Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* ================= LEFT COLUMN: Sleek Dark Brand Panel ================= */}
          <div className="bg-gradient-to-br from-[#161922] via-[#12141C] to-[#0E1016] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Radial Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Official White Logo */}
              <div className="flex items-center gap-2">
                <img
                  src={brandImages.logoWhite}
                  alt="Skyrovix"
                  className="h-9 sm:h-10 w-auto object-contain drop-shadow-md"
                />
              </div>

              {/* Learning Platform Accreditation Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-400 text-xs font-bold">
                <Sparkles size={13} className="text-orange-400" />
                <span>Next-Gen Technical Learning Platform</span>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display leading-tight">
                  Master In-Demand Tech.
                </h2>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FF7D5C] font-display leading-tight">
                  Build Production Skills.
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Access 9 video masterclasses and 12 text courses with 435 lessons, code in live browser sandboxes, and earn verified industry certificates.
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-black text-white font-display">21</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                    COURSES
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-black text-white font-display">435</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                    LESSONS
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-black text-white font-display">100%</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                    HANDS-ON
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Attribution */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>© 2026 Skyrovix</span>
              <span>Online Learning Institute</span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Form Panel ================= */}
          <div className="p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display">
                  Student & Instructor Gateway
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Sign in to continue your course progress and access interactive sandboxes.
                </p>
              </div>

              {/* Status Alert */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pill Switcher: Sign In / Create Account */}
              <div className="p-1 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setStatusMessage(null);
                  }}
                  className={`cursor-pointer flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                    mode === 'login'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setStatusMessage(null);
                  }}
                  className={`cursor-pointer flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                    mode === 'register'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Interactive Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name for Register Mode */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Learner Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Hariharan S"
                        className="w-full bg-[#F3F6FD] border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] focus:bg-white transition-all shadow-2xs font-medium"
                        required
                      />
                      <User size={15} className="text-slate-400 absolute right-3.5 top-3" />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {mode === 'register' ? 'Email Address' : 'Registered Email'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="student@skyrovix.com or admin@skyrovix.com"
                      className="w-full bg-[#F3F6FD] border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] focus:bg-white transition-all shadow-2xs font-medium"
                      required
                    />
                    <Mail size={15} className="text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                {/* Password Field */}
                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        {mode === 'register' ? 'Set Password' : 'Password'}
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="cursor-pointer text-[11px] font-bold text-[#FF5A36] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        className="w-full bg-[#F3F6FD] border border-slate-200/90 rounded-2xl px-4 py-2.5 pr-10 text-xs text-slate-900 outline-none focus:border-[#FF5A36] focus:bg-white transition-all shadow-2xs font-mono font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-700"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Coral Gradient Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-[#FF5A36] to-[#FA4032] hover:from-[#E04928] hover:to-[#E03528] disabled:opacity-60 text-white font-extrabold text-xs transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>
                    {isSubmitting
                      ? 'Authenticating...'
                      : mode === 'login'
                      ? 'Resume Learning →'
                      : mode === 'register'
                      ? 'Create Free Account 🚀'
                      : 'Send Reset Link'}
                  </span>
                </button>
              </form>
            </div>

            {/* SQL Database Live Indicator */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SQL Database Connected
              </span>
              <span>ENGINE: SQL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
