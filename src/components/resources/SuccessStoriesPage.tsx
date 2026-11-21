import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Star,
  ArrowLeft,
  Sparkles,
  Building2,
  TrendingUp,
  Award,
  CheckCircle2,
  Linkedin,
  ExternalLink,
  Plus,
  Send,
  X,
  Briefcase,
  GraduationCap,
  MessageSquareQuote
} from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  previousRole: string;
  currentRole: string;
  company: string;
  companyLogoText: string;
  packageText: string;
  hikeText: string;
  track: string;
  quote: string;
  certificateId: string;
  linkedin: string;
  date: string;
}

const DEFAULT_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    name: 'Karthikeyan Selvam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Tier-3 College Fresher (ECE)',
    currentRole: 'Software Development Engineer 1',
    company: 'Zoho Corporation',
    companyLogoText: 'ZOHO',
    packageText: '₹8.5 LPA',
    hikeText: '180% Hike',
    track: 'Full Stack',
    quote: 'Skyrovix’s Full Stack Masterclass gave me the confidence to build real scalable full-stack applications. The real-world backend architecture and database indexing modules were directly asked in my technical rounds at Zoho!',
    certificateId: 'SKY-CERT-ZH8921',
    linkedin: 'https://linkedin.com',
    date: 'Placed Nov 2026'
  },
  {
    id: 'story-2',
    name: 'Deepika Raman',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Manual QA Tester',
    currentRole: 'Frontend Software Engineer',
    company: 'Freshworks',
    companyLogoText: 'FRESHWORKS',
    packageText: '₹12.0 LPA',
    hikeText: '240% Hike',
    track: 'Frontend',
    quote: 'Transitioning from manual QA to React 19 development felt intimidating until I worked through Skyrovix’s in-browser sandbox and project curriculum. Within 4 months, I cracked the frontend interview at Freshworks.',
    certificateId: 'SKY-CERT-FW4421',
    linkedin: 'https://linkedin.com',
    date: 'Placed Oct 2026'
  },
  {
    id: 'story-3',
    name: 'Arun Prakash',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Support Executive',
    currentRole: 'Backend Cloud Developer',
    company: 'Swiggy',
    companyLogoText: 'SWIGGY',
    packageText: '₹14.5 LPA',
    hikeText: '310% Hike',
    track: 'Backend',
    quote: 'The system design and microservice modules with Node.js and Redis were second to none. Building high-concurrency rate limiters and streaming pipelines gave me an unfair advantage.',
    certificateId: 'SKY-CERT-SW1092',
    linkedin: 'https://linkedin.com',
    date: 'Placed Sep 2026'
  },
  {
    id: 'story-4',
    name: 'Shweta Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    previousRole: 'MCA Graduate',
    currentRole: 'Associate AI Engineer',
    company: 'TCS Innovation Labs',
    companyLogoText: 'TCS',
    packageText: '₹9.0 LPA',
    hikeText: 'First Job',
    track: 'AI / ML',
    quote: 'The AI & Machine Learning curriculum covered both mathematical foundations and practical PyTorch deployments. The verifiable certificate on my LinkedIn got me noticed by senior tech recruiters.',
    certificateId: 'SKY-CERT-TC7731',
    linkedin: 'https://linkedin.com',
    date: 'Placed Aug 2026'
  }
];

