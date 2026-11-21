import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import {
  X,
  Download,
  Share2,
  Users,
  BookOpen,
  Award,
  Smartphone,
  Gift,
  DollarSign,
  Trophy,
  Sparkles,
  FileText,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Flame,
  ArrowRight,
  Star,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ResourceTab =
  | 'free-resources'
  | 'referral'
  | 'success-stories'
  | 'blogs'
  | 'learn-hub'
  | 'get-app'
  | 'rewards'
  | 'affiliate'
  | 'leaderboard'
  | 'whats-new'
  | 'resume-builder'
  | 'community-hub';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ResourceTab;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'free-resources'
}) => {
  const { setCurrentView } = usePlatform();
  const [activeTab, setActiveTab] = useState<ResourceTab>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);

  // Resume builder states
  const [resumeData, setResumeData] = useState({
    fullName: 'Hariharan S',
    title: 'Full Stack Software Engineer',
    email: 'hariharan@skyrovix.dev',
    phone: '+91 98765 43210',
    location: 'Chennai, India',
    github: 'github.com/skyrovix-dev',
    linkedin: 'linkedin.com/in/hariharan',
    summary:
      'Passionate Software Engineer experienced in building scalable full-stack web applications with React 19, Next.js, Node.js, and PostgreSQL. Proficient in distributed system architecture, database optimization, and modern UI engineering.',
    skills: 'React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MySQL, Tailwind CSS, Docker, Git',
    experience:
      'Full Stack Engineering Intern @ Skyrovix (2026)\n- Engineered responsive client interfaces with React 19 and Tailwind CSS.\n- Designed REST APIs with Node.js and optimized PostgreSQL queries by 35%.\n- Integrated real-time code sandbox iframe runners and automated assessment workflows.'
  });

  if (!isOpen) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://skyrovix.com/ref/HARI2026');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const navItems: Array<{ id: ResourceTab; label: string; icon: React.FC<{ size?: number; className?: string }> }> = [
    { id: 'free-resources', label: 'Free Resources', icon: Download },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'learn-hub', label: 'Learn Hub', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'referral', label: 'Referral', icon: Share2 },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'success-stories', label: 'Success Stories', icon: Star },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'community-hub', label: 'Community Hub', icon: MessageSquare },
    { id: 'whats-new', label: "What's New?", icon: Sparkles },
    { id: 'get-app', label: 'Get The App', icon: Smartphone },
    { id: 'affiliate', label: 'Become an Affiliate', icon: DollarSign }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[88vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={brandImages.logo} alt="Skyrovix" className="h-8 w-auto object-contain" />
            <div className="h-5 w-px bg-slate-200"></div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              Skyrovix Resources & Ecosystem Hub
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Left Navigation + Right Content Canvas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Vertical Sub-Navigation */}
          <aside className="w-56 sm:w-64 border-r border-slate-200 bg-slate-50/60 p-3 space-y-1 overflow-y-auto shrink-0">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Menu Explorer
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#FB4400] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Right Main Content Pane */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white">
            {[
              'resume-builder',
              'learn-hub',
              'leaderboard',
              'referral',
              'rewards',
              'success-stories',
              'community-hub'
            ].includes(activeTab) && (
              <div className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/90 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                  <Sparkles size={16} className="text-[#FB4400] shrink-0" />
                  <span>A dedicated full-screen interactive page is available for this feature!</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView(activeTab);
                  }}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
                >
                  <span>Open Dedicated Page</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            )}
            {/* 1. FREE RESOURCES */}
            {activeTab === 'free-resources' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <Download size={14} />
                    <span>Free Educational Downloads</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Engineering Cheatsheets & Architecture Guides
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Download curated, printable PDF cheatsheets, interview preparation guides, and code templates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'HTML5 Semantic Web Cheatsheet', tag: 'Frontend', size: '2.4 MB', pages: '8 Pages PDF' },
                    { title: 'CSS Flexbox & Modern Grid Master Guide', tag: 'Frontend', size: '3.1 MB', pages: '12 Pages PDF' },
                    { title: 'JavaScript ES2024 Modern Methods & Async', tag: 'Core JS', size: '4.5 MB', pages: '16 Pages PDF' },
                    { title: 'React 19 Hooks & Server Actions Reference', tag: 'React', size: '3.8 MB', pages: '14 Pages PDF' },
                    { title: 'Node.js & Express REST API Architecture', tag: 'Backend', size: '5.2 MB', pages: '20 Pages PDF' },
                    { title: 'MySQL & PostgreSQL Query Optimization Guide', tag: 'Database', size: '4.1 MB', pages: '15 Pages PDF' },
                    { title: 'Python for Data Science & ML Roadmap', tag: 'Python', size: '6.0 MB', pages: '22 Pages PDF' },
                    { title: 'System Design Interview Playbook', tag: 'Architecture', size: '7.8 MB', pages: '28 Pages PDF' }
                  ].map((res, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all flex items-center justify-between group">
                      <div>
                        <span className="text-[10px] font-bold text-[#FB4400] uppercase font-mono">{res.tag}</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-0.5 group-hover:text-[#FB4400] transition-colors">{res.title}</h4>
                        <div className="text-[11px] text-slate-400 mt-1">{res.pages} • {res.size}</div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading: ${res.title}`)}
                        className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FB4400] transition-colors shadow-2xs"
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. RESUME BUILDER */}
            {activeTab === 'resume-builder' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                      <FileText size={14} />
                      <span>Developer Tool</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                      ATS-Friendly Tech Resume Builder
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Draft your engineering resume with pre-tested bullet points and export to printable PDF.
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-[#FB4400] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Printer size={14} />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Form */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.fullName}
                        onChange={e => setResumeData({ ...resumeData, fullName: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Target Title</label>
                        <input
                          type="text"
                          value={resumeData.title}
                          onChange={e => setResumeData({ ...resumeData, title: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400]"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Email</label>
                        <input
                          type="text"
                          value={resumeData.email}
                          onChange={e => setResumeData({ ...resumeData, email: e.target.value })}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Professional Summary</label>
                      <textarea
                        rows={3}
                        value={resumeData.summary}
                        onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Technical Skills</label>
                      <input
                        type="text"
                        value={resumeData.skills}
                        onChange={e => setResumeData({ ...resumeData, skills: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Project / Experience Bullet Points</label>
                      <textarea
                        rows={4}
                        value={resumeData.experience}
                        onChange={e => setResumeData({ ...resumeData, experience: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#FB4400] font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Right Live Paper Preview */}
                  <div className="p-6 bg-white border border-slate-300 rounded-2xl shadow-inner font-sans text-xs space-y-4">
                    <div className="border-b border-slate-300 pb-3 text-center">
                      <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">{resumeData.fullName}</h4>
                      <p className="text-xs font-semibold text-[#FB4400]">{resumeData.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{resumeData.email} • {resumeData.phone} • {resumeData.location}</p>
                    </div>

                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-slate-800 border-b border-slate-200 pb-1 mb-1">
                        Professional Summary
                      </h5>
                      <p className="text-slate-600 leading-relaxed text-[11px]">{resumeData.summary}</p>
                    </div>

                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-slate-800 border-b border-slate-200 pb-1 mb-1">
                        Technical Skills
                      </h5>
                      <p className="text-slate-700 text-[11px] font-mono">{resumeData.skills}</p>
                    </div>

                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-slate-800 border-b border-slate-200 pb-1 mb-1">
                        Experience & Projects
                      </h5>
                      <pre className="text-slate-600 whitespace-pre-wrap font-sans text-[11px] leading-relaxed">
                        {resumeData.experience}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. REFERRAL PROGRAM */}
            {activeTab === 'referral' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <Share2 size={14} />
                    <span>Refer & Earn</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Invite Developers, Earn Knowledge Rewards
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Give friends lifetime access to 435 free lessons. Earn 500 XP and unlocked premium badges for each referral.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-orange-50/60 border border-orange-200 space-y-4">
                  <div className="text-xs font-bold text-slate-800">Your Personal Referral Link</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://skyrovix.com/ref/HARI2026"
                      className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-none"
                    />
                    <button
                      onClick={handleCopyReferral}
                      className="px-4 py-2.5 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    3 friends joined this month • 1,500 XP rewarded to your account!
                  </p>
                </div>
              </div>
            )}

            {/* 4. SUCCESS STORIES */}
            {activeTab === 'success-stories' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <Star size={14} />
                    <span>Alumni Outcomes</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Student Success Stories
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Discover how our learners transitioned into top engineering roles across global technology leaders.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Karthik Raja', role: 'Software Engineer @ Zoho', story: 'Completed the Full Stack Masterclass and built 3 live portfolio projects. The in-browser sandbox and verified credentials gave me immense confidence in technical rounds.' },
                    { name: 'Sneha Patel', role: 'Frontend Engineer @ Swiggy', story: 'The React 19 and Next.js 15 tracks are ahead of any bootcamp. The architecture explanations are crystal clear.' },
                    { name: 'Aditya Verma', role: 'Backend Developer @ Freshworks', story: 'Mastered PostgreSQL indexing and Node.js microservices. Skyrovix was the turning point in my career switch from non-CS to engineering.' },
                    { name: 'Meera Nair', role: 'Data Analyst @ Deloitte', story: 'Learned Python, Pandas, and NumPy from scratch. The 435 text documentation lessons are like the holy grail of modern programming.' }
                  ].map((s, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-amber-400" />)}
                      </div>
                      <p className="text-xs text-slate-600 italic">"{s.story}"</p>
                      <div className="pt-2 border-t border-slate-100">
                        <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                        <div className="text-[11px] text-[#FB4400] font-semibold">{s.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. BLOGS */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <BookOpen size={14} />
                    <span>Technical Publications</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Skyrovix Engineering Blogs
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Deep dives on software architecture, compiler internals, database performance, and distributed web.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Understanding React 19: Server Actions, useOptimistic, and the React Compiler', date: 'November 15, 2026', readTime: '8 min read', tag: 'Frontend' },
                    { title: 'B-Tree Indexing in PostgreSQL: Why Your Queries Are Slow and How to Fix Them', date: 'November 10, 2026', readTime: '12 min read', tag: 'Database' },
                    { title: 'Scaling Node.js Beyond a Single Thread: Worker Threads vs Cluster Mode', date: 'November 05, 2026', readTime: '10 min read', tag: 'Backend' },
                    { title: 'Python 3.13 Free-Threaded Build: The End of the Global Interpreter Lock (GIL)', date: 'October 28, 2026', readTime: '7 min read', tag: 'Python' }
                  ].map((blog, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 hover:border-orange-200 transition-all flex items-center justify-between group cursor-pointer">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
                          <span className="text-[#FB4400] font-bold uppercase">{blog.tag}</span>
                          <span>•</span>
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#FB4400] transition-colors">{blog.title}</h4>
                      </div>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-[#FB4400] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. LEARN HUB */}
            {activeTab === 'learn-hub' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <BookOpen size={14} />
                    <span>Learning Roadmaps</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    The Skyrovix Learn Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Structured roadmap paths taking you from zero fundamentals to senior full-stack architect.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { path: 'Frontend Architect Roadmap', steps: 'HTML5 -> CSS3 Grid -> Modern JS -> React 19 -> Next.js' },
                    { path: 'Backend Engineer Roadmap', steps: 'Node.js -> Express -> MySQL -> PostgreSQL -> Redis -> Docker' },
                    { path: 'Full Stack Master Roadmap', steps: 'Client Architecture -> Server APIs -> Database Indexing -> CI/CD' },
                    { path: 'Data Science & Analytics', steps: 'Python -> NumPy -> Pandas -> Matplotlib -> Machine Learning' }
                  ].map((p, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">{p.path}</h4>
                      <p className="text-xs font-mono text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                        {p.steps}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. GET THE APP */}
            {activeTab === 'get-app' && (
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FB4400] flex items-center justify-center mx-auto shadow-sm">
                  <Smartphone size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    Learn on Any Screen — Skyrovix Mobile App
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Access lessons offline, review code snippets, practice quizzes, and stay on your study streak anywhere.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-3">
                  <div className="w-36 h-36 bg-white border-2 border-dashed border-orange-300 rounded-2xl mx-auto flex items-center justify-center font-mono text-xs text-slate-400">
                    [ QR Code Scan ]
                  </div>
                  <div className="text-xs font-bold text-slate-800">Scan to download on Android & iOS</div>
                  <button
                    onClick={() => alert('Starting Skyrovix Mobile APK download...')}
                    className="w-full py-2.5 rounded-xl bg-[#FB4400] text-white font-bold text-xs shadow-xs"
                  >
                    Download Direct APK (v2.4)
                  </button>
                </div>
              </div>
            )}

            {/* 8. REWARDS STORE */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <Gift size={14} />
                    <span>XP Knowledge Store</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Redeem Your Study XP
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Earn XP by completing chapters and solving quizzes. Exchange them for physical prints and mentor passes!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { reward: 'Official Physical Certificate Print & Frame', xp: '2,500 XP', tag: 'Credential' },
                    { reward: '1-on-1 Code Review with Senior Architect', xp: '5,000 XP', tag: 'Mentorship' },
                    { reward: 'Exclusive Skyrovix Developer Swag Pack', xp: '7,500 XP', tag: 'Swag' }
                  ].map((r, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-200 text-center space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#FB4400] uppercase font-mono">{r.tag}</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-1">{r.reward}</h4>
                      </div>
                      <button
                        onClick={() => alert(`Redeeming: ${r.reward}`)}
                        className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FB4400] font-bold text-xs border border-orange-200"
                      >
                        Claim for {r.xp}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. BECOME AN AFFILIATE */}
            {activeTab === 'affiliate' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <DollarSign size={14} />
                    <span>Partner Program</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Become a Skyrovix Affiliate Partner
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Share our accredited masterclasses with your network and earn up to 30% recurring commission.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-extrabold text-[#FB4400]">30%</div>
                      <div className="text-[10px] text-slate-500">Commission Rate</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-extrabold text-slate-900">60 Days</div>
                      <div className="text-[10px] text-slate-500">Cookie Window</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-extrabold text-emerald-600">Monthly</div>
                      <div className="text-[10px] text-slate-500">Direct Payouts</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Affiliate application submitted! Our partnerships team will reach out.')}
                    className="w-full py-3 rounded-xl bg-[#FB4400] text-white font-bold text-xs shadow-md"
                  >
                    Apply as Skyrovix Affiliate
                  </button>
                </div>
              </div>
            )}

            {/* 10. LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                      <Trophy size={14} />
                      <span>Global Standings</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                      Learner Leaderboard
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FB4400] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    Updated 5m ago
                  </span>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {[
                    { rank: 1, name: 'Hariharan S (You)', xp: '18,450 XP', streak: '18d', badge: 'Architect' },
                    { rank: 2, name: 'Aarav Sharma', xp: '16,200 XP', streak: '15d', badge: 'Full Stack Pro' },
                    { rank: 3, name: 'Divya Krishnan', xp: '15,800 XP', streak: '12d', badge: 'React Specialist' },
                    { rank: 4, name: 'Rohan Gupta', xp: '14,100 XP', streak: '9d', badge: 'Node Lead' },
                    { rank: 5, name: 'Ananya Roy', xp: '12,950 XP', streak: '8d', badge: 'Data Scientist' }
                  ].map(u => (
                    <div key={u.rank} className={`p-3.5 flex items-center justify-between ${u.rank === 1 ? 'bg-orange-50/50 font-bold' : 'hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          u.rank === 1 ? 'bg-amber-400 text-slate-900' : u.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.rank}
                        </span>
                        <div>
                          <span className="text-slate-900 font-bold">{u.name}</span>
                          <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500 font-mono">
                            {u.badge}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-amber-600 font-bold flex items-center gap-1 font-mono">
                          <Flame size={12} className="fill-amber-500" />
                          <span>{u.streak}</span>
                        </span>
                        <span className="font-mono font-bold text-[#FB4400]">{u.xp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. WHAT'S NEW? */}
            {activeTab === 'whats-new' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <Sparkles size={14} />
                    <span>Product Changelog</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    What's New in Skyrovix v2.4
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#FB4400] text-white font-mono font-bold text-[10px]">NEW</span>
                      <span className="font-bold text-slate-900">React 19 & Next.js 15 App Router Masterclass</span>
                      <span className="text-slate-400 text-[10px] ml-auto">Nov 18, 2026</span>
                    </div>
                    <p className="text-slate-600">Full series covering Server Actions, React Compiler, and core Web Vitals optimizations.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold text-[10px]">FEATURE</span>
                      <span className="font-bold text-slate-900">In-Browser Code Sandbox for HTML, CSS, JS & Python</span>
                      <span className="text-slate-400 text-[10px] ml-auto">Nov 15, 2026</span>
                    </div>
                    <p className="text-slate-600">Live preview runner with zero configuration right inside the text chapters.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">CREDENTIAL</span>
                      <span className="font-bold text-slate-900">Government MSME Verified Certificate System</span>
                      <span className="text-slate-400 text-[10px] ml-auto">Nov 10, 2026</span>
                    </div>
                    <p className="text-slate-600">Instant cryptographic ID verification page with printable official certificate stamps.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 12. COMMUNITY HUB */}
            {activeTab === 'community-hub' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB4400] uppercase font-mono">
                    <MessageSquare size={14} />
                    <span>Developer Network</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                    Skyrovix Global Developer Community
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with over 25,000 developers, ask architectural questions, collaborate on projects, and participate in hackathons.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                    <h4 className="font-bold text-indigo-950 text-sm">Discord Community (25K+ Devs)</h4>
                    <p className="text-xs text-indigo-800">Live coding assistance, weekly voice AMA with architects, and code review channels.</p>
                    <button
                      onClick={() => alert('Redirecting to Skyrovix Official Discord server...')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                    >
                      Join Discord Server
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <h4 className="font-bold text-emerald-950 text-sm">WhatsApp Dev Groups</h4>
                    <p className="text-xs text-emerald-800">Regional study groups, daily tech challenge updates, and job referral alerts.</p>
                    <button
                      onClick={() => alert('Opening Skyrovix WhatsApp community invite...')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Join WhatsApp Group
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </motion.div>
    </div>
  );
};

