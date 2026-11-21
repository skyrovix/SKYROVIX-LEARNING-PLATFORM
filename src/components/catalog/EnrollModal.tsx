import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlatform } from '../../context/PlatformContext';
import { VideoCourse } from '../../data/videoCoursesData';
import { TextCourseMetadata } from '../../data/textCourseLoader';
import {
  X,
  CheckCircle2,
  Sparkles,
  Award,
  Video,
  BookOpen,
  Terminal,
  ShieldCheck,
  Tag,
  Gift,
  ArrowRight,
  GraduationCap,
  Play,
  CreditCard,
  Lock,
  Smartphone,
  Building,
  Check,
  RefreshCw,
  ExternalLink,
  HelpCircle,
  Clock,
  Send,
  UserCheck,
  LogIn,
  UserPlus,
  AlertCircle,
  User,
  KeyRound
} from 'lucide-react';

interface EnrollModalProps {
  course: VideoCourse | TextCourseMetadata | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type EnrollStep = 'auth_required' | 'application' | 'payment' | 'success';
type PaymentMethod = 'upi' | 'card' | 'netbanking';

export const EnrollModal: React.FC<EnrollModalProps> = ({ course, isOpen, onClose, onSuccess }) => {
  const {
    enrollInCourse,
    navigateToVideoCourse,
    navigateToTextCourse,
    setCurrentView,
    currentUser,
    isAuthenticated,
    login,
    register,
    showGlobalToast
  } = usePlatform();

  // Multi-step state: 'auth_required' (if unauthenticated) -> 'application' -> 'payment' -> 'success'
  const [step, setStep] = useState<EnrollStep>('application');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // In-Modal Auth State (For unauthenticated students)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantGoal, setApplicantGoal] = useState('Career Transition & Job Placement');

  // Cashfree Payment Gateway State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingStatusText, setProcessingStatusText] = useState('Contacting Cashfree Payments Gateway...');
  const [transactionRef, setTransactionRef] = useState('');
  const [orderId, setOrderId] = useState('');

  // Determine initial step and sync user values
  useEffect(() => {
    if (isOpen) {
      if (!isAuthenticated) {
        setStep('auth_required');
      } else {
        setStep('application');
        setApplicantName(currentUser?.certificateName || currentUser?.name || '');
        setApplicantEmail(currentUser?.email || '');
        setApplicantPhone(currentUser?.phone || '+91 98765 43210');
      }

      setOrderId(`CF_ORD_${Math.floor(100000 + Math.random() * 900000)}`);
      setTransactionRef(`CF_TXN_${Math.floor(10000000 + Math.random() * 90000000)}`);
      setAppliedDiscount(0);
      setCouponCode('');
      setCouponError(null);
      setAuthError(null);
    }
  }, [isOpen, isAuthenticated, currentUser]);

  if (!isOpen || !course) return null;

  const isVideo = 'modules' in course;
  const isFree = ('isFree' in course ? course.isFree : !isVideo) || false;
  const isFullStack = course.id === 'vid-fullstack-dev';
  const defaultPrice = isFullStack ? 299 : (isVideo ? 99 : 0);
  const basePriceNum = ('price' in course && course.price?.includes('₹')) 
    ? parseInt(course.price.replace(/[^0-9]/g, ''), 10) 
    : defaultPrice;
  const originalPriceStr = ('originalPrice' in course && course.originalPrice)
    ? course.originalPrice
    : (isFullStack ? '₹2,999' : (isVideo ? '₹999' : 'Free'));

  const finalPriceNum = Math.max(0, Math.round(basePriceNum * (1 - appliedDiscount / 100)));
  const finalPriceDisplay = isFree || appliedDiscount === 100 ? 'Free' : `₹${finalPriceNum.toLocaleString()}`;

  // In-Modal Login & Registration Handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      if (authMode === 'login') {
        const result = await login(authEmail.trim(), authPassword);
        if (result.success) {
          showGlobalToast(`Welcome back! Successfully logged in.`);
          setApplicantName(currentUser?.name || authEmail.split('@')[0]);
          setApplicantEmail(authEmail.trim());
          setStep('application');
        } else {
          setAuthError(result.error || 'Invalid student email or password.');
        }
      } else {
        if (!authName.trim()) {
          setAuthError('Please enter your full student name.');
          setIsAuthenticating(false);
          return;
        }
        const result = await register(authEmail.trim(), authPassword, authName.trim());
        if (result.success) {
          showGlobalToast(`Account created for ${authName}! Proceeding to enrollment.`);
          setApplicantName(authName.trim());
          setApplicantEmail(authEmail.trim());
          setStep('application');
        } else {
          setAuthError(result.error || 'Registration failed. Please try a different email.');
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error occurred.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError(null);
    if (!code) {
      setCouponError('Please enter a coupon or scholarship code.');
      return;
    }

    if (code === 'STUDENT100' || code === 'SKYROVIX2026' || code === 'WELCOME100' || code === 'FREE') {
      setAppliedDiscount(100);
      setCouponCode(code);
      if (showGlobalToast) {
        showGlobalToast(`🎉 100% Student Scholarship applied! Course is now 100% FREE.`);
      }
    } else if (code === 'SAVE50') {
      setAppliedDiscount(50);
      setCouponCode(code);
      if (showGlobalToast) {
        showGlobalToast(`🎉 50% discount coupon applied!`);
      }
    } else {
      setCouponError('Invalid coupon code. Try "STUDENT100" for 100% scholarship.');
    }
  };

  // Step 1: Submit Application Handler
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) {
      showGlobalToast('Please fill out your full name and email.');
      return;
    }

