import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Clock,
  RotateCcw,
  Sparkles,
  Send,
  HelpCircle,
  Check,
  Percent,
  Calendar,
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface RefundTicket {
  id: string;
  courseName: string;
  orderId: string;
  progressPercent: number;
  refundTier: '100%' | '50%' | '0%';
  refundAmount: string;
  status: 'In Review' | 'Cashfree Processing' | 'Approved & Credited';
  createdAt: string;
  cashfreeArn?: string;
}

const DEFAULT_TICKETS: RefundTicket[] = [
  {
    id: 'REF-CF-8821',
    courseName: 'Full Stack Web Development Masterclass',
    orderId: 'CF_ORD_9821447',
    progressPercent: 32,
    refundTier: '50%',
    refundAmount: '₹149.50',
    status: 'Cashfree Processing',
    createdAt: '18 Nov 2026',
    cashfreeArn: 'ARN-2611-CF-882910'
  }
];

export const RefundPolicyPage: React.FC = () => {
  const { setCurrentView, currentUser, showGlobalToast } = usePlatform();

  // Interactive Calculator State
  const [selectedCoursePrice, setSelectedCoursePrice] = useState<number>(299);
  const [selectedCourseName, setSelectedCourseName] = useState<string>('Full Stack Masterclass (₹299)');
  const [calcProgress, setCalcProgress] = useState<number>(25);

  // Refund Request Form State
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || '');
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [formProgress, setFormProgress] = useState<number>(30);

  // Tickets state persisted in LocalStorage
  const [tickets, setTickets] = useState<RefundTicket[]>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_refund_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_TICKETS;
  });

  // Calculate refund eligibility based on progress percentage
  const getEligibility = (progress: number, price: number) => {
    if (progress < 10) {
      return {
        tier: '100% Full Refund',
        percentage: 100,
        amount: price,
        color: 'emerald',
        badge: '100% REFUND ELIGIBLE',
        description: 'You have accessed less than 10% of the course. Eligible for 100% full refund return via Cashfree Payments.'
      };
    } else if (progress >= 10 && progress <= 50) {
      return {
        tier: '50% Payment Return',
        percentage: 50,
        amount: Math.round(price * 0.5),
        color: 'orange',
        badge: '50% PAYMENT RETURN ELIGIBLE',
        description: 'You have completed between 10% and 50% of the course. You are eligible for a 50% partial payment refund via Cashfree Payments.'
      };
    } else {
      return {
        tier: 'No Refund (Over 50% Consumed)',
        percentage: 0,
        amount: 0,
        color: 'slate',
        badge: 'NOT ELIGIBLE FOR REFUND',
        description: 'You have completed more than 50% of the course curriculum. As per policy, courses with more than 50% progress are not eligible for refunds.'
      };
    }
  };

  const currentCalc = getEligibility(calcProgress, selectedCoursePrice);

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !orderId.trim() || !reason.trim()) {
      showGlobalToast('Please fill out all required fields to submit your refund request.');
      return;
    }

    const eligibility = getEligibility(formProgress, selectedCoursePrice);
    if (eligibility.percentage === 0) {
      showGlobalToast('Courses with more than 50% completion cannot be refunded as per policy.');
      return;
    }

    const newTicket: RefundTicket = {
      id: `REF-CF-${Math.floor(1000 + Math.random() * 9000)}`,
      courseName: selectedCourseName,
      orderId: orderId.trim(),
      progressPercent: formProgress,
      refundTier: eligibility.percentage === 100 ? '100%' : '50%',
      refundAmount: `₹${eligibility.amount}`,
      status: 'Cashfree Processing',
      createdAt: 'Just now',
      cashfreeArn: `ARN-CF-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    try {
      localStorage.setItem('skyrovix_refund_tickets', JSON.stringify(updated));
    } catch (e) {}

    showGlobalToast(`Refund Request Submitted! Ticket ID: ${newTicket.id} (${newTicket.refundAmount} via Cashfree)`);
    setOrderId('');
    setReason('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-100/80">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Legal & Billing</span>
            <span>/</span>
            <span className="text-[#FB4400] font-bold">Refund & Cancellation</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <RotateCcw size={14} />
              <span>TRANSPARENT 50% PAYMENT RETURN POLICY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              We stand behind the engineering quality of our masterclasses. If you are not satisfied with your course, we provide an objective, progress-based refund policy with direct return to your source account via <strong>Cashfree Payments</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="text-slate-700 bg-white px-3 py-1 rounded-xl border border-slate-200 font-bold flex items-center gap-1.5 shadow-2xs">
                <CreditCard size={14} className="text-[#FB4400]" />
                Powered by Cashfree Payments Gateway
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5">
                <Clock size={13} />
                Credited in 5-7 Working Days
              </span>
            </div>
          </div>
        </div>

        {/* The Core 3-Tier Rule Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Percent size={18} className="text-[#FB4400]" />
            <span>Official Refund Tiers (Progress-Based)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Tier 1: 0% to <10% Progress */}
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    TIER 1 • UNDER 10%
                  </span>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  100% Full Refund
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you have watched or completed <strong>less than 10%</strong> of the course lessons within 7 days of purchase, you are eligible for a 100% complete refund.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Returned to original UPI/Card via Cashfree within 5-7 days.
              </div>
            </div>

            {/* Tier 2: 10% to 50% Progress (User's Exact Rule) */}
            <div className="bg-gradient-to-b from-orange-50/70 to-white rounded-3xl border-2 border-[#FB4400] p-6 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden ring-4 ring-orange-500/10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FB4400] text-white">
                    TIER 2 • 10% TO 50%
                  </span>
                  <Percent size={18} className="text-[#FB4400]" />
                </div>
                <div className="text-2xl font-black text-[#FB4400]">
                  50% Payment Return
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  If you have completed <strong>between 10% and 50%</strong> of the course, we will return <strong>50% of your total payment</strong> back to your payment account via Cashfree Payments.
                </p>
              </div>

              <div className="pt-3 border-t border-orange-200 text-[11px] text-slate-700 font-bold">
                Fair balance for lessons already accessed & code learned.
              </div>
            </div>

            {/* Tier 3: >50% Progress (User's Exact Rule) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    TIER 3 • OVER 50%
                  </span>
                  <XCircle size={18} className="text-slate-400" />
                </div>
                <div className="text-2xl font-black text-slate-400">
                  No Refund
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  If you have completed <strong>more than 50%</strong> of the course, or unlocked the verifiable certificate, <strong>no refund is available</strong> under any circumstances.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Course intellectual property & key projects already unlocked.
              </div>
            </div>

          </div>
        </div>

        {/* Live Interactive Refund Calculator */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                <Sparkles size={14} />
                <span>REAL-TIME ESTIMATOR</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                Interactive Refund Eligibility Calculator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Drag the slider to test your course completion percentage and see your exact Cashfree refund payout.
              </p>
            </div>

            {/* Course Selector Buttons */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedCoursePrice(299);
                  setSelectedCourseName('Full Stack Masterclass (₹299)');
                }}
                className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCoursePrice === 299 ? 'bg-[#FB4400] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ₹299 Flagship
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCoursePrice(99);
                  setSelectedCourseName('Video Pass (₹99)');
                }}
                className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCoursePrice === 99 ? 'bg-[#FB4400] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ₹99 Video Pass
              </button>
            </div>
          </div>

          {/* Slider and Live Calculator Box */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Course Completion Progress:</span>
                <span className="font-mono text-base font-black text-[#FB4400]">{calcProgress}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={calcProgress}
                onChange={e => setCalcProgress(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FB4400]"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% (Just Enrolled)</span>
                <span className="text-emerald-600 font-bold">10%</span>
                <span className="text-[#FB4400] font-bold">50% (Cutoff)</span>
                <span>100% (Completed)</span>
              </div>
            </div>

            {/* Live Result Display Box */}
            <div className={`p-5 rounded-2xl border transition-all ${
              currentCalc.percentage === 100
                ? 'bg-emerald-50/70 border-emerald-300'
                : currentCalc.percentage === 50
                ? 'bg-orange-50/80 border-orange-300'
                : 'bg-slate-50 border-slate-300'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  currentCalc.percentage === 100
                    ? 'bg-emerald-200 text-emerald-900'
                    : currentCalc.percentage === 50
                    ? 'bg-[#FB4400] text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {currentCalc.badge}
                </span>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Cashfree Refund Payout:</span>
                  <span className="text-2xl font-black text-slate-900">
                    ₹{currentCalc.amount}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentCalc.description}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Area: Submit Refund Request & Cashfree Settlement Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Form: Submit a Refund Request */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <div className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
                Instant Request Portal
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Submit Refund Request
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your payment details. Requests are validated automatically against your course progress.
              </p>
            </div>

            <form onSubmit={handleSubmitRefund} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Hariharan S"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Registered Email Address *</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  placeholder="e.g. student@skyrovix.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Cashfree Order ID / Payment Reference *</label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  placeholder="e.g. CF_ORD_789123 or UPI Ref ID"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label>Current Course Completion: {formProgress}%</label>
                  <span className={formProgress <= 50 ? 'text-emerald-600' : 'text-rose-600'}>
                    {formProgress <= 50 ? 'Eligible for 50% Refund' : 'No Refund (>50%)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formProgress}
                  onChange={e => setFormProgress(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Reason for Request *</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Tell us what didn't meet your expectations..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-extrabold shadow-md shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>Submit Refund via Cashfree</span>
              </button>
            </form>
          </div>

          {/* Right Column: Cashfree Gateway Settlement Mechanics */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CreditCard size={16} className="text-[#FB4400]" />
                <span>How Cashfree Processes Your Refund</span>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">1. Source Payout Guarantee</strong>
                  <p className="text-[11px] text-slate-500">
                    Refunds are paid directly back to the original source account (UPI ID, Google Pay, PhonePe, Debit/Credit Card, or NetBanking). No manual wallet transfers or store credits.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">2. Cashfree ARN Generated</strong>
                  <p className="text-[11px] text-slate-500">
                    Upon approval, our automated Cashfree integration generates an Acquirer Reference Number (ARN) that can be shared with your issuing bank if needed.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">3. Cancellation of Course Pass</strong>
                  <p className="text-[11px] text-slate-500">
                    When a 50% refund is issued, your course enrollment status is deactivated, and certificate minting rights are revoked.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-slate-900">
                <HelpCircle size={14} className="text-[#FB4400]" />
                <span>Direct Support Desk</span>
              </div>
              <p className="text-[11px] text-slate-600">
                For expedited queries regarding pending refunds, contact our finance team directly at <a href="mailto:billing@skyrovix.in" className="text-[#FB4400] font-bold underline">billing@skyrovix.in</a>.
              </p>
            </div>
          </div>

        </div>

        {/* Live Refund Request Tracker Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                My Refund Request History
              </h3>
              <p className="text-xs text-slate-500">
                Track live approval and Cashfree ARN disbursement status
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {tickets.length} Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-3 px-6">Ticket ID</th>
                  <th className="py-3 px-6">Course & Order</th>
                  <th className="py-3 px-6">Progress</th>
                  <th className="py-3 px-6">Refund Tier</th>
                  <th className="py-3 px-6">Status & ARN</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {ticket.id}
                      <span className="block text-[10px] text-slate-400 font-normal">{ticket.createdAt}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{ticket.courseName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{ticket.orderId}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-700">{ticket.progressPercent}%</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        ticket.refundTier === '50%'
                          ? 'bg-orange-100 text-[#FB4400]'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {ticket.refundTier} Return
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock size={11} />
                        {ticket.status}
                      </span>
                      {ticket.cashfreeArn && (
                        <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                          {ticket.cashfreeArn}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      <span className="text-sm text-emerald-600">{ticket.refundAmount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

