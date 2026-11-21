import React, { useState, useEffect, useRef } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  FileText,
  Printer,
  Download,
  Sparkles,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Palette,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Save,
  Eye,
  Sliders
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

interface ProjectItem {
  id: string;
  title: string;
  tech: string;
  link: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}

const DEFAULT_RESUME: ResumeData = {
  fullName: 'Hariharan S',
  headline: 'Full Stack Software Engineer | React, Node.js & Cloud',
  email: 'hariharan@skyrovix.in',
  phone: '+91 98765 43210',
  location: 'Chennai, India',
  website: 'https://skyrovix.in',
  github: 'https://github.com/hariharan',
  linkedin: 'https://linkedin.com/in/hariharan',
  summary: 'Passionate and results-driven Software Engineer with proven expertise in building high-performance web applications using React 19, Next.js, Node.js, and relational database architectures. Strong foundation in clean code, automated testing, and scalable microservices.',
  skills: 'JavaScript, TypeScript, React 19, Next.js 15, Node.js, Express, PostgreSQL, Supabase, MongoDB, Tailwind CSS, Docker, Git, REST APIs, GraphQL',
  experience: [
    {
      id: '1',
      role: 'Full Stack Developer Intern',
      company: 'Skyrovix Engineering Academy',
      duration: '2024 - Present',
      location: 'Remote',
      description: 'Architected and implemented real-time learning management modules, interactive video player components, and automated certificate generation pipelines serving thousands of active learners.'
    },
    {
      id: '2',
      role: 'Frontend Developer Apprentice',
      company: 'TechWave Solutions',
      duration: '2023 - 2024',
      location: 'Chennai, India',
      description: 'Developed responsive dashboard interfaces using React and Tailwind CSS. Improved initial page render performance by 35% through code-splitting and asset optimization.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Skyrovix Engineering Institute',
      year: '2022 - 2026',
      grade: 'CGPA: 8.9 / 10'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Skyrovix Interactive Learning Platform',
      tech: 'React 19, Node.js, Express, Supabase, Tailwind CSS',
      link: 'https://skyrovix.in',
      description: 'Built a full-stack EdTech platform featuring 10 masterclass video tracks, 435 interactive documentation lessons with an in-browser sandbox, and verifiable cryptographic certificates.'
    },
    {
      id: '2',
      title: 'Real-Time Collaborative Code Sandbox',
      tech: 'TypeScript, WebSockets, Monaco Editor, Docker',
      link: 'https://github.com/hariharan/code-sandbox',
      description: 'Engineered an in-browser live execution environment supporting HTML, CSS, JavaScript, and Python with zero latency output streaming.'
    }
  ]
};

