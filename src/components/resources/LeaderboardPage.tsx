import React, { useState, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Trophy,
  Medal,
  Flame,
  ArrowLeft,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Zap,
  Award,
  Crown,
  ChevronRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  track: string;
  xp: number;
  streak: number;
  badges: string[];
  college?: string;
  recentActivity?: string;
}

const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'user-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    track: 'Full Stack',
    xp: 4850,
    streak: 28,
    badges: ['Full Stack Master', 'Code Samurai', 'Top Contributor'],
    college: 'IIT Madras',
    recentActivity: 'Completed "PostgreSQL Indexing & Optimization" (+100 XP)'
  },
  {
    rank: 2,
    id: 'user-2',
    name: 'Priya K.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    track: 'Frontend',
    xp: 4320,
    streak: 21,
    badges: ['React 19 Pioneer', 'CSS Wizard'],
    college: 'Anna University',
    recentActivity: 'Built project "E-Commerce Checkout flow" (+150 XP)'
  },
  {
    rank: 3,
    id: 'user-3',
    name: 'Karthik Raja',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    track: 'Backend',
    xp: 3950,
    streak: 19,
    badges: ['Node Architect', 'API Security Pro'],
    college: 'NIT Trichy',
    recentActivity: 'Solved Practice Challenge #14 (+50 XP)'
  },
  {
    rank: 4,
    id: 'user-4',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    track: 'AI / ML',
    xp: 3420,
    streak: 14,
    badges: ['PyTorch Specialist', 'Data Wrangler'],
    college: 'BITS Pilani',
    recentActivity: 'Finished lesson "CNN Feature Maps" (+50 XP)'
  },
  {
    rank: 5,
    id: 'user-5',
    name: 'Vikram Sundaram',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    track: 'Full Stack',
    xp: 3100,
    streak: 12,
    badges: ['Full Stack Master'],
    college: 'PSG College of Technology',
    recentActivity: 'Passed Quiz "Async JavaScript Internals" (+75 XP)'
  },
  {
    rank: 6,
    id: 'user-6',
    name: 'Ananya Reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    track: 'Frontend',
    xp: 2890,
    streak: 11,
    badges: ['Tailwind CSS Champion'],
    college: 'SRM Institute',
    recentActivity: 'Submitted challenge solution in Sandbox (+50 XP)'
  },
  {
    rank: 7,
    id: 'user-7',
    name: 'Rohan Mehra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    track: 'DevOps & Cloud',
    xp: 2540,
    streak: 9,
    badges: ['Docker Pilot'],
    college: 'VIT Vellore',
    recentActivity: 'Completed "Docker Multi-stage Builds" (+50 XP)'
  },
  {
    rank: 8,
    id: 'user-8',
    name: 'Divya Nair',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    track: 'Backend',
    xp: 2210,
    streak: 8,
    badges: ['SQL Query Master'],
    college: 'SSN College of Engineering',
    recentActivity: 'Earned SQL Master Certification (+200 XP)'
  }
];

