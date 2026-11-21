import React, { useState } from 'react';
import { brandImages } from '../../assets/brandImages';
import {
  X,
  Briefcase,
  CheckCircle2,
  Award,
  Calendar,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Code,
  Laptop,
  Send,
  Building2,
  ShieldCheck,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({ isOpen, onClose }) => {
  const [selectedDomain, setSelectedDomain] = useState<'fullstack' | 'frontend' | 'backend' | 'datascience'>('fullstack');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCollege, setApplicantCollege] = useState('');
  const [applicantDuration, setApplicantDuration] = useState('3 Months');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const domains = [
    {
      id: 'fullstack',
      title: 'Full Stack Web Development Internship',
      desc: 'Work on live enterprise web apps using React 19, Next.js, Node.js, and PostgreSQL.',
      duration: '1 to 6 Months',
      stipend: 'Performance-Based Stipend',
      mode: 'Remote / Hybrid',
      skills: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs']
    },
    {
      id: 'frontend',
      title: 'Frontend UI/UX Architecture Internship',
      desc: 'Build high-performance, accessible client interfaces with Tailwind CSS and TypeScript.',
      duration: '1 to 3 Months',
      stipend: 'Performance-Based Stipend',
      mode: 'Remote',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Web']
    },
    {
      id: 'backend',
      title: 'Backend & Cloud Systems Internship',
      desc: 'Architect scalable microservices, database schemas, authentication systems, and cloud APIs.',
      duration: '2 to 6 Months',
      stipend: 'Performance-Based Stipend',
      mode: 'Remote',
      skills: ['Node.js', 'Express', 'MySQL', 'MongoDB', 'Redis', 'AWS/Docker']
    },
    {
      id: 'datascience',
      title: 'Data Science & Machine Learning Internship',
      desc: 'Analyze large-scale datasets, build predictive models, and design data pipelines with Python.',
      duration: '2 to 6 Months',
      stipend: 'Performance-Based Stipend',
      mode: 'Remote',
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'SQL']
    }
  ];

  const activeDomainInfo = domains.find(d => d.id === selectedDomain) || domains[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50/50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden">
              <img src={brandImages.internship} alt="Skyrovix Internship" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight">Skyrovix Internship & Training</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700">
                  HIRING
                </span>
              </div>
              <a
                href="https://skyrovix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-[#FB4400] hover:underline flex items-center gap-1 font-bold mt-0.5"
              >
                <span>Official Portal: skyrovix.in</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Launch Your Career with <span className="text-[#FB4400]">Skyrovix Technical Internships</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Gain real hands-on industry experience by building production-grade software under senior engineering mentors. Receive an official Government MSME verified experience letter, performance stipend, and letter of recommendation (LOR).
            </p>
          </div>

          {/* Key Internship Perks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-center space-y-1">
              <Laptop className="w-5 h-5 text-[#FB4400] mx-auto" />
              <div className="text-xs font-bold text-slate-900">Live Client Projects</div>
              <div className="text-[11px] text-slate-500">Real production codebase</div>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-center space-y-1">
              <Award className="w-5 h-5 text-[#FB4400] mx-auto" />
              <div className="text-xs font-bold text-slate-900">MSME Accredited</div>
              <div className="text-[11px] text-slate-500">Verified Experience Certificate</div>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-center space-y-1">
              <Users className="w-5 h-5 text-[#FB4400] mx-auto" />
              <div className="text-xs font-bold text-slate-900">1:1 Mentorship</div>
              <div className="text-[11px] text-slate-500">Weekly code reviews</div>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-center space-y-1">
              <Briefcase className="w-5 h-5 text-[#FB4400] mx-auto" />
              <div className="text-xs font-bold text-slate-900">PPO & Stipend</div>
              <div className="text-[11px] text-slate-500">Full-time conversion offer</div>
            </div>
          </div>

          {/* Domain Selection Tabs */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Step 1: Choose Your Internship Track
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domains.map(d => {
                const isSelected = selectedDomain === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDomain(d.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-orange-50/70 border-[#FB4400] ring-1 ring-[#FB4400] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">{d.title}</h4>
                      {isSelected && <CheckCircle2 size={16} className="text-[#FB4400] shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{d.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.skills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Application Form */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">Step 2: Submit Your Application</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selected track: <span className="font-bold text-[#FB4400]">{activeDomainInfo.title}</span>
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ⚡ Quick 1-Min Form
              </span>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-white border border-emerald-200 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Application Successfully Submitted!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-800">{applicantName || 'Developer'}</span>! Our engineering talent acquisition team has received your application for the {activeDomainInfo.title}. We will contact you at <span className="font-bold text-slate-800">{applicantEmail}</span> within 24–48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={e => setApplicantName(e.target.value)}
                      placeholder="Hariharan S"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FB4400] shadow-2xs font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={e => setApplicantEmail(e.target.value)}
                      placeholder="developer@skyrovix.dev"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FB4400] shadow-2xs font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={e => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FB4400] shadow-2xs font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">College / University / Degree</label>
                    <input
                      type="text"
                      value={applicantCollege}
                      onChange={e => setApplicantCollege(e.target.value)}
                      placeholder="B.Tech Computer Science"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FB4400] shadow-2xs font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Duration</label>
                    <select
                      value={applicantDuration}
                      onChange={e => setApplicantDuration(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FB4400] shadow-2xs font-medium"
                    >
                      <option value="1 Month">1 Month (Fast-Track Project)</option>
                      <option value="3 Months">3 Months (Recommended Standard)</option>
                      <option value="6 Months">6 Months (Full Industry Immersion)</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-6 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <span>Submit Internship Application</span>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

