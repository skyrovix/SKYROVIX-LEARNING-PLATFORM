import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { VideoCourse } from '../../data/videoCoursesData';
import { TextCourseMetadata } from '../../data/textCourseLoader';
import { getCourseThumbnail, brandImages, getCourseBanner } from '../../assets/brandImages';
import {
  Clock,
  BookOpen,
  Video,
  Star,
  CheckCircle,
  Play,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  ChevronLeft
} from 'lucide-react';

interface CourseDetailsPageProps {
  courseId: string;
  courseType?: 'video' | 'text';
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ courseId, courseType }) => {
  const {
    videoCourses,
    textCourses,
    enrolledCourses,
    enrollInCourse,
    navigateToVideoCourse,
    navigateToTextCourse,
    setCurrentView,
    getCourseProgress,
    openEnrollModal
  } = usePlatform();

  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);

  // Find course in video or text
  const videoCourse: VideoCourse | undefined = videoCourses.find(c => c.id === courseId || c.slug === courseId);
  const textCourse: TextCourseMetadata | undefined = textCourses.find(c => c.id === courseId || c.slug === courseId);

  const isVideo = Boolean(videoCourse) && (!courseType || courseType === 'video');

  const title = isVideo ? videoCourse?.title : textCourse?.title;
  const subtitle = isVideo ? videoCourse?.subtitle : textCourse?.shortDesc;
  const category = isVideo ? videoCourse?.category : textCourse?.category;
  const rating = isVideo ? videoCourse?.rating : textCourse?.rating;
  const level = isVideo ? videoCourse?.level : textCourse?.level;
  const duration = isVideo ? videoCourse?.totalDuration : textCourse?.estimatedHours;
  const totalLessons = isVideo ? videoCourse?.totalLectures : textCourse?.lessonsCount;
  const instructorName = 'Skyrovix Team';
  const instructorAvatar = isVideo
    ? (videoCourse?.instructor.avatar || brandImages.icon)
    : brandImages.icon;
  const thumbnail = isVideo && videoCourse?.thumbnail && !videoCourse.thumbnail.includes('unsplash')
    ? videoCourse.thumbnail
    : getCourseBanner(courseId);

  const isEnrolled = enrolledCourses.includes(courseId);
  const progress = isEnrolled ? getCourseProgress(courseId, totalLessons || 1) : 0;

  // Related courses
  const relatedCourses = useMemo(() => {
    if (isVideo) {
      return videoCourses.filter(c => c.id !== courseId && c.category === category).slice(0, 3);
    }
    return textCourses.filter(c => c.id !== courseId).slice(0, 3);
  }, [isVideo, courseId, category, videoCourses, textCourses]);

  const whatYouWillLearn = isVideo && videoCourse?.learningOutcomes ? videoCourse.learningOutcomes : [
    'Gain hands-on architectural mastery and core principles of the technology',
    'Write clean, accessible, performant, and production-tested source code',
    'Debug and solve real-world edge cases with industry-proven design patterns',
    'Deploy and build enterprise projects with automated workflows'
  ];

  const requirements = isVideo && videoCourse?.prerequisites ? videoCourse.prerequisites : [
    'A computer (Windows, macOS, or Linux) with modern web browser',
    'Basic foundational computer literacy and passion to build technology',
    'No previous advanced knowledge required; concepts are taught from first principles'
  ];

  const handleStartOrEnroll = () => {
    if (isEnrolled) {
      if (isVideo) {
        navigateToVideoCourse(courseId);
      } else {
        navigateToTextCourse(textCourse?.slug || courseId);
      }
    } else {
      const isFree = isVideo ? (videoCourse?.isFree ?? false) : true;
      if (isFree) {
        enrollInCourse(courseId);
        if (isVideo) {
          navigateToVideoCourse(courseId);
        } else {
          navigateToTextCourse(textCourse?.slug || courseId);
        }
      } else {
        if (videoCourse) {
          openEnrollModal(videoCourse);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-800">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-slate-200 bg-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => setCurrentView('catalog')}
            className="hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>All Courses</span>
          </button>
          <span>/</span>
          <span className="text-[#FB4400] font-semibold">{category}</span>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-xs">{title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50/70 via-slate-50 to-[#F8FAFC] border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left 2 Cols: Main Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                isVideo ? 'bg-orange-50 text-[#FB4400] border border-orange-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {isVideo ? 'Masterclass Video Course' : 'Interactive Text Track'}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                {level}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-orange-100 text-[#FB4400] border border-orange-200">
                Certified Curriculum
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
              {subtitle}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 pt-2 font-medium">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star size={15} className="fill-amber-400" />
                <span>{rating} Rating</span>
                <span className="text-slate-400 font-normal">(3,400+ reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={15} />
                <span>{duration} of content</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={15} />
                <span>{totalLessons} lessons & chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={15} />
                <span>English (Subtitles & Code)</span>
              </div>
            </div>

            {/* Instructor Summary */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                <img
                  src={instructorAvatar}
                  alt={instructorName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Created by</div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{instructorName}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-[#FB4400]">
                    Official
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Sticky Enrollment Card */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center p-2">
              <img src={thumbnail} alt={title} className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <button
                  onClick={handleStartOrEnroll}
                  className="w-14 h-14 rounded-full bg-[#FB4400] hover:bg-[#E03D00] text-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 active:scale-95"
                >
                  <Play size={22} className="fill-white ml-0.5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 font-display">
                    {isVideo && !videoCourse?.isFree ? (videoCourse?.price || (videoCourse?.id === 'vid-fullstack-dev' ? '₹299' : '₹99')) : '100% Free'}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold">
                    {isVideo && !videoCourse?.isFree ? 'Scholarship & Discount Codes Available' : 'Free Lifetime Access with Pro Certificate'}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-mono font-bold bg-orange-100 text-[#FB4400]">
                  {isVideo && !videoCourse?.isFree ? (videoCourse?.id === 'vid-fullstack-dev' ? 'Flagship • ₹299' : 'Video Pass • ₹99') : '100% Free'}
                </span>
              </div>

              {isEnrolled && (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1 font-semibold">
                    <span>Your Current Progress</span>
                    <span className="font-bold text-[#FB4400] font-mono">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FB4400] to-amber-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={handleStartOrEnroll}
                className="w-full py-3.5 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] text-white font-bold text-sm transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Play size={16} className="fill-white" />
                <span>
                  {isEnrolled
                    ? 'Continue Course'
                    : isVideo && !videoCourse?.isFree
                    ? `Enroll Now (${videoCourse?.price || (videoCourse?.id === 'vid-fullstack-dev' ? '₹299' : '₹99')})`
                    : 'Start Free'}
                </span>
              </button>

              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>Full access to all lectures & code files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>Interactive code sandbox with instant live preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>Accredited certificate upon completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* What You Will Learn */}
          <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-slate-900 font-display">What You Will Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#FB4400] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 font-display">Curriculum Outline</h2>
              <span className="text-xs font-mono text-slate-500 font-semibold">{totalLessons} lessons</span>
            </div>

            {isVideo && videoCourse ? (
              <div className="space-y-3">
                {videoCourse.modules.map((mod, modIdx) => {
                  const isOpen = openModuleIndex === modIdx;
                  return (
                    <div key={mod.id} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? -1 : modIdx)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 text-sm font-display">{mod.title}</span>
                          <span className="text-xs text-slate-500 font-mono">({mod.lessons.length} lectures)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono">{mod.duration}</span>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-100 divide-y divide-slate-100">
                          {mod.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              onClick={() => {
                                enrollInCourse(courseId);
                                navigateToVideoCourse(courseId, lesson.id);
                              }}
                              className="p-3.5 pl-6 flex items-center justify-between hover:bg-orange-50/50 cursor-pointer transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <Play size={13} className="text-[#FB4400] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-slate-700 group-hover:text-[#FB4400] transition-colors">
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs font-mono text-slate-400">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl bg-white divide-y divide-slate-100 shadow-2xs">
                {textCourse?.lessons.slice(0, 15).map((l, idx) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      enrollInCourse(courseId);
                      navigateToTextCourse(textCourse.slug, l.id);
                    }}
                    className="p-3.5 px-5 flex items-center justify-between hover:bg-orange-50/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={14} className="text-emerald-500" />
                      <span className="text-xs font-medium text-slate-700 group-hover:text-[#FB4400] transition-colors">
                        {l.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">~{l.readTimeMinutes} min</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Requirements */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-normal">
              {requirements.map((req, idx) => (
                <li key={idx} className="leading-relaxed">{req}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar: Related Courses */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 text-base font-display">Related Curricula</h3>
          <div className="space-y-4">
            {relatedCourses.map(rc => (
              <div
                key={rc.id}
                onClick={() => {
                  if (isVideo) {
                    navigateToVideoCourse(rc.id);
                  } else {
                    navigateToTextCourse(rc.slug);
                  }
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group shadow-2xs"
              >
                <div className="text-[10px] uppercase font-bold text-[#FB4400] mb-1 font-mono">{rc.category}</div>
                <h4 className="font-bold text-slate-900 text-xs group-hover:text-[#FB4400] transition-colors line-clamp-1">
                  {rc.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>{isVideo ? (rc as VideoCourse).totalDuration : (rc as TextCourseMetadata).estimatedHours}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={11} className="fill-amber-400" />
                    <span>{rc.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
