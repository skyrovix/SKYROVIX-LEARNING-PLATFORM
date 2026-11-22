import React from 'react';
import { motion } from 'framer-motion';
import { usePlatform } from '../../context/PlatformContext';
import { brandImages } from '../../assets/brandImages';
import {
  ArrowLeft,
  Sparkles,
  Code2,
  Award,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Target,
  ExternalLink,
  Linkedin,
  Quote,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowRight,
  Server,
  Cpu,
  Database,
  Rocket
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = usePlatform();

  const coreValues = [
    {
      title: 'Innovation',
      desc: 'We explore new ideas, technologies, and better ways to make learning useful, accessible, and engaging.',
      icon: Lightbulb,
      badge: 'EXPLORE',
      color: 'bg-amber-50 text-amber-600 border-amber-200/90'
    },
    {
      title: 'Practical Learning',
      desc: 'We encourage students to learn by doing, experimenting, solving real industry problems, and shipping projects.',
      icon: Terminal,
      badge: 'ACTION',
      color: 'bg-orange-50 text-[#FB4400] border-orange-200/90'
    },
    {
      title: 'Integrity',
      desc: 'We communicate clearly, deliver authentic mentor guidance, and act with honesty, transparency, and responsibility.',
      icon: ShieldCheck,
      badge: 'TRUST',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/90'
    },
    {
      title: 'Student Empowerment',
      desc: 'We help learners build deep technical confidence, self-reliance, and the skills to take ownership of their career growth.',
      icon: Zap,
      badge: 'IMPACT',
      color: 'bg-purple-50 text-purple-600 border-purple-200/90'
    },
    {
      title: 'Continuous Growth',
      desc: 'We cultivate curiosity, lifelong learning, and rapid adaptation to evolving industry standards and technologies.',
      icon: TrendingUp,
      badge: 'MASTERY',
      color: 'bg-sky-50 text-sky-600 border-sky-200/90'
    }
  ];

  const commitments = [
    {
      num: '01',
      title: 'Accessible Opportunities',
      desc: 'Virtual learning and internship opportunities designed to reach students across different colleges, tiers, and locations.'
    },
    {
      num: '02',
      title: 'Hands-on Experience',
      desc: 'Real-world assignments and project-based activities that encourage practical application over rote memorization.'
    },
    {
      num: '03',
      title: 'Skill Development',
      desc: 'Comprehensive opportunities to strengthen technical knowledge, modern tooling, communication, and systematic problem-solving.'
    },
    {
      num: '04',
      title: 'Learning Support',
      desc: 'Dedicated mentor guidance, structured curriculum pathways, and milestone reviews to ensure every student makes steady progress.'
    },
    {
      num: '05',
      title: 'Career Preparation',
      desc: 'Targeted encouragement to build production GitHub portfolios, document codebases, and develop genuine professional confidence.'
    },
    {
      num: '06',
      title: 'Continuous Improvement',
      desc: 'A permanent commitment to upgrading platform infrastructure, course curriculum, and tools based on student and industry feedback.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-slate-800 pb-28 select-none relative overflow-x-hidden">
      
      {/* 1. TOP BREADCRUMB BAR */}
      <div className="bg-white/95 border-b border-orange-100/80 sticky top-16 z-30 shadow-2xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all active:scale-95"
            >
              <ArrowLeft size={13} className="shrink-0" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200 shrink-0" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 truncate">
              <span className="hidden sm:inline">Skyrovix</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-[#FB4400] font-bold">About Us</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200/90 flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Govt. MSME Certified UDYAM-TN-17-0076606</span>
              <span className="sm:hidden font-mono">MSME Certified</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F0] via-[#FFF9F6] to-[#FFFDFB] border-b border-orange-100/70 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 text-slate-900">
        {/* Decorative background glows */}
        <div className="absolute -top-12 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-6 sm:left-12 w-64 sm:w-80 h-64 sm:h-80 bg-amber-200/35 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-orange-200 shadow-sm text-[#FB4400] text-[11px] sm:text-xs font-extrabold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#FB4400] shrink-0" />
            <img src={brandImages.icon} alt="SK Mark" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0" />
            <span>SKYROVIX · ABOUT US</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight px-1"
          >
            Transforming Students Through{' '}
            <span className="bg-gradient-to-r from-[#FB4400] via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Real-World Learning
            </span>{' '}
            and Internships.
          </motion.h1>

          {/* Motto Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block max-w-full"
          >
            <span className="inline-block text-[11px] sm:text-xs md:text-sm font-black tracking-wider sm:tracking-widest uppercase bg-gradient-to-r from-[#FB4400] via-orange-500 to-amber-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md shadow-orange-500/25 border border-orange-400/30 text-center">
              Learn. · Build. · Experience. · Grow.
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal px-2"
          >
            Connecting academic concepts with hands-on project implementation, mentor-guided milestone reviews, and verifiable career credentials.
          </motion.p>

          {/* 4 Pillar Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#FB4400]/40 transition-all group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FB4400] flex items-center justify-center shrink-0 sm:mb-3 group-hover:scale-105 transition-transform">
                <Code2 size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Practical Skills</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-normal">
                  Hands-on projects with modern tech stacks
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 sm:mb-3 group-hover:scale-105 transition-transform">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Mentor Reviews</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-normal">
                  Constructive feedback on every milestone
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 sm:mb-3 group-hover:scale-105 transition-transform">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Portfolio Ready</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-normal">
                  Production code shipped to your GitHub
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 sm:mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">MSME Certified</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-normal">
                  Tamper-proof verifiable QR credentials
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-14 space-y-8 sm:space-y-12 lg:space-y-16">

        {/* 01. ABOUT SKYROVIX — WHO WE ARE */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4.5 sm:p-8 lg:p-10 shadow-2xs space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB4400] bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              01. ABOUT SKYROVIX
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Who We Are
          </h2>

          <div className="space-y-3 sm:space-y-4 text-slate-600 text-[13.5px] sm:text-base leading-relaxed font-normal">
            <p>
              Skyrovix is a virtual internship and training platform focused on helping students develop practical skills, gain project-based experience, and prepare for future career opportunities.
            </p>
            <p>
              We aim to connect academic knowledge with practical implementation through structured learning programs, hands-on projects, skill development, and virtual internship opportunities.
            </p>
            <p>
              Our platform encourages students to explore technology, strengthen their abilities, build portfolios, and turn what they learn into practical outcomes.
            </p>
          </div>

          {/* What We Focus On Interactive Grid */}
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 border border-orange-200/90 shadow-2xs">
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#FB4400] shrink-0" />
              <span>What We Focus On</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-orange-200/80 shadow-2xs hover:border-[#FB4400]/40 transition-colors">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Virtual internship programs</span>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-orange-200/80 shadow-2xs hover:border-[#FB4400]/40 transition-colors">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Industry-focused training</span>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-orange-200/80 shadow-2xs hover:border-[#FB4400]/40 transition-colors">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Practical, project-based learning</span>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-orange-200/80 shadow-2xs hover:border-[#FB4400]/40 transition-colors">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Technical and professional skill development</span>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-orange-200/80 shadow-2xs hover:border-[#FB4400]/40 transition-colors sm:col-span-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Portfolio building and career readiness</span>
              </div>
            </div>
          </div>
        </section>

        {/* 02. OUR STORY — AN IDEA THAT BECAME AN OPPORTUNITY */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4.5 sm:p-8 lg:p-10 shadow-2xs space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB4400] bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              02. OUR STORY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            An Idea That Became an Opportunity
          </h2>

          <div className="text-slate-600 space-y-3 sm:space-y-4 text-[13.5px] sm:text-base leading-relaxed font-normal">
            <p>
              Skyrovix started with a simple thought: students need more than academic knowledge to prepare for the professional world.
            </p>
            <p>
              Through learning technology and experiencing internship opportunities, our founder recognised how valuable practical exposure, project development, and industry-oriented skills can be. That experience inspired the idea of creating a platform where students could move beyond theory and learn by building.
            </p>
            <p>
              What began as an individual vision gradually developed into a virtual internship and training platform with a clear purpose: to make practical learning opportunities more accessible and help students take confident steps towards their goals.
            </p>
          </div>

          {/* Govt. MSME Certified Card */}
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-50/70 via-white to-orange-50/50 border-2 border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
            <div className="space-y-1.5 text-center sm:text-left w-full sm:w-auto">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Govt. MSME Certified Enterprise</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight pt-1 break-all sm:break-normal">
                UDYAM-TN-17-0076606
              </h4>
              <p className="text-xs text-slate-600 max-w-md">
                Dedicated to democratizing practical computer science and software development education across India.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0 bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-emerald-100 shadow-2xs w-full sm:w-auto">
              <img src={brandImages.msme} alt="MSME India" className="h-10 sm:h-12 w-auto object-contain" />
              <div className="h-8 sm:h-10 w-px bg-slate-200" />
              <img src={brandImages.seal} alt="Official Seal" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* 03. OUR VISION & MISSION */}
        <section className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB4400] bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              03. OUR VISION & MISSION
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Purpose That Guides Our Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1 sm:pt-2">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-orange-200/90 p-5 sm:p-8 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#FB4400] hover:shadow-md transition-all">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-100 text-[#FB4400] flex items-center justify-center shrink-0">
                  <Compass size={22} />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#FB4400]">
                  Our Vision
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-snug">
                  Accessible Practical Learning for Every Student
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To create a future where every student has access to practical learning, real-world experience, and opportunities to build a meaningful career.
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-[#FB4400]">
                  Learn · Build · Experience · Grow
                </span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-orange-200/90 p-5 sm:p-8 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#FB4400] hover:shadow-md transition-all">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Target size={22} />
                </div>
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-600">
                  Our Mission
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-snug">
                  Connecting Academic Learning with Industry Needs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower students through industry-focused training, hands-on projects, virtual internships, and skill development that helps connect academic learning with industry expectations.
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-100">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                  Transforming Students Through Real-World Learning and Internships
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 04. FOUNDER STORY — EXACT REPLICA OF USER REFERENCE IMAGE */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F0] via-[#FFF8F5] to-white rounded-2xl sm:rounded-[36px] border border-orange-200/70 p-4.5 sm:p-8 lg:p-12 shadow-sm">
          
          {/* Decorative Left Ribbon Curve */}
          <div className="absolute top-1/4 -left-16 w-48 h-48 rounded-full border-[18px] border-[#FB4400]/15 pointer-events-none blur-xs" />
          <div className="absolute top-1/3 -left-10 w-32 h-32 rounded-full border-[8px] border-orange-400/25 pointer-events-none" />
          <div className="absolute -left-16 bottom-16 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header (Centered, Exact Layout) */}
          <div className="relative z-10 text-center space-y-1 mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FB4400]">
              04. FOUNDER STORY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Founder <span className="bg-gradient-to-r from-[#FB4400] to-orange-500 bg-clip-text text-transparent">Story</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium px-2">
              From a Student's Dream to a Platform for Every Learner
            </p>
          </div>

          {/* Two-Column Showcase (Exact Layout of Reference Image) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Floating Profile Card (Centered on Mobile) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[270px] sm:max-w-[290px] mx-auto lg:mx-0 rounded-2xl sm:rounded-[28px] bg-white border border-slate-100 p-3.5 sm:p-5 shadow-xl shadow-orange-500/10 transition-all hover:shadow-2xl hover:shadow-orange-500/15">
                {/* Photo frame with rounded corners matching reference */}
                <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
                  <img
                    src={brandImages.founder}
                    alt="Hariharan S. - Founder & Lead Developer"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Identity Information */}
                <div className="pt-3 sm:pt-4 text-center space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Hariharan S.
                  </h3>
                  <div className="text-[10px] font-extrabold text-[#FB4400] tracking-wider uppercase">
                    FOUNDER & LEAD DEVELOPER
                  </div>
                  <div className="text-[10.5px] sm:text-[11px] text-slate-400 font-medium pt-0.5 leading-snug">
                    Technology Enthusiast | Full Stack Developer
                  </div>
                </div>

                {/* Connect on LinkedIn Pill Button */}
                <div className="pt-3 sm:pt-3.5">
                  <a
                    href="https://www.linkedin.com/in/hariharan-s-92b566381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                  >
                    <Linkedin size={14} className="fill-white shrink-0" />
                    <span>Connect on LinkedIn</span>
                    <ArrowRight size={13} className="shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Narrative */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4 text-slate-600 text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal">
              <p>
                Every meaningful journey begins with an idea. For <strong className="text-slate-900 font-bold">Skyrovix</strong>, that idea came from a student who believed that education should go beyond textbooks, theory, and certificates.
              </p>
              <p>
                As a technology enthusiast and aspiring entrepreneur, Hariharan began his journey with a passion for software development, innovation, and helping students build practical skills.
              </p>
              <p>
                During his own learning and internship journey, he recognised a challenge: many students complete their academic studies but still need more opportunities to practise what they learn, develop projects, and gain exposure to professional workflows.
              </p>
              <p>
                That realisation became a turning point. Instead of simply accepting the gap between academic learning and practical experience, he decided to build something that could help address it.
              </p>
              <p className="font-extrabold text-slate-900 text-sm sm:text-base pt-0.5 sm:pt-1">
                With that vision, <span className="text-[#FB4400]">Skyrovix</span> was born.
              </p>
              <p>
                What started as an idea gradually developed into a virtual internship and training platform designed to give students opportunities to learn, build projects, develop technical confidence, and showcase their abilities.
              </p>
              <p>
                As Founder and Lead Developer, Hariharan continues to focus on building the platform, improving its technology, and creating meaningful learning experiences for students.
              </p>
            </div>

          </div>

          {/* Bottom Floating Bar: A Message from the Founder (Exact Reference Layout) */}
          <div className="relative z-10 mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/85 backdrop-blur-md border border-orange-200/70 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            
            {/* Left Quote Block */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100/90 text-[#FB4400] flex items-center justify-center shrink-0 mt-0.5">
                <Quote size={17} className="fill-current" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">
                  A <span className="text-[#FB4400]">Message from the Founder</span>
                </h4>
                <p className="text-xs italic text-slate-600 leading-relaxed font-serif">
                  “I started Skyrovix not just to build a company, but to create opportunities for students who are looking for a chance to learn, build, and prove their abilities. I believe every student deserves an opportunity to gain practical experience and move forward with confidence.”
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    — HARIHARAN S.
                  </span>
                  <img
                    src={brandImages.sigFounder}
                    alt="Founder Signature"
                    className="h-5 sm:h-6 object-contain opacity-85"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-16 bg-orange-200/80 shrink-0" />

            {/* Right Tagline Block */}
            <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-orange-100 flex items-center justify-between md:justify-end gap-3 text-left md:text-right shrink-0">
              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">
                  Transforming Students Through Real-World Learning and Internships.
                </p>
                <p className="text-xs font-black text-[#FB4400]">
                  Learn. Build. Experience. Grow.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100/90 text-[#FB4400] flex items-center justify-center shrink-0">
                <Rocket size={17} />
              </div>
            </div>

          </div>

        </section>

        {/* ======================================================== */}
        {/* CO-FOUNDER & TECHNICAL LEADERSHIP — SYMMETRICAL EXCELLENCE */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFDFB] to-white rounded-2xl sm:rounded-[36px] border border-slate-200/80 p-4.5 sm:p-8 lg:p-12 shadow-sm">
          
          {/* Subtle Server Grid Accent */}
          <div className="absolute top-1/4 -right-16 w-56 h-56 rounded-full border-[18px] border-slate-200/40 pointer-events-none blur-xs" />
          <div className="absolute -right-16 bottom-16 w-64 h-64 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 text-center space-y-1 mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-600">
              CO-FOUNDER & TECHNICAL LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Co-Founder <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#FB4400] bg-clip-text text-transparent">Architecture</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium px-2">
              Powering High-Performance Cloud Execution & Verified Credentials
            </p>
          </div>

          {/* Two-Column Showcase */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Floating Profile Card (Centered on Mobile) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[270px] sm:max-w-[290px] mx-auto lg:mx-0 rounded-2xl sm:rounded-[28px] bg-white border border-slate-200 p-3.5 sm:p-5 shadow-xl shadow-slate-900/5 transition-all hover:shadow-2xl hover:border-orange-200">
                {/* Photo frame */}
                <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
                  <img
                    src={brandImages.cofounder}
                    alt="Maheshwaran S. - Co-Founder & Lead Architect"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Identity Information */}
                <div className="pt-3 sm:pt-4 text-center space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Maheshwaran S
                  </h3>
                  <div className="text-[10px] font-extrabold text-[#FB4400] tracking-wider uppercase">
                    CO-FOUNDER & LEAD ARCHITECT
                  </div>
                  <div className="text-[10.5px] sm:text-[11px] text-slate-400 font-medium pt-0.5 leading-snug">
                    Cloud Infrastructure | Systems Architect
                  </div>
                </div>

                {/* Executive Profile Button */}
                <div className="pt-3 sm:pt-3.5">
                  <a
                    href="https://www.skyrovix.online/founder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#FB4400] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                  >
                    <span>View Executive Profile</span>
                    <ExternalLink size={13} className="shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Co-Founder Sentences & Narrative */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4 text-slate-600 text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal">
              <p>
                Behind every responsive user experience, automated code evaluation, and real-time project compilation stands robust, enterprise-grade engineering. For <strong className="text-slate-900 font-bold">Skyrovix</strong>, that architectural backbone was envisioned and forged by <strong className="text-slate-900 font-bold">Maheshwaran S.</strong>
              </p>
              <p>
                With deep expertise in distributed cloud systems, compiler virtualization, and high-concurrency microservices, Maheshwaran co-founded Skyrovix with an unwavering mission: to eliminate technical friction for students and make production-grade developer environments universally accessible directly inside any web browser.
              </p>
              <p>
                Recognising that practical learning requires instantaneous feedback, Maheshwaran engineered the platform’s high-throughput automated code evaluation engine, isolated sandbox runtime environments, and tamper-proof cryptographic QR verification systems.
              </p>
              <p>
                His architectural discipline ensures that thousands of students can simultaneously compile code across JavaScript, Python, Java, and SQL with sub-second execution speeds, strict zero-trust sandbox isolation, and continuous 99.9% availability.
              </p>
              <p className="font-extrabold text-slate-900 text-sm sm:text-base pt-0.5 sm:pt-1">
                Engineering Without Boundaries for <span className="text-[#FB4400]">Every Learner</span>.
              </p>
              <p>
                As Co-Founder and Lead Architect, Maheshwaran continues to spearhead backend microservices, database scaling, automated project testing pipelines, and verifiable credential cryptography on skyrovix.in.
              </p>

              {/* Technical Capability Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <Server size={12} className="text-[#FB4400] shrink-0" />
                  <span>Cloud Sandbox Containers</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <Cpu size={12} className="text-amber-600 shrink-0" />
                  <span>Automated Code Evaluation</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <Database size={12} className="text-sky-600 shrink-0" />
                  <span>Distributed Backends</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
                  <span>Tamper-Proof QR Cryptography</span>
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Floating Bar: A Message from the Co-Founder */}
          <div className="relative z-10 mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            
            {/* Left Quote Block */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <Quote size={17} className="fill-current" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">
                  A <span className="text-[#FB4400]">Message from the Co-Founder</span>
                </h4>
                <p className="text-xs italic text-slate-600 leading-relaxed font-serif">
                  “True technology empowerment happens when complex engineering becomes invisible to the learner. Our goal is to provide every student with production-grade development environments from day one, so their only limit is their imagination.”
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    — MAHESHWARAN S
                  </span>
                  <img
                    src={brandImages.sigCofounder}
                    alt="Co-Founder Signature"
                    className="h-5 sm:h-6 object-contain opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-16 bg-slate-200 shrink-0" />

            {/* Right Tagline Block */}
            <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 flex items-center justify-between md:justify-end gap-3 text-left md:text-right shrink-0">
              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">
                  Empowering 1,000+ Students with Zero-Friction Cloud Sandboxes.
                </p>
                <p className="text-xs font-black text-slate-900">
                  Scalable. · Resilient. · Secure. · Verifiable.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Server size={17} className="text-[#FB4400]" />
              </div>
            </div>

          </div>

        </section>

        {/* 05. OUR CORE VALUES */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4.5 sm:p-8 lg:p-10 shadow-2xs space-y-4 sm:space-y-6">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB4400] bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              05. OUR CORE VALUES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Principles Behind Every Decision
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
            {coreValues.map(val => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFDFB] border border-slate-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 ${val.color} group-hover:scale-105 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {val.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">{val.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal mt-1">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 06. OUR COMMITMENT TO STUDENTS */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4.5 sm:p-8 lg:p-10 shadow-2xs space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2 text-center">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FB4400] bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              06. OUR COMMITMENT TO STUDENTS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Growth Is Our Priority
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
              At Skyrovix, we are committed to creating a supportive learning environment where students can strengthen their abilities through practical experiences and structured opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
            {commitments.map(item => (
              <div
                key={item.title}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 bg-[#FFFDFB] hover:border-[#FB4400]/40 hover:shadow-2xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 size={16} className="text-[#FB4400] shrink-0" />
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 ml-1">
                    {item.num}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-6 font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 07. CALL TO ACTION BANNER */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-50 via-white to-amber-50 border-2 border-orange-200/90 p-5 sm:p-8 lg:p-12 text-center space-y-4 sm:space-y-6 shadow-xs relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FB4400] text-[10.5px] sm:text-[11px] font-black uppercase tracking-widest border border-orange-200">
              <Sparkles size={13} className="shrink-0" />
              <span>START YOUR JOURNEY TODAY</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
              Ready to Learn, Build, and Elevate Your Tech Career?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto px-2">
              Explore 9 video masterclasses, 12 deep documentation tracks, in-browser sandbox execution, and our virtual internship program.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <button
              onClick={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full bg-[#FB4400] hover:bg-[#E03D00] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Explore Courses</span>
              <ArrowRight size={15} className="shrink-0" />
            </button>

            <button
              onClick={() => {
                setCurrentView('practice');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition-all active:scale-95 shadow-2xs"
            >
              Start Practice Sandbox
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
