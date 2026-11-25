import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { isYouTubeUrl, toYouTubeEmbedUrl } from '../../utils/youtube';
import {
  Play,
  Pause,
  CheckCircle,
  Circle,
  Clock,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  BookOpen,
  Download,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  Award,
  Video
} from 'lucide-react';

export const VideoPlayerView: React.FC = () => {
  const {
    selectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    videoCourses,
    setCurrentView,
    completedLessons,
    toggleLessonComplete,
    isLessonCompleted,
    getCourseProgress,
    notes,
    addNote,
    deleteNote,
    isBookmarked,
    toggleBookmark,
    addXP
  } = usePlatform();

  // Find the selected course
  const currentCourse = useMemo(() => {
    return videoCourses.find(c => c.id === selectedCourseId) || videoCourses[0];
  }, [videoCourses, selectedCourseId]);

  // Find active lesson or default to first
  const activeLesson = useMemo(() => {
    if (!currentCourse) return null;
    for (const mod of currentCourse.modules) {
      const match = mod.lessons.find(l => l.id === selectedLessonId);
      if (match) return match;
    }
    return currentCourse.modules[0]?.lessons[0] || null;
  }, [currentCourse, selectedLessonId]);

  // Flattened list of all lessons for Next/Prev navigation
  const allLessons = useMemo(() => {
    if (!currentCourse) return [];
    return currentCourse.modules.flatMap(m => m.lessons);
  }, [currentCourse]);

  const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'notes' | 'transcript' | 'resources' | 'quiz'>('overview');

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState<boolean>(false);

  // New Note Input
  const [newNoteContent, setNewNoteContent] = useState('');
  const [noteTimestamp, setNoteTimestamp] = useState('04:15');

  // Completion Status
  const isDone = activeLesson ? isLessonCompleted(currentCourse.id, activeLesson.id) : false;
  const isBm = activeLesson ? isBookmarked(currentCourse.id, activeLesson.id) : false;
  const courseProgress = getCourseProgress(currentCourse.id, currentCourse.totalLectures);

  // Filter notes for this course & lesson
  const lessonNotes = notes.filter(
    n => n.courseId === currentCourse.id && n.lessonId === activeLesson?.id
  );

  const handleToggleComplete = () => {
    if (activeLesson) {
      toggleLessonComplete(currentCourse.id, activeLesson.id);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !activeLesson) return;
    addNote(
      currentCourse.id,
      currentCourse.title,
      activeLesson.id,
      activeLesson.title,
      newNoteContent.trim(),
      noteTimestamp
    );
    setNewNoteContent('');
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null || !activeLesson?.quiz) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === activeLesson.quiz.correctIndex && !quizScoreAwarded) {
      addXP(50);
      setQuizScoreAwarded(true);
    }
  };

  if (!currentCourse || !activeLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-[#F8FAFC]">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Course Selected</h2>
          <button
            onClick={() => setCurrentView('catalog')}
            className="px-4 py-2 bg-[#FB4400] text-white rounded-xl text-sm"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col">
      {/* Top Header Bar */}
      <div className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-16 z-30 shadow-2xs">
        <div className="flex items-center gap-3 truncate">
          <button
            onClick={() => setCurrentView('catalog')}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">All Courses</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-[#FB4400] truncate max-w-[200px] sm:max-w-md">
            {currentCourse.title}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            onClick={() => {
              toggleBookmark({
                courseId: currentCourse.id,
                courseSlug: currentCourse.slug,
                courseTitle: currentCourse.title,
                lessonId: activeLesson.id,
                lessonTitle: activeLesson.title,
                courseType: 'video'
              });
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isBm
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
            title="Bookmark this lecture"
          >
            <Bookmark size={15} className={isBm ? 'fill-amber-500 text-amber-500' : ''} />
          </button>

          {/* Mark Complete */}
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isDone
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-[#FB4400] hover:bg-[#E03D00] text-white shadow-md shadow-orange-500/20 active:scale-95'
            }`}
          >
            <CheckCircle size={14} className={isDone ? 'fill-emerald-500 text-white' : ''} />
            <span>{isDone ? 'Completed (+100 XP)' : 'Mark as Complete'}</span>
          </button>

          {/* Next Lesson */}
          {nextLesson && (
            <button
              onClick={() => setSelectedLessonId(nextLesson.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          )}

          {/* Claim Certificate Button when 100% completed */}
          {courseProgress >= 100 && (
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

      {/* Main Workspace: Player on Left, Curriculum on Right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Player and Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Container (Cinematic dark theater frame) */}
          <div className="w-full bg-slate-950 aspect-video max-h-[65vh] flex items-center justify-center relative shadow-xl">
            {isYouTubeUrl(activeLesson.videoUrl) ? (
              <iframe
                src={`${toYouTubeEmbedUrl(activeLesson.videoUrl)}?autoplay=0&rel=0&modestbranding=1`}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeLesson.videoUrl}
                controls
                className="w-full h-full object-contain"
                poster={currentCourse.thumbnail}
              />
            )}
          </div>

          {/* Lesson Metadata Banner */}
          <div className="p-6 bg-white border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-orange-50 text-[#FB4400] border border-orange-200">
                    Video Lecture
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock size={12} />
                    <span>{activeLesson.duration}</span>
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
                  {activeLesson.title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                  <img
                    src={currentCourse.instructor.avatar}
                    alt={currentCourse.instructor.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{currentCourse.instructor.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider bg-orange-100 text-[#FB4400]">
                      Official
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {currentCourse.instructor.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-slate-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#FB4400] text-[#FB4400]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview & Notes
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'chapters'
                  ? 'border-[#FB4400] text-[#FB4400]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Chapters ({activeLesson.chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'border-[#FB4400] text-[#FB4400]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              My Notes ({lessonNotes.length})
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'transcript'
                  ? 'border-[#FB4400] text-[#FB4400]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Transcript
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-[#FB4400] text-[#FB4400]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Resources ({activeLesson.resources?.length || 0})
            </button>
            {activeLesson.quiz && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? 'border-amber-500 text-amber-700 bg-amber-50/50'
                    : 'border-transparent text-amber-600 hover:text-amber-800'
                }`}
              >
                <Sparkles size={13} />
                <span>Knowledge Check</span>
              </button>
            )}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 bg-[#F8FAFC] flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-display">
                    Lecture Summary
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    {activeLesson.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-display">
                    Key Concepts & Architecture
                  </h3>
                  <div className="p-5 rounded-2xl bg-orange-50/80 border border-orange-200 text-sm text-orange-950 leading-relaxed font-normal">
                    {activeLesson.notes}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-display">
                    Curriculum &amp; Engineering Team
                  </h3>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4 shadow-2xs">
                    <div className="w-13 h-13 rounded-2xl bg-white border border-slate-200/90 p-1.5 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                      <img
                        src={currentCourse.instructor.avatar}
                        alt={currentCourse.instructor.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {currentCourse.instructor.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-[#FB4400] border border-orange-200/60">
                          Official Team
                        </span>
                      </div>
                      <p className="text-xs text-[#FB4400] font-semibold mt-0.5">{currentCourse.instructor.role}</p>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                        {currentCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapters Tab */}
            {activeTab === 'chapters' && (
              <div className="max-w-3xl space-y-2">
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Jump directly to specific topics covered in this video lecture.
                </p>
                {activeLesson.chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-[#FB4400] flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#FB4400]">
                        {ch.title}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-xs font-mono font-semibold text-slate-700">
                      {ch.time}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* My Notes Tab */}
            {activeTab === 'notes' && (
              <div className="max-w-3xl space-y-6">
                {/* Note creation form */}
                <form onSubmit={handleSaveNote} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="font-bold text-slate-900">Take a Note on This Lecture</span>
                    <div className="flex items-center gap-2">
                      <span>Timestamp:</span>
                      <input
                        type="text"
                        value={noteTimestamp}
                        onChange={e => setNoteTimestamp(e.target.value)}
                        className="w-16 px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-300 text-center font-mono text-[#FB4400] font-bold text-xs outline-none"
                      />
                    </div>
                  </div>
                  <textarea
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    placeholder="Write down architecture insights, code snippets, or reminders..."
                    className="w-full h-24 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#FB4400] resize-none font-sans"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteContent.trim()}
                      className="px-4 py-2 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      Save Note (+25 XP)
                    </button>
                  </div>
                </form>

                {/* Existing Notes list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Saved Notes ({lessonNotes.length})
                  </h4>
                  {lessonNotes.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200 font-medium">
                      No notes taken for this lecture yet. Use the form above to add your first note!
                    </div>
                  ) : (
                    lessonNotes.map(n => (
                      <div key={n.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded bg-orange-50 text-[#FB4400] font-mono font-bold">
                            @{n.timestamp || '00:00'}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">{n.createdAt}</span>
                            <button
                              onClick={() => deleteNote(n.id)}
                              className="text-slate-400 hover:text-rose-600 text-xs font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed font-normal">{n.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Transcript Tab */}
            {activeTab === 'transcript' && (
              <div className="max-w-3xl">
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Full synchronized text transcription of this video lesson.
                </p>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed font-sans shadow-2xs">
                  {activeLesson.transcript}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="max-w-3xl space-y-3">
                <p className="text-xs text-slate-500 mb-4 font-medium">
                  Downloadable code repositories, cheat sheets, and architectural diagrams.
                </p>
                {activeLesson.resources?.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition-all text-slate-800 group shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-orange-50 text-[#FB4400]">
                        {res.type === 'github' ? <FileText size={16} /> : <Download size={16} />}
                      </div>
                      <span className="text-sm font-semibold group-hover:text-[#FB4400]">
                        {res.title}
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-[#FB4400]" />
                  </a>
                ))}
              </div>
            )}

            {/* Knowledge Check / Quiz Tab */}
            {activeTab === 'quiz' && activeLesson.quiz && (
              <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                    <Sparkles size={14} />
                    <span>Quick Concept Check</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {activeLesson.quiz.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {activeLesson.quiz.options.map((option, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === activeLesson.quiz?.correctIndex;
                    let style = 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-50 border-rose-400 text-rose-900';
                      }
                    } else if (isSelected) {
                      style = 'bg-orange-50 border-[#FB4400] text-orange-900 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!quizSubmitted) setSelectedQuizOption(idx);
                        }}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && isCorrect && (
                          <span className="text-xs text-emerald-600 font-bold">Correct ✓</span>
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <span className="text-xs text-rose-600 font-bold">Incorrect ✗</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit & Explanation */}
                <div className="pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={selectedQuizOption === null}
                      className="w-full py-3 rounded-2xl bg-[#FB4400] hover:bg-[#E03D00] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Explanation
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activeLesson.quiz.explanation}
                      </p>
                      {selectedQuizOption === activeLesson.quiz.correctIndex && (
                        <div className="text-xs text-emerald-600 font-bold pt-1">
                          🎉 Excellent! +50 Knowledge XP added to your profile!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Course Curriculum Accordion Sidebar */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col h-auto lg:h-[calc(100vh-7.5rem)]">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Course Curriculum
              </span>
              <span className="text-xs font-mono text-[#FB4400] font-bold">
                {courseProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FB4400] to-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
              <span>{allLessons.length} Total Lectures</span>
              <span>{currentCourse.totalDuration}</span>
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2.5">
            {currentCourse.modules.map(module => (
              <div key={module.id} className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xs">
                <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800">
                  {module.title}
                </div>
                <div className="divide-y divide-slate-100">
                  {module.lessons.map(lesson => {
                    const isCurrent = lesson.id === activeLesson.id;
                    const done = isLessonCompleted(currentCourse.id, lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`w-full text-left p-3 flex items-start gap-2.5 transition-colors ${
                          isCurrent
                            ? 'bg-orange-50/80 border-l-3 border-[#FB4400]'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {done ? (
                            <CheckCircle size={15} className="text-emerald-500 fill-emerald-100" />
                          ) : isCurrent ? (
                            <Play size={15} className="text-[#FB4400] fill-[#FB4400]" />
                          ) : (
                            <Circle size={15} className="text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold leading-snug line-clamp-2 ${
                            isCurrent ? 'text-[#FB4400]' : 'text-slate-800'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                            <Clock size={11} />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
