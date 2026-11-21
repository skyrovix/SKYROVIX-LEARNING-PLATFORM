import React, { useState, useEffect, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { getTextCourse, TextCourseFull, TextLessonFull } from '../../data/textCourseLoader';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { CodePlayground } from '../playground/CodePlayground';
import { getCourseThumbnail } from '../../assets/brandImages';
import {
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
  Type,
  Maximize2,
  Minimize2,
  Terminal,
  Sparkles,
  Layers,
  ArrowRight,
  Award,
  X
} from 'lucide-react';

export const TextReaderView: React.FC = () => {
  const {
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    setCurrentView,
    textCourses,
    completedLessons,
    toggleLessonComplete,
    isLessonCompleted,
    getCourseProgress,
    isBookmarked,
    toggleBookmark,
    addXP
  } = usePlatform();

  // Find course metadata from catalog
  const courseMeta = useMemo(() => {
    return textCourses.find(c => c.id === selectedCourseId || c.slug === selectedCourseId) || textCourses[0];
  }, [textCourses, selectedCourseId]);

  const [courseData, setCourseData] = useState<TextCourseFull | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Reader Customization States
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Interactive Code Sandbox Drawer
  const [sandboxCode, setSandboxCode] = useState<{
    html?: string;
    css?: string;
    js?: string;
    python?: string;
    language?: string;
  } | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  // Load the full course data asynchronously
  useEffect(() => {
    let mounted = true;
    if (courseMeta?.slug) {
      setLoading(true);
      getTextCourse(courseMeta.slug).then(data => {
        if (mounted) {
          setCourseData(data);
          setLoading(false);
          // If no selectedLessonId, default to first lesson
          if (!selectedLessonId && data?.fullLessons?.[0]) {
            setSelectedLessonId(data.fullLessons[0].id);
          }
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [courseMeta?.slug]);

  // Current active lesson
  const currentLesson: TextLessonFull | null = useMemo(() => {
    if (!courseData || !courseData.fullLessons.length) return null;
    if (selectedLessonId) {
      const found = courseData.fullLessons.find(l => l.id === selectedLessonId);
      if (found) return found;
    }
    return courseData.fullLessons[0];
  }, [courseData, selectedLessonId]);

  // Find previous and next lessons
  const currentIndex = courseData?.fullLessons.findIndex(l => l.id === currentLesson?.id) ?? -1;
  const prevLesson = currentIndex > 0 && courseData ? courseData.fullLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex !== -1 && courseData && currentIndex < courseData.fullLessons.length - 1
      ? courseData.fullLessons[currentIndex + 1]
      : null;

  // Filter lessons in sidebar
  const filteredLessons = useMemo(() => {
    if (!courseData) return [];
    if (!searchFilter.trim()) return courseData.fullLessons;
    const q = searchFilter.toLowerCase();
    return courseData.fullLessons.filter(
      l => l.title.toLowerCase().includes(q) || l.snippet.toLowerCase().includes(q)
    );
  }, [courseData, searchFilter]);

  const isDone = currentLesson ? isLessonCompleted(courseMeta.id, currentLesson.id) : false;
  const isBm = currentLesson ? isBookmarked(courseMeta.id, currentLesson.id) : false;
  const progress = courseData ? getCourseProgress(courseMeta.id, courseData.fullLessons.length) : 0;

  const handleRunCodeFromLesson = (code: string, language: string) => {
    const codeObj: any = { language };
    if (language === 'html') codeObj.html = code;
    else if (language === 'css') codeObj.css = code;
    else if (language === 'javascript' || language === 'js') codeObj.js = code;
    else if (language === 'python') codeObj.python = code;
    else codeObj.html = code;

    setSandboxCode(codeObj);
    setIsSandboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#FB4400] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-600 font-mono font-medium">Loading curriculum chapters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      {/* Top Navbar */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-16 z-30 shadow-2xs">
        <div className="flex items-center gap-3 truncate">
          <button
            onClick={() => setCurrentView('catalog')}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">All Tracks</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-emerald-700 truncate max-w-[180px] sm:max-w-md">
            {courseMeta.title}
          </span>
        </div>

        {/* Reader Action Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster */}
          <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5 text-xs text-slate-600">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'sm' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'}`}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'base' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'}`}
              title="Default text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'lg' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'hover:text-slate-900'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Code Sandbox Toggle */}
          <button
            onClick={() => setIsSandboxOpen(!isSandboxOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSandboxOpen
                ? 'bg-[#FB4400] text-white border-[#FB4400] shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:text-[#FB4400]'
            }`}
          >
            <Terminal size={14} className={isSandboxOpen ? 'text-white' : 'text-cyan-600'} />
            <span className="hidden sm:inline">Sandbox</span>
          </button>

          {/* Bookmark */}
          {currentLesson && (
            <button
              onClick={() => {
                toggleBookmark({
                  courseId: courseMeta.id,
                  courseSlug: courseMeta.slug,
                  courseTitle: courseMeta.title,
                  lessonId: currentLesson.id,
                  lessonTitle: currentLesson.title,
                  courseType: 'text'
                });
              }}
              className={`p-2 rounded-xl border transition-colors ${
                isBm
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
              title="Bookmark this chapter"
            >
              <Bookmark size={15} className={isBm ? 'fill-amber-500 text-amber-500' : ''} />
            </button>
          )}

          {/* Mark Complete */}
          {currentLesson && (
            <button
              onClick={() => toggleLessonComplete(courseMeta.id, currentLesson.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isDone
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
              }`}
            >
              <CheckCircle size={14} className={isDone ? 'fill-emerald-500 text-white' : ''} />
              <span>{isDone ? 'Completed (+100 XP)' : 'Mark as Read'}</span>
            </button>
          )}

          {/* Claim Certificate Button when 100% completed */}
          {progress >= 100 && (
            <button
              onClick={() => setCurrentView('certificates')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all animate-pulse"
              title="You completed 100% of this course! View your official certificate."
            >
              <Award size={14} />
              <span>Claim Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace: Left Sidebar + Center Reading Column */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Syllabus Sidebar */}
        <aside className="w-80 lg:w-96 border-r border-slate-200 bg-slate-50/70 flex flex-col shrink-0 hidden md:flex h-[calc(100vh-7.5rem)]">
          {/* Course Card Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={getCourseThumbnail(courseMeta.slug)}
                alt={courseMeta.title}
                className="w-10 h-10 object-contain p-1 rounded-xl bg-orange-50 border border-orange-200 shrink-0 shadow-2xs"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-[#FB4400] uppercase tracking-wider">
                    {courseMeta.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {progress}%
                  </span>
                </div>
                <h2 className="font-bold text-xs text-slate-900 truncate font-display">{courseMeta.title}</h2>
              </div>
            </div>

            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* In-Course Chapter Search Filter */}
            <div className="mt-3 relative">
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search within this track..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-1.5 pl-8 outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Chapters List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredLessons.map(lesson => {
              const isCurrent = lesson.id === currentLesson?.id;
              const done = isLessonCompleted(courseMeta.id, lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLessonId(lesson.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-2xl flex items-start gap-2.5 transition-all ${
                    isCurrent
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold shadow-2xs'
                      : 'hover:bg-white text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {done ? (
                      <CheckCircle size={15} className="text-emerald-500 fill-emerald-100" />
                    ) : isCurrent ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
                    ) : (
                      <Circle size={15} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs leading-snug line-clamp-2 ${
                      isCurrent ? 'text-emerald-900 font-bold' : 'text-slate-800 font-medium'
                    }`}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                      <Clock size={11} />
                      <span>{lesson.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center: Markdown Document Reading Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
          {currentLesson ? (
            <article className={`space-y-6 ${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base'}`}>
              {/* Lesson Top Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Chapter {currentIndex + 1} of {courseData?.fullLessons.length}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock size={12} />
                  <span>{currentLesson.readTimeMinutes} min read</span>
                </span>
              </div>

              {/* Rendered Markdown Body in Pure Light Theme */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm text-slate-900">
                <MarkdownRenderer
                  content={currentLesson.content}
                  onRunCode={handleRunCodeFromLesson}
                />
              </div>

              {/* Bottom Navigation: Prev & Next */}
              <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
                {prevLesson ? (
                  <button
                    onClick={() => {
                      setSelectedLessonId(prevLesson.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-xs"
                  >
                    <ChevronLeft size={16} />
                    <span className="truncate max-w-[150px] sm:max-w-xs">{prevLesson.title}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {nextLesson && (
                  <button
                    onClick={() => {
                      setSelectedLessonId(nextLesson.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition-colors shadow-md shadow-emerald-600/20 active:scale-95"
                  >
                    <span className="truncate max-w-[150px] sm:max-w-xs">{nextLesson.title}</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </article>
          ) : (
            <div className="py-20 text-center text-slate-400 text-sm">
              Select a chapter from the sidebar to start reading.
            </div>
          )}
        </main>
      </div>

      {/* Floating / Sliding Interactive Sandbox Drawer */}
      {isSandboxOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[580px] lg:w-[650px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Terminal size={14} className="text-[#7342E2]" />
              <span>Interactive Code Sandbox</span>
            </span>
            <button
              onClick={() => setIsSandboxOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden p-2">
            <CodePlayground initialCode={sandboxCode || undefined} isEmbedded={true} />
          </div>
        </div>
      )}
    </div>
  );
};
