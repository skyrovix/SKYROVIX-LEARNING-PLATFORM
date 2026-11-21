import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Gift,
  Zap,
  Flame,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShoppingBag,
  Award,
  ShieldCheck,
  UserCheck,
  Clock,
  ExternalLink,
  Tag
} from 'lucide-react';

interface RewardItem {
  id: string;
  title: string;
  category: 'voucher' | 'badge' | 'mentorship' | 'merch';
  xpCost: number;
  desc: string;
  badgeTag: string;
  code: string;
  icon: string;
}

interface ClaimedReward {
  id: string;
  rewardId: string;
  title: string;
  code: string;
  claimedAt: string;
  xpSpent: number;
}

const REWARDS_CATALOG: RewardItem[] = [
  {
    id: 'rew-1',
    title: '100% Full Scholarship Masterclass Code',
    category: 'voucher',
    xpCost: 1000,
    desc: 'Unlocks any ₹99 or ₹299 full masterclass video curriculum with zero payment. Guaranteed 100% discount coupon.',
    badgeTag: '100% OFF',
    code: 'STUDENT100',
    icon: '🎟️'
  },
  {
    id: 'rew-2',
    title: '50% Flat Off Video Pass Voucher',
    category: 'voucher',
    xpCost: 500,
    desc: 'Instant 50% discount applicable during checkout for any premium video certification track.',
    badgeTag: '50% OFF',
    code: 'SAVE50',
    icon: '🏷️'
  },
  {
    id: 'rew-3',
    title: 'Skyrovix Pro Verified Profile Badge',
    category: 'badge',
    xpCost: 400,
    desc: 'Permanent verified accreditation badge displayed on your student ID, public profile, and project showcase.',
    badgeTag: 'VERIFIED',
    code: 'PRO-VERIFIED-2026',
    icon: '🛡️'
  },
  {
    id: 'rew-4',
    title: '1-on-1 Code & Portfolio Review Session',
    category: 'mentorship',
    xpCost: 1200,
    desc: '30-minute interactive live code review with a senior software architect. Direct feedback on GitHub repositories.',
    badgeTag: 'MENTORSHIP',
    code: 'REVIEW-MENTOR-30',
    icon: '💼'
  },
  {
    id: 'rew-5',
    title: 'Official Skyrovix Developer Hoodie & Decals',
    category: 'merch',
    xpCost: 2500,
    desc: 'Heavyweight organic cotton developer hoodie with embroidered Skyrovix emblem and 10 waterproof vinyl stickers.',
    badgeTag: 'PHYSICAL SWAG',
    code: 'SWAG-HOODIE-KIT',
    icon: '👕'
  },
  {
    id: 'rew-6',
    title: 'Skyrovix Matte Black Ceramic Coffee Mug',
    category: 'merch',
    xpCost: 1500,
    desc: 'High-grade 350ml insulated ceramic mug engraved with "Eat. Code. Ship. Repeat." Delivered directly to your address.',
    badgeTag: 'MERCH',
    code: 'SWAG-COFFEE-MUG',
    icon: '☕'
  }
];

