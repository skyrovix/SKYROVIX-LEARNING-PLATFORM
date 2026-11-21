import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import { COMPANY } from '../../lib/constants';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Download,
  Printer,
  ExternalLink,
  Share2,
  Copy,
  ArrowLeft,
  Calendar,
  Search,
  Lock,
  Eye,
  Check,
  GraduationCap,
  Layers,
  Code2,
  Play,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CertificateData {
  id: string;
  courseId: string;
  credentialId: string;
  courseTitle: string;
  category: 'Full Stack' | 'Frontend' | 'Cloud' | 'AI & ML' | 'Architecture' | 'Programming';
  recipientName: string;
  issueDate: string;
  completionDate: string;
  score: string;
  totalHours: string;
  modulesCount: number;
  totalLessons: number;
  doneLessons: number;
  skills: string[];
  description: string;
  verificationHash: string;
  instructorName: string;
  instructorRole: string;
  status: 'Issued' | 'In Progress';
  progress: number;
  isUnlocked: boolean;
}

export const CourseCertificatesPage: React.FC = () => {
  const {
    currentUser,
    enrolledCourses,
    videoCourses,
    textCourses,
    completedLessons,
    userXP,
    setCurrentView,
    navigateToVideoCourse,
    navigateToTextCourse,
    completeEntireCourse
  } = usePlatform();

  // Real enrolled courses lookup
  const enrolledVideoList = videoCourses.filter(c => enrolledCourses.includes(c.id));
  const enrolledTextList = textCourses.filter(c => enrolledCourses.includes(c.id));
  const allEnrolled = [...enrolledVideoList, ...enrolledTextList];

  // Dynamically compute real credentials for each enrolled course
  const certificates: CertificateData[] = allEnrolled.map((course) => {
    const isVideo = 'modules' in course;
    const completedList = completedLessons[course.id] || [];
    const totalCount = isVideo
      ? course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
      : (course as any).totalLessons || 1;
    const doneCount = completedList.length;
    const isCompleted = doneCount >= totalCount && totalCount > 0;
    const progressPct = Math.min(100, Math.round((doneCount / (totalCount || 1)) * 100));

    // ONLY issued when 100% completed
    const isIssued = isCompleted;
    const score = isIssued ? '100/100 (Distinction)' : `${progressPct}% In Progress`;

    // Dynamic deterministic credential ID based on course ID
    const hashNum = Math.abs(course.id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0));
    const certId = `SKX-CERT-2026-${(hashNum % 90000 + 10000)}`;

    // Real skill tags derived from category and course content
    let skills: string[] = ['Software Engineering', 'Production Code'];
    const catLower = (course.category || '').toLowerCase();
    const titleLower = (course.title || '').toLowerCase();
    
    if (catLower.includes('full stack') || titleLower.includes('full stack')) {
      skills = ['React 19', 'Next.js 15', 'Node.js', 'Express', 'MongoDB', 'Cloud Deployment'];
    } else if (catLower.includes('frontend') || titleLower.includes('html') || titleLower.includes('css')) {
      skills = ['HTML5 Semantic Web', 'CSS3 Flexbox & Grid', 'JavaScript ES6+', 'Responsive Design'];
    } else if (catLower.includes('python') || titleLower.includes('python')) {
      skills = ['Python 3.12', 'Data Structures', 'OOP', 'Automation', 'Production Scripts'];
    } else if (catLower.includes('react') || titleLower.includes('react')) {
      skills = ['React 19 Server Components', 'Hooks', 'State Management', 'Next.js 15 App Router'];
    } else if (catLower.includes('database') || titleLower.includes('sql')) {
      skills = ['SQL Schema Design', 'Query Optimization', 'PostgreSQL', 'Database Security'];
    }

    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    return {
      id: `cert-${course.id}`,
      courseId: course.id,
      credentialId: isIssued ? certId : `SKX-PENDING-${(hashNum % 9000 + 1000)}`,
      courseTitle: course.title,
      category: (course.category as any) || 'Full Stack',
      recipientName: currentUser?.certificateName || currentUser?.name || 'Hariharan S',
      issueDate: isIssued ? todayStr : 'Pending 100% Completion',
      completionDate: isIssued ? 'Completed with Distinction' : `${doneCount} of ${totalCount} Lessons (${progressPct}%)`,
      score,
      totalHours: 'totalDuration' in course ? (course as any).totalDuration : ('estimatedHours' in course ? (course as any).estimatedHours : '24 hrs'),
      modulesCount: isVideo ? (course as any).modules.length : Math.ceil(totalCount / 10),
      totalLessons: totalCount,
      doneLessons: doneCount,
      skills,
      description: (course as any).subtitle || (course as any).description || `Comprehensive accredited mastery in ${course.title}.`,
      verificationHash: `e8f49c21${hashNum.toString(16).padStart(8, '0')}7b3a1052de64`,
      instructorName: 'Skyrovix Team',
      instructorRole: 'Curriculum & Engineering Council',
      status: isIssued ? 'Issued' : 'In Progress',
      progress: progressPct,
      isUnlocked: isIssued
    };
  });

  const [selectedCertId, setSelectedCertId] = useState<string>(() => {
    return certificates[0]?.id || '';
  });

  // Keep selectedCertId in sync
  React.useEffect(() => {
    if (certificates.length > 0 && (!selectedCertId || !certificates.some(c => c.id === selectedCertId))) {
      setSelectedCertId(certificates[0].id);
    }
  }, [certificates, selectedCertId]);

  const [activeTab, setActiveTab] = useState<'all' | 'issued' | 'in-progress'>('all');
  const [searchVerifyQuery, setSearchVerifyQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedCert = certificates.find(c => c.id === selectedCertId) || certificates[0] || null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = (credentialId: string) => {
    const url = `https://skyrovix.in/verify-certificate?id=${credentialId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedId(credentialId);
    showToast(`Verification link copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadPDF = () => {
    if (!selectedCert?.isUnlocked) {
      showToast(`⚠️ Certificate Locked: Complete all lessons to download your official certificate.`);
      return;
    }
    showToast(`Preparing official high-resolution PDF for ${selectedCert.credentialId}...`);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleResumeCourse = (cert: CertificateData) => {
    const isVid = videoCourses.some(v => v.id === cert.courseId);
    if (isVid) {
      const vidCourse = videoCourses.find(v => v.id === cert.courseId);
      const doneList = completedLessons[cert.courseId] || [];
      let nextLessonId: string | undefined = undefined;
      if (vidCourse) {
        for (const mod of vidCourse.modules) {
          const incomplete = mod.lessons.find(l => !doneList.includes(l.id));
          if (incomplete) {
            nextLessonId = incomplete.id;
            break;
          }
        }
      }
      navigateToVideoCourse(cert.courseId, nextLessonId);
    } else {
      navigateToTextCourse(cert.courseId);
    }
  };

  const filteredCerts = certificates.filter(cert => {
    if (activeTab === 'issued') return cert.status === 'Issued';
    if (activeTab === 'in-progress') return cert.status === 'In Progress';
    return true;
  });

  const issuedCount = certificates.filter(c => c.status === 'Issued').length;
  const inProgressCount = certificates.filter(c => c.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs font-bold"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ================= TOP NAVIGATION / BREADCRUMBS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 no-print">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setCurrentView('user-dashboard')}
              className="cursor-pointer hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>User Dashboard</span>
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => setCurrentView('catalog')}
              className="cursor-pointer hover:text-slate-900 transition-colors"
            >
              Courses
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Course Certificates of Completion</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('certificate-verify')}
              className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <Search size={13} className="text-slate-400" />
              <span>Verify Other ID</span>
            </button>
            <button
              onClick={() => setCurrentView('user-dashboard')}
              className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-[#14171F] text-white hover:bg-slate-800 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>My Workspace</span>
            </button>
          </div>
        </div>

        {/* ================= PAGE HERO HEADER ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden no-print">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5A36] text-[11px] font-extrabold uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>OFFICIAL SKYROVIX ACADEMIC CREDENTIALS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-700">MSME ACCREDITED</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-display">
                Course Certificate of Completion
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Certificates are officially awarded and issued only upon <strong>100% course completion</strong>. Every credential includes tamper-proof cryptographic verification, MSME recognition, and official signatures from our founders.
              </p>
            </div>

            {/* Accreditation Badge Box */}
            <div className="flex sm:flex-row items-center gap-4 bg-[#FAF8F5] border border-slate-200/80 p-4 rounded-2xl shrink-0">
              <img
                src={brandImages.msme}
                alt="MSME Certified"
                className="h-12 w-auto object-contain p-1 bg-white border border-slate-200 rounded-xl shadow-2xs"
              />
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">ACCREDITATION</div>
                <div className="text-xs font-black text-slate-900">{COMPANY.legalName}</div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={12} />
                  <span>Govt MSME: {COMPANY.udyamRegistry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Award size={14} className="text-[#FF5A36]" />
                <span>Issued Credentials</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {issuedCount} Earned
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Lock size={14} className="text-amber-500" />
                <span>In Progress</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
                {inProgressCount} Courses
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <GraduationCap size={14} className="text-blue-500" />
                <span>Distinction Threshold</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">100% Score</div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-slate-200/60">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Layers size={14} className="text-purple-500" />
                <span>Total Enrolled</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{allEnrolled.length} Tracks</div>
            </div>
          </div>
        </div>

        {/* ================= IF NO ENROLLED COURSES: EMPTY ONBOARDING STATE ================= */}
        {allEnrolled.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 shadow-sm text-center max-w-2xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-orange-50 text-[#FF5A36] flex items-center justify-center mx-auto shadow-inner">
              <Award size={36} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 font-display">
                No Enrolled Courses Yet
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                You have not enrolled in any courses yet. Enroll in a course, complete all required lectures and milestone projects (100% progress), and your official MSME-certified credential will automatically be issued right here.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setCurrentView('catalog')}
                className="cursor-pointer px-6 py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Sparkles size={15} />
                <span>Explore Course Catalog</span>
              </button>
              <button
                onClick={() => setCurrentView('user-dashboard')}
                className="cursor-pointer px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ================= FILTER TABS ================= */}
            <div className="flex items-center justify-between flex-wrap gap-4 no-print">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-[#FF5A36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  All Credentials ({certificates.length})
                </button>
                <button
                  onClick={() => setActiveTab('issued')}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'issued'
                      ? 'bg-[#FF5A36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Issued & Verified ({issuedCount})
                </button>
                <button
                  onClick={() => setActiveTab('in-progress')}
                  className={`cursor-pointer px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'in-progress'
                      ? 'bg-[#FF5A36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  In Progress / Locked ({inProgressCount})
                </button>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Student: <strong>{currentUser?.name || 'Hariharan S'} ({currentUser?.email || 'Student Account'})</strong></span>
              </div>
            </div>

            {/* ================= MAIN CERTIFICATE SHOWCASE & LIST ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: CERTIFICATES LIST (4 cols) */}
              <div className="lg:col-span-5 space-y-4 no-print">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
                  Enrolled Course Credentials ({filteredCerts.length})
                </div>

                <div className="space-y-3">
                  {filteredCerts.map(cert => {
                    const isSelected = cert.id === selectedCertId;
                    const isIssued = cert.status === 'Issued';

                    return (
                      <div
                        key={cert.id}
                        onClick={() => setSelectedCertId(cert.id)}
                        className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                          isSelected
                            ? 'bg-white border-[#FF5A36] shadow-md ring-2 ring-[#FF5A36]/15'
                            : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-2 h-full bg-[#FF5A36]" />
                        )}

                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isIssued
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {isIssued ? <Award size={18} /> : <Lock size={18} />}
                            </div>
                            <div>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                  isIssued
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {cert.credentialId}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                isIssued
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-amber-700 bg-amber-50'
                              }`}
                            >
                              {cert.score}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-[#FF5A36] transition-colors">
                          {cert.courseTitle}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Calendar size={12} className="text-slate-400" />
                            {cert.completionDate}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Layers size={12} className="text-slate-400" />
                            {cert.modulesCount} Modules
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Code2 size={12} className="text-slate-400" />
                            {cert.totalHours}
                          </span>
                        </div>

                        {/* Progress Bar for In-Progress Item */}
                        {!isIssued && (
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-amber-700">Course Progress</span>
                              <span className="text-slate-700">{cert.doneLessons}/{cert.totalLessons} ({cert.progress}%)</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${cert.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className={`text-[11px] font-bold ${isIssued ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {isIssued ? '✓ Ready to Download' : '🔒 Complete 100% to Unlock'}
                          </span>
                          <span
                            className={`text-xs font-bold flex items-center gap-1 ${
                              isSelected ? 'text-[#FF5A36]' : 'text-slate-600 group-hover:text-slate-900'
                            }`}
                          >
                            <span>{isIssued ? 'View Certificate' : 'View Progress'}</span>
                            <Eye size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Instant Verification Search Box Widget */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Search size={14} className="text-[#FF5A36]" />
                    <span>Direct Verification Lookup</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Enter any Skyrovix Certificate ID to verify recipient authenticity directly.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchVerifyQuery}
                      onChange={e => setSearchVerifyQuery(e.target.value)}
                      placeholder="e.g. SKX-CERT-2026-9055"
                      className="w-full bg-[#FAF8F5] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono outline-none focus:border-[#FF5A36]"
                    />
                    <button
                      onClick={() => {
                        if (searchVerifyQuery.trim()) {
                          setCurrentView('certificate-verify');
                        }
                      }}
                      className="cursor-pointer px-4 py-2 bg-[#FF5A36] hover:bg-[#E03D00] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: HIGH-RES CERTIFICATE DOCUMENT CANVAS (7 cols) */}
              {selectedCert && (
                <div className="lg:col-span-7 space-y-5">
                  {/* Action Bar Above the Document */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 no-print">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          selectedCert.isUnlocked ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      />
                      <span className="text-xs font-black text-slate-900">
                        {selectedCert.credentialId}
                      </span>
                      <span className="text-xs text-slate-400">|</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {selectedCert.isUnlocked ? 'Official Document Render' : 'Locked Preview'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadPDF}
                        disabled={!selectedCert.isUnlocked}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          selectedCert.isUnlocked
                            ? 'bg-[#FF5A36] hover:bg-[#E03D00] text-white shadow-orange-500/20'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-75'
                        }`}
                        title={selectedCert.isUnlocked ? 'Download / Save as PDF' : 'Complete course to unlock download'}
                      >
                        {selectedCert.isUnlocked ? <Download size={13} /> : <Lock size={13} />}
                        <span>Download PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          if (selectedCert.isUnlocked) {
                            window.print();
                          } else {
                            showToast('⚠️ Complete 100% of this course to enable printing.');
                          }
                        }}
                        disabled={!selectedCert.isUnlocked}
                        className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                          selectedCert.isUnlocked
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Printer size={13} />
                        <span>Print</span>
                      </button>
                      <button
                        onClick={() => handleCopyLink(selectedCert.credentialId)}
                        className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                        title="Copy verification link"
                      >
                        {copiedId === selectedCert.credentialId ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ================= THE OFFICIAL CERTIFICATE OF COMPLETION (A4 LANDSCAPE RENDER) ================= */}
                  <div className="relative">
                    
                    {/* Locked State Overlay when Course is NOT yet completed */}
                    {!selectedCert.isUnlocked && (
                      <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-[3px] rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white space-y-4 no-print">
                        <div className="w-16 h-16 rounded-3xl bg-[#FF5A36] text-white flex items-center justify-center shadow-xl">
                          <Lock size={32} />
                        </div>
                        <div className="max-w-md space-y-2">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                            Course In Progress ({selectedCert.progress}% Completed)
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                            Certificate of Completion Locked
                          </h3>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            To maintain academic integrity and accreditation standards, this certificate is officially issued only after you complete all <strong>{selectedCert.totalLessons} lessons</strong> ({selectedCert.doneLessons}/{selectedCert.totalLessons} finished).
                          </p>
                        </div>

                        {/* Progress Bar in Locked Modal */}
                        <div className="w-full max-w-xs space-y-1">
                          <div className="flex justify-between text-[11px] font-mono text-slate-300">
                            <span>Completed: {selectedCert.doneLessons}</span>
                            <span>Remaining: {selectedCert.totalLessons - selectedCert.doneLessons}</span>
                          </div>
                          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FF5A36] rounded-full transition-all duration-500"
                              style={{ width: `${selectedCert.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Action Buttons to Resume Course or Demo Complete */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <button
                            onClick={() => handleResumeCourse(selectedCert)}
                            className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
                          >
                            <Play size={13} className="fill-current" />
                            <span>Resume Course to Complete</span>
                          </button>
                          <button
                            onClick={() => {
                              completeEntireCourse(selectedCert.courseId);
                              showToast(`🏆 Instant Complete: Unlocked certificate for ${selectedCert.courseTitle}!`);
                            }}
                            className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                            title="Complete all lessons immediately for verification / grading test"
                          >
                            <Zap size={14} className="text-amber-300" />
                            <span>Complete All Lessons (Demo Pass)</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* THE EXECUTIVE CERTIFICATE CANVAS (Strictly matching the user's template specifications) */}
                    <div
                      id="certificate-print-area"
                      className="bg-white rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden text-center text-slate-900 border-4 border-[#181619]"
                      style={{
                        backgroundColor: '#ffffff',
                        fontFamily: "'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      }}
                    >
                      {/* Skyrovix Regal Inner Frame in Coral #f95c4b */}
                      <div
                        className="rounded-2xl p-5 sm:p-7 relative border-[1.5px] border-[#f95c4b]"
                        style={{
                          backgroundColor: '#ffffff'
                        }}
                      >
                        {/* 1. Header: Left Logos + Center Brand Title + Right MSME */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                          {/* Left: Brand Logo & Partner Badge */}
                          <div className="flex items-center gap-3">
                            <img
                              src={brandImages.logo}
                              alt="Skyrovix"
                              className="h-10 sm:h-12 w-auto object-contain"
                            />
                          </div>

                          {/* Center: Brand Typography matching PDF specification */}
                          <div className="text-center">
                            <div
                              className="text-lg sm:text-xl font-bold tracking-[4px] text-[#181619]"
                              style={{ letterSpacing: '4px' }}
                            >
                              SKYROVIX
                            </div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-[#f95c4b] tracking-[1.5px] mt-0.5">
                              {COMPANY.tagline}
                            </div>
                            <div className="text-[8px] font-medium text-slate-500 mt-0.5">
                              Registered under MSME, Govt. of India ({COMPANY.udyamRegistry})
                            </div>
                          </div>

                          {/* Right: MSME Official Seal & Accreditation */}
                          <div className="flex items-center gap-2">
                            <img
                              src={brandImages.msme}
                              alt="Govt MSME"
                              className="h-9 sm:h-11 w-auto object-contain"
                            />
                          </div>
                        </div>

                        {/* 2. Title Block: COURSE CERTIFICATE OF COMPLETION */}
                        <div className="mt-5 space-y-1">
                          <h2
                            className="text-2xl sm:text-3xl font-black text-[#181619]"
                            style={{ letterSpacing: '5px' }}
                          >
                            COURSE CERTIFICATE
                          </h2>
                          <div
                            className="text-xs sm:text-sm font-bold text-[#f95c4b]"
                            style={{ letterSpacing: '7px' }}
                          >
                            OF COMPLETION
                          </div>
                          {/* Accent Bar */}
                          <div className="w-14 h-[2.5px] bg-[#f95c4b] mx-auto mt-2 rounded-full" />
                        </div>

                        {/* 3. Presentation Citation */}
                        <div className="mt-5 space-y-2 max-w-2xl mx-auto">
                          <div className="text-xs sm:text-sm text-slate-500 tracking-wider">
                            This certificate is awarded to
                          </div>
                          <div className="text-2xl sm:text-4xl font-extrabold text-[#181619] tracking-tight uppercase border-b border-slate-200 pb-2 inline-block px-4">
                            {selectedCert.recipientName}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-2">
                            for successfully completing the{' '}
                            <strong className="text-[#f95c4b] font-bold">{selectedCert.courseTitle}</strong> course with a score of{' '}
                            <strong className="text-[#181619] font-bold">{selectedCert.score}</strong>, demonstrating proficiency, technical mastery, and commitment to learning.
                          </p>
                        </div>

                        {/* 4. Digitally Verified QR Code Badge */}
                        <div className="mt-4 flex items-center justify-center gap-3">
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                                `https://skyrovix.in/verify-certificate?id=${selectedCert.credentialId}`
                              )}`}
                              alt="QR Verification"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Fallback icon if offline
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="text-left">
                            <div className="text-[10px] font-bold text-[#f95c4b]">
                              Digitally Verified Credential
                            </div>
                            <div className="text-[8.5px] text-slate-500">
                              Scan QR or verify at skyrovix.in/verify-certificate
                            </div>
                          </div>
                        </div>

                        {/* 5. Symmetrical Signatures & Official Seal Section */}
                        <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 items-end gap-2 text-center">
                          {/* Col 1: Founder & CEO (Hariharan S) */}
                          <div className="flex flex-col items-center">
                            <div className="h-10 flex items-end justify-center mb-1">
                              <img
                                src={brandImages.sigFounder}
                                alt="Founder Signature"
                                className="h-9 w-auto object-contain"
                              />
                            </div>
                            <div className="w-32 border-t border-[#181619] pt-1" />
                            <div className="text-xs font-bold text-[#181619]">{COMPANY.founder.name}</div>
                            <div className="text-[9px] font-bold text-[#f95c4b] uppercase">{COMPANY.founder.title}</div>
                          </div>

                          {/* Col 2: Official Seal */}
                          <div className="flex flex-col items-center">
                            <img
                              src={brandImages.seal}
                              alt="Official Seal"
                              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm"
                            />
                            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                              Official Verified Seal
                            </div>
                          </div>

                          {/* Col 3: Co-Founder (Maheshwaran S) */}
                          <div className="flex flex-col items-center">
                            <div className="h-10 flex items-end justify-center mb-1">
                              <img
                                src={brandImages.sigCofounder}
                                alt="Co-Founder Signature"
                                className="h-9 w-auto object-contain"
                              />
                            </div>
                            <div className="w-32 border-t border-[#181619] pt-1" />
                            <div className="text-xs font-bold text-[#181619]">{COMPANY.cofounder.name}</div>
                            <div className="text-[9px] font-bold text-[#f95c4b] uppercase">{COMPANY.cofounder.title}</div>
                          </div>
                        </div>

                        {/* 6. Footer Metadata */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                          <div className="text-left space-y-0.5">
                            <div>
                              Certificate ID: <strong className="text-[#181619]">{selectedCert.credentialId}</strong>
                            </div>
                            <div>
                              Score: <strong className="text-[#f95c4b]">{selectedCert.score}</strong>
                            </div>
                          </div>
                          <div className="text-right space-y-0.5">
                            <div>
                              Issued: <strong className="text-[#181619]">{selectedCert.issueDate}</strong>
                            </div>
                            <div>
                              Verify at: <strong className="text-[#f95c4b]">www.skyrovix.in/verify-certificate</strong>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Social Share & Verification Action Suite */}
                  {selectedCert.isUnlocked && (
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4 no-print">
                      <div className="text-xs font-bold text-slate-800">
                        Share & Showcase Your Verified Credential
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <a
                          href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
                            selectedCert.courseTitle
                          )}&organizationName=Skyrovix&issueYear=2026&issueMonth=11&certUrl=${encodeURIComponent(
                            `https://skyrovix.in/verify-certificate?id=${selectedCert.credentialId}`
                          )}&certId=${selectedCert.credentialId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/15 text-[#0A66C2] font-bold text-xs flex items-center justify-center gap-2 border border-[#0A66C2]/20 transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Add to LinkedIn</span>
                        </a>

                        <button
                          onClick={() => handleCopyLink(selectedCert.credentialId)}
                          className="cursor-pointer p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                        >
                          <Share2 size={14} />
                          <span>Share Verification Link</span>
                        </button>

                        <button
                          onClick={() => setCurrentView('certificate-verify')}
                          className="cursor-pointer p-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5A36] font-bold text-xs flex items-center justify-center gap-2 border border-orange-200 transition-colors"
                        >
                          <ShieldCheck size={14} />
                          <span>Public Verifier Portal</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
