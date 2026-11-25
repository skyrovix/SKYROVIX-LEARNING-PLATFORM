import React, { createContext, useContext, useState, useEffect } from 'react';
import { VIDEO_COURSES, VideoCourse, VideoLesson } from '../data/videoCoursesData';
import { getAllTextCourses, TextCourseMetadata } from '../data/textCourseLoader';

export interface UserNote {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  content: string;
  timestamp?: string;
  createdAt: string;
}

export interface BookmarkItem {
  id: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  courseType: 'video' | 'text';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'admin';
  enrolledCourseCount: number;
  completedLessonsCount: number;
  xp: number;
  streakDays: number;
  lastActive: string;
  status: 'Active' | 'Inactive';
}

export interface UserProfileData {
  id?: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  headline?: string;
  bio?: string;
  phone?: string;
  college?: string;
  degree?: string;
  gradYear?: string;
  track?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
  certificateName?: string;
  weeklyGoalHours?: number;
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface PlatformContextType {
  role: 'student' | 'admin';
  setRole: (r: 'student' | 'admin') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentUser: UserProfileData | null;
  setCurrentUser: (user: UserProfileData | null) => void;
  updateUserProfile: (updates: Partial<UserProfileData>) => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: 'student' | 'admin' }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  
  // Courses Data
  videoCourses: VideoCourse[];
  textCourses: TextCourseMetadata[];
  addVideoCourse: (course: VideoCourse) => void;
  updateVideoCourse: (course: VideoCourse) => void;
  addTextCourse: (course: TextCourseMetadata) => void;
  deleteCourse: (id: string) => void;

  // Student State
  enrolledCourses: string[];
  enrollInCourse: (courseId: string) => void;
  completedLessons: Record<string, string[]>;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  completeEntireCourse: (courseId: string) => void;
  isCourseCompleted: (courseId: string) => boolean;
  getCourseProgress: (courseId: string, totalLessons: number) => number;

