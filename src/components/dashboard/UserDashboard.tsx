import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages, defaultStudentAvatar, flagshipBanners, getCourseBanner } from '../../assets/brandImages';
import { CodePlayground } from '../playground/CodePlayground';
import { COMPANY } from '../../lib/constants';
import { EditProfilePage } from './EditProfilePage';
import { ModernCourseCard } from '../common/ModernCourseCard';
import {
  Flame,
  Sparkles,
  BookOpen,
  Video,
  Award,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  FileText,
  Terminal,
  Check,
  Briefcase,
  Layers,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  Gift,
  ExternalLink,
  MessageCircle,
  Instagram,
  Copy,
  FolderOpen,
  Send,
  Github,
  QrCode,
  ShieldCheck,
  Calendar,
  Star,
  FileCheck,
  Bookmark,
  Cpu,
  Compass,
  Code2,
  Trash2,
  LogOut,
  RotateCcw,
  GraduationCap,
  Plus,
  Lock,
  Printer,
  Share2,
  Zap,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserDashboard: React.FC = () => {
  const {
    enrolledCourses,
    videoCourses,
    textCourses,
    completedLessons,
    getCourseProgress,
    userXP,
    streakDays,
    navigateToVideoCourse,
    navigateToTextCourse,
    setCurrentView,
    setRole,
    notes,
    deleteNote,
    bookmarks,
    logout,
    currentUser,
    enrollInCourse,
    openEnrollModal,
    navigateToCourseDetails,
    resetMyLearningData,
    completeEntireCourse
  } = usePlatform();

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'courses' | 'certificates' | 'notes' | 'playground' | 'practice' | 'profile'>('overview');
  const [certMode, setCertMode] = useState<'demo' | 'enrolled'>('demo');
  const [selectedDashboardCertCourseId, setSelectedDashboardCertCourseId] = useState<string>('');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [recommendedTrackCategory, setRecommendedTrackCategory] = useState<'flagship' | 'web'>('flagship');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ================= REAL ENROLLED COURSES LOOKUP =================
  const enrolledVideoList = videoCourses.filter(c => enrolledCourses.includes(c.id));
  const enrolledTextList = textCourses.filter(c => enrolledCourses.includes(c.id));
  const allEnrolledCourses = [...enrolledVideoList, ...enrolledTextList];

  // Active selected course for the hero banner & curriculum pipeline
  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    return enrolledVideoList[0]?.id || enrolledCourses[0] || '';
  });

  // Keep selectedCourseId in sync with enrollments
  React.useEffect(() => {
    if (allEnrolledCourses.length > 0) {
      if (!selectedCourseId || !enrolledCourses.includes(selectedCourseId)) {
        setSelectedCourseId(allEnrolledCourses[0].id);
      }
    } else {
      setSelectedCourseId('');
    }
  }, [enrolledCourses, allEnrolledCourses]);

  const activeVideoCourse = videoCourses.find(c => c.id === selectedCourseId);
  const activeTextCourse = textCourses.find(c => c.id === selectedCourseId);
  const activeCourse = activeVideoCourse || activeTextCourse || (allEnrolledCourses[0] ?? null);

  // Real lesson completion counts for the active course
  const activeCompletedList = activeCourse ? (completedLessons[activeCourse.id] || []) : [];
  
  const activeTotalLessons = activeVideoCourse
    ? activeVideoCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0)
    : activeTextCourse?.totalLessons || 0;

  const activeCourseProgress = activeTotalLessons > 0
    ? Math.min(100, Math.round((activeCompletedList.length / activeTotalLessons) * 100))
    : 0;

  // Global calculations across all enrolled courses
  const totalCompletedLessonsAll = Object.values(completedLessons).reduce((sum, list) => sum + list.length, 0);
  
  const totalEnrolledLessonsAll = allEnrolledCourses.reduce((sum, c) => {
    if ('modules' in c) {
      return sum + c.modules.reduce((s, m) => s + m.lessons.length, 0);
    }
    return sum + (c.totalLessons || 0);
  }, 0);

  // Real completed credentials count (courses where progress >= 100% and total > 0)
  const completedCoursesCount = allEnrolledCourses.filter(c => {
    const done = (completedLessons[c.id] || []).length;
    const total = 'modules' in c ? c.modules.reduce((s, m) => s + m.lessons.length, 0) : c.totalLessons;
    return done >= total && total > 0;
  }).length;

  const displayCertificatesCount = completedCoursesCount;

  // Handle Resuming active course
  const handleResumeCourse = () => {
    if (activeVideoCourse) {
      // Find first incomplete lesson
      let nextLessonId: string | undefined = undefined;
      for (const mod of activeVideoCourse.modules) {
        const incomplete = mod.lessons.find(l => !activeCompletedList.includes(l.id));
        if (incomplete) {
          nextLessonId = incomplete.id;
          break;
        }
      }
      navigateToVideoCourse(activeVideoCourse.id, nextLessonId);
    } else if (activeTextCourse) {
      navigateToTextCourse(activeTextCourse.slug);
    }
  };

  // Handle Sign Out from User Dashboard
  const handleSignOut = async () => {
    showToast('Successfully signed out of your account! Redirecting to home...');
    await logout();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Toast Alert */}
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

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ================= LEFT SIDEBAR (REAL LEARNER DATA) ================= */}
        <aside className="w-full lg:w-64 shrink-0 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar">
          <div>
            {/* Real Student Profile Card with Quick Sign Out */}
            <div className="flex items-center justify-between p-2 mb-6 group">
              <button
                type="button"
                onClick={() => setActiveWorkspaceTab('profile')}
                className="cursor-pointer flex items-center gap-3 min-w-0 text-left hover:opacity-90 transition-opacity"
                title="Click to edit your profile"
              >
                <div className="relative shrink-0">
                  <img
                    src={(currentUser?.avatar && !currentUser.avatar.includes('unsplash.com')) ? currentUser.avatar : defaultStudentAvatar}
                    alt={currentUser?.name || "Student"}
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 object-cover bg-slate-100"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="truncate">
                  <div className="text-sm font-black text-slate-900 leading-tight group-hover:text-[#FF5A36] transition-colors flex items-center gap-1">
                    <span className="truncate">{currentUser?.name || 'Student'}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#FF5A36] mt-0.5">{userXP.toLocaleString()} XP • Level {Math.floor(userXP / 200) + 1}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Enrolled in {allEnrolledCourses.length} Courses</div>
                </div>
              </button>
              <button
                onClick={handleSignOut}
                className="cursor-pointer p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shrink-0 group/btn"
                title="Sign out of account"
              >
                <LogOut size={16} className="group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>

            {/* Real Learning Track Badge */}
            <div className="mb-6 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Track:</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[10px] font-bold">
                {currentUser?.track || (activeCourse ? activeCourse.category : 'Full Stack')}
              </span>
            </div>

            {/* Workspace Section */}
            <div className="space-y-1 mb-6">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
                WORKSPACE
              </div>
              <button
                onClick={() => setActiveWorkspaceTab('overview')}
                className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'overview'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Layers size={16} className={activeWorkspaceTab === 'overview' ? 'text-[#FF5A36]' : 'text-slate-400'} />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('courses')}
                className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'courses'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BookOpen size={16} className={activeWorkspaceTab === 'courses' ? 'text-[#FF5A36]' : 'text-slate-400'} />
                <span>My Enrolled Courses ({allEnrolledCourses.length})</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('playground')}
                className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'playground'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Terminal size={16} className={activeWorkspaceTab === 'playground' ? 'text-[#FF5A36]' : 'text-slate-400'} />
                <span>Code Sandbox</span>
              </button>
            </div>

            {/* Academic & Records Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
                ACADEMIC & RECORDS
              </div>
              <button
                onClick={() => setActiveWorkspaceTab('practice')}
                className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'practice'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Code2 size={15} className="text-slate-400" />
                <span>Practice Challenges</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('certificates')}
                className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'certificates'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Award size={15} className={activeWorkspaceTab === 'certificates' ? 'text-[#FF5A36]' : 'text-slate-400'} />
                <span className="font-extrabold">Course Certificates</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('notes')}
                className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'notes'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Bookmark size={15} className="text-slate-400" />
                <span>Notes & Bookmarks ({notes.length + bookmarks.length})</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('profile')}
                className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                  activeWorkspaceTab === 'profile'
                    ? 'bg-[#14171F] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <User size={15} className={activeWorkspaceTab === 'profile' ? 'text-[#FF5A36]' : 'text-slate-400'} />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setCurrentView('catalog')}
                className="cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <Compass size={15} className="text-slate-400" />
                <span>Explore Catalog</span>
              </button>
            </div>
          </div>

          {/* Bottom Area: Study Streak & Sign Out Down Last */}
          <div className="pt-4 mt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Study Streak: {streakDays} Day{streakDays === 1 ? '' : 's'} 🔥</span>
              <span className="font-mono font-bold text-[10px] text-emerald-600">ACTIVE</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all course enrollments and progress to start completely fresh?')) {
                  resetMyLearningData();
                  showToast('Workspace reset! All enrollments and progress have been cleared.');
                }
              }}
              className="cursor-pointer w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
              title="Reset all enrollments & start clean"
            >
              <RotateCcw size={13} />
              <span>Reset My Progress</span>
            </button>

            <button
              onClick={handleSignOut}
              className="cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-rose-100 transition-all group"
              title="Sign out of Skyrovix account"
            >
              <LogOut size={15} className="text-rose-500 group-hover:scale-110 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN AREA (100% REAL COURSE DATA) ================= */}
        <main className="flex-1 w-full space-y-6">

          {/* Real Course Switcher Bar (when learner has multiple enrolled courses) */}
          {allEnrolledCourses.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-extrabold text-slate-400 shrink-0 uppercase tracking-wider">
                Enrolled Tracks:
              </span>
              {allEnrolledCourses.map(c => {
                const isSelected = c.id === activeCourse.id;
                const doneCount = (completedLessons[c.id] || []).length;
                const totalCount = 'modules' in c ? c.modules.reduce((s, m) => s + m.lessons.length, 0) : c.totalLessons;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCourseId(c.id);
                      setActiveWorkspaceTab('overview');
                    }}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#FF5A36] text-white shadow-sm shadow-orange-500/20'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <span className="truncate max-w-[180px]">{c.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {doneCount}/{totalCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 1: OVERVIEW (REAL COURSE CONTENT & PIPELINE) */}
          {activeWorkspaceTab === 'overview' && (
            allEnrolledCourses.length === 0 || !activeCourse ? (
              /* ================= NEW LEARNER WELCOME & QUICK ENROLL VIEW ================= */
              <div className="space-y-6">
                {/* Clean Onboarding Welcome Hero */}
                <div className="rounded-3xl bg-[#161922] text-white p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5A36]/15 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#FF5A36]/20 text-[#FF6B4A] border border-[#FF5A36]/30 text-xs font-bold flex items-center gap-1.5">
                        <Sparkles size={14} />
                        <span>Welcome to Skyrovix Learning</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                        Account Ready
                      </span>
                    </div>

                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                        Welcome, {currentUser?.name || 'Developer'}!
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        Your personalized learning workspace is active. You have not enrolled in any courses yet.
                        Start learning immediately by enrolling in our free foundation courses below, or apply for our flagship career masterclasses with scholarship access.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setCurrentView('catalog')}
                        className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
                      >
                        <Compass size={15} />
                        <span>Explore Full Course Catalog</span>
                      </button>
                      <button
                        onClick={() => {
                          enrollInCourse('text-html');
                          navigateToTextCourse('text-html');
                        }}
                        className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <BookOpen size={13} />
                        <span>Instant Start: HTML5 Free Track</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3 Accurate Metric Cards for New Learner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: Completed Lectures */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wider">
                        NEW LEARNER
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 leading-tight">
                        0 / 0
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-1">Completed Lectures Across Courses</div>
                    </div>
                  </div>

                  {/* Card 2: Study Streak */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF5A36] flex items-center justify-center">
                        <Flame size={16} />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-orange-100 text-[#FF5A36] text-[10px] font-extrabold uppercase tracking-wider">
                        {userXP.toLocaleString()} XP
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 leading-tight">
                        {streakDays} Day{streakDays === 1 ? '' : 's'}
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-1">Consecutive Days Coding Streak</div>
                    </div>
                  </div>

                  {/* Card 3: Verified Certificate */}
                  <div
                    onClick={() => setActiveWorkspaceTab('certificates')}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#FF5A36]/60 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Award size={16} />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase tracking-wider">
                        0 VERIFIED
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 leading-tight">
                        0 Verifiable
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-1">Accredited Credentials (Earn on 100% completion)</div>
                    </div>
                  </div>
                </div>

                {/* Instant Course Application / Enrollment Showcase */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-[#FF5A36]" />
                        <span>Recommended Tracks: Enroll &amp; Apply</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Choose a 100% free foundation course or apply for an end-to-end masterclass with student scholarship.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => setRecommendedTrackCategory('flagship')}
                          className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            recommendedTrackCategory === 'flagship'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Flagship Tracks
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecommendedTrackCategory('web')}
                          className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            recommendedTrackCategory === 'web'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Frontend Foundation
                        </button>
                      </div>

                      <button
                        onClick={() => setCurrentView('catalog')}
                        className="text-xs font-bold text-[#FF5A36] hover:underline flex items-center gap-1 shrink-0 ml-2"
                      >
                        <span>View All</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {recommendedTrackCategory === 'flagship' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Card 1: Full Stack Development (₹299) */}
                      <ModernCourseCard
                        title="Full Stack Development"
                        description="Master modern web development with React, Node.js and databases."
                        banner={flagshipBanners.fullstack}
                        category="Development"
                        lessonsCount="50+ Lessons"
                        duration="40h"
                        level="Beginner to Advanced"
                        badge="PRO TRACK • ₹299"
                        price="₹299"
                        originalPrice="₹2,999"
                        isFree={false}
                        isEnrolled={enrolledCourses.includes('vid-fullstack-dev')}
                        actionText={enrolledCourses.includes('vid-fullstack-dev') ? 'Continue' : 'Enroll ₹299'}
                        onClickCard={() => navigateToCourseDetails('vid-fullstack-dev')}
                        onAction={() => {
                          const course = videoCourses.find(c => c.id === 'vid-fullstack-dev');
                          if (enrolledCourses.includes('vid-fullstack-dev')) {
                            navigateToVideoCourse('vid-fullstack-dev');
                          } else if (course) {
                            openEnrollModal(course);
                          }
                        }}
                      />

                      {/* Card 2: Python Programming (FREE) */}
                      <ModernCourseCard
                        title="Python Programming"
                        description="Start your Python journey from basics to advanced concepts."
                        banner={flagshipBanners.python}
                        category="Programming"
                        lessonsCount="40+ Lessons"
                        duration="30h"
                        level="Beginner"
                        badge="100% FREE"
                        price="Free"
                        isFree={true}
                        isEnrolled={enrolledCourses.includes('text-python')}
                        actionText={enrolledCourses.includes('text-python') ? 'Continue' : 'Start Free'}
                        onClickCard={() => navigateToCourseDetails('text-python', 'text')}
                        onAction={() => {
                          if (enrolledCourses.includes('text-python')) {
                            navigateToTextCourse('text-python');
                          } else {
                            enrollInCourse('text-python');
                            navigateToTextCourse('text-python');
                          }
                        }}
                      />

                      {/* Card 3: AI & Machine Learning (FREE) */}
                      <ModernCourseCard
                        title="AI & Machine Learning"
                        description="Build intelligent solutions with Machine Learning & Deep Learning."
                        banner={flagshipBanners.aiml}
                        category="Artificial Intelligence"
                        lessonsCount="35+ Lessons"
                        duration="28h"
                        level="Intermediate"
                        badge="100% FREE"
                        price="Free"
                        isFree={true}
                        isEnrolled={enrolledCourses.includes('text-numpy')}
                        actionText={enrolledCourses.includes('text-numpy') ? 'Continue' : 'Start Free'}
                        onClickCard={() => navigateToCourseDetails('text-numpy', 'text')}
                        onAction={() => {
                          if (enrolledCourses.includes('text-numpy')) {
                            navigateToTextCourse('text-numpy');
                          } else {
                            enrollInCourse('text-numpy');
                            navigateToTextCourse('text-numpy');
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Card 1: HTML5 (Video Course ₹99) */}
                      <ModernCourseCard
                        title="HTML5 Web Architecture"
                        description="Master modern HTML5 semantics, SEO foundations, and WCAG accessibility standards."
                        banner={videoCourses.find(c => c.id === 'vid-html')?.thumbnail || flagshipBanners.fullstack}
                        category="Frontend Track"
                        lessonsCount="10+ Lessons"
                        duration="3h 40m"
                        level="Beginner"
                        badge="VIDEO PASS • ₹99"
                        price="₹99"
                        originalPrice="₹999"
                        isFree={false}
                        isEnrolled={enrolledCourses.includes('vid-html')}
                        actionText={enrolledCourses.includes('vid-html') ? 'Continue' : 'Enroll ₹99'}
                        onClickCard={() => navigateToCourseDetails('vid-html')}
                        onAction={() => {
                          const course = videoCourses.find(c => c.id === 'vid-html');
                          if (enrolledCourses.includes('vid-html')) {
                            navigateToVideoCourse('vid-html');
                          } else if (course) {
                            openEnrollModal(course);
                          }
                        }}
                      />

                      {/* Card 2: CSS3 (Video Course ₹99) */}
                      <ModernCourseCard
                        title="Modern CSS3 & Responsive Design"
                        description="Master Flexbox, CSS Grid, mobile-first responsive design patterns, and transitions."
                        banner={videoCourses.find(c => c.id === 'vid-css')?.thumbnail || flagshipBanners.fullstack}
                        category="Frontend Track"
                        lessonsCount="10+ Lessons"
                        duration="4h 15m"
                        level="Beginner to Intermediate"
                        badge="VIDEO PASS • ₹99"
                        price="₹99"
                        originalPrice="₹999"
                        isFree={false}
                        isEnrolled={enrolledCourses.includes('vid-css')}
                        actionText={enrolledCourses.includes('vid-css') ? 'Continue' : 'Enroll ₹99'}
                        onClickCard={() => navigateToCourseDetails('vid-css')}
                        onAction={() => {
                          const course = videoCourses.find(c => c.id === 'vid-css');
                          if (enrolledCourses.includes('vid-css')) {
                            navigateToVideoCourse('vid-css');
                          } else if (course) {
                            openEnrollModal(course);
                          }
                        }}
                      />

                      {/* Card 3: JavaScript (Video Course ₹99) */}
                      <ModernCourseCard
                        title="JavaScript Modern Programming"
                        description="Complete modern ES6+, async/await, DOM manipulation, functional paradigms, and REST APIs."
                        banner={videoCourses.find(c => c.id === 'vid-javascript')?.thumbnail || flagshipBanners.fullstack}
                        category="Programming"
                        lessonsCount="12+ Lessons"
                        duration="5h 20m"
                        level="All Levels"
                        badge="VIDEO PASS • ₹99"
                        price="₹99"
                        originalPrice="₹999"
                        isFree={false}
                        isEnrolled={enrolledCourses.includes('vid-javascript')}
                        actionText={enrolledCourses.includes('vid-javascript') ? 'Continue' : 'Enroll ₹99'}
                        onClickCard={() => navigateToCourseDetails('vid-javascript')}
                        onAction={() => {
                          const course = videoCourses.find(c => c.id === 'vid-javascript');
                          if (enrolledCourses.includes('vid-javascript')) {
                            navigateToVideoCourse('vid-javascript');
                          } else if (course) {
                            openEnrollModal(course);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ================= REAL ACTIVE ENROLLED COURSE DASHBOARD ================= */
              <div className="space-y-6">
              {/* Dark Showcase Hero Banner with Real Progress Dial */}
              <div className="rounded-3xl bg-[#161922] text-white p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Column: Real Course Details & Actions */}
                  <div className="space-y-4 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                        ● {activeCourseProgress >= 100 ? 'Course Mastered' : 'Masterclass In Progress'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[11px] font-bold">
                        {activeCourse.category} Track
                      </span>
                    </div>

                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                        {activeCourse.title}
                      </h1>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3 font-medium">
                        <span>Curriculum: <strong className="text-slate-200">Skyrovix Team</strong></span>
                        <span>•</span>
                        <span>Duration: <strong>{activeCourse.totalDuration || activeCourse.estimatedHours || '24 hrs'}</strong></span>
                        <span>•</span>
                        <span>Lectures: <strong>{activeTotalLessons} Lessons</strong></span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <button
                        onClick={handleResumeCourse}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/25 transition-all active:scale-95"
                      >
                        <Play size={14} className="fill-current" />
                        <span>Resume Lecture ▶</span>
                      </button>
                      
                      <button
                        onClick={() => setShowSyllabusModal(true)}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <BookOpen size={14} />
                        <span>Course Syllabus</span>
                      </button>

                      <button
                        onClick={() => setCurrentView('certificates')}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all active:scale-95"
                      >
                        <Award size={14} />
                        <span>Official Certificate Page</span>
                      </button>

                      <button
                        onClick={() => setActiveWorkspaceTab('playground')}
                        className="cursor-pointer px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Terminal size={14} />
                        <span>Code Sandbox</span>
                      </button>
                    </div>
                  </div>

                  {/* Big Glowing Circular Progress Gauge (Real Progress) */}
                  <div className="flex flex-col items-center justify-center shrink-0 pr-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="text-slate-800"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          className="text-[#10B981] transition-all duration-700 ease-out"
                          strokeWidth="8"
                          strokeDasharray={264}
                          strokeDashoffset={264 - (264 * activeCourseProgress) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-white">{activeCourseProgress}%</span>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#10B981]">PROGRESS</span>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-400">
                      {activeCompletedList.length} of {activeTotalLessons} Completed
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Metric Cards with Real Platform Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Completed Lectures */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider">
                      {totalCompletedLessonsAll > 0 ? 'ACTIVE PROGRESS' : 'GET STARTED'}
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 leading-tight">
                      {totalCompletedLessonsAll} / {totalEnrolledLessonsAll}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mt-1">Completed Lectures Across Courses</div>
                  </div>
                </div>

                {/* Card 2: Study Streak */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF5A36] flex items-center justify-center">
                      <Flame size={16} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-orange-100 text-[#FF5A36] text-[10px] font-extrabold uppercase tracking-wider">
                      {userXP.toLocaleString()} XP
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 leading-tight">{streakDays} Days</div>
                    <div className="text-xs text-slate-500 font-semibold mt-1">Consecutive Days Coding Streak</div>
                  </div>
                </div>

                {/* Card 3: Verified Certificate */}
                <div
                  onClick={() => setActiveWorkspaceTab('certificates')}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#FF5A36]/60 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Award size={16} />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveWorkspaceTab('certificates');
                      }}
                      className="cursor-pointer px-2.5 py-1 rounded-full bg-orange-100 group-hover:bg-[#FF5A36] text-[#FF5A36] group-hover:text-white transition-colors text-[10px] font-extrabold uppercase tracking-wider"
                    >
                      VIEW CERTIFICATES →
                    </button>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 leading-tight">
                      {displayCertificatesCount} Verifiable
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mt-1">Accredited Course Credentials</div>
                  </div>
                </div>
              </div>

              {/* Real Curriculum Progress Stepper Pipeline from Real Modules */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Layers size={18} className="text-[#FF5A36]" />
                    <span>
                      {activeVideoCourse
                        ? `Curriculum Milestones (${activeVideoCourse.modules.length} Modules)`
                        : `Course Syllabus (${activeTotalLessons} Lessons)`}
                    </span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>{activeCourseProgress}% Completed</span>
                  </span>
                </div>

                {/* Modules Grid */}
                {activeVideoCourse ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {activeVideoCourse.modules.map((mod, idx) => {
                      const modCompletedCount = mod.lessons.filter(l => activeCompletedList.includes(l.id)).length;
                      const modTotalCount = mod.lessons.length;
                      const isModDone = modCompletedCount === modTotalCount && modTotalCount > 0;
                      const isModInProgress = modCompletedCount > 0 && !isModDone;

                      return (
                        <div
                          key={mod.id}
                          className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 relative overflow-hidden group transition-all ${
                            isModDone
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : isModInProgress
                              ? 'bg-orange-50/50 border-orange-200 ring-1 ring-orange-200'
                              : 'bg-[#FAF8F5] border-slate-200/90'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Milestone 0{idx + 1}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  isModDone
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isModInProgress
                                    ? 'bg-orange-100 text-[#FF5A36]'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {isModDone ? '100%' : `${Math.round((modCompletedCount / modTotalCount) * 100)}%`}
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#FF5A36] transition-colors leading-snug line-clamp-2">
                              {mod.title}
                            </h4>

                            <div className="text-[11px] text-slate-500 mt-2 space-y-1">
                              <div className="flex items-center justify-between">
                                <span>{modTotalCount} Lessons</span>
                                <span className="font-mono text-[10px]">{mod.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-medium text-slate-500">
                              {modCompletedCount}/{modTotalCount} Completed
                            </span>
                            <button
                              onClick={() => {
                                const nextLesson = mod.lessons.find(l => !activeCompletedList.includes(l.id)) || mod.lessons[0];
                                navigateToVideoCourse(activeVideoCourse.id, nextLesson.id);
                              }}
                              className="text-[11px] font-bold text-[#FF5A36] hover:underline flex items-center gap-0.5"
                            >
                              <span>{isModDone ? 'Review' : 'Start'}</span>
                              <Play size={10} className="fill-current" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Text Course Lessons Grid
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(activeTextCourse?.lessons || []).slice(0, 8).map((lesson, idx) => {
                      const isDone = activeCompletedList.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => navigateToTextCourse(activeTextCourse!.slug, lesson.id)}
                          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                            isDone ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#FAF8F5] border-slate-200/90 hover:border-[#FF5A36]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span>Chapter 0{idx + 1}</span>
                            {isDone ? (
                              <CheckCircle2 size={13} className="text-emerald-600" />
                            ) : (
                              <span>{lesson.readTimeMinutes} mins</span>
                            )}
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                            {lesson.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        )}

          {/* TAB 2: MY ENROLLED COURSES (REAL ENROLLED COURSES) */}
          {activeWorkspaceTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-display">
                    My Enrolled Courses & Tracks ({allEnrolledCourses.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Your active curricula with live progress tracking and video sandboxes.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('catalog')}
                  className="cursor-pointer px-4 py-2 rounded-2xl bg-[#FF5A36] text-white font-bold text-xs shadow-md shadow-orange-500/20"
                >
                  Explore More Courses
                </button>
              </div>

              {allEnrolledCourses.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-4 max-w-md mx-auto my-8">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF5A36] flex items-center justify-center mx-auto">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">No Enrolled Courses Yet</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Explore our curriculum to enroll in 100% free tracks or apply for career masterclasses.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('catalog')}
                    className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
                  >
                    <Compass size={14} />
                    <span>Browse Course Catalog</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allEnrolledCourses.map(course => {
                    const doneCount = (completedLessons[course.id] || []).length;
                    const totalCount = 'modules' in course
                      ? course.modules.reduce((s, m) => s + m.lessons.length, 0)
                      : course.totalLessons;
                    const pct = Math.min(100, Math.round((doneCount / (totalCount || 1)) * 100));

                    const banner = ('thumbnail' in course && course.thumbnail && !course.thumbnail.includes('unsplash'))
                      ? course.thumbnail
                      : getCourseBanner(course.id);

                    const duration = 'totalDuration' in course
                      ? course.totalDuration
                      : ('estimatedHours' in course ? course.estimatedHours : '24h');

                    const desc = 'subtitle' in course
                      ? course.subtitle
                      : ('shortDesc' in course ? course.shortDesc : ('description' in course ? course.description : 'Explore interactive lessons and practice challenges.'));

                    return (
                      <ModernCourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        description={desc}
                        banner={banner}
                        category={course.category}
                        lessonsCount={`${doneCount}/${totalCount} Done`}
                        duration={duration}
                        level={course.level}
                        badge={pct >= 100 ? 'COMPLETED' : `${pct}% DONE`}
                        isEnrolled={true}
                        progress={pct}
                        actionText="Resume"
                        onClickCard={() => navigateToCourseDetails(course.id)}
                        onAction={() => {
                          setSelectedCourseId(course.id);
                          if ('modules' in course) {
                            navigateToVideoCourse(course.id);
                          } else {
                            navigateToTextCourse(course.slug);
                          }
                        }}
                      />
                    );
                  })}
                </div>
            )}
          </div>
        )}

          {/* TAB 3: EMBEDDED COURSE CERTIFICATES (WITH OFFICIAL DEMO CERTIFICATE) */}
          {activeWorkspaceTab === 'certificates' && (
            <div className="space-y-6">
              {/* Header & Mode Switcher */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF5A36] flex items-center justify-center font-bold">
                      <Award size={18} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                      Course Certificates of Completion
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    MSME-accredited credentials awarded upon 100% course completion. Preview our live demo certificate below.
                  </p>
                </div>

                {/* Switcher: Demo Certificate vs My Enrolled Certificates */}
                <div className="flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-2xl border border-slate-200/80 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCertMode('demo')}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      certMode === 'demo'
                        ? 'bg-[#FF5A36] text-white shadow-md shadow-orange-500/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Sparkles size={14} />
                    <span>Demo Certificate</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/25 text-white font-mono uppercase">
                      SAMPLE
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCertMode('enrolled')}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      certMode === 'enrolled'
                        ? 'bg-[#14171F] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Award size={14} />
                    <span>My Courses</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      certMode === 'enrolled' ? 'bg-[#FF5A36] text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {completedCoursesCount} EARNED
                    </span>
                  </button>
                </div>
              </div>

              {/* MODE 1: OFFICIAL DEMO CERTIFICATE PREVIEW */}
              {certMode === 'demo' && (
                <div className="space-y-5">
                  {/* Demo Explanation Banner with Quick-Unlock Action */}
                  <div className="rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-4 sm:p-5 border border-orange-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A36] text-white text-[10px] font-extrabold uppercase tracking-wider">
                          LIVE DEMO SPECIFICATION
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          Full Stack Web Development Masterclass Sample
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        This is an official demonstration of the Skyrovix Course Certificate of Completion. It features A4 landscape vector borders, cryptographic QR validation, and founder signatures.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const targetId = 'vid-html';
                          completeEntireCourse(targetId);
                          setSelectedDashboardCertCourseId(targetId);
                          setCertMode('enrolled');
                          showToast('🏆 Instant Pass: Unlocked your real HTML5 Certificate of Completion!');
                        }}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-[#14171F] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                        title="Complete HTML5 100% and unlock your personal certificate"
                      >
                        <Zap size={14} className="text-amber-400" />
                        <span>Instant Unlock My Real Certificate</span>
                      </button>
                    </div>
                  </div>

                  {/* Action Bar for Demo Certificate */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 no-print">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-black text-slate-900">
                        SKX-DEMO-2026-9055
                      </span>
                      <span className="text-xs text-slate-400">|</span>
                      <span className="text-xs text-slate-500 font-medium">
                        Executive Double-Frame Standard (A4 Landscape)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          showToast('Preparing official A4 high-resolution PDF for demo certificate...');
                          setTimeout(() => window.print(), 400);
                        }}
                        className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white text-xs font-bold transition-all shadow-sm shadow-orange-500/20 flex items-center gap-1.5"
                      >
                        <Download size={13} />
                        <span>Download PDF</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Printer size={13} />
                        <span>Print</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('https://skyrovix.in/verify-certificate?id=SKX-DEMO-2026-9055');
                          showToast('Verification URL copied to clipboard!');
                        }}
                        className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Copy size={13} />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </div>

                  {/* THE DEMO CERTIFICATE CANVAS (Strictly matching the user's executive template) */}
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
                      style={{ backgroundColor: '#ffffff' }}
                    >
                      {/* Header: Left Logo + Center Brand + Right MSME */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={brandImages.logo}
                            alt="Skyrovix"
                            className="h-10 sm:h-12 w-auto object-contain"
                          />
                        </div>

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

                        <div className="flex items-center gap-2">
                          <img
                            src={brandImages.msme}
                            alt="Govt MSME"
                            className="h-9 sm:h-11 w-auto object-contain"
                          />
                        </div>
                      </div>

                      {/* Title Block: COURSE CERTIFICATE OF COMPLETION */}
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
                        <div className="w-14 h-[2.5px] bg-[#f95c4b] mx-auto mt-2 rounded-full" />
                      </div>

                      {/* Presentation Citation */}
                      <div className="mt-5 space-y-2 max-w-2xl mx-auto">
                        <div className="text-xs sm:text-sm text-slate-500 tracking-wider">
                          This certificate is awarded to
                        </div>
                        <div className="text-2xl sm:text-4xl font-extrabold text-[#181619] tracking-tight uppercase border-b border-slate-200 pb-2 inline-block px-4">
                          {currentUser?.certificateName || currentUser?.name || 'HARIHARAN S'}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-2">
                          for successfully completing the{' '}
                          <strong className="text-[#f95c4b] font-bold">Full Stack Web Development Masterclass</strong> course with a score of{' '}
                          <strong className="text-[#181619] font-bold">100/100 (Distinction)</strong>, demonstrating proficiency, technical mastery, and commitment to learning.
                        </p>
                      </div>

                      {/* QR Code Digital Verification Badge */}
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                              'https://skyrovix.in/verify-certificate?id=SKX-DEMO-2026-9055'
                            )}`}
                            alt="QR Verification"
                            className="w-full h-full object-contain"
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

                      {/* Signatures & Seal Section */}
                      <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 items-end gap-2 text-center">
                        {/* Founder & CEO */}
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

                        {/* Official Seal */}
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

                        {/* Co-Founder */}
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

                      {/* Footer Metadata */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                        <div className="text-left space-y-0.5">
                          <div>
                            Certificate ID: <strong className="text-[#181619]">SKX-DEMO-2026-9055</strong>
                          </div>
                          <div>
                            Score: <strong className="text-[#f95c4b]">100/100 (Distinction)</strong>
                          </div>
                        </div>
                        <div className="text-right space-y-0.5">
                          <div>
                            Issued: <strong className="text-[#181619]">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>
                          </div>
                          <div>
                            Verify at: <strong className="text-[#f95c4b]">www.skyrovix.in/verify-certificate</strong>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* MODE 2: REAL ENROLLED COURSES CERTIFICATES */}
              {certMode === 'enrolled' && (
                <div className="space-y-6">
                  {allEnrolledCourses.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5A36] flex items-center justify-center mx-auto">
                        <Award size={30} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">No Enrolled Courses Yet</h3>
                        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                          You have not enrolled in any courses yet. Enroll in a course, finish 100% of the lessons, and your personalized credential will appear here automatically.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            enrollInCourse('text-html');
                            navigateToTextCourse('text-html');
                          }}
                          className="cursor-pointer px-4 py-2 rounded-xl bg-[#FF5A36] text-white font-bold text-xs shadow-md"
                        >
                          Start Free HTML5 Track
                        </button>
                        <button
                          type="button"
                          onClick={() => setCertMode('demo')}
                          className="cursor-pointer px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                        >
                          View Demo Certificate
                        </button>
                      </div>
                    </div>
                  ) : (
                    (() => {
                      const activeCertCourse = allEnrolledCourses.find(c => c.id === selectedDashboardCertCourseId) || allEnrolledCourses[0];
                      const isCertVideo = 'modules' in activeCertCourse;
                      const certCompletedList = completedLessons[activeCertCourse.id] || [];
                      const certTotalCount = isCertVideo
                        ? activeCertCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0)
                        : (activeCertCourse as any).totalLessons || 1;
                      const certDoneCount = certCompletedList.length;
                      const certIsCompleted = certDoneCount >= certTotalCount && certTotalCount > 0;
                      const certProgressPct = Math.min(100, Math.round((certDoneCount / (certTotalCount || 1)) * 100));

                      const hashNum = Math.abs(activeCertCourse.id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0));
                      const certId = `SKX-CERT-2026-${(hashNum % 90000 + 10000)}`;

                      return (
                        <div className="space-y-6">
                          {/* Course Selector Tabs */}
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {allEnrolledCourses.map(course => {
                              const done = (completedLessons[course.id] || []).length;
                              const total = 'modules' in course
                                ? course.modules.reduce((s, m) => s + m.lessons.length, 0)
                                : (course as any).totalLessons || 1;
                              const isCourseDone = done >= total && total > 0;
                              const isSelected = (activeCertCourse.id === course.id);

                              return (
                                <button
                                  key={course.id}
                                  type="button"
                                  onClick={() => setSelectedDashboardCertCourseId(course.id)}
                                  className={`cursor-pointer px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border ${
                                    isSelected
                                      ? 'bg-white border-[#FF5A36] text-slate-900 shadow-sm ring-1 ring-[#FF5A36]/20'
                                      : 'bg-white/80 border-slate-200 hover:bg-white text-slate-600'
                                  }`}
                                >
                                  {isCourseDone ? (
                                    <CheckCircle2 size={14} className="text-emerald-600" />
                                  ) : (
                                    <Lock size={14} className="text-amber-500" />
                                  )}
                                  <span className="truncate max-w-[180px]">{course.title}</span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                                    isCourseDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {isCourseDone ? '100%' : `${Math.round((done / total) * 100)}%`}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Active Selected Course Certificate Render */}
                          <div className="relative">
                            {/* Locked Overlay if NOT completed */}
                            {!certIsCompleted && (
                              <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-[3px] rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white space-y-4 no-print">
                                <div className="w-16 h-16 rounded-3xl bg-[#FF5A36] text-white flex items-center justify-center shadow-xl">
                                  <Lock size={32} />
                                </div>
                                <div className="max-w-md space-y-2">
                                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                                    In Progress ({certProgressPct}% Completed)
                                  </span>
                                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                                    Official Certificate Locked
                                  </h3>
                                  <p className="text-xs text-slate-200 leading-relaxed">
                                    Complete all <strong>{certTotalCount} lessons</strong> in <strong>{activeCertCourse.title}</strong> to unlock and issue your official accredited certificate.
                                  </p>
                                </div>

                                <div className="w-full max-w-xs space-y-1">
                                  <div className="flex justify-between text-[11px] font-mono text-slate-300">
                                    <span>Completed: {certDoneCount}</span>
                                    <span>Remaining: {certTotalCount - certDoneCount}</span>
                                  </div>
                                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#FF5A36] rounded-full transition-all duration-500"
                                      style={{ width: `${certProgressPct}%` }}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if ('modules' in activeCertCourse) {
                                        navigateToVideoCourse(activeCertCourse.id);
                                      } else {
                                        navigateToTextCourse(activeCertCourse.slug || activeCertCourse.id);
                                      }
                                    }}
                                    className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                                  >
                                    <Play size={13} className="fill-current" />
                                    <span>Resume Course to Complete</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      completeEntireCourse(activeCertCourse.id);
                                      showToast(`🏆 Instant Pass: Unlocked certificate for ${activeCertCourse.title}!`);
                                    }}
                                    className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                                  >
                                    <Zap size={14} className="text-amber-300" />
                                    <span>Complete All Lessons (Demo Pass)</span>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Certificate Action Bar */}
                            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 mb-4 no-print">
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${certIsCompleted ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span className="text-xs font-mono font-black text-slate-900">
                                  {certIsCompleted ? certId : `SKX-PENDING-${(hashNum % 9000 + 1000)}`}
                                </span>
                                <span className="text-xs text-slate-400">|</span>
                                <span className="text-xs text-slate-500 font-medium">
                                  {certIsCompleted ? 'Official Verified Credential' : 'Course In Progress'}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (certIsCompleted) {
                                      showToast(`Preparing official PDF for ${certId}...`);
                                      setTimeout(() => window.print(), 400);
                                    } else {
                                      showToast('⚠️ Complete 100% of this course to download certificate.');
                                    }
                                  }}
                                  disabled={!certIsCompleted}
                                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                                    certIsCompleted
                                      ? 'bg-[#FF5A36] hover:bg-[#E03D00] text-white shadow-orange-500/20'
                                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  }`}
                                >
                                  {certIsCompleted ? <Download size={13} /> : <Lock size={13} />}
                                  <span>Download PDF</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (certIsCompleted) window.print();
                                    else showToast('⚠️ Complete 100% of this course to enable printing.');
                                  }}
                                  disabled={!certIsCompleted}
                                  className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                                    certIsCompleted
                                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  }`}
                                >
                                  <Printer size={13} />
                                  <span>Print</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(`https://skyrovix.in/verify-certificate?id=${certId}`);
                                    showToast('Verification URL copied to clipboard!');
                                  }}
                                  className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                                >
                                  <Copy size={13} />
                                  <span>Copy Link</span>
                                </button>
                              </div>
                            </div>

                            {/* Executive Certificate Document Canvas */}
                            <div
                              id="certificate-print-area"
                              className="bg-white rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden text-center text-slate-900 border-4 border-[#181619]"
                              style={{
                                backgroundColor: '#ffffff',
                                fontFamily: "'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                              }}
                            >
                              <div
                                className="rounded-2xl p-5 sm:p-7 relative border-[1.5px] border-[#f95c4b]"
                                style={{ backgroundColor: '#ffffff' }}
                              >
                                {/* Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={brandImages.logo}
                                      alt="Skyrovix"
                                      className="h-10 sm:h-12 w-auto object-contain"
                                    />
                                  </div>

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

                                  <div className="flex items-center gap-2">
                                    <img
                                      src={brandImages.msme}
                                      alt="Govt MSME"
                                      className="h-9 sm:h-11 w-auto object-contain"
                                    />
                                  </div>
                                </div>

                                {/* Title Block */}
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
                                  <div className="w-14 h-[2.5px] bg-[#f95c4b] mx-auto mt-2 rounded-full" />
                                </div>

                                {/* Presentation Citation */}
                                <div className="mt-5 space-y-2 max-w-2xl mx-auto">
                                  <div className="text-xs sm:text-sm text-slate-500 tracking-wider">
                                    This certificate is awarded to
                                  </div>
                                  <div className="text-2xl sm:text-4xl font-extrabold text-[#181619] tracking-tight uppercase border-b border-slate-200 pb-2 inline-block px-4">
                                    {currentUser?.certificateName || currentUser?.name || 'HARIHARAN S'}
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto pt-2">
                                    for successfully completing the{' '}
                                    <strong className="text-[#f95c4b] font-bold">{activeCertCourse.title}</strong> course with a score of{' '}
                                    <strong className="text-[#181619] font-bold">{certIsCompleted ? '100/100 (Distinction)' : `${certProgressPct}% (In Progress)`}</strong>, demonstrating proficiency, technical mastery, and commitment to learning.
                                  </p>
                                </div>

                                {/* QR Code Badge */}
                                <div className="mt-4 flex items-center justify-center gap-3">
                                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                                    <img
                                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                                        `https://skyrovix.in/verify-certificate?id=${certId}`
                                      )}`}
                                      alt="QR Verification"
                                      className="w-full h-full object-contain"
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

                                {/* Signatures & Seal */}
                                <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 items-end gap-2 text-center">
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

                                {/* Footer */}
                                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                                  <div className="text-left space-y-0.5">
                                    <div>
                                      Certificate ID: <strong className="text-[#181619]">{certId}</strong>
                                    </div>
                                    <div>
                                      Score: <strong className="text-[#f95c4b]">{certIsCompleted ? '100/100 (Distinction)' : `${certProgressPct}% In Progress`}</strong>
                                    </div>
                                  </div>
                                  <div className="text-right space-y-0.5">
                                    <div>
                                      Issued: <strong className="text-[#181619]">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong>
                                    </div>
                                    <div>
                                      Verify at: <strong className="text-[#f95c4b]">www.skyrovix.in/verify-certificate</strong>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CODE SANDBOX */}
          {activeWorkspaceTab === 'playground' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={20} className="text-[#FF5A36]" />
                  <h3 className="text-base font-black text-slate-900">
                    Interactive In-Browser Code Sandbox
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">● LIVE RUNTIME</span>
              </div>
              <CodePlayground />
            </div>
          )}

          {/* TAB 4: PRACTICE & CHALLENGES */}
          {activeWorkspaceTab === 'practice' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-display">Hands-On Practice Challenges</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Sharpen your problem solving and architecture skills with live evaluations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Reverse a Linked List with Pointer Manipulation', lang: 'JavaScript', diff: 'Medium', points: '120 XP' },
                  { title: 'Build a Distributed Rate Limiter with Redis', lang: 'Node.js', diff: 'Hard', points: '250 XP' },
                  { title: 'Optimizing SQL Queries with Indexes & Execution Plans', lang: 'SQL', diff: 'Medium', points: '150 XP' },
                  { title: 'Implement React 19 Custom Optimistic Hook', lang: 'React', diff: 'Hard', points: '200 XP' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.lang} • {item.diff}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1.5">{item.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#FF5A36]">{item.points}</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveWorkspaceTab('playground');
                        showToast(`Opened "${item.title}" in sandbox!`);
                      }}
                      className="cursor-pointer px-4 py-2 rounded-xl bg-orange-50 text-[#FF5A36] hover:bg-orange-100 font-bold text-xs shrink-0"
                    >
                      Solve Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REAL SAVED NOTES & BOOKMARKS */}
          {activeWorkspaceTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-display">
                    My Saved Notes & Bookmarks ({notes.length + bookmarks.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Your real personal highlights, code snippets, and bookmarked lectures.
                  </p>
                </div>
              </div>

              {notes.length === 0 && bookmarks.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
                  <Bookmark size={32} className="mx-auto text-slate-300" />
                  <h4 className="font-bold text-sm text-slate-700">No notes or bookmarks yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Take notes while watching video lectures or reading documentation to access them anytime here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Real Notes */}
                  {notes.map(note => (
                    <div key={note.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A36] bg-orange-50 px-2 py-0.5 rounded-full">
                          Lecture Note
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">{note.createdAt}</span>
                          <button
                            onClick={() => {
                              deleteNote(note.id);
                              showToast('Note deleted');
                            }}
                            className="cursor-pointer text-slate-300 hover:text-rose-500 transition-colors p-1"
                            title="Delete note"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{note.courseTitle}</div>
                        <h4 className="font-bold text-xs text-slate-900 mt-0.5">{note.lessonTitle}</h4>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {note.content}
                      </p>

                      <button
                        onClick={() => navigateToVideoCourse(note.courseId, note.lessonId)}
                        className="cursor-pointer text-xs font-bold text-[#FF5A36] hover:underline flex items-center gap-1 pt-1"
                      >
                        <span>Jump to Lesson</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  ))}

                  {/* Real Bookmarks */}
                  {bookmarks.map(bm => (
                    <div key={bm.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                          {bm.courseType === 'video' ? 'Video Bookmark' : 'Text Bookmark'}
                        </span>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{bm.courseTitle}</div>
                        <h4 className="font-bold text-xs text-slate-900 mt-0.5">{bm.lessonTitle}</h4>
                      </div>

                      <button
                        onClick={() => {
                          if (bm.courseType === 'video') {
                            navigateToVideoCourse(bm.courseId, bm.lessonId);
                          } else {
                            navigateToTextCourse(bm.courseSlug, bm.lessonId);
                          }
                        }}
                        className="cursor-pointer w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Resume from Bookmark</span>
                        <Play size={12} className="fill-current" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: EDIT STUDENT PROFILE PAGE */}
          {activeWorkspaceTab === 'profile' && (
            <EditProfilePage onBackToOverview={() => setActiveWorkspaceTab('overview')} />
          )}

        </main>
      </div>

      {/* ================= REAL COURSE SYLLABUS MODAL ================= */}
      <AnimatePresence>
        {showSyllabusModal && activeCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{activeCourse.title}</h3>
                  <p className="text-xs text-slate-500">Official Syllabus & Lecture Breakdown</p>
                </div>
                <button
                  onClick={() => setShowSyllabusModal(false)}
                  className="cursor-pointer p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto py-4 space-y-4 pr-1 flex-1">
                {activeVideoCourse ? (
                  activeVideoCourse.modules.map((mod, idx) => (
                    <div key={mod.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Module {idx + 1}: {mod.title}</span>
                        <span className="text-[11px] font-mono text-slate-400">{mod.duration}</span>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        {mod.lessons.map((lesson, lIdx) => {
                          const isDone = activeCompletedList.includes(lesson.id);
                          return (
                            <div key={lesson.id} className="flex items-center justify-between text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-2">
                                {isDone ? (
                                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                )}
                                <span>{lIdx + 1}. {lesson.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">{lesson.duration}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                    {(activeTextCourse?.lessons || []).map((lesson, idx) => (
                      <div key={lesson.id} className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span>{idx + 1}. {lesson.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">{lesson.readTimeMinutes} mins</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setShowSyllabusModal(false)}
                  className="cursor-pointer px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
