import React, { useState, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Share2,
  Gift,
  ArrowLeft,
  Copy,
  Check,
  Send,
  Users,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight
} from 'lucide-react';

interface ReferralRecord {
  id: string;
  name: string;
  email: string;
  date: string;
  status: 'Enrolled' | 'Registered' | 'Pending';
  xpAwarded: number;
}

const DEFAULT_REFERRALS: ReferralRecord[] = [
  {
    id: 'ref-1',
    name: 'Suresh Kumar',
    email: 'suresh.k@gmail.com',
    date: 'Yesterday, 4:30 PM',
    status: 'Enrolled',
    xpAwarded: 500
  },
  {
    id: 'ref-2',
    name: 'Meena Viswanathan',
    email: 'meena.v@outlook.com',
    date: '3 days ago',
    status: 'Registered',
    xpAwarded: 150
  },
  {
    id: 'ref-3',
    name: 'Akash Sundar',
    email: 'akash.dev@gmail.com',
    date: '5 days ago',
    status: 'Pending',
    xpAwarded: 0
  }
];

export const ReferralPage: React.FC = () => {
  const { setCurrentView, currentUser, showGlobalToast, addXP } = usePlatform();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Invite form state
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [friendPhone, setFriendPhone] = useState('');

  // Referral records state persisted in LocalStorage
  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_referral_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_REFERRALS;
  });

  // Unique referral code for user
  const userInitials = (currentUser?.name || 'STUDENT')
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 4);
  const referralCode = `SKY-${userInitials || 'DEV'}-7892`;
  const referralLink = `https://skyrovix.in/join?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    showGlobalToast('Referral link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    showGlobalToast('Referral code copied!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || (!friendEmail.trim() && !friendPhone.trim())) {
      showGlobalToast('Please enter a friend name and email/phone.');
      return;
    }

    const newRecord: ReferralRecord = {
      id: `ref-${Date.now()}`,
      name: friendName.trim(),
      email: friendEmail.trim() || friendPhone.trim(),
      date: 'Just now',
      status: 'Pending',
      xpAwarded: 50
    };

    const updated = [newRecord, ...referrals];
    setReferrals(updated);
    try {
      localStorage.setItem('skyrovix_referral_history', JSON.stringify(updated));
    } catch (e) {}

    // Award bonus XP for inviting
    addXP(50);
    showGlobalToast(`Invite sent to ${friendName}! You earned +50 XP.`);

    setFriendName('');
    setFriendEmail('');
    setFriendPhone('');
  };

  const totalEarnedXP = referrals.reduce((acc, curr) => acc + curr.xpAwarded, 0);
  const enrolledCount = referrals.filter(r => r.status === 'Enrolled').length;

  const shareText = `Hey! I'm learning Full Stack Web Development and AI on Skyrovix. Join with my code ${referralCode} and get 500 bonus XP: ${referralLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-orange-100/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Community</span>
              <span>/</span>
              <span className="text-[#FB4400] font-bold">Refer & Earn Program</span>
            </div>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
            <Gift size={13} className="text-amber-600" />
            500 XP Per Enrolled Friend
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50/60 to-white rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Gift size={14} />
              <span>GIVE 500 XP, GET 500 XP</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Invite Friends. Learn Together. Earn Rewards.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Share your passion for coding with peers and colleagues. When your friend signs up and starts learning, you both earn 500 XP to redeem in the Skyrovix Rewards Store.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-amber-300/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Referral Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Invites</span>
              <Users size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{referrals.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Friends invited by you</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Enrolled Friends</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{enrolledCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Actively learning courses</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">XP Earned</span>
              <Zap size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-600">+{totalEarnedXP} XP</div>
            <div className="text-[11px] text-slate-500 mt-1">Added to your global wallet</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Next Reward Tier</span>
              <Award size={16} className="text-[#FB4400]" />
            </div>
            <div className="text-2xl font-extrabold text-[#FB4400]">Silver Tier</div>
            <div className="text-[11px] text-slate-500 mt-1">2 more invites to unlock voucher</div>
          </div>
        </div>

        {/* Share Tools: Referral Link & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Your Unique Link Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <div className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
                Personalized Link
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Your Unique Invite Link & Code
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Anyone who signs up with this link will automatically link to your account.
              </p>
            </div>

            {/* Link Input & Copy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Referral URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-sm transition-all active:scale-95"
                >
                  {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Input & Copy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Referral Promo Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-orange-50/60 border border-orange-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold tracking-wider font-mono text-[#FB4400]">
                  {referralCode}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#FB4400] text-slate-700 hover:text-[#FB4400] shadow-2xs transition-all active:scale-95"
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 mb-2.5">
                Share directly via social platforms:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs hover:bg-blue-100 transition-colors"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 font-bold text-xs hover:bg-sky-100 transition-colors"
                >
                  <Twitter size={15} />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Invite Form */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Direct Dispatch
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Invite a Friend via Email / WhatsApp
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We will send them an official invitation with your bonus link attached.
              </p>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Friend's Full Name *</label>
                <input
                  type="text"
                  required
                  value={friendName}
                  onChange={e => setFriendName(e.target.value)}
                  placeholder="e.g. Dinesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={friendEmail}
                  onChange={e => setFriendEmail(e.target.value)}
                  placeholder="e.g. dinesh@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Or WhatsApp Number</label>
                <input
                  type="tel"
                  value={friendPhone}
                  onChange={e => setFriendPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400]"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-[#FB4400] text-white text-xs font-extrabold shadow-md transition-all active:scale-95"
              >
                <Send size={14} />
                <span>Send Invitation (+50 XP)</span>
              </button>
            </form>
          </div>

        </div>

        {/* Real-time Referral History Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Your Referral Network Activity
              </h3>
              <p className="text-xs text-slate-500">
                Live list of invited learners and real-time status updates
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {referrals.length} Total Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-3 px-6">Learner Name</th>
                  <th className="py-3 px-6">Contact</th>
                  <th className="py-3 px-6">Date Invited</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">XP Credited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referrals.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {record.name}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                      {record.email}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {record.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        record.status === 'Enrolled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : record.status === 'Registered'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {record.status === 'Enrolled' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      {record.xpAwarded > 0 ? (
                        <span className="text-emerald-600 font-bold">+{record.xpAwarded} XP</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
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