export const RewardsPage: React.FC = () => {
  const { setCurrentView, userXP, streakDays, showGlobalToast, addXP } = usePlatform();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'catalog' | 'claimed'>('catalog');

  // Claimed Rewards state persisted in LocalStorage
  const [claimedRewards, setClaimedRewards] = useState<ClaimedReward[]>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_claimed_rewards');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'claim-init-1',
        rewardId: 'rew-2',
        title: '50% Flat Off Video Pass Voucher',
        code: 'SAVE50',
        claimedAt: '12 Nov 2026',
        xpSpent: 500
      }
    ];
  });

  const availableXP = userXP || 650;

  const handleClaim = (reward: RewardItem) => {
    // Check if already claimed
    const already = claimedRewards.some(c => c.rewardId === reward.id);
    if (already) {
      showGlobalToast(`You already claimed "${reward.title}"! Code: ${reward.code}`);
      setActiveTab('claimed');
      return;
    }

    if (availableXP < reward.xpCost) {
      showGlobalToast(`You need ${reward.xpCost - availableXP} more XP to claim this reward!`);
      return;
    }

    const newClaim: ClaimedReward = {
      id: `claim-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: reward.code,
      claimedAt: 'Just now',
      xpSpent: reward.xpCost
    };

    const updated = [newClaim, ...claimedRewards];
    setClaimedRewards(updated);
    try {
      localStorage.setItem('skyrovix_claimed_rewards', JSON.stringify(updated));
    } catch (e) {}

    // Deduct XP
    addXP(-reward.xpCost);
    showGlobalToast(`🎉 Reward Claimed: "${reward.title}"! Code: ${reward.code}`);
    setActiveTab('claimed');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showGlobalToast(`Code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredRewards = REWARDS_CATALOG.filter(r =>
    selectedCategory === 'all' || r.category === selectedCategory
  );

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
              <span>Resources</span>
              <span>/</span>
              <span className="text-[#FB4400] font-bold">Rewards Store</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1.5">
              <Gift size={13} className="text-rose-500" />
              Instant Code Delivery
            </span>
          </div>
        </div>

        {/* Hero Banner with Live Balance */}
        <div className="bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Gift size={14} />
              <span>REDEEM YOUR LEARNING REPUTATION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Skyrovix Rewards & Scholarship Vault
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Your dedication to mastering tech turns into real-world privileges. Exchange your accumulated XP for 100% course scholarships, pro verified badges, and merchandise.
            </p>
          </div>

          {/* Live Wallet Box */}
          <div className="bg-white rounded-3xl border border-orange-200 p-6 shadow-md shrink-0 w-full md:w-auto relative z-10 space-y-3">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Available Wallet Balance
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-600">
                <Zap size={24} className="fill-amber-500" />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 leading-none">
                  {availableXP.toLocaleString()}
                </div>
                <div className="text-xs font-bold text-slate-500 mt-0.5">
                  Total XP Balance
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 text-orange-600">
                <Flame size={14} /> {streakDays || 3}d Active Streak
              </span>
              <button
                onClick={() => addXP(100)}
                className="cursor-pointer text-[11px] font-bold text-[#FB4400] hover:underline"
              >
                +100 Test XP
              </button>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-rose-400/10 to-orange-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* View Switcher: Catalog vs My Claimed Rewards */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Browse Reward Catalog
            </button>
            <button
              onClick={() => setActiveTab('claimed')}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold transition-all relative ${
                activeTab === 'claimed'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>My Claimed Codes</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#FB4400] text-white">
                {claimedRewards.length}
              </span>
            </button>
          </div>

          {activeTab === 'catalog' && (
            <div className="flex items-center gap-2 overflow-x-auto">
              {(['all', 'voucher', 'badge', 'mentorship', 'merch'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#FB4400] text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Rewards' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {activeTab === 'catalog' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map(reward => {
              const isClaimed = claimedRewards.some(c => c.rewardId === reward.id);
              const canAfford = availableXP >= reward.xpCost;

              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{reward.icon}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-[#FB4400] border border-orange-200">
                        {reward.badgeTag}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 mb-2">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {reward.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">Cost</div>
                      <div className="text-lg font-black text-slate-900 flex items-center gap-1">
                        <Zap size={16} className="text-amber-500 fill-amber-500" />
                        <span>{reward.xpCost} XP</span>
                      </div>
                    </div>

                    {isClaimed ? (
                      <button
                        onClick={() => setActiveTab('claimed')}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        <Check size={14} />
                        <span>Claimed</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaim(reward)}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
                          canAfford
                            ? 'bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-sm shadow-orange-500/20'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-400'
                        }`}
                      >
                        <ShoppingBag size={14} />
                        <span>{canAfford ? 'Redeem Reward' : 'Need More XP'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* My Claimed Rewards Tab */
          <div className="space-y-4">
            {claimedRewards.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <Gift size={40} className="mx-auto text-slate-300" />
                <h3 className="text-base font-bold text-slate-900">No Rewards Claimed Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Earn XP by watching video lessons and solving practice exercises, then exchange them for coupons.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#FB4400] text-white"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claimedRewards.map(claim => (
                  <div
                    key={claim.id}
                    className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Active & Unused
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{claim.claimedAt}</span>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        {claim.title}
                      </h4>
                      <div className="text-xs text-slate-500 mt-1">
                        Spent: <strong className="text-slate-800">{claim.xpSpent} XP</strong>
                      </div>
                    </div>

                    <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">
                          Promo / Voucher Code
                        </div>
                        <div className="font-mono text-base font-black text-[#FB4400] tracking-wider">
                          {claim.code}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyCode(claim.code)}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#FB4400] text-slate-800 hover:text-[#FB4400] shadow-2xs transition-all active:scale-95"
                      >
                        {copiedCode === claim.code ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedCode === claim.code ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500">Apply during course checkout</span>
                      <button
                        onClick={() => setCurrentView('catalog')}
                        className="cursor-pointer font-bold text-[#FB4400] hover:underline"
                      >
                        Use in Catalog →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