  // Notes & Bookmarks
  notes: UserNote[];
  addNote: (courseId: string, courseTitle: string, lessonId: string, lessonTitle: string, content: string, timestamp?: string) => void;
  deleteNote: (noteId: string) => void;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: Omit<BookmarkItem, 'id'>) => void;
  isBookmarked: (courseId: string, lessonId: string) => boolean;

  // User Stats
  userXP: number;
  addXP: (amount: number) => void;
  streakDays: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Enroll Modal & Learning Workspace
  enrollModalCourse: VideoCourse | TextCourseMetadata | null;
  openEnrollModal: (course: VideoCourse | TextCourseMetadata) => void;
  closeEnrollModal: () => void;
  globalToastMessage: string | null;
  showGlobalToast: (msg: string) => void;
  resetMyLearningData: () => void;

  // Admin Data
  students: StudentProfile[];
  setStudents: React.Dispatch<React.SetStateAction<StudentProfile[]>>;
  updateStudent: (student: StudentProfile) => void;
  addStudent: (student: StudentProfile) => void;
  deleteStudent: (studentId: string) => void;

  // Navigation helpers
  navigateToCourseDetails: (courseId: string) => void;
  navigateToVideoCourse: (courseId: string, lessonId?: string) => void;
  navigateToTextCourse: (courseSlug: string, lessonId?: string) => void;
  navigateToDashboard: () => void;
  navigateToAdmin: (subtab?: string) => void;
  adminActiveTab: string;
  setAdminActiveTab: (tab: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Role & Authentication
  const [role, setRole] = useState<'student' | 'admin'>(() => {
    return (localStorage.getItem('skyrovix_role') as 'student' | 'admin') || 'student';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('skyrovix_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserProfileData | null>(() => {
    const saved = localStorage.getItem('skyrovix_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Strip out any previous mock dummy defaults so only real user data remains
        if (parsed.avatar?.includes('unsplash.com')) delete parsed.avatar;
        if (parsed.phone === '+91 98765 43210') delete parsed.phone;
        if (parsed.headline === 'Aspiring Full Stack Engineer | React & Cloud Architect') delete parsed.headline;
        if (parsed.bio?.includes('Passionate software developer exploring scalable frontend architectures')) delete parsed.bio;
        if (parsed.college === 'Skyrovix Engineering Institute') delete parsed.college;
        if (parsed.degree === 'B.E. Computer Science & Engineering') delete parsed.degree;
        if (parsed.github === 'https://github.com/hariharan') delete parsed.github;
        if (parsed.linkedin === 'https://linkedin.com/in/hariharan') delete parsed.linkedin;
        if (parsed.website === 'https://hariharan.dev') delete parsed.website;
        if (parsed.twitter === '@hariharan_dev') delete parsed.twitter;
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // User Storage Helper & Version Migration
  const getUserStorageKey = (key: string, email?: string | null) => {
    if (!email) return `skyrovix_${key}_guest`;
    const cleanEmail = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    return `skyrovix_${key}_usr_${cleanEmail}`;
  };

  // Run one-time migration to clear old global dummy student data
  (() => {
    const CURRENT_USER_DATA_VERSION = 'v4_clean_per_user_data';
    const storedVersion = localStorage.getItem('skyrovix_user_data_version');
    if (storedVersion !== CURRENT_USER_DATA_VERSION) {
      localStorage.setItem('skyrovix_user_data_version', CURRENT_USER_DATA_VERSION);
      localStorage.removeItem('skyrovix_enrolled');
      localStorage.removeItem('skyrovix_completed_lessons');
      localStorage.removeItem('skyrovix_notes');
      localStorage.removeItem('skyrovix_bookmarks');
      localStorage.removeItem('skyrovix_xp');
    }
  })();

  // Navigation
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' | 'catalog' | 'video-player' | 'text-reader' | 'user-dashboard' | 'admin-dashboard' | 'course-details' | 'certificate-verify'
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Course Lists
  const [videoCourses, setVideoCourses] = useState<VideoCourse[]>(() => {
    const version = localStorage.getItem('skyrovix_video_courses_version');
    const CURRENT_VERSION = 'v6_pricing_99_299_free';
    if (version !== CURRENT_VERSION) {
      localStorage.setItem('skyrovix_video_courses_version', CURRENT_VERSION);
      localStorage.setItem('skyrovix_video_courses', JSON.stringify(VIDEO_COURSES));
      localStorage.removeItem('skyrovix_text_courses');
      return VIDEO_COURSES;
    }
    const saved = localStorage.getItem('skyrovix_video_courses');
    return saved ? JSON.parse(saved) : VIDEO_COURSES;
  });

  const [textCourses, setTextCourses] = useState<TextCourseMetadata[]>(() => {
    const saved = localStorage.getItem('skyrovix_text_courses');
    return saved ? JSON.parse(saved) : getAllTextCourses();
  });

  // Enrolled courses (user-scoped; starts completely empty for new students)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(() => {
    const key = getUserStorageKey('enrolled', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  // Completed lessons map: courseId -> array of lessonIds
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    const key = getUserStorageKey('completed_lessons', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
  });

  // Notes
  const [notes, setNotes] = useState<UserNote[]>(() => {
    const key = getUserStorageKey('notes', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    const key = getUserStorageKey('bookmarks', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  // User Stats
  const [userXP, setUserXP] = useState<number>(() => {
    const key = getUserStorageKey('xp', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved, 10) : 50;
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const key = getUserStorageKey('streak', currentUser?.email);
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved, 10) : 1;
  });

  // Enroll Modal & Toast State
  const [enrollModalCourse, setEnrollModalCourse] = useState<VideoCourse | TextCourseMetadata | null>(null);
  const [globalToastMessage, setGlobalToastMessage] = useState<string | null>(null);

  const openEnrollModal = (course: VideoCourse | TextCourseMetadata) => {
    setEnrollModalCourse(course);
  };

  const closeEnrollModal = () => {
    setEnrollModalCourse(null);
  };

  const showGlobalToast = (msg: string) => {
    setGlobalToastMessage(msg);
    setTimeout(() => setGlobalToastMessage(null), 3500);
  };

  const resetMyLearningData = () => {
    setEnrolledCourses([]);
    setCompletedLessons({});
    setUserXP(50);
    setStreakDays(1);
    setNotes([]);
    setBookmarks([]);
    if (currentUser?.email) {
      localStorage.removeItem(getUserStorageKey('enrolled', currentUser.email));
      localStorage.removeItem(getUserStorageKey('completed_lessons', currentUser.email));
      localStorage.removeItem(getUserStorageKey('xp', currentUser.email));
      localStorage.removeItem(getUserStorageKey('streak', currentUser.email));
      localStorage.removeItem(getUserStorageKey('notes', currentUser.email));
      localStorage.removeItem(getUserStorageKey('bookmarks', currentUser.email));
    }
    showGlobalToast('Workspace reset! All course enrollments and progress have been cleared.');
  };

  // Students list for Admin Dashboard — synced directly from real backend database
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    // Clear legacy mock student cache so fake users never reappear
    localStorage.removeItem('skyrovix_students');
    const saved = localStorage.getItem('skyrovix_students_live_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('skyrovix_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('skyrovix_students_live_v2', JSON.stringify(students));
  }, [students]);

  // Fetch real students from backend SQL/DB API on mount
  useEffect(() => {
    let active = true;
    const fetchRealUsers = async () => {
      try {
        const resp = await fetch('http://localhost:5000/api/admin/overview');
        if (resp.ok) {
          const data = await resp.json();
          if (active && Array.isArray(data.students)) {
            setStudents(data.students);
          }
        }
      } catch (e) {
        // Backend offline; keep cached live data
      }
    };
    fetchRealUsers();
    return () => {
      active = false;
    };
  }, []);

  // Load user-scoped data whenever currentUser changes
  useEffect(() => {
    const email = currentUser?.email;
    if (!email) {
      setEnrolledCourses([]);
      setCompletedLessons({});
      setNotes([]);
      setBookmarks([]);
      setUserXP(0);
      setStreakDays(0);
      return;
    }
    const savedEnrolled = localStorage.getItem(getUserStorageKey('enrolled', email));
    const savedCompleted = localStorage.getItem(getUserStorageKey('completed_lessons', email));
    const savedNotes = localStorage.getItem(getUserStorageKey('notes', email));
    const savedBookmarks = localStorage.getItem(getUserStorageKey('bookmarks', email));
    const savedXp = localStorage.getItem(getUserStorageKey('xp', email));
    const savedStreak = localStorage.getItem(getUserStorageKey('streak', email));
    const lastActiveKey = getUserStorageKey('last_active_date', email);

    // Calculate real-time daily calendar streak
    const todayStr = new Date().toISOString().slice(0, 10);
    const lastActiveDate = localStorage.getItem(lastActiveKey);
    let calculatedStreak = savedStreak ? parseInt(savedStreak, 10) : 1;

    if (!lastActiveDate) {
      localStorage.setItem(lastActiveKey, todayStr);
      calculatedStreak = 1;
    } else if (lastActiveDate !== todayStr) {
      const last = new Date(lastActiveDate);
      const today = new Date(todayStr);
      const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        calculatedStreak = (calculatedStreak || 1) + 1;
      } else if (diffDays > 1) {
        calculatedStreak = 1;
      }
      localStorage.setItem(lastActiveKey, todayStr);
    }
    localStorage.setItem(getUserStorageKey('streak', email), calculatedStreak.toString());

    setEnrolledCourses(savedEnrolled ? JSON.parse(savedEnrolled) : []);
    setCompletedLessons(savedCompleted ? JSON.parse(savedCompleted) : {});
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    setUserXP(savedXp ? parseInt(savedXp, 10) : 50);
    setStreakDays(calculatedStreak);
  }, [currentUser?.email]);

  // Persist user-scoped data
  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('enrolled', currentUser.email), JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses, currentUser?.email]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('completed_lessons', currentUser.email), JSON.stringify(completedLessons));
    }
  }, [completedLessons, currentUser?.email]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('notes', currentUser.email), JSON.stringify(notes));
    }
  }, [notes, currentUser?.email]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('bookmarks', currentUser.email), JSON.stringify(bookmarks));
    }
  }, [bookmarks, currentUser?.email]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('xp', currentUser.email), userXP.toString());
    }
  }, [userXP, currentUser?.email]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem(getUserStorageKey('streak', currentUser.email), streakDays.toString());
    }
  }, [streakDays, currentUser?.email]);

  useEffect(() => {
    localStorage.setItem('skyrovix_video_courses', JSON.stringify(videoCourses));
  }, [videoCourses]);

  useEffect(() => {
    localStorage.setItem('skyrovix_text_courses', JSON.stringify(textCourses));
  }, [textCourses]);

  // Actions
  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      addXP(50);
      const found = videoCourses.find(c => c.id === courseId) || textCourses.find(c => c.id === courseId);
      showGlobalToast(`🎉 Enrolled in "${found?.title || courseId}"! +50 XP earned.`);

      // Persist enrollment to backend DB in real time
      if (currentUser?.id || currentUser?.email) {
        fetch('http://localhost:5000/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.id,
            email: currentUser.email,
            courseId
          })
        }).catch(() => {});
      }
    }
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    setCompletedLessons(prev => {
      const courseLessons = prev[courseId] || [];
      const isAlreadyDone = courseLessons.includes(lessonId);
      let updated: string[];
      if (isAlreadyDone) {
        updated = courseLessons.filter(id => id !== lessonId);
      } else {
        updated = [...courseLessons, lessonId];
        addXP(100);
      }
      return {
        ...prev,
        [courseId]: updated
      };
    });

    // Sync progress to backend DB in real time
    if (currentUser?.id || currentUser?.email) {
      fetch('http://localhost:5000/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          email: currentUser.email,
          courseId,
          lessonId
        })
      }).catch(() => {});
    }
  };

  const isLessonCompleted = (courseId: string, lessonId: string): boolean => {
    return (completedLessons[courseId] || []).includes(lessonId);
  };

  const getCourseProgress = (courseId: string, totalLessons: number): number => {
    if (!totalLessons || totalLessons === 0) return 0;
    const completedCount = (completedLessons[courseId] || []).length;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  };

  const completeEntireCourse = (courseId: string) => {
    const vidCourse = videoCourses.find(c => c.id === courseId);
    const txtCourse = textCourses.find(c => c.id === courseId);
    let allLessonIds: string[] = [];
    if (vidCourse) {
      allLessonIds = vidCourse.modules.flatMap(m => m.lessons.map(l => l.id));
    } else if (txtCourse) {
      allLessonIds = txtCourse.lessons?.map(l => l.id) || [];
    }
    if (allLessonIds.length === 0) return;

    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
    }

    setCompletedLessons(prev => ({
      ...prev,
      [courseId]: allLessonIds
    }));

    addXP(500);
    showGlobalToast(`🏆 Course Completed! Your Official Certificate of Completion is now unlocked.`);
  };

  const isCourseCompleted = (courseId: string): boolean => {
    const vidCourse = videoCourses.find(c => c.id === courseId);
    const txtCourse = textCourses.find(c => c.id === courseId);
    let totalCount = 0;
    if (vidCourse) {
      totalCount = vidCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    } else if (txtCourse) {
      totalCount = txtCourse.lessons?.length || txtCourse.totalLessons || 0;
    }
    if (totalCount === 0) return false;
    const doneCount = (completedLessons[courseId] || []).length;
    return doneCount >= totalCount;
  };

  const addNote = (courseId: string, courseTitle: string, lessonId: string, lessonTitle: string, content: string, timestamp?: string) => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      courseId,
      courseTitle,
      lessonId,
      lessonTitle,
      content,
      timestamp,
      createdAt: 'Just now'
    };
    setNotes(prev => [newNote, ...prev]);
    addXP(25);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'id'>) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.courseId === item.courseId && b.lessonId === item.lessonId);
      if (exists) {
        return prev.filter(b => b.id !== exists.id);
      } else {
        return [{ ...item, id: `bm-${Date.now()}` }, ...prev];
      }
    });
  };

  const isBookmarked = (courseId: string, lessonId: string): boolean => {
    return bookmarks.some(b => b.courseId === courseId && b.lessonId === lessonId);
  };

  const addXP = (amount: number) => {
    setUserXP(prev => prev + amount);
  };

  const addVideoCourse = (course: VideoCourse) => {
    setVideoCourses(prev => [course, ...prev]);
  };

  const updateVideoCourse = (course: VideoCourse) => {
    setVideoCourses(prev => prev.map(c => c.id === course.id ? course : c));
  };

  const addTextCourse = (course: TextCourseMetadata) => {
    setTextCourses(prev => [course, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setVideoCourses(prev => prev.filter(c => c.id !== id));
    setTextCourses(prev => prev.filter(c => c.id !== id));
    setEnrolledCourses(prev => prev.filter(cId => cId !== id));
  };

  const updateStudent = (student: StudentProfile) => {
    setStudents(prev => prev.map(s => s.id === student.id ? student : s));
  };

  const addStudent = (student: StudentProfile) => {
    setStudents(prev => [student, ...prev]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId && s.email !== studentId));
  };

  const updateUserProfile = async (updates: Partial<UserProfileData>) => {
    if (!currentUser) return;
    const updatedUser: UserProfileData = {
      ...currentUser,
      ...updates
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('skyrovix_user', JSON.stringify(updatedUser));

    // Sync student directory for admin
    setStudents(prev =>
      prev.map(s => {
        if (s.email?.toLowerCase() === updatedUser.email.toLowerCase() || (s.id && s.id === updatedUser.id)) {
          return {
            ...s,
            name: updatedUser.name || s.name,
            avatar: updatedUser.avatar || s.avatar
          };
        }
        return s;
      })
    );

    // Sync to local server backend if running
    try {
      await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: updatedUser.id, email: updatedUser.email, updates })
      });
    } catch (e) {
      // Server offline / non-blocking
    }

    showGlobalToast('Profile updated successfully!');
  };

  // Navigators
  const navigateToVideoCourse = (courseId: string, lessonId?: string) => {
    setSelectedCourseId(courseId);
    if (lessonId) {
      setSelectedLessonId(lessonId);
    } else {
      const course = videoCourses.find(c => c.id === courseId);
      const firstLesson = course?.modules[0]?.lessons[0]?.id || null;
      setSelectedLessonId(firstLesson);
    }
    setCurrentView('video-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTextCourse = (courseSlug: string, lessonId?: string) => {
    const course = textCourses.find(c => c.slug === courseSlug || c.id === courseSlug);
    if (course) {
      setSelectedCourseId(course.id);
      if (lessonId) {
        setSelectedLessonId(lessonId);
      } else {
        setSelectedLessonId(course.lessons[0]?.id || null);
      }
      setCurrentView('text-reader');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // SQL / Local Auth Session Initialization on Mount
  useEffect(() => {
    const syncSession = async () => {
      try {
        const isAuth = localStorage.getItem('skyrovix_auth') === 'true';
        const storedUser = localStorage.getItem('skyrovix_user');
        const storedRole = (localStorage.getItem('skyrovix_role') as 'student' | 'admin') || 'student';
        
        if (isAuth && storedUser) {
          const parsed = JSON.parse(storedUser);
          setIsAuthenticated(true);
          setCurrentUser(parsed);
          setRole(storedRole);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (err) {
        console.warn('Session verification notice:', err);
      }
    };
    syncSession();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: 'student' | 'admin' }> => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }
    try {
      // 1. Authenticate with backend API
      try {
        const resp = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password })
        });
        if (resp.ok) {
          const result = await resp.json();
          const u = result.user;
          const targetRole: 'student' | 'admin' =
            u.role || (email.toLowerCase().includes('admin') ? 'admin' : 'student');
          const profile = { id: u.id, name: u.name, email: u.email, role: targetRole };
          setIsAuthenticated(true);
          setCurrentUser(profile);
          setRole(targetRole);
          localStorage.setItem('skyrovix_auth', 'true');
          localStorage.setItem('skyrovix_user', JSON.stringify(profile));
          localStorage.setItem('skyrovix_role', targetRole);
          return { success: true, role: targetRole };
        }
      } catch (e) {
        // Backend offline or local fallback
      }

      // 2. Direct local verification fallback
      const targetRole: 'student' | 'admin' = email.toLowerCase().includes('admin') ? 'admin' : 'student';
      const fallbackProfile = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: email.trim(),
        role: targetRole
      };
      setIsAuthenticated(true);
      setCurrentUser(fallbackProfile);
      setRole(targetRole);
      localStorage.setItem('skyrovix_auth', 'true');
      localStorage.setItem('skyrovix_user', JSON.stringify(fallbackProfile));
      localStorage.setItem('skyrovix_role', targetRole);
      return { success: true, role: targetRole };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed. Please check your credentials.' };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password || !name) {
      return { success: false, error: 'Full name, email, and password are required.' };
    }
    try {
      const userRole: 'student' | 'admin' = email.toLowerCase().includes('admin')
        ? 'admin'
        : 'student';

      // 1. Register with express backend and use server-assigned ID
      let serverUser: any = null;
      try {
        const resp = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role: userRole })
        });
        if (resp.ok) {
          const data = await resp.json();
          serverUser = data.user;
        }
      } catch (e) {
        // Non-blocking
      }

      const profile = {
        id: serverUser?.id || `usr-${Date.now()}`,
        name: serverUser?.name || name.trim(),
        email: serverUser?.email || email.trim(),
        role: (serverUser?.role as 'student' | 'admin') || userRole
      };
      setIsAuthenticated(true);
      setCurrentUser(profile);
      setRole(userRole);
      localStorage.setItem('skyrovix_auth', 'true');
      localStorage.setItem('skyrovix_user', JSON.stringify(profile));
      localStorage.setItem('skyrovix_role', userRole);

      // Initialize clean slate for the newly registered student
      setEnrolledCourses([]);
      setCompletedLessons({});
      setUserXP(50);
      setStreakDays(1);
      setNotes([]);
      setBookmarks([]);
      localStorage.setItem(getUserStorageKey('enrolled', email), JSON.stringify([]));
      localStorage.setItem(getUserStorageKey('completed_lessons', email), JSON.stringify({}));
      localStorage.setItem(getUserStorageKey('xp', email), '50');
      localStorage.setItem(getUserStorageKey('streak', email), '1');
      localStorage.setItem(getUserStorageKey('notes', email), JSON.stringify([]));
      localStorage.setItem(getUserStorageKey('bookmarks', email), JSON.stringify([]));

      // Add to student directory
      setStudents(prev => {
        if (!prev.some(s => s.email.toLowerCase() === email.toLowerCase())) {
          return [
            {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              avatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              role: userRole,
              enrolledCourseCount: 0,
              completedLessonsCount: 0,
              xp: 50,
              streakDays: 1,
              lastActive: 'Just now',
              status: 'Active'
            },
            ...prev
          ];
        }
        return prev;
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  const logout = async () => {
    localStorage.removeItem('skyrovix_auth');
    localStorage.removeItem('skyrovix_user');
    localStorage.removeItem('skyrovix_role');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEnrolledCourses([]);
    setCompletedLessons({});
    setUserXP(0);
    setStreakDays(0);
    setNotes([]);
    setBookmarks([]);
    setRole('student');
    setCurrentView('home');
  };

  const navigateToCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    if (!isAuthenticated) {
      setCurrentView('home');
      return;
    }
    setCurrentView('user-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (subtab: string = 'overview') => {
    if (!isAuthenticated || role !== 'admin') {
      setCurrentView('home');
      return;
    }
    setAdminActiveTab(subtab);
    setCurrentView('admin-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PlatformContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        updateUserProfile,
        login,
        register,
        logout,
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        videoCourses,
        textCourses,
        addVideoCourse,
        updateVideoCourse,
        addTextCourse,
        deleteCourse,
        enrolledCourses,
        enrollInCourse,
        completedLessons,
        toggleLessonComplete,
        isLessonCompleted,
        completeEntireCourse,
        isCourseCompleted,
        getCourseProgress,
        notes,
        addNote,
        deleteNote,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        userXP,
        addXP,
        streakDays,
        searchQuery,
        setSearchQuery,
        enrollModalCourse,
        openEnrollModal,
        closeEnrollModal,
        globalToastMessage,
        showGlobalToast,
        resetMyLearningData,
        students,
        setStudents,
        updateStudent,
        addStudent,
        deleteStudent,
        navigateToCourseDetails,
        navigateToVideoCourse,
        navigateToTextCourse,
        navigateToDashboard,
        navigateToAdmin,
        adminActiveTab,
        setAdminActiveTab
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

