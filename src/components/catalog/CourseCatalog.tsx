import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { getCourseThumbnail, flagshipBanners, getCourseBanner } from '../../assets/brandImages';
import { ModernCourseCard } from '../common/ModernCourseCard';
import {
  Video,
  FileText,
  Clock,
  BookOpen,
  Star,
  Users,
  CheckCircle2,
  Play,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  Compass
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface CourseCatalogProps {
  initialFormatFilter?: 'all' | 'video' | 'text';
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ initialFormatFilter = 'all' }) => {
  const {
    videoCourses,
    textCourses,
    enrolledCourses,
    enrollInCourse,
    getCourseProgress,
    navigateToVideoCourse,
    navigateToTextCourse,
    navigateToCourseDetails,
    openEnrollModal
  } = usePlatform();

  const [formatFilter, setFormatFilter] = useState<'all' | 'video' | 'text'>(initialFormatFilter);

  React.useEffect(() => {
    if (initialFormatFilter) {
      setFormatFilter(initialFormatFilter);
    }
  }, [initialFormatFilter]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    videoCourses.forEach(c => set.add(c.category));
    textCourses.forEach(c => set.add(c.category));
    return ['all', ...Array.from(set)];
  }, [videoCourses, textCourses]);

  // Filtered Video Courses
  const filteredVideo = useMemo(() => {
    if (formatFilter === 'text') return [];
    return videoCourses.filter(c => {
      const matchCat = categoryFilter === 'all' || c.category === categoryFilter;
      const matchSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [videoCourses, formatFilter, categoryFilter, searchQuery]);

  // Filtered Text Courses
  const filteredText = useMemo(() => {
    if (formatFilter === 'video') return [];
    return textCourses.filter(c => {
      const matchCat = categoryFilter === 'all' || c.category.includes(categoryFilter);
      const matchSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [textCourses, formatFilter, categoryFilter, searchQuery]);

  const totalCoursesCount = videoCourses.length + textCourses.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-800">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-orange-50/70 via-slate-50 to-[#F8FAFC]">
        {/* Soft Ambient Glows in Flame Orange */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-200/35 rounded-full blur-3xl pointer-events-none animate-float"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#FB4400] text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs">
            <Sparkles size={14} />
            <span>Skyrovix Next-Gen Engineering Academy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight font-display">
            Master Full Stack & Modern Web with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB4400] via-[#FF7A00] to-amber-500">
              Interactive Video & Deep Text
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From zero to senior engineer. Explore 10 masterclass video curricula and 12 text-based documentation tracks containing over 435 curated lessons with live code execution.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-display">10</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Video Masterclasses</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-display">435+</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Text Lessons</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-display">280h+</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Curriculum Content</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-[#FB4400] font-display">100%</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Free & Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Format Tabs (All, Video, Text) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 w-fit">
            <button
              onClick={() => setFormatFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                formatFilter === 'all'
                  ? 'bg-white text-[#FB4400] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass size={14} />
              <span>All Courses ({totalCoursesCount})</span>
            </button>
            <button
              onClick={() => setFormatFilter('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                formatFilter === 'video'
                  ? 'bg-white text-[#FB4400] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video size={14} className="text-[#FB4400]" />
              <span>Video Courses ({videoCourses.length})</span>
            </button>
            <button
              onClick={() => setFormatFilter('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                formatFilter === 'text'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText size={14} className="text-emerald-500" />
              <span>Text Tracks ({textCourses.length})</span>
            </button>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3.5 py-2 pl-9 outline-none focus:border-[#FB4400] w-52 sm:w-64 shadow-2xs font-sans"
              />
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3.5 py-2 outline-none focus:border-[#FB4400] shadow-2xs font-medium"
            >
              <option value="all">All Domains</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
        </div>

        {/* Section 1: Video Courses */}
        {filteredVideo.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-orange-50 text-[#FB4400] border border-orange-200">
                    <Video size={16} />
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
                    Masterclass Video Curricula
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {videoCourses.length} comprehensive video specializations with interactive quizzes, lecture notes & resources
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {filteredVideo.length} {filteredVideo.length === 1 ? 'course' : 'courses'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideo.map(course => {
                const isEnrolled = enrolledCourses.includes(course.id);
                const progress = isEnrolled ? getCourseProgress(course.id, course.totalLectures) : 0;
                const banner = course.thumbnail || getCourseBanner(course.id);
                const isFullStack = course.id === 'vid-fullstack-dev';
                const coursePrice = isFullStack ? '₹299' : (course.price || '₹99');
                const courseOrigPrice = isFullStack ? '₹2,999' : (course.originalPrice || '₹999');
                const courseBadge = course.badge || (isFullStack ? 'FLAGSHIP • ₹299' : 'VIDEO PASS • ₹99');

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
                    badge={courseBadge}
                    price={coursePrice}
                    originalPrice={courseOrigPrice}
                    isFree={false}
                    isEnrolled={isEnrolled}
                    progress={progress}
                    actionText={isEnrolled ? 'Continue' : `Enroll ${coursePrice}`}
                    onAction={() => {
                      if (isEnrolled) {
                        navigateToVideoCourse(course.id);
                      } else {
                        openEnrollModal(course);
                      }
                    }}
                    onClickCard={() => navigateToCourseDetails(course.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Text-Based Documentation Tracks (Real Images from src/images/courses) */}
        {filteredText.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-orange-50 text-[#FB4400] border border-orange-200">
                    <FileText size={16} />
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
                    Text-Based Documentation & Coding Tracks
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  12 complete curriculums (435 chapters) built directly from documentation with live sandbox execution
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {filteredText.length} {filteredText.length === 1 ? 'track' : 'tracks'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredText.map(course => {
                const isEnrolled = enrolledCourses.includes(course.id);
                const progress = isEnrolled ? getCourseProgress(course.id, course.lessonsCount) : 0;
                const banner = getCourseBanner(course.slug || course.id);

                return (
                  <ModernCourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.shortDesc}
                    banner={banner}
                    category={course.category}
                    lessonsCount={`${course.lessonsCount} Chapters`}
                    duration={`~${course.estimatedHours}`}
                    level={course.level}
                    badge="100% FREE"
                    price="Free"
                    isFree={true}
                    isEnrolled={isEnrolled}
                    progress={progress}
                    actionText={isEnrolled ? 'Continue' : 'Start Free'}
                    onAction={() => {
                      enrollInCourse(course.id);
                      navigateToTextCourse(course.slug);
                    }}
                    onClickCard={() => navigateToCourseDetails(course.id, 'text')}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