    // If course is 100% free or scholarship applied, complete enrollment immediately
    if (isFree || appliedDiscount === 100 || finalPriceNum === 0) {
      enrollInCourse(course.id);
      setStep('success');
      showGlobalToast(`🎉 Free enrollment activated for "${course.title}"!`);
      return;
    }

    // Otherwise, transition to Cashfree Payment Gateway
    setStep('payment');
  };

  // Step 2: Cashfree Payment Execution Handler
  const handleExecutePayment = () => {
    setIsProcessingPayment(true);
    setProcessingStatusText('Connecting to Cashfree Payments Gateway...');

    setTimeout(() => {
      setProcessingStatusText('Authorizing Payment via Bank / UPI...');
    }, 800);

    setTimeout(() => {
      setProcessingStatusText('Payment Confirmed! Activating Course Access...');
    }, 1500);

    setTimeout(() => {
      // Officially enroll the student in PlatformContext and localStorage
      enrollInCourse(course.id);
      setIsProcessingPayment(false);
      setStep('success');
      if (showGlobalToast) {
        showGlobalToast(`🎉 Payment of ${finalPriceDisplay} Successful via Cashfree! Course unlocked.`);
      }
    }, 2200);
  };

  // Step 3: Open Course Directly
  const handleOpenCourseNow = () => {
    onClose();
    if (isVideo) {
      navigateToVideoCourse(course.id);
    } else {
      const slug = 'slug' in course ? (course as TextCourseMetadata).slug : course.id;
      navigateToTextCourse(slug);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 my-8"
        >
          {/* Header Banner */}
          <div className="relative bg-[#111827] p-6 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FB4400]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isFree || appliedDiscount === 100
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-orange-500/20 text-[#FB4400] border border-orange-500/30'
                  }`}>
                    {step === 'auth_required' && 'Login Required'}
                    {step === 'application' && (isFree || appliedDiscount === 100 ? 'Free Track' : 'Course Application')}
                    {step === 'payment' && 'Cashfree Checkout'}
                    {step === 'success' && 'Access Granted'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {isVideo ? `${(course as VideoCourse).totalLectures} Lessons` : `${(course as TextCourseMetadata).lessonsCount || 435} Chapters`}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-white line-clamp-2">
                  {course.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper Progress Bar (Only when logged in or progressing) */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
              <div className={`flex items-center gap-1.5 ${
                step === 'auth_required' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 'auth_required' ? 'bg-amber-400 text-slate-900' : 'bg-emerald-500 text-white'
                }`}>
                  {step === 'auth_required' ? '!' : '✓'}
                </span>
                <span>{isAuthenticated ? 'Student Account' : 'Login'}</span>
              </div>

              <div className="h-0.5 w-6 bg-slate-700" />

              <div className={`flex items-center gap-1.5 ${
                step === 'application' ? 'text-[#FB4400]' : (step === 'payment' || step === 'success') ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 'application' ? 'bg-[#FB4400] text-white' : (step === 'payment' || step === 'success') ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {(step === 'payment' || step === 'success') ? '✓' : '2'}
                </span>
                <span>Application</span>
              </div>

              <div className="h-0.5 w-6 bg-slate-700" />

              <div className={`flex items-center gap-1.5 ${
                step === 'payment' ? 'text-[#FB4400]' : step === 'success' ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 'payment' ? 'bg-[#FB4400] text-white' : step === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step === 'success' ? '✓' : '3'}
                </span>
                <span>Payment</span>
              </div>

              <div className="h-0.5 w-6 bg-slate-700" />

              <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  4
                </span>
                <span>Open</span>
              </div>
            </div>
          </div>

          {/* Modal Body: STEP 0 - STUDENT LOGIN REQUIRED */}
          {step === 'auth_required' && (
            <div className="p-6 sm:p-8 space-y-5">
              
              {/* Notice Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Lock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                    Student Login Required to Apply
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Each student must sign in to link course enrollment, track lecture progress, and mint official certificates under your legal name.
                  </p>
                </div>
              </div>

              {/* Login / Register Toggle Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError(null);
                  }}
                  className={`cursor-pointer flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LogIn size={13} />
                  <span>Student Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError(null);
                  }}
                  className={`cursor-pointer flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserPlus size={13} />
                  <span>Create Account</span>
                </button>
              </div>

              {/* In-Modal Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                {authMode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <User size={13} className="text-[#FB4400]" />
                      <span>Full Legal Student Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      placeholder="e.g. Hariharan S"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="student@skyrovix.in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <KeyRound size={13} className="text-[#FB4400]" />
                    <span>Password *</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                {authError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0 text-rose-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="cursor-pointer w-full py-3.5 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Authenticating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'Sign In & Continue to Application' : 'Create Account & Continue'}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Full Login Page Alternative */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setCurrentView('login');
                  }}
                  className="cursor-pointer text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Or open dedicated Sign In / Sign Up portal →
                </button>
              </div>

            </div>
          )}

          {/* Modal Body: STEP 1 - APPLICATION */}
          {step === 'application' && (
            <form onSubmit={handleApplicationSubmit} className="p-6 sm:p-8 space-y-5">
              
              {/* Authenticated Student Banner */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                    {(currentUser?.name || applicantName || 'S').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{currentUser?.name || applicantName}</span>
                      <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        ACTIVE LEARNER
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {currentUser?.email || applicantEmail}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">Verified</span>
              </div>

              {/* Pricing Overview Row */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50/60 border border-orange-200">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Tuition & Lifetime Pass
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900">{finalPriceDisplay}</span>
                    {!isFree && appliedDiscount < 100 && (
                      <span className="text-xs text-slate-400 line-through">{originalPriceStr}</span>
                    )}
                  </div>
                </div>

                {!isFree && appliedDiscount < 100 ? (
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[#FB4400] text-white shadow-2xs">
                    {appliedDiscount === 50 ? '50% OFF Applied' : (isFullStack ? 'FLAGSHIP • ₹299' : 'VIDEO PASS • ₹99')}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <GraduationCap size={14} />
                    <span>100% Free</span>
                  </span>
                )}
              </div>

              {/* Student Application Form Fields */}
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Student Full Name (for Verifiable Certificate) *</span>
                    <span className="text-[10px] text-slate-400 font-normal">Official Legal Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={e => setApplicantName(e.target.value)}
                    placeholder="e.g. Hariharan S"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={e => setApplicantEmail(e.target.value)}
                      placeholder="student@skyrovix.in"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={e => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Primary Learning Goal</label>
                  <select
                    value={applicantGoal}
                    onChange={e => setApplicantGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#FB4400]"
                  >
                    <option value="Career Transition & Job Placement">Career Transition & Software Engineer Job Placement</option>
                    <option value="College Semester & Capstone Project">College Semester Curriculum & Capstone Project</option>
                    <option value="Freelancing & Client Systems">Freelancing & Building Full Stack SaaS</option>
                    <option value="Upskilling to React 19 & Next.js 15">Upskilling to Modern React 19 & Node.js 2026</option>
                  </select>
                </div>
              </div>

              {/* Coupon & Scholarship Box */}
              {!isFree && appliedDiscount < 100 && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Tag size={13} className="text-[#FB4400]" />
                      <span>Scholarship / Promo Code</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('STUDENT100')}
                      className="cursor-pointer text-[11px] font-extrabold text-[#FB4400] hover:underline"
                    >
                      Apply STUDENT100 (100% Free)
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="e.g. STUDENT100 or SAVE50"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold uppercase focus:outline-none focus:border-[#FB4400]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[11px] text-rose-500 font-semibold">{couponError}</p>
                  )}
                </div>
              )}

              {/* Cashfree Security & 50% Refund Guarantee Assurance */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Secured by <strong>Cashfree Payments</strong> (UPI, Cards, NetBanking)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>50% Payment Return Guarantee:</strong> If you complete between 10% and 50% of the course, you are entitled to a 50% refund returned directly via Cashfree as per our Refund Policy.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full py-3.5 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>
                  {isFree || appliedDiscount === 100 || finalPriceNum === 0
                    ? 'Confirm Free Application & Start Learning'
                    : `Submit Application & Pay ${finalPriceDisplay} via Cashfree`}
                </span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          {/* Modal Body: STEP 2 - CASHFREE PAYMENT CHECKOUT */}
          {step === 'payment' && (
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Cashfree Branded Header */}
              <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 p-4 rounded-2xl border border-orange-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Lock size={11} className="text-emerald-600" />
                    <span>CASHFREE SECURE PAYMENT GATEWAY</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">
                    {finalPriceDisplay}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Order Ref: {orderId}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    RBI Authorized
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">256-bit SSL</div>
                </div>
              </div>

              {/* Payment Methods Selector Tabs */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700">Choose Payment Method:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#FB4400] bg-orange-50 text-[#FB4400] font-extrabold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone size={16} className="mx-auto mb-1 text-current" />
                    <span className="text-xs block">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#FB4400] bg-orange-50 text-[#FB4400] font-extrabold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard size={16} className="mx-auto mb-1 text-current" />
                    <span className="text-xs block">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#FB4400] bg-orange-50 text-[#FB4400] font-extrabold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building size={16} className="mx-auto mb-1 text-current" />
                    <span className="text-xs block">NetBanking</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Details Area */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-800">
                      Instant UPI Checkout (Google Pay, PhonePe, Paytm, BHIM)
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-blue-600">GPay</div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-600">PhonePe</div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-sky-600">Paytm</div>
                    </div>
                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] font-bold text-slate-600">Or Enter Your Virtual Payment Address (VPA):</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="e.g. student@oksbi or 9876543210@paytm"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FB4400]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">Card Number (Visa, Mastercard, RuPay):</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8821"
                        maxLength={19}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FB4400]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Expiry (MM/YY):</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          placeholder="08/29"
                          maxLength={5}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FB4400]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">CVV:</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FB4400]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-600">Select Bank for Net Banking:</label>
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    >
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Processing Loader / Action Buttons */}
              <div className="space-y-2">
                {isProcessingPayment ? (
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center space-y-2">
                    <RefreshCw size={24} className="mx-auto text-[#FB4400] animate-spin" />
                    <div className="text-xs font-extrabold text-slate-900">{processingStatusText}</div>
                    <div className="text-[10px] text-slate-500">Do not refresh or close this window</div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleExecutePayment}
                      className="cursor-pointer w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                    >
                      <Lock size={15} />
                      <span>Complete Payment of {finalPriceDisplay} via Cashfree</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('application')}
                      className="cursor-pointer w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors text-center"
                    >
                      ← Back to Application Details
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Modal Body: STEP 3 - PAYMENT COMPLETE & OPEN COURSES */}
          {step === 'success' && (
            <div className="p-6 sm:p-8 space-y-6 text-center">
              
              {/* Celebratory Checkmark Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <Check size={32} className="stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Sparkles size={13} />
                  <span>PAYMENT COMPLETE & ENROLLMENT ACTIVE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  You're Officially Enrolled!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your payment has been cleared via Cashfree Payments. You now have full lifetime access to all lectures, coding sandboxes, and verifiable certificates.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Enrolled Student:</span>
                  <span className="font-bold text-slate-900">{applicantName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Cashfree Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900">{transactionRef}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-black text-emerald-600 text-sm">{finalPriceDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Access Status:</span>
                  <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Active Lifetime Pass</span>
                  </span>
                </div>
              </div>

              {/* PRIMARY ACTION: OPEN THE COURSES NOW (Exact User Request) */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenCourseNow}
                  className="cursor-pointer w-full py-4 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-black text-sm sm:text-base shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 animate-pulse hover:animate-none"
                >
                  <Play size={18} className="fill-white" />
                  <span>Open Course & Start Learning Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setCurrentView('user-dashboard');
                  }}
                  className="cursor-pointer w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
                >
                  Go to Student Dashboard
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