export const ResumeBuilderPage: React.FC = () => {
  const { setCurrentView, currentUser, showGlobalToast } = usePlatform();

  // Load from LocalStorage if available
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_saved_resume');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      ...DEFAULT_RESUME,
      fullName: currentUser?.name || DEFAULT_RESUME.fullName,
      email: currentUser?.email || DEFAULT_RESUME.email,
    };
  });

  const [activeTheme, setActiveTheme] = useState<'orange' | 'indigo' | 'slate' | 'emerald'>('orange');
  const [activeTab, setActiveTab] = useState<'basics' | 'skills' | 'experience' | 'education' | 'projects'>('basics');
  const resumePrintRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('skyrovix_saved_resume', JSON.stringify(resume));
    } catch (e) {}
  }, [resume]);

  const themeColors = {
    orange: { primary: '#FB4400', secondary: '#FFF4EE', border: 'border-orange-500', text: 'text-[#FB4400]', bg: 'bg-[#FB4400]' },
    indigo: { primary: '#4F46E5', secondary: '#EEF2FF', border: 'border-indigo-600', text: 'text-indigo-600', bg: 'bg-indigo-600' },
    slate: { primary: '#0F172A', secondary: '#F8FAFC', border: 'border-slate-900', text: 'text-slate-900', bg: 'bg-slate-900' },
    emerald: { primary: '#059669', secondary: '#ECFDF5', border: 'border-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-600' }
  };

  const currColor = themeColors[activeTheme];

  const handlePrint = () => {
    window.print();
  };

  const handleAutoFill = () => {
    if (currentUser) {
      setResume(prev => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        email: currentUser.email || prev.email,
        headline: currentUser.role ? `${currentUser.role} | Full Stack Engineer` : prev.headline,
        summary: currentUser.bio || prev.summary
      }));
      if (showGlobalToast) showGlobalToast('✨ Auto-filled credentials from your student profile!');
    } else {
      if (showGlobalToast) showGlobalToast('Please sign in to auto-fill your profile details.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset resume to default professional sample?')) {
      setResume(DEFAULT_RESUME);
      if (showGlobalToast) showGlobalToast('Resume reset to standard template.');
    }
  };

  // Add Item Helpers
  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          role: 'Software Engineer',
          company: 'New Organization',
          duration: '2024 - Present',
          location: 'Remote',
          description: 'Key accomplishments and responsibilities...'
        }
      ]
    }));
  };

  const deleteExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: 'Bachelor of Technology',
          institution: 'University / College',
          year: '2024',
          grade: 'CGPA: 8.5'
        }
      ]
    }));
  };

  const deleteEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          title: 'New Innovation Project',
          tech: 'React, Node.js, SQL',
          link: 'https://github.com/example/project',
          description: 'Engineered an application that solves...'
        }
      ]
    }));
  };

  const deleteProject = (id: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-slate-800 font-sans pb-24">
      {/* Top Header & Breadcrumbs */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Back to Home"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-orange-100 text-[#FB4400]">
                  <FileText size={16} />
                </span>
                <h1 className="text-lg font-black text-slate-900 tracking-tight font-display">
                  Skyrovix Resume Builder
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Engineer ATS-friendly, MSME & Tech industry-compliant developer resumes with real-time A4 rendering.
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Color Palette Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5 font-mono">Theme:</span>
              {(['orange', 'indigo', 'slate', 'emerald'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => setActiveTheme(color)}
                  className={`w-5 h-5 rounded-lg transition-transform ${
                    color === 'orange' ? 'bg-[#FB4400]' :
                    color === 'indigo' ? 'bg-indigo-600' :
                    color === 'slate' ? 'bg-slate-900' : 'bg-emerald-600'
                  } ${activeTheme === color ? 'scale-110 ring-2 ring-white ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                  title={`${color} theme`}
                />
              ))}
            </div>

            <button
              onClick={handleAutoFill}
              className="cursor-pointer px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FB4400] font-bold text-xs flex items-center gap-1.5 transition-colors border border-orange-200"
            >
              <Sparkles size={13} />
              <span>Auto-Fill Profile</span>
            </button>

            <button
              onClick={handleReset}
              className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>

            <button
              onClick={handlePrint}
              className="cursor-pointer px-4 py-2 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25 transition-all active:scale-95"
            >
              <Printer size={14} />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: REAL-TIME EDITOR ================= */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden sticky top-24">
            {/* Editor Tab Navigation */}
            <div className="flex items-center border-b border-slate-100 bg-slate-50/70 p-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'basics', label: 'Identity' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'projects', label: 'Projects' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-[#FB4400] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Editor Forms */}
            <div className="p-5 max-h-[calc(100vh-190px)] overflow-y-auto space-y-4">
              {/* TAB 1: BASIC INFORMATION */}
              {activeTab === 'basics' && (
                <div className="space-y-3.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                    Personal & Contact Information
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={resume.fullName}
                      onChange={e => setResume({ ...resume, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] focus:ring-1 focus:ring-[#FB4400] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Professional Headline / Target Role</label>
                    <input
                      type="text"
                      value={resume.headline}
                      onChange={e => setResume({ ...resume, headline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] focus:ring-1 focus:ring-[#FB4400] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={resume.email}
                        onChange={e => setResume({ ...resume, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={resume.phone}
                        onChange={e => setResume({ ...resume, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={resume.location}
                        onChange={e => setResume({ ...resume, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Link</label>
                      <input
                        type="text"
                        value={resume.website}
                        onChange={e => setResume({ ...resume, website: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Profile</label>
                      <input
                        type="text"
                        value={resume.github}
                        onChange={e => setResume({ ...resume, github: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={resume.linkedin}
                        onChange={e => setResume({ ...resume, linkedin: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary</label>
                    <textarea
                      rows={4}
                      value={resume.summary}
                      onChange={e => setResume({ ...resume, summary: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-3.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                    Technical Stack & Core Proficiencies
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Comma-separated Technical Skills
                    </label>
                    <textarea
                      rows={5}
                      value={resume.skills}
                      onChange={e => setResume({ ...resume, skills: e.target.value })}
                      placeholder="React, Node.js, Python, PostgreSQL, Docker..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#FB4400] outline-none resize-none leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tip: Separate technologies with commas. They will automatically render as clean professional skill pills.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                      Work & Internship Experience
                    </h3>
                    <button
                      type="button"
                      onClick={addExperience}
                      className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-[#FB4400] text-xs font-bold hover:bg-orange-100 transition-colors"
                    >
                      <Plus size={13} />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {resume.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                          Role #{idx + 1}
                        </span>
                        {resume.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteExperience(exp.id)}
                            className="cursor-pointer text-slate-400 hover:text-red-500 p-1 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Role / Title"
                          value={exp.role}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].role = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].company = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Duration (e.g. 2024 - Present)"
                          value={exp.duration}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].duration = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Location (e.g. Remote / Bangalore)"
                          value={exp.location}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].location = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Key responsibilities and achievements..."
                        value={exp.description}
                        onChange={e => {
                          const updated = [...resume.experience];
                          updated[idx].description = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                      Academic Credentials
                    </h3>
                    <button
                      type="button"
                      onClick={addEducation}
                      className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-[#FB4400] text-xs font-bold hover:bg-orange-100 transition-colors"
                    >
                      <Plus size={13} />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {resume.education.map((edu, idx) => (
                    <div key={edu.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                          Degree #{idx + 1}
                        </span>
                        {resume.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteEducation(edu.id)}
                            className="cursor-pointer text-slate-400 hover:text-red-500 p-1 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Degree / Certificate (e.g. B.Tech Computer Science)"
                        value={edu.degree}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[idx].degree = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                      />

                      <input
                        type="text"
                        placeholder="Institution / College Name"
                        value={edu.institution}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[idx].institution = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Graduation Year (e.g. 2026)"
                          value={edu.year}
                          onChange={e => {
                            const updated = [...resume.education];
                            updated[idx].year = e.target.value;
                            setResume({ ...resume, education: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CGPA / Score"
                          value={edu.grade}
                          onChange={e => {
                            const updated = [...resume.education];
                            updated[idx].grade = e.target.value;
                            setResume({ ...resume, education: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                      Technical Projects & Software Systems
                    </h3>
                    <button
                      type="button"
                      onClick={addProject}
                      className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-[#FB4400] text-xs font-bold hover:bg-orange-100 transition-colors"
                    >
                      <Plus size={13} />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {resume.projects.map((proj, idx) => (
                    <div key={proj.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                          Project #{idx + 1}
                        </span>
                        {resume.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteProject(proj.id)}
                            className="cursor-pointer text-slate-400 hover:text-red-500 p-1 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[idx].title = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Tech Stack (React, Node, etc.)"
                          value={proj.tech}
                          onChange={e => {
                            const updated = [...resume.projects];
                            updated[idx].tech = e.target.value;
                            setResume({ ...resume, projects: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="GitHub or Live URL"
                          value={proj.link}
                          onChange={e => {
                            const updated = [...resume.projects];
                            updated[idx].link = e.target.value;
                            setResume({ ...resume, projects: updated });
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none"
                        />
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Project description, architecture and outcomes..."
                        value={proj.description}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[idx].description = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: REAL-TIME A4 PREVIEW ================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Live Indicator Pill */}
            <div className="mb-3 flex items-center justify-between w-full max-w-[760px] text-xs text-slate-500 font-medium px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-700">Real-Time A4 Document Preview</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Standard ATS Format (1 Page)</span>
            </div>

            {/* A4 Document Sheet */}
            <div
              ref={resumePrintRef}
              id="printable-resume"
              className="w-full max-w-[760px] bg-white rounded-xl shadow-xl border border-slate-200/90 p-8 sm:p-10 space-y-6 text-slate-900 font-sans print:shadow-none print:border-none print:p-0"
              style={{ minHeight: '980px' }}
            >
              {/* Header Section */}
              <div className="border-b-2 pb-5 space-y-2" style={{ borderColor: currColor.primary }}>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-display">
                  {resume.fullName || 'Student Developer'}
                </h2>
                <p className="text-sm font-bold" style={{ color: currColor.primary }}>
                  {resume.headline || 'Full Stack Engineer'}
                </p>

                {/* Contact Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1 font-medium">
                  {resume.email && (
                    <span className="flex items-center gap-1">
                      <Mail size={12} className="text-slate-400" />
                      <span>{resume.email}</span>
                    </span>
                  )}
                  {resume.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={12} className="text-slate-400" />
                      <span>{resume.phone}</span>
                    </span>
                  )}
                  {resume.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      <span>{resume.location}</span>
                    </span>
                  )}
                  {resume.website && (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Globe size={12} className="text-slate-400" />
                      <span>{resume.website.replace(/^https?:\/\//, '')}</span>
                    </span>
                  )}
                  {resume.github && (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Github size={12} className="text-slate-400" />
                      <span>{resume.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                    </span>
                  )}
                  {resume.linkedin && (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Linkedin size={12} className="text-slate-400" />
                      <span>LinkedIn</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Summary Section */}
              {resume.summary && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currColor.primary }} />
                    <span>Professional Summary</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* Skills Section */}
              {resume.skills && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currColor.primary }} />
                    <span>Technical Proficiencies</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.skills.split(',').map((s, i) => {
                      const trimmed = s.trim();
                      if (!trimmed) return null;
                      return (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {trimmed}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {resume.experience.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currColor.primary }} />
                    <span>Experience & Apprenticeships</span>
                  </h4>
                  <div className="space-y-3">
                    {resume.experience.map(exp => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                          <span className="text-[11px] font-mono text-slate-500 font-semibold">{exp.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span className="font-semibold" style={{ color: currColor.primary }}>{exp.company}</span>
                          <span className="text-[11px] text-slate-400">{exp.location}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {resume.projects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currColor.primary }} />
                    <span>Key Engineering Projects</span>
                  </h4>
                  <div className="space-y-3">
                    {resume.projects.map(proj => (
                      <div key={proj.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                          {proj.link && (
                            <span className="text-[10px] font-mono text-slate-400 underline">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500">
                          Technologies: <span className="text-slate-700 font-bold">{proj.tech}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {resume.education.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currColor.primary }} />
                    <span>Education & Certifications</span>
                  </h4>
                  <div className="space-y-2">
                    {resume.education.map(edu => (
                      <div key={edu.id} className="flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{edu.degree}</div>
                          <div className="text-slate-500 font-medium">{edu.institution}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-slate-500">{edu.year}</div>
                          <div className="font-semibold text-slate-700">{edu.grade}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

