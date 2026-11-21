import React, { useState, useEffect, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Search, Video, FileText, ArrowRight, X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { videoCourses, textCourses, navigateToVideoCourse, navigateToTextCourse } = usePlatform();
  const [query, setQuery] = useState('');

  // Handle Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search Results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const hits: Array<{
      type: 'video-course' | 'video-lesson' | 'text-course' | 'text-lesson';
      title: string;
      subtitle: string;
      category: string;
      courseId: string;
      lessonId?: string;
    }> = [];

    // Search Video Courses & Lessons
    videoCourses.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)) {
        hits.push({
          type: 'video-course',
          title: c.title,
          subtitle: `${c.totalDuration} • ${c.totalLectures} lectures • ${c.instructor.name}`,
          category: c.category,
          courseId: c.id
        });
      }
      c.modules.forEach(m => {
        m.lessons.forEach(l => {
          if (l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)) {
            hits.push({
              type: 'video-lesson',
              title: l.title,
              subtitle: `In ${c.title} (${l.duration})`,
              category: c.category,
              courseId: c.id,
              lessonId: l.id
            });
          }
        });
      });
    });

    // Search Text Courses & Lessons
    textCourses.forEach(tc => {
      if (tc.title.toLowerCase().includes(q) || tc.category.toLowerCase().includes(q) || tc.slug.toLowerCase().includes(q)) {
        hits.push({
          type: 'text-course',
          title: tc.title,
          subtitle: `${tc.lessonsCount} chapters • ${tc.estimatedHours} • ${tc.level}`,
          category: tc.category,
          courseId: tc.slug
        });
      }
      tc.lessons.forEach(tl => {
        if (tl.title.toLowerCase().includes(q) || tl.snippet.toLowerCase().includes(q)) {
          hits.push({
            type: 'text-lesson',
            title: tl.title,
            subtitle: `In ${tc.title} (~${tl.readTimeMinutes} min read)`,
            category: tc.category,
            courseId: tc.slug,
            lessonId: tl.id
          });
        }
      });
    });

    return hits.slice(0, 20); // Limit to top 20
  }, [query, videoCourses, textCourses]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-sm">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] relative z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
              <Search className="w-5 h-5 text-[#FB4400] mr-3" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search full stack, React, HTML chapters, Node.js, databases..."
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm outline-none font-sans"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-md mr-1 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-500 font-mono shadow-2xs">
                ESC
              </kbd>
            </div>

            {/* Results Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-100">
              {!query.trim() && (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-5 h-5 text-[#FB4400]" />
                  </div>
                  <p className="font-bold text-slate-800 text-sm">Quick Curriculum Finder</p>
                  <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                    Type keywords like "React 19", "Flexbox", "PostgreSQL", or "Django" to browse all courses & lessons instantly.
                  </p>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p className="text-slate-700 font-semibold">No matching courses or lessons found for "{query}"</p>
                  <p className="text-slate-400 mt-1">Try searching for keywords like "Full Stack", "HTML", "Python", or "Node".</p>
                </div>
              )}

              {results.map((hit, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (hit.type === 'video-course') {
                      navigateToVideoCourse(hit.courseId);
                    } else if (hit.type === 'video-lesson') {
                      navigateToVideoCourse(hit.courseId, hit.lessonId);
                    } else if (hit.type === 'text-course') {
                      navigateToTextCourse(hit.courseId);
                    } else if (hit.type === 'text-lesson') {
                      navigateToTextCourse(hit.courseId, hit.lessonId);
                    }
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-orange-50/80 border border-transparent hover:border-orange-200/60 transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${
                      hit.type.includes('video')
                        ? 'bg-orange-50 text-[#FB4400] border border-orange-200/80 group-hover:bg-orange-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 group-hover:bg-emerald-100'
                    }`}>
                      {hit.type.includes('video') ? <Video size={16} /> : <FileText size={16} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm group-hover:text-[#FB4400] transition-colors">
                          {hit.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-mono font-medium">
                          {hit.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-normal">{hit.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#FB4400] group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
