import React, { useState } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './components/home/HomePage';
import { CourseCatalog } from './components/catalog/CourseCatalog';
import { CourseDetailsPage } from './components/catalog/CourseDetailsPage';
import { VideoPlayerView } from './components/player/VideoPlayerView';
import { TextReaderView } from './components/reader/TextReaderView';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { CertificateVerifyPage } from './components/certificate/CertificateVerifyPage';
import { CourseCertificatesPage } from './components/certificate/CourseCertificatesPage';
import { CommandPalette } from './components/common/CommandPalette';
import { CodePlayground } from './components/playground/CodePlayground';
import { PracticePage } from './components/practice/PracticePage';
import { AuthModal } from './components/auth/AuthModal';
import { InternshipModal } from './components/internship/InternshipModal';
import { ResourcesModal, ResourceTab } from './components/resources/ResourcesModal';
import { EnrollModal } from './components/catalog/EnrollModal';
import {
  ResumeBuilderPage,
  LearnHubPage,
  LeaderboardPage,
  ReferralPage,
  RewardsPage,
  SuccessStoriesPage,
  CommunityHubPage
} from './components/resources';
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage
} from './components/legal';
import { brandImages } from './assets/brandImages';
import {
  Layers,
  Sparkles,
  Terminal,
  BookOpen,
  Video,
  ShieldCheck,
  Award,
  Globe,
  ArrowRight,
  Heart,
  Github,
  Twitter,
  Linkedin,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCourseId,
    isAuthenticated,
    role,
    enrollModalCourse,
    closeEnrollModal,
    globalToastMessage
  } = usePlatform();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPlaygroundModalOpen, setIsPlaygroundModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [activeResourceTab, setActiveResourceTab] = useState<ResourceTab>('free-resources');
  const [catalogFormatFilter, setCatalogFormatFilter] = useState<'all' | 'video' | 'text'>('all');

  // Strict route protection: unauthenticated users cannot access student or admin dashboards
  React.useEffect(() => {
    if (!isAuthenticated && (currentView === 'user-dashboard' || currentView === 'admin-dashboard')) {
      setCurrentView('home');
    }
  }, [isAuthenticated, currentView, setCurrentView]);

  const handleOpenResource = (tab: ResourceTab) => {
    setActiveResourceTab(tab);
    setIsResourcesModalOpen(true);
  };

  const handleOpenTutorials = () => {
    setCatalogFormatFilter('text');
    setCurrentView('catalog');
  };

  const handleOpenCourses = () => {
    setCatalogFormatFilter('video');
    setCurrentView('catalog');
  };

  const handleOpenLogin = () => {
    setCurrentView('login');
  };

  const handleOpenSignUp = () => {
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-[#FB4400] selection:text-white">
      {/* Top Navbar */}
      {currentView !== 'admin-dashboard' && currentView !== 'login' && (
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenPlayground={() => setCurrentView('practice')}
          onOpenTutorials={handleOpenTutorials}
          onOpenCourses={handleOpenCourses}
          onOpenResource={handleOpenResource}
          onOpenInternship={() => setIsInternshipModalOpen(true)}
          onOpenLogin={handleOpenLogin}
          onOpenSignUp={handleOpenSignUp}
          activeFormatFilter={catalogFormatFilter}
        />
      )}

      {/* Primary Route/View Canvas */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage onOpenAuth={handleOpenLogin} />}
        {currentView === 'catalog' && (
          <CourseCatalog initialFormatFilter={catalogFormatFilter} />
        )}
        {currentView === 'practice' && <PracticePage />}
        {currentView === 'course-details' && (
          <CourseDetailsPage courseId={selectedCourseId || 'vid-fullstack-dev'} />
        )}
        {currentView === 'video-player' && <VideoPlayerView />}
        {currentView === 'text-reader' && <TextReaderView />}
        {currentView === 'login' && <LoginPage />}
        {currentView === 'user-dashboard' && (
          isAuthenticated ? <UserDashboard /> : <HomePage onOpenAuth={handleOpenLogin} />
        )}
        {currentView === 'admin-dashboard' && (
          isAuthenticated && role === 'admin' ? <AdminDashboard /> : <HomePage onOpenAuth={handleOpenLogin} />
        )}
        {currentView === 'certificates' && <CourseCertificatesPage />}
        {currentView === 'course-certificates' && <CourseCertificatesPage />}
        {currentView === 'certificate-verify' && <CertificateVerifyPage />}

        {/* 7 Dedicated Full-Screen Resource Pages */}
        {currentView === 'resume-builder' && <ResumeBuilderPage />}
        {currentView === 'learn-hub' && <LearnHubPage />}
        {currentView === 'leaderboard' && <LeaderboardPage />}
        {currentView === 'referral' && <ReferralPage />}
        {currentView === 'rewards' && <RewardsPage />}
        {currentView === 'success-stories' && <SuccessStoriesPage />}
        {currentView === 'community-hub' && <CommunityHubPage />}

        {/* Legal & Compliance Pages (Cashfree Payments & Refund Policy) */}
        {currentView === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentView === 'terms' && <TermsPage />}
        {currentView === 'refund-policy' && <RefundPolicyPage />}
      </main>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Interactive Code Playground Modal */}
      {isPlaygroundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-5xl h-[85vh] shadow-2xl rounded-2xl overflow-hidden">
            <CodePlayground onClose={() => setIsPlaygroundModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Authentication Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
      />

      {/* Skyrovix Internship Modal */}
      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={() => setIsInternshipModalOpen(false)}
      />

      {/* 12-Item Resources Hub Modal */}
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
        initialTab={activeResourceTab}
      />

      {/* Course Enrollment & Application Modal */}
      <EnrollModal
        course={enrollModalCourse}
        isOpen={!!enrollModalCourse}
        onClose={closeEnrollModal}
      />

      {/* Global Toast Alert */}
      {globalToastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{globalToastMessage}</span>
        </div>
      )}

      {/* Premium International EdTech Footer (Light Mode) */}
      {currentView !== 'video-player' && currentView !== 'text-reader' && currentView !== 'admin-dashboard' && currentView !== 'login' && (
        <footer className="border-t border-slate-200/90 bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={brandImages.logo}
                    alt="SKYROVIX"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-[10px] text-[#FB4400] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200">
                    LEARNING
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  The next-generation technical education platform providing dual-track masterclass video series and 435 text documentation lessons with live in-browser code execution.
                </p>

                {/* MSME & Accreditation Badge */}
                <div className="pt-2 flex items-center gap-3">
                  <img
                    src={brandImages.msme}
                    alt="MSME Certified"
                    className="h-9 w-auto object-contain p-1 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs"
                  />
                  <div className="text-[11px] text-slate-600 font-medium">
                    <span className="font-bold text-slate-800 block">MSME Registered Enterprise</span>
                    <span>Recognized Technical Learning Institute</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 font-mono pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Brand Identity: Innovation • Technology • Future</span>
                </div>
              </div>

              {/* Video Tracks Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                  Video Masterclasses
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <button
                      onClick={handleOpenCourses}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Full Stack Development
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenCourses}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Frontend with React 19
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenCourses}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Backend with Node.js
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenCourses}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Database Engineering (SQL & NoSQL)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenCourses}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Next.js 15 Full-Stack Architecture
                    </button>
                  </li>
                </ul>
              </div>

              {/* Text Tracks (435 Lessons) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                  Text Tutorials (435 Chapters)
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <button
                      onClick={handleOpenTutorials}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      HTML5 Semantic Core (80 Chapters)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenTutorials}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      CSS3 & Grid (90 Chapters)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenTutorials}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Python Core to Advanced (60 Chapters)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenTutorials}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      MySQL Relational DB (15 Chapters)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenTutorials}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Java Enterprise OOP (60 Chapters)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Platform & Portals */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                  Ecosystem Portals
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>
                    <button
                      onClick={() => setIsInternshipModalOpen(true)}
                      className="flex items-center gap-1.5 font-semibold text-[#FB4400] hover:underline"
                    >
                      <Briefcase size={12} />
                      <span>Skyrovix Internship Program</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleOpenResource('resume-builder')}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Resume Builder
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleOpenResource('free-resources')}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Free Cheatsheets & Guides
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('user-dashboard')}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Student Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('admin-dashboard')}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Admin Management Console
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('certificates')}
                      className="cursor-pointer hover:text-[#FB4400] transition-colors"
                    >
                      Course Certificates & Credentials
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('certificate-verify')}
                      className="hover:text-amber-600 transition-colors"
                    >
                      Certificate Verification Portal
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentView('practice')}
                      className="cursor-pointer hover:text-[#FB4400] transition-colors"
                    >
                      Interactive Code Sandbox & Arena
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentView('refund-policy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer text-[#FB4400] font-semibold hover:underline"
                    >
                      Refund & Cancellation (Cashfree)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleOpenLogin}
                      className="hover:text-[#FB4400] transition-colors"
                    >
                      Student & Admin Sign In
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <img src={brandImages.icon} alt="Skyrovix Mark" className="w-5 h-5 object-contain" />
                <p>© 2026 SKYROVIX LEARNING PLATFORM. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  onClick={() => {
                    setCurrentView('privacy-policy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-[#FB4400] transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => {
                    setCurrentView('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-[#FB4400] transition-colors"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => {
                    setCurrentView('refund-policy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer hover:text-[#FB4400] transition-colors font-bold text-slate-700"
                >
                  Refund & Cancellation (Cashfree)
                </button>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Payment Gateway: Cashfree</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <PlatformProvider>
      <MainContent />
    </PlatformProvider>
  );
}

export default App;