export const LeaderboardPage: React.FC = () => {
  const { setCurrentView, userXP, streakDays, currentUser, showGlobalToast } = usePlatform();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live real-time activity feed notifications
  const [recentPings, setRecentPings] = useState<string[]>([
    '🔥 Aarav Sharma just extended their streak to 28 days!',
    '⚡ Priya K. earned +50 XP in React 19 Actions',
    '🎓 Karthik Raja completed Backend Architecture Masterclass',
    '💡 Sneha Patel solved Python Data Structures Challenge'
  ]);

  // Merge current user dynamically into rankings
  const myXP = userXP || currentUser?.xp || 450;
  const myStreak = streakDays || 3;
  const myName = currentUser?.name || 'You (Active Learner)';
  const myTrack = currentUser?.track || 'Full Stack';
  const myAvatar = currentUser?.avatar || '';

  // Determine current user simulated rank
  const mySimulatedRank = myXP > 4000 ? 3 : myXP > 3000 ? 6 : myXP > 2000 ? 9 : 14;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showGlobalToast('Leaderboard rankings refreshed live!');
      setRecentPings(prev => [
        `✨ ${myName} just refreshed live leaderboard standings`,
        ...prev.slice(0, 3)
      ]);
    }, 600);
  };

  const filteredUsers = INITIAL_LEADERBOARD.filter(u => {
    const matchesTrack = trackFilter === 'all' || u.track.toLowerCase().includes(trackFilter.toLowerCase());
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (u.college && u.college.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  const top1 = filteredUsers[0];
  const top2 = filteredUsers[1];
  const top3 = filteredUsers[2];

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
              <span className="text-[#FB4400] font-bold">Global Leaderboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#FB4400]' : ''} />
              <span>Refresh Standings</span>
            </button>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Trophy size={14} />
              <span>GLOBAL LEARNER REPUTATION & XP RANKINGS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Skyrovix Student Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Compete with thousands of aspiring engineers across India. Earn XP by completing video masterclasses, passing quiz assessments, and coding in the browser sandbox.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-gradient-to-br from-amber-400/20 to-orange-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Live Activity Marquee Ticker */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs flex items-center gap-3 overflow-hidden">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FB4400] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1.5 shrink-0">
            <Zap size={13} />
            Live Feed
          </span>
          <div className="flex-1 overflow-hidden whitespace-nowrap text-xs text-slate-600 font-medium animate-pulse">
            {recentPings[0]} • {recentPings[1]}
          </div>
        </div>

        {/* Your Personal Ranking Spotlight Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              {myAvatar ? (
                <img
                  src={myAvatar}
                  alt={myName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-400 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-[#FB4400] flex items-center justify-center font-extrabold text-xl text-white shadow-md">
                  {myName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                #{mySimulatedRank}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{myName}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/30">
                  {myTrack}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Keep learning to climb into the Top 10!
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Zap size={14} /> {myXP} Total XP
                </span>
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <Flame size={14} /> {myStreak} Days Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => setCurrentView('practice')}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-md shadow-orange-500/25 transition-all active:scale-95"
            >
              <Sparkles size={14} />
              <span>Earn +150 XP (Practice)</span>
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <span>Explore Courses</span>
            </button>
          </div>

          <div className="absolute -right-16 -top-16 w-52 h-52 bg-[#FB4400]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Podium: Top 3 Learners */}
        {top1 && top2 && top3 && (
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Crown size={18} className="text-amber-500" />
              <span>The Hall of Champions (Top 3)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              
              {/* Silver (Rank 2) */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col items-center text-center relative shadow-xs order-2 md:order-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-extrabold text-slate-700 mb-3 shadow-2xs">
                  🥈 2nd
                </div>
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-300 shadow-md mb-3"
                />
                <h3 className="font-extrabold text-base text-slate-900">{top2.name}</h3>
                <span className="text-[11px] font-bold text-slate-500">{top2.track} • {top2.college}</span>
                
                <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Zap size={14} className="text-amber-500" /> {top2.xp} XP
                  </span>
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame size={14} /> {top2.streak}d Streak
                  </span>
                </div>
              </div>

              {/* Gold (Rank 1 - Elevated) */}
              <div className="bg-gradient-to-b from-amber-50/80 to-white rounded-3xl border-2 border-amber-400 p-6 flex flex-col items-center text-center relative shadow-lg md:-translate-y-3 order-1 md:order-2 ring-4 ring-amber-400/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white font-extrabold text-base flex items-center justify-center mb-3 shadow-md">
                  🥇 1st
                </div>
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-400 shadow-xl mb-3"
                />
                <h3 className="font-extrabold text-lg text-slate-900">{top1.name}</h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full mt-1">
                  Grand Champion • {top1.track}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">{top1.college}</span>

                <div className="mt-4 pt-4 border-t border-amber-200/60 w-full flex items-center justify-between text-xs font-extrabold">
                  <span className="flex items-center gap-1 text-slate-900">
                    <Zap size={15} className="text-[#FB4400]" /> {top1.xp} XP
                  </span>
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame size={15} /> {top1.streak}d Streak
                  </span>
                </div>
              </div>

              {/* Bronze (Rank 3) */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col items-center text-center relative shadow-xs order-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center font-extrabold text-amber-800 mb-3 shadow-2xs">
                  🥉 3rd
                </div>
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md mb-3"
                />
                <h3 className="font-extrabold text-base text-slate-900">{top3.name}</h3>
                <span className="text-[11px] font-bold text-slate-500">{top3.track} • {top3.college}</span>

                <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Zap size={14} className="text-amber-500" /> {top3.xp} XP
                  </span>
                  <span className="flex items-center gap-1 text-orange-600">
                    <Flame size={14} /> {top3.streak}d Streak
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Filters & Full Rankings Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Header Controls */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Timeframe Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
              {(['weekly', 'monthly', 'alltime'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    timeframe === tf
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf === 'alltime' ? 'All Time' : `${tf}`}
                </button>
              ))}
            </div>

            {/* Track & Search Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <select
                value={trackFilter}
                onChange={e => setTrackFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#FB4400]"
              >
                <option value="all">All Learning Tracks</option>
                <option value="Full Stack">Full Stack Web</option>
                <option value="Frontend">Frontend Specialist</option>
                <option value="Backend">Backend & Cloud</option>
                <option value="AI">AI & Machine Learning</option>
              </select>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search student or college..."
                  className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400] w-full sm:w-60"
                />
              </div>
            </div>

          </div>

          {/* Table List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-3 px-6">Rank</th>
                  <th className="py-3 px-6">Student Learner</th>
                  <th className="py-3 px-6">Track & Badges</th>
                  <th className="py-3 px-6">Streak</th>
                  <th className="py-3 px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-orange-50/40 transition-colors group"
                  >
                    <td className="py-4 px-6 font-extrabold text-slate-900">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${
                        user.rank === 1 ? 'bg-amber-100 text-amber-800 font-black' :
                        user.rank === 2 ? 'bg-slate-200 text-slate-700' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'text-slate-500'
                      }`}>
                        #{user.rank}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {user.college || 'Verified Student'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {user.track}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {user.badges.slice(0, 2).map((b, i) => (
                            <span key={i} className="text-[9px] font-medium text-slate-500">
                              • {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 font-bold text-orange-600">
                        <Flame size={14} />
                        <span>{user.streak} Days</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      <span className="text-sm">{user.xp.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-mono block">XP points</span>
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

