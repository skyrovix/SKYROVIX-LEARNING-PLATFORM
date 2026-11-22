import React, { useState, useRef, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import {
  Home,
  Compass,
  Video,
  BookOpen,
  Terminal,
  LayoutGrid,
  Info,
  ChevronDown,
  Search,
  Bell,
  User,
  Menu,
  X,
  Sparkles,
  Download,
  Share2,
  Users,
  Smartphone,
  Gift,
  DollarSign,
  Trophy,
  MessageSquare,
  Briefcase,
  Star,
  FileCheck,
  Flame,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenPlayground: () => void;
  onOpenTutorials: () => void;
  onOpenCourses: () => void;
  onOpenInternship: () => void;
  onOpenLogin: () => void;
  onOpenSignUp?: () => void;
  activeFormatFilter?: 'all' | 'video' | 'text';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenPlayground,
  onOpenTutorials,
  onOpenCourses,
  onOpenInternship,
  onOpenLogin,
  activeFormatFilter = 'all'
}) => {
  const {
    currentView,
    setCurrentView,
    role,
    isAuthenticated,
    currentUser,
    logout,
    navigateToDashboard,
    navigateToAdmin,
    showGlobalToast
  } = usePlatform();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const productsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const categoriesTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductsEnter = () => {
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    setProductsDropdownOpen(true);
  };
  const handleProductsLeave = () => {
    productsTimerRef.current = setTimeout(() => setProductsDropdownOpen(false), 180);
  };

  const handleCategoriesEnter = () => {
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    setCategoriesDropdownOpen(true);
  };
  const handleCategoriesLeave = () => {
    categoriesTimerRef.current = setTimeout(() => setCategoriesDropdownOpen(false), 180);
  };

  const isHomeActive = currentView === 'home';
  const isTutorialsActive = currentView === 'catalog' && activeFormatFilter === 'text';
  const isCoursesActive = currentView === 'catalog' && activeFormatFilter !== 'text';
  const isPracticeActive = currentView === 'practice';
  const isAboutActive = currentView === 'about';

  const categoryList = [
    { name: 'Full Stack Development', desc: 'React, Node, DB & Next.js' },
    { name: 'Frontend Development', desc: 'HTML5, CSS3, JavaScript, React' },
    { name: 'Backend Development', desc: 'Node.js, Express, Microservices' },
    { name: 'Artificial Intelligence', desc: 'Machine Learning & Python' },
    { name: 'Data Science', desc: 'NumPy, Pandas, Matplotlib' },
    { name: 'Python Programming', desc: 'Core to Advanced algorithms' },
    { name: 'UI/UX Design', desc: 'Modern interfaces & design systems' },
    { name: 'Cyber Security', desc: 'Network & application security' },
    { name: 'Cloud Computing', desc: 'AWS, Docker & Deployment' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-orange-100/70 bg-[#FDFBF9]/95 backdrop-blur-md shadow-2xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Exact Brand Logo & Tagline from Reference Image */}
        <div className="flex items-center gap-4 lg:gap-5">
          <button
            onClick={() => setCurrentView('home')}
            className="cursor-pointer flex flex-col items-start group transition-transform active:scale-95 shrink-0"
            title="SKYROVIX - Innovation • Technology • Future"
          >
            <div className="flex items-center gap-1.5">
              <img
                src={brandImages.logo}
                alt="skyrovix"
                className="h-7 sm:h-8 w-auto object-contain drop-shadow-2xs group-hover:scale-102 transition-transform"
              />
            </div>
            <span className="text-[7.5px] uppercase font-extrabold tracking-[0.22em] text-slate-500 pl-0.5 mt-0.5">
              INNOVATION • TECHNOLOGY • FUTURE
            </span>
          </button>

          {/* Desktop Navigation Links matching user specification */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-nowrap shrink-0 overflow-visible">
            {/* Home - Active Flame Orange Pill Style */}
            <button
              onClick={() => setCurrentView('home')}
              className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isHomeActive
                  ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <Home size={14} className="shrink-0 text-current" />
              <span>Home</span>
            </button>

            {/* Tutorials */}
            <button
              onClick={onOpenTutorials}
              className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isTutorialsActive
                  ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <BookOpen size={14} className="shrink-0 text-current" />
              <span>Tutorials</span>
            </button>

            {/* Courses */}
            <button
              onClick={onOpenCourses}
              className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isCoursesActive
                  ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <Video size={14} className="shrink-0 text-current" />
              <span>Courses</span>
            </button>

            {/* Practice */}
            <button
              onClick={onOpenPlayground}
              className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isPracticeActive
                  ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <Terminal size={14} className="shrink-0 text-current" />
              <span>Practice</span>
            </button>

            {/* Our Product ▾ (Skyrovix Internship) */}
            <div
              ref={productsRef}
              className="relative shrink-0"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                  productsDropdownOpen
                    ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                    : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
                }`}
              >
                <Briefcase size={14} className="shrink-0 text-current" />
                <span>Our Product</span>
                <ChevronDown size={12} className="shrink-0 text-current opacity-80" />
              </button>

              <AnimatePresence>
                {productsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-2 w-80 bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-3 z-50"
                  >
                    <div className="absolute -top-1.5 left-8 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45" />
                    <a
                      href="https://skyrovix.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="cursor-pointer w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-left group transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:scale-105 group-hover:border-[#FB4400]/40 transition-all overflow-hidden">
                        <img
                          src={brandImages.internship}
                          alt="Skyrovix Internship"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#FB4400] flex items-center gap-1.5">
                          <span>Skyrovix Internship</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700">
                            HIRING
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">Live projects & MSME Certificate</div>
                        <div className="text-[10px] font-mono font-bold text-[#FB4400] mt-0.5 flex items-center gap-1">
                          <span>skyrovix.in</span>
                          <ExternalLink size={10} />
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Skyrovix */}
            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isAboutActive
                  ? 'bg-[#FB4400] text-white shadow-sm shadow-orange-500/25'
                  : 'text-slate-700 hover:bg-[#FB4400] hover:text-white hover:shadow-sm hover:shadow-orange-500/20'
              }`}
            >
              <Sparkles size={14} className="shrink-0 text-current" />
              <span>About</span>
            </button>
          </nav>
        </div>

        {/* Right Section matching user specification without search bar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Dashboard link - ONLY DISPLAYED WHEN SIGNED IN */}
          {isAuthenticated && (
            <button
              onClick={() => setCurrentView(role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
              className={`cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'user-dashboard' || currentView === 'admin-dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              title={role === 'admin' ? 'Open Admin Console' : 'Open Student Dashboard'}
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover border border-slate-300"
                />
              ) : (
                <LayoutDashboard size={14} className="text-[#FB4400]" />
              )}
              <span>Dashboard</span>
            </button>
          )}

          {/* Notification Bell with Badge Dot */}
          <button
            onClick={() => showGlobalToast && showGlobalToast('🔔 All 2026 courses and features are up to date.')}
            className="cursor-pointer relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors shrink-0"
            title="Notifications & Updates"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FB4400] ring-2 ring-white"></span>
          </button>

          {/* User Auth or Sign Out Button: STRICTLY CHECK isAuthenticated */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="cursor-pointer flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all border border-rose-200/90 shadow-2xs hover:shadow-xs active:scale-95 shrink-0 whitespace-nowrap"
              title="Sign out of your account"
            >
              <LogOut size={13} className="shrink-0 text-rose-500" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="cursor-pointer flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-bold transition-all shadow-sm shadow-orange-500/25 hover:shadow-md hover:scale-[1.02] active:scale-95 shrink-0 whitespace-nowrap"
            >
              <User size={13} className="shrink-0" />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-slate-200 bg-white text-xs shadow-lg overflow-y-auto max-h-[85vh] px-4 pt-3 pb-6 space-y-2"
          >
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-semibold ${
                isHomeActive ? 'bg-orange-50 text-[#FB4400] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Home size={16} className={isHomeActive ? 'text-[#FB4400]' : 'text-slate-500'} />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                onOpenTutorials();
                setMobileMenuOpen(false);
              }}
              className={`cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold ${
                isTutorialsActive ? 'bg-orange-50 text-[#FB4400] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} className={isTutorialsActive ? 'text-[#FB4400]' : 'text-slate-500'} />
                <span>Tutorials</span>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenCourses();
                setMobileMenuOpen(false);
              }}
              className={`cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold ${
                isCoursesActive ? 'bg-orange-50 text-[#FB4400] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Video size={16} className={isCoursesActive ? 'text-[#FB4400]' : 'text-slate-500'} />
                <span>Courses</span>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenPlayground();
                setMobileMenuOpen(false);
              }}
              className={`cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold ${
                isPracticeActive ? 'bg-orange-50 text-[#FB4400] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Terminal size={16} className={isPracticeActive ? 'text-[#FB4400]' : 'text-slate-500'} />
                <span>Practice</span>
              </div>
            </button>

            {/* Mobile Our Product: Skyrovix Internship */}
            <a
              href="https://skyrovix.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold text-slate-700 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden">
                  <img
                    src={brandImages.internship}
                    alt="Skyrovix Internship"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Our Product (Skyrovix Internship)</div>
                  <div className="text-[10px] text-[#FB4400] font-mono">skyrovix.in ↗</div>
                </div>
              </div>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                HIRING
              </span>
            </a>

            {/* Mobile About Us */}
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-semibold ${
                isAboutActive ? 'bg-orange-50 text-[#FB4400] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles size={16} className={isAboutActive ? 'text-[#FB4400]' : 'text-slate-500'} />
                <span>About Skyrovix</span>
              </div>
            </button>

            {/* Dashboards - ONLY WHEN AUTHENTICATED */}
            {isAuthenticated && (
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    navigateToDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 text-left font-semibold"
                >
                  <LayoutDashboard size={15} className="text-[#FB4400]" />
                  <span>Student Dashboard</span>
                </button>

                {role === 'admin' && (
                  <button
                    onClick={() => {
                      navigateToAdmin('overview');
                      setMobileMenuOpen(false);
                    }}
                    className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 text-left font-semibold"
                  >
                    <ShieldCheck size={15} className="text-slate-800" />
                    <span>Admin Console</span>
                  </button>
                )}
              </div>
            )}

            {/* Mobile Auth / Sign Out Button */}
            <div className="pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-sm shadow-2xs active:scale-98 transition-transform"
                >
                  <LogOut size={16} className="text-rose-500" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FB4400] hover:bg-[#E03D00] text-white font-bold text-sm shadow-sm active:scale-98 transition-transform"
                >
                  <User size={16} />
                  <span>Login / Sign Up</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
