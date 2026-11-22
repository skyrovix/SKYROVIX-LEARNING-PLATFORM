import React, { useState, useRef, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages, developerAvatars, getCourseThumbnail, courseThumbnails, flagshipBanners, getCourseBanner } from '../../assets/brandImages';
import { ModernCourseCard } from '../common/ModernCourseCard';
import {
  Sparkles,
  ArrowRight,
  Play,
  BookOpen,
  Video,
  FileText,
  Star,
  Users,
  ShieldCheck,
  CheckCircle,
  Clock,
  Layers,
  Terminal,
  Code2,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Flame,
  Check,
  GraduationCap,
  Monitor,
  Brain,
  BarChart3,
  Palette,
  Shield,
  Cloud,
  Megaphone,
  Trophy,
  TrendingUp,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomePageProps {
  onOpenAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAuth }) => {
  const {
    videoCourses,
    textCourses,
    enrolledCourses,
    openEnrollModal,
    setCurrentView,
    navigateToVideoCourse,
    navigateToTextCourse,
    navigateToCourseDetails
  } = usePlatform();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Top featured courses (3 video, 3 text)
  const featuredVideo = videoCourses.slice(0, 3);
  const featuredText = textCourses.slice(0, 3);

  // Exact 11 Official Language & Technology Logos Requested
  const languageCategories = [
    {
      name: 'HTML',
      logo: courseThumbnails.html,
      action: () => navigateToTextCourse('text-html')
    },
    {
      name: 'CSS',
      logo: courseThumbnails.css,
      action: () => navigateToTextCourse('text-css')
    },
    {
      name: 'Java',
      logo: courseThumbnails.java,
      action: () => navigateToTextCourse('text-java')
    },
    {
      name: 'JavaScript',
      logo: courseThumbnails.javascript,
      action: () => navigateToTextCourse('text-javascript')
    },
    {
      name: 'PHP',
      logo: courseThumbnails.php,
      action: () => navigateToTextCourse('text-php')
    },
    {
      name: 'React',
      logo: courseThumbnails.react,
      action: () => navigateToVideoCourse('vid-react')
    },
    {
      name: 'Next.js',
      logo: courseThumbnails.nextjs,
      action: () => navigateToVideoCourse('vid-nextjs')
    },
    {
      name: 'Node.js',
      logo: courseThumbnails.nodejs,
      action: () => navigateToVideoCourse('vid-node')
    },
    {
      name: 'MongoDB',
      logo: courseThumbnails.mongodb,
      action: () => navigateToVideoCourse('vid-db')
    },
    {
      name: 'SQL',
      logo: courseThumbnails.sql,
      action: () => navigateToTextCourse('text-mysql')
    },
    {
      name: 'Express.js',
      logo: courseThumbnails.express,
      action: () => navigateToVideoCourse('vid-node')
    }
  ];

  const learningPaths = [
    {
      title: 'Full Stack Engineering Path',
      desc: 'Master the complete web stack from frontend interfaces to backend microservices, SQL databases, and Docker deployment.',
      coursesCount: 7,
      hours: '85h',
      tag: 'Highest Career Demand',
      icon: Layers,
      actionCourseId: 'vid-fullstack-dev',
      type: 'video'
    },
    {
      title: 'Frontend Architecture & React 19',
      desc: 'Deep-dive into component lifecycles, server actions, concurrent rendering, Tailwind CSS, and state management.',
      coursesCount: 4,
      hours: '48h',
      tag: 'Frontend Specialist',
      icon: Code2,
      actionCourseId: 'vid-react',
      type: 'video'
    },
    {
      title: 'Backend Systems & API Engineering',
      desc: 'Design scalable enterprise REST & GraphQL APIs using Node.js, Express, PostgreSQL relational modeling, and JWT security.',
      coursesCount: 6,
      hours: '70h',
      tag: 'Backend Specialist',
      icon: Globe,
      actionCourseId: 'vid-node',
      type: 'video'
    }
  ];

  const testimonials = [
    {
      name: 'Priyanka Sharma',
      role: 'Staff Engineer at Stripe',
      avatar: developerAvatars[1]?.url || developerAvatars[0].url,
      text: 'The combination of masterclass video explanations and 435 text documentation lessons is unprecedented. Skyrovix helped our team standardize modern React 19 and distributed backend patterns.',
      rating: 5
    },
    {
      name: 'Alexander Vogt',
      role: 'Senior Full Stack Lead at Vercel ecosystem',
      avatar: developerAvatars[0]?.url || developerAvatars[1].url,
      text: 'Having a real in-browser code sandbox embedded inside the lessons makes practicing immediate. The Next.js 15 and Database courses are the best technical content on the web.',
      rating: 5
    },
    {
      name: 'Devon Miller',
      role: 'Software Engineer at Datadog',
      avatar: developerAvatars[3]?.url || developerAvatars[2].url,
      text: 'The certificates are truly accredited and verifiable. Being able to demonstrate my mastery with a permanent credential URL gave me a massive edge in senior engineering interviews.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How does SKYROVIX combine video courses and text courses?',
      a: 'SKYROVIX provides both deep video masterclasses taught by senior architects and structured 435-lesson text documentation tracks. Learners can watch video lectures with synchronized transcripts, or read comprehensive text chapters with integrated code sandboxes to practice live.'
    },
    {
      q: 'Are certificates included with courses, and are they verifiable?',
      a: 'Yes! Every course on SKYROVIX issues an official Certificate of Technical Mastery upon completion of all lectures and coding assessments. Each certificate contains a unique cryptographic ID (e.g. SKX-982410) that can be verified publicly on our Verification portal.'
    },
    {
      q: 'Can I write and run code directly in the browser?',
      a: 'Absolutely. SKYROVIX includes a built-in Interactive Code Sandbox that executes HTML, CSS, JavaScript in a live sandboxed iframe, and features a Python algorithm simulator with instant console output.'
    },
    {
      q: 'What is the Skyrovix Internship Program?',
      a: 'Skyrovix offers a Government MSME accredited internship with 1-on-1 industry mentorship, real live enterprise web projects, performance-based stipend eligibility, and an official experience letter.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-slate-800 font-sans selection:bg-[#FB4400] selection:text-white">
      {/* 1. HERO SECTION (BEAUTIFULLY ALIGNED WARM PEACH CANVAS: HEADLINE + STUDENT + LANGUAGES + 1,000+ STUDENTS STATS) */}
      <section className="relative overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFEEDC] via-[#FFF3E8] to-[#FFF0E2] border-b border-orange-200/50">
        {/* Soft Ambient Radial Peach / Orange Glows Behind Hero */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[600px] bg-gradient-to-br from-orange-300/35 via-amber-200/25 to-transparent rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-gradient-to-tr from-orange-200/25 to-transparent rounded-full blur-[110px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 relative z-10">
          {/* Top Grid: Headline + Student (Items-End for Grounded Student Placement) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            {/* Left Column: Headline, Subtitle, Action Buttons, Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-5 lg:space-y-6 text-center lg:text-left pb-2 lg:pb-4"
            >
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 border border-orange-200 text-[#FB4400] text-xs font-bold shadow-2xs w-fit mx-auto lg:mx-0">
                <span>🎉</span>
                <span>Learn Today. Build Tomorrow.</span>
              </div>

              {/* Headline with Running Letters Animation Style */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black tracking-tight leading-[1.14]">
                {/* Line 1: Upgrade Your Skills. with Kinetic Running Letters */}
                <span className="block text-[#111827]">
                  {'Upgrade Your Skills.'.split('').map((char, index) => (
                    char === ' ' ? (
                      <span key={`line1-space-${index}`}>&nbsp;</span>
                    ) : (
                      <span
                        key={`line1-${index}-${char}`}
                        style={{ animationDelay: `${index * 0.07}s` }}
                        className="inline-block animate-running-letter-dark transition-transform hover:-translate-y-2 hover:scale-110 duration-200 cursor-default select-none"
                      >
                        {char}
                      </span>
                    )
                  ))}
                </span>

                {/* Line 2: Shape Your Future. with Vibrant Orange Running Letters & Shimmer */}
                <span className="block text-[#FB4400] mt-1 sm:mt-1.5">
                  <span className="bg-gradient-to-r from-[#FB4400] via-orange-400 to-[#FB4400] bg-clip-text text-transparent animate-shimmer-text inline-block">
                    {'Shape Your Future.'.split('').map((char, index) => (
                      char === ' ' ? (
                        <span key={`line2-space-${index}`}>&nbsp;</span>
                      ) : (
                        <span
                          key={`line2-${index}-${char}`}
                          style={{ animationDelay: `${0.35 + index * 0.07}s` }}
                          className="inline-block animate-running-letter transition-transform hover:-translate-y-2 hover:scale-110 duration-200 cursor-default select-none"
                        >
                          {char}
                        </span>
                      )
                    ))}
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Learn in-demand technologies through expert-designed video lessons and structured learning materials.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <button
                  onClick={() => setCurrentView('catalog')}
                  className="cursor-pointer w-full sm:w-auto px-7 py-3 rounded-full bg-[#FB4400] hover:bg-[#E03D00] text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Explore Courses</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigateToVideoCourse('vid-fullstack-dev')}
                  className="cursor-pointer w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Play size={14} className="fill-[#FB4400] text-[#FB4400]" />
                  <span>Start Learning (Free Preview)</span>
                </button>
              </div>

              {/* Hero Quick Metrics */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-bold">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                    <GraduationCap size={13} />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold text-sm leading-tight">1,000+</span>
                    <span className="text-[11px] text-slate-500 font-medium">Students</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold">
                  <div className="w-6 h-6 rounded-full bg-[#FB4400] text-white flex items-center justify-center shadow-2xs">
                    <Video size={12} />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold text-sm leading-tight">9</span>
                    <span className="text-[11px] text-slate-500 font-medium">Video Courses</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                    <BookOpen size={12} />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold text-sm leading-tight">12</span>
                    <span className="text-[11px] text-slate-500 font-medium">Text Courses</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-[#FB4400] flex items-center justify-center shadow-2xs border border-orange-200">
                    <CheckCircle size={13} />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold text-sm leading-tight">Verifiable</span>
                    <span className="text-[11px] text-slate-500 font-medium">Certificates</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Grounded Student Cutout & Floating Cards Anchored to Student Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 relative flex items-end justify-center min-h-[380px] sm:min-h-[420px] lg:min-h-[450px]"
            >
              {/* Dedicated Anchored Student Stage Wrapper */}
              <div className="relative inline-flex items-end justify-center">
                {/* Soft Pulsing Warm Radial Circular Arch Behind Student */}
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.65, 0.85, 0.65]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute top-2 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] bg-gradient-to-tr from-orange-300/60 via-amber-200/40 to-orange-100/30 rounded-full -z-10 blur-xl border border-orange-200/50"
                />

                {/* Grounded Skyrovix Student Cutout Photo */}
                <img
                  src={brandImages.skyrovixStudent}
                  alt="Skyrovix Developer Student"
                  className="w-[300px] sm:w-[350px] lg:w-[380px] h-auto object-contain drop-shadow-2xl select-none -mb-1 relative z-10"
                />

                {/* Floating Card 1: Top-Right — Professional Masterclass Course Card */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  onClick={() => navigateToVideoCourse('vid-fullstack-dev')}
                  className="absolute top-4 -right-10 sm:-right-14 lg:-right-16 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-orange-200/80 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/25 hover:scale-105 transition-all w-[200px] sm:w-[220px] cursor-pointer group select-none"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-[#FB4400] text-[10px] font-extrabold uppercase tracking-wide">
                      <Flame size={11} className="fill-[#FB4400]" /> Top Masterclass
                    </span>
                    <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" /> 4.9
                    </span>
                  </div>
                  <div className="text-xs font-black text-slate-900 group-hover:text-[#FB4400] transition-colors leading-snug">
                    Full Stack Cloud Architecture
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    Production Node.js, React & AWS
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#FB4400]">
                      <div className="w-5 h-5 rounded-full bg-[#FB4400] text-white flex items-center justify-center shadow-xs">
                        <Play size={9} className="fill-white ml-0.5" />
                      </div>
                      <span>Free Preview</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">18:40 mins</span>
                  </div>
                </motion.div>

                {/* Floating Card 2: Top-Left — Active Learners & Real-Time Browser Sandbox */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  onClick={() => setCurrentView('catalog')}
                  className="absolute top-6 -left-10 sm:-left-14 lg:-left-16 z-20 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-3 border border-orange-200/80 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group select-none max-w-[205px]"
                >
                  <div className="w-7 h-7 rounded-xl bg-orange-50 text-[#FB4400] border border-orange-200/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#FB4400] group-hover:text-white transition-colors">
                    <Code2 size={15} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11.5px] font-black text-slate-900 leading-tight">1,240+ Coding</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div className="text-[9.5px] text-slate-500 font-medium">In-Browser Code Sandbox</div>
                  </div>
                </motion.div>

                {/* Floating Card 3: Mid-Left — Accredited Certificate Credential */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  onClick={() => setCurrentView('certificate-verify')}
                  className="absolute bottom-20 -left-8 sm:-left-12 lg:-left-14 z-20 bg-white/95 backdrop-blur-md rounded-2xl py-1.5 px-3 border border-amber-200/90 shadow-md shadow-amber-500/10 hover:shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2 select-none cursor-pointer group"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Award size={14} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10.5px] font-black text-slate-900 leading-tight">Verified Certificate</div>
                    <div className="text-[9.5px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle size={8.5} /> Official Credential
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 4: Mid-Right — 4.9 Rating & Learner Avatars (Beside arm, NOT over chest) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="absolute bottom-16 -right-8 sm:-right-12 lg:-right-14 z-20 bg-white/95 backdrop-blur-md rounded-full py-1.5 px-3 border border-amber-200 shadow-md shadow-amber-500/10 flex items-center gap-2 select-none hover:scale-105 transition-all cursor-pointer hidden sm:flex"
                >
                  <div className="flex -space-x-1.5">
                    <img src={developerAvatars[1]?.url || developerAvatars[0].url} alt="Student" className="w-5 h-5 rounded-full border border-white object-cover bg-amber-50" />
                    <img src={developerAvatars[0]?.url || developerAvatars[1].url} alt="Student" className="w-5 h-5 rounded-full border border-white object-cover bg-orange-50" />
                    <img src={developerAvatars[3]?.url || developerAvatars[2].url} alt="Student" className="w-5 h-5 rounded-full border border-white object-cover bg-blue-50" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                    <span className="text-[10px] text-slate-500 font-medium">(1,000+)</span>
                  </div>
                </motion.div>

                {/* Floating Tech Chip 1: React 19 (Top-Left) */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 left-12 sm:left-16 z-15 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-sm border border-cyan-100 shadow-md shadow-cyan-500/15 flex items-center justify-center p-1.5 hidden sm:flex hover:scale-110 transition-transform select-none cursor-pointer"
                  title="React 19"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5 h-5 object-contain" />
                </motion.div>

                {/* Floating Tech Chip 2: Python 3 (Top-Center) */}
                <motion.div
                  animate={{
                    y: [0, 7, 0],
                    rotate: [0, 6, -6, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="absolute -top-4 right-20 sm:right-24 z-15 w-7.5 h-7.5 rounded-xl bg-white/95 backdrop-blur-sm border border-blue-100 shadow-md shadow-blue-500/15 flex items-center justify-center p-1 hidden sm:flex hover:scale-110 transition-transform select-none cursor-pointer"
                  title="Python 3"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-4.5 h-4.5 object-contain" />
                </motion.div>

                {/* Floating Tech Chip 3: Next.js 15 (Mid-Right) */}
                <motion.div
                  animate={{
                    y: [0, -7, 0],
                    rotate: [0, -8, 8, 0]
                  }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                  className="absolute top-36 -right-8 sm:-right-10 z-15 w-7.5 h-7.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md shadow-slate-500/15 flex items-center justify-center p-1 hidden md:flex hover:scale-110 transition-transform select-none cursor-pointer"
                  title="Next.js 15"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4.5 h-4.5 object-contain" />
                </motion.div>

                {/* Floating Tech Chip 4: Node.js (Bottom-Left) */}
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                    rotate: [0, -6, 6, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                  className="absolute bottom-8 -left-8 sm:-left-10 z-15 w-7.5 h-7.5 rounded-xl bg-white/95 backdrop-blur-sm border border-emerald-100 shadow-md shadow-emerald-500/15 flex items-center justify-center p-1 hidden md:flex hover:scale-110 transition-transform select-none cursor-pointer"
                  title="Node.js"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-4.5 h-4.5 object-contain" />
                </motion.div>

                {/* Floating Tech Chip 5: JavaScript ⚡ (Lower-Right) */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 7, -7, 0]
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
                  className="absolute bottom-8 right-16 sm:right-20 z-15 w-7.5 h-7.5 rounded-xl bg-white/95 backdrop-blur-sm border border-amber-100 shadow-md shadow-amber-500/15 flex items-center justify-center p-1 hidden md:flex hover:scale-110 transition-transform select-none cursor-pointer"
                  title="JavaScript"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-4.5 h-4.5 object-contain rounded-md" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Running Letters Marquee Ticker Strip */}
          <div className="w-full overflow-hidden rounded-2xl bg-white/85 backdrop-blur-md border border-orange-200/80 py-2.5 px-3 sm:px-4 shadow-sm relative z-20">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white bg-[#FB4400] px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>HIGHLIGHTS</span>
              </span>
              <div className="overflow-hidden whitespace-nowrap flex-1 relative">
                <div className="inline-flex gap-8 animate-marquee whitespace-nowrap text-xs sm:text-sm font-bold text-slate-700 select-none">
                  <span className="flex items-center gap-2">🚀 <strong className="text-slate-900">1,000+ Active Students</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">💼 <strong className="text-slate-900">Govt. MSME UDYAM Certified Internships</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">⚡ <strong className="text-slate-900">Live In-Browser Code Sandboxes</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🎓 <strong className="text-slate-900">Tamper-Proof QR Verified Credentials</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🔥 <strong className="text-slate-900">Production Full-Stack Projects</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🐍 <strong className="text-slate-900">Python, AI/ML, React & Cloud Masterclasses</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  {/* Seamless Duplicate for Infinite Marquee */}
                  <span className="flex items-center gap-2">🚀 <strong className="text-slate-900">1,000+ Active Students</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">💼 <strong className="text-slate-900">Govt. MSME UDYAM Certified Internships</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">⚡ <strong className="text-slate-900">Live In-Browser Code Sandboxes</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🎓 <strong className="text-slate-900">Tamper-Proof QR Verified Credentials</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🔥 <strong className="text-slate-900">Production Full-Stack Projects</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                  <span className="flex items-center gap-2">🐍 <strong className="text-slate-900">Python, AI/ML, React & Cloud Masterclasses</strong></span>
                  <span className="text-orange-400 font-black">•</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Languages Card (Directly Inside Hero Section) */}
          <div className="bg-white rounded-3xl border border-orange-200/70 p-3 sm:p-4 md:p-4.5 shadow-lg shadow-orange-500/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 overflow-hidden relative z-20">
            {/* Left Title Box */}
            <div
              onClick={() => setCurrentView('catalog')}
              className="cursor-pointer flex items-center justify-between md:justify-start gap-3 pr-3 sm:pr-4 md:border-r md:border-slate-200/80 shrink-0 group select-none"
            >
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#FB4400] transition-colors leading-tight">
                  Popular
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#FB4400] transition-colors leading-tight">
                  Languages
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-[#FB4400] text-[#FB4400] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Languages Horizontal Row with ZERO SCROLLBAR LINE - All 11 fit cleanly */}
            <div
              className="flex-1 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 overflow-x-auto no-scrollbar scrollbar-none py-1 scroll-smooth select-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {languageCategories.map(cat => (
                <button
                  key={cat.name}
                  onClick={cat.action}
                  className="cursor-pointer flex flex-col items-center gap-1.5 shrink-0 group text-center min-w-[56px] sm:min-w-[64px] lg:min-w-[68px] transition-transform hover:-translate-y-1 select-none"
                  title={`Explore ${cat.name}`}
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-50 group-hover:bg-orange-50/70 border border-slate-100 group-hover:border-orange-200/90 flex items-center justify-center p-2 transition-all shadow-2xs group-hover:shadow-xs">
                    <img
                      src={cat.logo}
                      alt={cat.name}
                      className="w-5.5 h-5.5 sm:w-6 sm:h-6 object-contain group-hover:scale-110 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 group-hover:text-[#FB4400] leading-tight transition-colors truncate w-full">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Proof & Stats Banner (Directly Inside Hero Section) */}
          <div className="bg-white/90 backdrop-blur-md border border-orange-200/80 rounded-3xl p-4 sm:p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x lg:divide-orange-200/70 relative z-20">
            {/* 1,000+ Students */}
            <div className="flex items-center gap-3 sm:px-3 pt-2.5 sm:pt-0">
              <div className="flex -space-x-2">
                <img
                  src={developerAvatars[1]?.url || developerAvatars[0].url}
                  alt="Student"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover bg-amber-50 shadow-2xs"
                />
                <img
                  src={developerAvatars[0]?.url || developerAvatars[1].url}
                  alt="Student"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover bg-orange-50 shadow-2xs"
                />
                <img
                  src={developerAvatars[3]?.url || developerAvatars[2].url}
                  alt="Student"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover bg-blue-50 shadow-2xs"
                />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">1,000+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Students</div>
              </div>
            </div>

            {/* 4.9 Course Rating */}
            <div className="flex items-center gap-3 sm:px-4 pt-2.5 sm:pt-0">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-[#FB4400] flex items-center justify-center shrink-0">
                <Play size={15} className="fill-[#FB4400]" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1 leading-tight">
                  <span>4.9</span>
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Course Rating</div>
              </div>
            </div>

            {/* 95% Completion Rate */}
            <div className="flex items-center gap-3 sm:px-4 pt-2.5 sm:pt-0">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Trophy size={16} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">95%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Completion Rate</div>
              </div>
            </div>

            {/* Get Certified CTA Button */}
            <div className="sm:px-4 pt-2.5 sm:pt-0">
              <button
                onClick={() => setCurrentView('certificate-verify')}
                className="cursor-pointer w-full py-2.5 px-4 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] text-white transition-all shadow-md shadow-orange-500/25 flex items-center justify-between group active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <Crown size={16} className="text-amber-300" />
                  <div className="text-left">
                    <div className="text-xs font-bold text-white leading-tight">Get Certified</div>
                    <div className="text-[10px] text-orange-100 font-medium">Showcase Your Skills</div>
                  </div>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE SKYROVIX (EXACT REFERENCE DESIGN - ON WHITE BACKGROUND) */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          {/* Pill with lines */}
          <div className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-widest text-[#FB4400]">
            <span className="w-8 h-px bg-orange-300"></span>
            <span>WHY CHOOSE SKYROVIX</span>
            <span className="w-8 h-px bg-orange-300"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Complete Learning Ecosystem
          </h2>

          <p className="text-sm text-slate-600">
            More than just courses — a complete platform to learn, practice and grow.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Video Courses */}
          <div
            onClick={() => setCurrentView('catalog')}
            className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#FB4400] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Video size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  Video Courses
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Learn with high-quality video lessons taught by senior architects.
                </p>
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#FB4400] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Card 2: Text Courses */}
          <div
            onClick={() => setCurrentView('catalog')}
            className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  Text Courses
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Read structured tutorials and guides with syntax-highlighted code.
                </p>
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#FB4400] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Card 3: Track Progress */}
          <div
            onClick={() => setCurrentView('user-dashboard')}
            className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  Track Progress
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Monitor your learning journey with analytics, streaks and XP.
                </p>
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#FB4400] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Card 4: Get Certificate */}
          <div
            onClick={() => setCurrentView('certificate-verify')}
            className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-orange-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100/70 border border-orange-200 text-[#FB4400] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Trophy size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  Get Certificate
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Earn verified certificates recognized across global engineering teams.
                </p>
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#FB4400] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* 5. FEATURED VIDEO MASTERCLASSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
              Industry Masterclasses
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Featured Video Courses
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('catalog')}
            className="cursor-pointer text-xs font-bold text-[#FB4400] hover:text-[#E03D00] flex items-center gap-1 transition-colors"
          >
            <span>View All Video Courses</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVideo.map(course => {
            const banner = course.thumbnail || getCourseBanner(course.id);
            const isFullStack = course.id === 'vid-fullstack-dev';
            const coursePrice = isFullStack ? '₹299' : (course.price || '₹99');
            const courseOrigPrice = isFullStack ? '₹2,999' : (course.originalPrice || '₹999');
            const isEnrolled = enrolledCourses.includes(course.id);

            return (
              <ModernCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.subtitle || course.description}
                banner={banner}
                category={course.category}
                lessonsCount={`${course.totalLectures} Lessons`}
                duration={course.totalDuration}
                level={course.level}
                badge={course.badge || (isFullStack ? 'FLAGSHIP • ₹299' : 'VIDEO PASS • ₹99')}
                price={coursePrice}
                originalPrice={courseOrigPrice}
                isFree={false}
                isEnrolled={isEnrolled}
                actionText={isEnrolled ? 'Continue' : `Enroll ${coursePrice}`}
                onClickCard={() => navigateToCourseDetails(course.id)}
                onAction={() => {
                  if (isEnrolled) {
                    navigateToVideoCourse(course.id);
                  } else {
                    openEnrollModal(course);
                  }
                }}
              />
            );
          })}
        </div>
      </section>

      {/* 6. POPULAR LEARNING PATHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
            Career Roadmaps
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Structured Career Paths
          </h2>
          <p className="text-xs text-slate-600">
            Step-by-step curricula to take you from beginner to production-ready software engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map(path => (
            <div
              key={path.title}
              onClick={() => navigateToVideoCourse(path.actionCourseId)}
              className="cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FB4400]">
                    {path.tag}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{path.hours}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  {path.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {path.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">{path.coursesCount} Courses Track</span>
                <span className="font-bold text-[#FB4400] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Path <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STUDENT REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
            Student Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Trusted by Top Engineers Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#FB4400] uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="cursor-pointer w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm text-slate-800 hover:text-[#FB4400] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#FB4400]' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