export const SuccessStoriesPage: React.FC = () => {
  const { setCurrentView, currentUser, showGlobalToast } = usePlatform();
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Stories state persisted in LocalStorage
  const [stories, setStories] = useState<SuccessStory[]>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_success_stories');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_STORIES;
  });

  // Story Submission Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [previousRole, setPreviousRole] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [company, setCompany] = useState('');
  const [packageText, setPackageText] = useState('');
  const [track, setTrack] = useState('Full Stack');
  const [quote, setQuote] = useState('');
  const [linkedin, setLinkedin] = useState(currentUser?.linkedin || '');

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !currentRole.trim() || !quote.trim()) {
      showGlobalToast('Please fill out all required fields.');
      return;
    }

    const newStory: SuccessStory = {
      id: `story-${Date.now()}`,
      name: name.trim(),
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      previousRole: previousRole.trim() || 'Student Learner',
      currentRole: currentRole.trim(),
      company: company.trim(),
      companyLogoText: company.toUpperCase().slice(0, 8),
      packageText: packageText.trim() || 'Top Offer',
      hikeText: 'Verified Placement',
      track,
      quote: quote.trim(),
      certificateId: `SKY-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
      linkedin: linkedin.trim() || 'https://linkedin.com',
      date: 'Placed Today'
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    try {
      localStorage.setItem('skyrovix_success_stories', JSON.stringify(updated));
    } catch (e) {}

    showGlobalToast('🎉 Success Story published successfully! Thank you for inspiring peers.');
    setIsSubmitModalOpen(false);

    // Reset fields
    setPreviousRole('');
    setCurrentRole('');
    setCompany('');
    setPackageText('');
    setQuote('');
  };

  const filteredStories = stories.filter(s =>
    selectedTrack === 'all' || s.track.toLowerCase().includes(selectedTrack.toLowerCase())
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
              <span className="text-[#FB4400] font-bold">Success Stories</span>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-sm shadow-orange-500/25 transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>Share Your Placement Story</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Star size={14} className="fill-[#FB4400]" />
              <span>PROVEN CAREER TRANSFORMATIONS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Curious Beginners to Hired Engineers
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Read real placement stories from students who mastered web engineering, AI, and systems design on Skyrovix and landed roles at leading product tech companies.
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-gradient-to-br from-yellow-400/20 to-orange-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Placement Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">1,450+</div>
            <div className="text-xs font-bold text-slate-500 mt-1">Students Placed</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Across India & Global Remote</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-[#FB4400]">₹18.5 LPA</div>
            <div className="text-xs font-bold text-slate-500 mt-1">Highest Domestic Package</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">SDE-1 Cloud & AI Role</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">160%</div>
            <div className="text-xs font-bold text-slate-500 mt-1">Average Salary Hike</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">For Career Switchers</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">300+</div>
            <div className="text-xs font-bold text-slate-500 mt-1">Hiring Tech Companies</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">MNCs, Unicorns & Startups</div>
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(['all', 'Full Stack', 'Frontend', 'Backend', 'AI'] as const).map(tr => (
              <button
                key={tr}
                onClick={() => setSelectedTrack(tr)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all ${
                  selectedTrack === tr
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tr === 'all' ? 'All Placement Tracks' : tr}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500">
            Showing {filteredStories.length} Alumni Stories
          </span>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map(story => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-13 h-13 rounded-2xl object-cover border-2 border-orange-200 shadow-2xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {story.name}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>{story.previousRole}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {story.hikeText}
                  </span>
                  <div className="text-xs font-extrabold text-slate-900 mt-1">
                    {story.packageText}
                  </div>
                </div>
              </div>

              {/* Transition Banner */}
              <div className="bg-orange-50/60 border border-orange-200/70 rounded-2xl p-3.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-[#FB4400]" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">
                      Current Placement
                    </div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {story.currentRole} @ <span className="text-[#FB4400]">{story.company}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono font-bold text-slate-400">
                  {story.date}
                </div>
              </div>

              {/* Quote Content */}
              <div className="relative">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              {/* Footer Meta */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                  <Award size={14} className="text-amber-500" />
                  <span className="font-mono text-slate-700">{story.certificateId}</span>
                </div>

                <a
                  href={story.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-1 text-[#FB4400] font-bold hover:underline"
                >
                  <Linkedin size={13} />
                  <span>Verified Profile</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Share Your Placement Story */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400]">
                  <Sparkles size={14} />
                  <span>SKYROVIX ALUMNI NETWORK</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Share Your Success Story
                </h3>
                <p className="text-xs text-slate-500">
                  Celebrate your career breakthrough and inspire the next cohort of students.
                </p>
              </div>

              <form onSubmit={handleStorySubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Hariharan S"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Hiring Company *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="e.g. Zoho, Amazon"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">New Role *</label>
                    <input
                      type="text"
                      required
                      value={currentRole}
                      onChange={e => setCurrentRole(e.target.value)}
                      placeholder="e.g. SDE-1 Frontend"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Previous Background</label>
                    <input
                      type="text"
                      value={previousRole}
                      onChange={e => setPreviousRole(e.target.value)}
                      placeholder="e.g. College Fresher"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Package / CTC</label>
                    <input
                      type="text"
                      value={packageText}
                      onChange={e => setPackageText(e.target.value)}
                      placeholder="e.g. ₹9 LPA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Experience & Advice *</label>
                  <textarea
                    rows={4}
                    required
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    placeholder="How did Skyrovix courses and sandbox help you prepare and clear your technical interviews?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#FB4400]"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-3 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-extrabold shadow-md shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Publish My Story</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

