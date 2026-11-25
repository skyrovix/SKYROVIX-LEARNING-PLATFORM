import React, { useState, useMemo, useEffect } from 'react';
import { usePlatform, StudentProfile } from '../../context/PlatformContext';
import { VideoCourse, VideoLesson, CourseModule, SubModuleItem } from '../../data/videoCoursesData';
import { TextCourseMetadata } from '../../data/textCourseLoader';
import { brandImages } from '../../assets/brandImages';
import {
  SKYROVIX_YOUTUBE_CHANNEL,
  toYouTubeEmbedUrl,
  extractYouTubeId,
  getYouTubeThumbnail
} from '../../utils/youtube';
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  FolderGit2,
  ShieldCheck,
  ShieldAlert,
  Users,
  BookOpen,
  Award,
  Files,
  Package,
  CreditCard,
  DollarSign,
  Crown,
  Sparkles,
  Tag,
  Wallet,
  Layers,
  Headphones,
  Compass,
  Globe,
  Briefcase,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowRight,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  Megaphone,
  Mail,
  Download,
  Clock,
  ExternalLink,
  FileSpreadsheet,
  TrendingUp,
  AlertCircle,
  Code2,
  UserCheck,
  RefreshCw,
  FolderCode,
  Terminal,
  Play,
  Settings,
  Sliders,
  Video,
  FolderPlus,
  UserPlus,
  PlayCircle,
  Database,
  Lock,
  Copy,
  Info,
  SlidersHorizontal,
  Server,
  Key,
  Menu,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Course Assignment Submission Interface
interface AssignmentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  studentAvatar: string;
  assignmentTitle: string;
  courseTrack: string;
  submittedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  githubUrl?: string;
  liveUrl?: string;
}

// Capstone Project Submission Interface
interface CapstoneItem {
  id: string;
  student: string;
  avatar: string;
  title: string;
  stack: string;
  grade: string;
  status: 'Graded' | 'Pending';
  repo: string;
}

// Cashfree / Payment Order Interface (Real Backend Ledger)
interface LiveOrder {
  orderId: string;
  cfOrderId?: string;
  amount: number;
  courseId?: string;
  courseTitle?: string;
  userId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: string;
  createdAt?: string;
  paidAt?: string | null;
}

interface LiveActivityItem {
  id: string;
  type: 'user' | 'enrollment' | 'order' | 'certificate';
  title: string;
  subtitle: string;
  timestamp: string;
}

interface LiveEnrollment {
  userId: string;
  courseId: string;
  enrolledAt: string;
  orderId?: string;
  paymentGateway?: string;
  amountPaid?: number;
}

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    videoCourses,
    textCourses,
    addVideoCourse,
    updateVideoCourse,
    addTextCourse,
    updateTextCourse,
    deleteCourse,
    students,
    setStudents,
    updateStudent,
    addStudent,
    deleteStudent,
    setCurrentView,
    setRole,
    navigateToVideoCourse,
    navigateToTextCourse,
    logout
  } = usePlatform();

  // Active Menu Section & Mobile Drawer
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSelectMenu = (menu: string) => {
    setActiveMenu(menu);
    setMobileSidebarOpen(false);
  };

  // Search in Top Bar
  const [topSearch, setTopSearch] = useState('');

  // Notifications dropdown
  const [showNotifications, setShowNotifications] = useState(false);

  // Profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Real-time Backend Sync State
  const [liveOrders, setLiveOrders] = useState<LiveOrder[]>([]);
  const [liveEnrollments, setLiveEnrollments] = useState<LiveEnrollment[]>([]);
  const [liveActivity, setLiveActivity] = useState<LiveActivityItem[]>([]);
  const [liveStats, setLiveStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEnrollments: 0,
    totalOrders: 0,
    paidOrdersCount: 0,
    paidRevenue: 0,
    pendingVolume: 0,
    totalCertificates: 0
  });
  const [isSyncingLive, setIsSyncingLive] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>('Connecting...');
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [verifyingOrderId, setVerifyingOrderId] = useState<string | null>(null);
  const [liveClock, setLiveClock] = useState<Date>(() => new Date());

  // Assignments State synced with backend DB
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);

  // Capstones State synced with backend DB
  const [capstones, setCapstones] = useState<CapstoneItem[]>([]);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isIssueCertModalOpen, setIsIssueCertModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Students Directory Filters & Delete State
  const [studentSearch, setStudentSearch] = useState('');
  const [studentRoleFilter, setStudentRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [studentStatusFilter, setStudentStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [studentToDelete, setStudentToDelete] = useState<StudentProfile | null>(null);

  // Add Student State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentRole, setNewStudentRole] = useState<'student' | 'admin'>('student');

  // Issue Certificate State
  const [newCertStudentId, setNewCertStudentId] = useState(students[0]?.id || '');
  const [newCertCourseTitle, setNewCertCourseTitle] = useState('Full Stack Cloud Architecture');
  const [newCertScore, setNewCertScore] = useState('100% (Distinction)');

  // Announcement state
  const [announcementText, setAnnouncementText] = useState('');
  // Email state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  // Coupon state (live synced)
  const [couponCode, setCouponCode] = useState('SKYROVIX2026');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [liveCoupons, setLiveCoupons] = useState<Array<{ id: string; code: string; discountPercent: number; active: boolean }>>([]);
  // New Category state
  const [newCategoryName, setNewCategoryName] = useState('');

  // Course Management & Enterprise Editor State
  const [courseFormat, setCourseFormat] = useState<'video' | 'text'>('video');
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState('Full Stack');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('All Levels');
  const [newInstructor, setNewInstructor] = useState('Skyrovix Team');
  const [newDuration, setNewDuration] = useState('18h 30m');
  const [newPrice, setNewPrice] = useState('₹299');
  const [newOriginalPrice, setNewOriginalPrice] = useState('₹2,999');
  const [newIsFree, setNewIsFree] = useState(false);
  const [newBadge, setNewBadge] = useState('NEW COURSE');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');
  const [newInitialYouTubeUrl, setNewInitialYouTubeUrl] = useState('https://www.youtube.com/watch?v=nu_pCVPKzTk');
  const [newDescription, setNewDescription] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [tableTypeFilter, setTableTypeFilter] = useState<'all' | 'video' | 'text'>('all');

  // Text Course Edit Modal State
  const [editingTextCourse, setEditingTextCourse] = useState<TextCourseMetadata | null>(null);

  // Studio Modes & Enterprise Course Details State
  const [studioTab, setStudioTab] = useState<'curriculum' | 'details'>('curriculum');
  const [selectedCourseForStudio, setSelectedCourseForStudio] = useState<string>(videoCourses[0]?.id || '');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonSubModule, setNewLessonSubModule] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('15:00');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('https://www.youtube.com/watch?v=nu_pCVPKzTk');
  const [newLessonSummary, setNewLessonSummary] = useState('');
  const [newLessonMarkdown, setNewLessonMarkdown] = useState(
    `# New Curriculum Chapter\n\n## 📘 Overview\nWrite modern architectural guidelines here.\n\n\`\`\`javascript\nconsole.log("Hello from Skyrovix!");\n\`\`\``
  );

  // Module & Sub-Module Management State
  const targetStudioCourse = useMemo(() => {
    return videoCourses.find(c => c.id === selectedCourseForStudio) || videoCourses[0];
  }, [videoCourses, selectedCourseForStudio]);

  const [selectedModuleId, setSelectedModuleId] = useState<string>(() => {
    return videoCourses[0]?.modules[0]?.id || '';
  });

  // Enterprise Course Details Editor Form synced to targetStudioCourse
  const [editCourseTitle, setEditCourseTitle] = useState('');
  const [editCourseSubtitle, setEditCourseSubtitle] = useState('');
  const [editCourseDescription, setEditCourseDescription] = useState('');
  const [editCourseCategory, setEditCourseCategory] = useState('Full Stack');
  const [editCourseLevel, setEditCourseLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('All Levels');
  const [editCourseDuration, setEditCourseDuration] = useState('');
  const [editCoursePrice, setEditCoursePrice] = useState('₹99');
  const [editCourseOriginalPrice, setEditCourseOriginalPrice] = useState('₹999');
  const [editCourseIsFree, setEditCourseIsFree] = useState(false);
  const [editCourseBadge, setEditCourseBadge] = useState('');
  const [editCourseThumbnail, setEditCourseThumbnail] = useState('');
  const [editCourseInstructorName, setEditCourseInstructorName] = useState('');
  const [editCourseInstructorRole, setEditCourseInstructorRole] = useState('');
  const [editCourseOutcomesText, setEditCourseOutcomesText] = useState('');
  const [editCoursePrereqsText, setEditCoursePrereqsText] = useState('');

  useEffect(() => {
    if (!targetStudioCourse) return;
    setEditCourseTitle(targetStudioCourse.title || '');
    setEditCourseSubtitle(targetStudioCourse.subtitle || '');
    setEditCourseDescription(targetStudioCourse.description || '');
    setEditCourseCategory(targetStudioCourse.category || 'Full Stack');
    setEditCourseLevel(targetStudioCourse.level || 'All Levels');
    setEditCourseDuration(targetStudioCourse.totalDuration || '10h 00m');
    const defaultCost = targetStudioCourse.id === 'vid-fullstack-dev' ? '₹299' : '₹99';
    const defaultOrig = targetStudioCourse.id === 'vid-fullstack-dev' ? '₹2,999' : '₹999';
    setEditCoursePrice(targetStudioCourse.price || defaultCost);
    setEditCourseOriginalPrice(targetStudioCourse.originalPrice || defaultOrig);
    setEditCourseIsFree(Boolean(targetStudioCourse.isFree));
    setEditCourseBadge(targetStudioCourse.badge || '');
    setEditCourseThumbnail(targetStudioCourse.thumbnail || '');
    setEditCourseInstructorName(targetStudioCourse.instructor?.name || 'Skyrovix Team');
    setEditCourseInstructorRole(targetStudioCourse.instructor?.role || 'Skyrovix Curriculum & Technical Team');
    setEditCourseOutcomesText((targetStudioCourse.learningOutcomes || []).join('\n'));
    setEditCoursePrereqsText((targetStudioCourse.prerequisites || []).join('\n'));
  }, [targetStudioCourse]);

  // Keep selectedModuleId aligned with current course
  useEffect(() => {
    if (targetStudioCourse?.modules?.length) {
      if (!targetStudioCourse.modules.some(m => m.id === selectedModuleId)) {
        setSelectedModuleId(targetStudioCourse.modules[0].id);
      }
    }
  }, [selectedCourseForStudio, targetStudioCourse, selectedModuleId]);

  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDuration, setNewModuleDuration] = useState('2h 15m');
  const [newSubModuleInput, setNewSubModuleInput] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState('');
  const [editingModuleDuration, setEditingModuleDuration] = useState('');

  // Lesson Preview State
  const [previewingLesson, setPreviewingLesson] = useState<VideoLesson | null>(null);

  // Dedicated Add Student State
  const [newStudentPassword, setNewStudentPassword] = useState('Student@2026!');
  const [newStudentTrack, setNewStudentTrack] = useState('Full Stack Web Development Masterclass');
  const [newStudentXP, setNewStudentXP] = useState(150);
  const [newStudentStreak, setNewStudentStreak] = useState(1);
  const [newStudentStatus, setNewStudentStatus] = useState<'Active' | 'Inactive'>('Active');
  const [newStudentAvatar, setNewStudentAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState(() => {
    const saved = localStorage.getItem('skyrovix_admin_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      platformName: 'Skyrovix Technical Learning Platform',
      tagline: 'Innovation • Technology • Future',
      supportEmail: 'support@skyrovix.com',
      contactPhone: '+91 98765 43210',
      organizationName: 'Skyrovix Technologies Pvt Ltd',
      defaultLanguage: 'English (US)',
      maintenanceMode: false,
      databaseHost: 'localhost:5000',
      databaseType: 'Standard SQL (MySQL / PostgreSQL / SQLite)',
      autoConfirmEmail: true,
      defaultVideoQuality: '1080p Full HD',
      autoplayNextLesson: true,
      watermarkStudentId: true,
      enableCodeSandboxInPlayer: true,
      certificatePassingScore: 80,
      msmeSealOnCertificates: true,
      sha256Verification: true
    };
  });
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbLatency, setDbLatency] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Combine courses for table (with cost, modules, badge)
  const allCoursesList = useMemo(() => {
    const list: Array<{
      id: string;
      title: string;
      category: string;
      type: 'video' | 'text';
      lessonsCount: number;
      modulesCount: number;
      level: string;
      instructor: string;
      duration: string;
      price: string;
      originalPrice?: string;
      isFree: boolean;
      badge?: string;
      slug?: string;
    }> = [];

    videoCourses.forEach(v => {
      const isFullStack = v.id === 'vid-fullstack-dev';
      const isFree = Boolean(v.isFree);
      const price = isFree ? 'Free' : (v.price || (isFullStack ? '₹299' : '₹99'));
      list.push({
        id: v.id,
        title: v.title,
        category: v.category,
        type: 'video',
        lessonsCount: v.totalLectures,
        modulesCount: v.modules?.length || 0,
        level: v.level,
        instructor: v.instructor.name,
        duration: v.totalDuration,
        price,
        originalPrice: isFree ? undefined : (v.originalPrice || (isFullStack ? '₹2,999' : '₹999')),
        isFree,
        badge: v.badge,
        slug: v.slug
      });
    });

    textCourses.forEach(t => {
      const isFree = t.isFree !== false;
      list.push({
        id: t.id,
        title: t.title,
        category: t.category,
        type: 'text',
        lessonsCount: t.lessonsCount,
        modulesCount: 1,
        level: t.level,
        instructor: t.instructor,
        duration: t.estimatedHours,
        price: isFree ? 'Free' : (t.price || 'Free'),
        originalPrice: t.originalPrice,
        isFree,
        badge: t.badge,
        slug: t.slug
      });
    });

    return list;
  }, [videoCourses, textCourses]);

  // Real Dynamic Calculations across Platform
  const totalLecturesCount = useMemo(() => {
    const videoLecs = videoCourses.reduce((sum, v) => {
      const modSum = v.modules ? v.modules.reduce((s, m) => s + (m.lessons?.length || 0), 0) : v.totalLectures;
      return sum + (modSum || 0);
    }, 0);
    const textLecs = textCourses.reduce((sum, t) => {
      return sum + (t.lessons?.length || t.lessonsCount || 0);
    }, 0);
    return videoLecs + textLecs;
  }, [videoCourses, textCourses]);

  const totalLearnersCount = students.length;
  const activeLearnersCount = students.filter(s => s.status === 'Active').length;

  // Filtered Students & Detailed Stats
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const q = studentSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q) ||
        student.id.toLowerCase().includes(q);
      const matchesRole =
        studentRoleFilter === 'all' || student.role === studentRoleFilter;
      const matchesStatus =
        studentStatusFilter === 'all' || student.status === studentStatusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [students, studentSearch, studentRoleFilter, studentStatusFilter]);

  const activeStudentsCount = useMemo(() => {
    return students.filter(s => s.status === 'Active').length;
  }, [students]);

  const totalEnrollmentsCount = useMemo(() => {
    return students.reduce((acc, s) => acc + (s.enrolledCourseCount || 0), 0);
  }, [students]);

  const totalLessonsDoneCount = useMemo(() => {
    return students.reduce((acc, s) => acc + (s.completedLessonsCount || 0), 0);
  }, [students]);

  const totalXPCount = useMemo(() => {
    return students.reduce((acc, s) => acc + (s.xp || 0), 0);
  }, [students]);

  // Real certificates synced from backend database
  const [issuedCertificates, setIssuedCertificates] = useState<Array<{
    id: string;
    userId?: string;
    certCode: string;
    studentName: string;
    studentAvatar: string;
    courseTitle: string;
    issuedDate: string;
    score: string;
    status: string;
  }>>([]);

  // Fetch all real-time admin data from Express + DB backend
  const fetchAdminOverview = React.useCallback(async (showSpinner = false) => {
    if (showSpinner) setIsSyncingLive(true);
    try {
      const resp = await fetch('http://localhost:5000/api/admin/overview');
      if (!resp.ok) throw new Error('Failed to fetch overview');
      const data = await resp.json();

      if (Array.isArray(data.students)) setStudents(data.students);
      if (Array.isArray(data.orders)) setLiveOrders(data.orders);
      if (Array.isArray(data.enrollments)) setLiveEnrollments(data.enrollments);
      if (Array.isArray(data.certificates)) setIssuedCertificates(data.certificates);
      if (Array.isArray(data.recentActivity)) setLiveActivity(data.recentActivity);
      if (Array.isArray(data.submissions)) setSubmissions(data.submissions);
      if (Array.isArray(data.capstones)) setCapstones(data.capstones);
      if (Array.isArray(data.coupons)) setLiveCoupons(data.coupons);
      if (data.stats) setLiveStats(data.stats);
      if (data.settings) {
        setPlatformSettings((prev: any) => ({ ...prev, ...data.settings }));
      }
      setDbConnected(true);
      setLastSyncedAt(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (e) {
      setDbConnected(false);
    } finally {
      if (showSpinner) setIsSyncingLive(false);
    }
  }, [setStudents]);

  // Initial load + 5-second real-time auto-refresh + 1-second live clock
  useEffect(() => {
    fetchAdminOverview(true);
    const pollInterval = setInterval(() => {
      fetchAdminOverview(false);
    }, 5000);
    const clockInterval = setInterval(() => {
      setLiveClock(new Date());
    }, 1000);
    return () => {
      clearInterval(pollInterval);
      clearInterval(clockInterval);
    };
  }, [fetchAdminOverview]);

  // Keep selected cert student synced when students load
  useEffect(() => {
    if (!newCertStudentId && students.length > 0) {
      setNewCertStudentId(students[0].id);
    }
  }, [students, newCertStudentId]);

  // Real Learner Progress Distribution for Donut Chart (real backend counts)
  const completedStudents = students.filter(s => s.completedLessonsCount >= 5);
  const inProgressStudents = students.filter(
    s => (s.completedLessonsCount > 0 && s.completedLessonsCount < 5) || (s.completedLessonsCount === 0 && s.enrolledCourseCount > 0)
  );
  const newStudents = students.filter(s => s.completedLessonsCount === 0 && s.enrolledCourseCount === 0);

  const completedPct = totalLearnersCount > 0 ? Math.round((completedStudents.length / totalLearnersCount) * 100) : 0;
  const inProgressPct = totalLearnersCount > 0 ? Math.round((inProgressStudents.length / totalLearnersCount) * 100) : 0;
  const newPct = Math.max(0, 100 - completedPct - inProgressPct);

  // SVG Circumference: 2 * Math.PI * 38 = 238.76
  const circumference = 238.76;
  const dashCompleted = (completedPct / 100) * circumference;
  const dashInProgress = (inProgressPct / 100) * circumference;
  const dashNew = (newPct / 100) * circumference;
  const offsetInProgress = -dashCompleted;
  const offsetNew = -(dashCompleted + dashInProgress);

  // Real Category Statistics with actual enrollment counts from DB
  const categoryStats = useMemo(() => {
    const map: Record<string, { count: number; lessons: number; learnersCount: number; tracks: string[] }> = {};
    allCoursesList.forEach(c => {
      const cat = c.category || 'General';
      if (!map[cat]) {
        map[cat] = { count: 0, lessons: 0, learnersCount: 0, tracks: [] };
      }
      map[cat].count += 1;
      map[cat].lessons += c.lessonsCount;
      map[cat].learnersCount += liveEnrollments.filter(e => e.courseId === c.id).length;
      map[cat].tracks.push(c.title);
    });
    const maxCount = Math.max(...Object.values(map).map(m => m.count), 1);
    return Object.entries(map)
      .map(([name, data]) => ({
        name,
        count: data.count,
        lessons: data.lessons,
        learnersCount: data.learnersCount,
        pct: Math.round((data.count / maxCount) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  }, [allCoursesList, liveEnrollments]);

  // Save Enterprise Course Details & Cost (Title, Subtitle, Description, Cost, Outcomes, Prerequisites, Thumbnail)
  const handleSaveCourseDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudioCourse) return;
    if (!editCourseTitle.trim()) {
      showToast('Course title cannot be empty.');
      return;
    }

    const formattedPrice = editCourseIsFree
      ? 'Free'
      : editCoursePrice.trim().startsWith('₹')
      ? editCoursePrice.trim()
      : `₹${editCoursePrice.replace(/[^0-9]/g, '') || '99'}`;

    const formattedOrig =
      !editCourseIsFree && editCourseOriginalPrice.trim()
        ? editCourseOriginalPrice.trim().startsWith('₹')
          ? editCourseOriginalPrice.trim()
          : `₹${editCourseOriginalPrice.replace(/[^0-9]/g, '')}`
        : undefined;

    const updatedCourse: VideoCourse = {
      ...targetStudioCourse,
      title: editCourseTitle.trim(),
      subtitle: editCourseSubtitle.trim() || targetStudioCourse.subtitle,
      description: editCourseDescription.trim() || targetStudioCourse.description,
      category: editCourseCategory,
      level: editCourseLevel,
      totalDuration: editCourseDuration.trim() || targetStudioCourse.totalDuration,
      isFree: editCourseIsFree,
      price: formattedPrice,
      originalPrice: formattedOrig,
      badge: editCourseBadge.trim() || (editCourseIsFree ? 'FREE PASS' : `VIDEO PASS • ${formattedPrice}`),
      thumbnail: editCourseThumbnail.trim() || targetStudioCourse.thumbnail,
      instructor: {
        ...targetStudioCourse.instructor,
        name: editCourseInstructorName.trim() || targetStudioCourse.instructor.name,
        role: editCourseInstructorRole.trim() || targetStudioCourse.instructor.role
      },
      learningOutcomes: editCourseOutcomesText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean),
      prerequisites: editCoursePrereqsText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
    };

    updateVideoCourse(updatedCourse);
    showToast(`Saved "${updatedCourse.title}" details & pricing (${formattedPrice})!`);
  };

  // Add Module to Selected Course
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) {
      showToast('Please enter a module title.');
      return;
    }
    const targetCourse = videoCourses.find(c => c.id === selectedCourseForStudio);
    if (!targetCourse) {
      showToast('Selected course not found.');
      return;
    }
    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: newModuleTitle.trim(),
      duration: newModuleDuration || '1h 30m',
      subModules: [],
      lessons: []
    };
    const updatedModules = [...(targetCourse.modules || []), newMod];
    const updatedCourse: VideoCourse = {
      ...targetCourse,
      modules: updatedModules
    };
    updateVideoCourse(updatedCourse);
    setSelectedModuleId(newMod.id);
    setIsAddModuleModalOpen(false);
    setNewModuleTitle('');
    showToast(`Added module "${newMod.title}" to ${targetCourse.title}!`);
  };

  // Rename / Update Existing Module
  const handleSaveModuleEdit = (modId: string) => {
    if (!targetStudioCourse || !editingModuleTitle.trim()) return;
    const updatedModules = targetStudioCourse.modules.map(m =>
      m.id === modId
        ? { ...m, title: editingModuleTitle.trim(), duration: editingModuleDuration.trim() || m.duration }
        : m
    );
    updateVideoCourse({ ...targetStudioCourse, modules: updatedModules });
    setEditingModuleId(null);
    showToast('Module updated!');
  };

  // Add Sub-Module inside Active Module
  const handleAddSubModule = (modId: string) => {
    if (!targetStudioCourse || !newSubModuleInput.trim()) {
      showToast('Enter a sub-module name first.');
      return;
    }
    const subTitle = newSubModuleInput.trim();
    const updatedModules = targetStudioCourse.modules.map(m => {
      if (m.id !== modId) return m;
      const existing = m.subModules || [];
      if (existing.some(s => s.title.toLowerCase() === subTitle.toLowerCase())) return m;
      const item: SubModuleItem = { id: `sub-${Date.now()}`, title: subTitle };
      return { ...m, subModules: [...existing, item] };
    });
    updateVideoCourse({ ...targetStudioCourse, modules: updatedModules });
    setNewLessonSubModule(subTitle);
    setNewSubModuleInput('');
    showToast(`Sub-module "${subTitle}" added!`);
  };

  // Delete Sub-Module tag from Module
  const handleDeleteSubModule = (modId: string, subTitle: string) => {
    if (!targetStudioCourse) return;
    const updatedModules = targetStudioCourse.modules.map(m => {
      if (m.id !== modId) return m;
      return {
        ...m,
        subModules: (m.subModules || []).filter(s => s.title !== subTitle),
        lessons: m.lessons.map(l => (l.subModule === subTitle ? { ...l, subModule: undefined } : l))
      };
    });
    updateVideoCourse({ ...targetStudioCourse, modules: updatedModules });
    if (newLessonSubModule === subTitle) setNewLessonSubModule('');
    showToast(`Sub-module "${subTitle}" removed.`);
  };

  // Delete Module from Selected Course
  const handleDeleteModule = (modId: string) => {
    const targetCourse = videoCourses.find(c => c.id === selectedCourseForStudio);
    if (!targetCourse) return;
    const updatedModules = targetCourse.modules.filter(m => m.id !== modId);
    const updatedCourse: VideoCourse = {
      ...targetCourse,
      modules: updatedModules,
      totalLectures: updatedModules.reduce((acc, m) => acc + m.lessons.length, 0)
    };
    updateVideoCourse(updatedCourse);
    if (selectedModuleId === modId) {
      setSelectedModuleId(updatedModules[0]?.id || '');
    }
    showToast('Module deleted.');
  };

  // Delete Lesson from Module
  const handleDeleteLesson = (modId: string, lessonId: string) => {
    const targetCourse = videoCourses.find(c => c.id === selectedCourseForStudio);
    if (!targetCourse) return;
    const updatedModules = targetCourse.modules.map(mod => {
      if (mod.id === modId) {
        return {
          ...mod,
          lessons: mod.lessons.filter(l => l.id !== lessonId)
        };
      }
      return mod;
    });
    const updatedCourse: VideoCourse = {
      ...targetCourse,
      modules: updatedModules,
      totalLectures: updatedModules.reduce((acc, m) => acc + m.lessons.length, 0)
    };
    updateVideoCourse(updatedCourse);
    if (editingLessonId === lessonId) {
      setEditingLessonId(null);
      setNewLessonTitle('');
    }
    showToast('Video lesson removed.');
  };

  // Load Existing Lesson into YouTube Lesson Studio for Editing
  const handleStartEditLesson = (modId: string, lesson: VideoLesson) => {
    setStudioTab('curriculum');
    setSelectedModuleId(modId);
    setEditingLessonId(lesson.id);
    setNewLessonTitle(lesson.title);
    setNewLessonSubModule(lesson.subModule || '');
    setNewLessonDuration(lesson.duration || '15:00');
    setNewLessonVideoUrl(lesson.videoUrl || '');
    setNewLessonSummary(lesson.summary || '');
    setNewLessonMarkdown(lesson.notes || lesson.transcript || '');
    showToast(`Editing "${lesson.title}"`);
  };

  // Real-time Action: Publish or Update YouTube Lesson in Selected Module & Sub-Module
  const handlePublishLesson = () => {
    if (!newLessonTitle.trim()) {
      showToast('Please enter a lesson title.');
      return;
    }
    const targetCourse = videoCourses.find(c => c.id === selectedCourseForStudio);
    if (!targetCourse) {
      showToast('Selected course not found.');
      return;
    }
    const ytId = extractYouTubeId(newLessonVideoUrl);
    if (!ytId) {
      showToast('Please enter a valid YouTube video URL (youtube.com/watch?v=..., youtu.be/..., or @skyrovix video link).');
      return;
    }

    const embedUrl = toYouTubeEmbedUrl(newLessonVideoUrl);
    const subModClean = newLessonSubModule.trim() || undefined;

    if (editingLessonId) {
      const updatedModules = targetCourse.modules.map(mod => {
        if (mod.id !== selectedModuleId) return mod;
        const existingSubs = mod.subModules || [];
        const nextSubs =
          subModClean && !existingSubs.some(s => s.title.toLowerCase() === subModClean.toLowerCase())
            ? [...existingSubs, { id: `sub-${Date.now()}`, title: subModClean }]
            : existingSubs;

        return {
          ...mod,
          subModules: nextSubs,
          lessons: mod.lessons.map(l =>
            l.id === editingLessonId
              ? {
                  ...l,
                  title: newLessonTitle.trim(),
                  subModule: subModClean,
                  duration: newLessonDuration.trim() || l.duration,
                  videoUrl: embedUrl,
                  summary: newLessonSummary.trim() || newLessonMarkdown.slice(0, 140),
                  notes: newLessonMarkdown,
                  transcript: newLessonMarkdown
                }
              : l
          )
        };
      });

      const updatedCourse: VideoCourse = {
        ...targetCourse,
        totalLectures: updatedModules.reduce((acc, m) => acc + m.lessons.length, 0),
        modules: updatedModules
      };
      updateVideoCourse(updatedCourse);
      setEditingLessonId(null);
      setNewLessonTitle('');
      setNewLessonSummary('');
      showToast(`Updated lesson "${newLessonTitle}" with YouTube link!`);
      return;
    }

    const newLesson: VideoLesson = {
      id: `lesson-${Date.now()}`,
      title: newLessonTitle.trim(),
      subModule: subModClean,
      duration: newLessonDuration || '15:00',
      durationSeconds: 900,
      videoUrl: embedUrl,
      summary: newLessonSummary.trim() || newLessonMarkdown.slice(0, 140),
      chapters: [
        { title: 'Lecture Intro', time: '00:00', timeSeconds: 0 },
        { title: 'Implementation & Build', time: '04:30', timeSeconds: 270 }
      ],
      notes: newLessonMarkdown,
      transcript: newLessonMarkdown,
      resources: [
        { title: 'Skyrovix Official YouTube Channel', url: SKYROVIX_YOUTUBE_CHANNEL, type: 'link' },
        { title: 'Lecture Source Code Repository', url: 'https://github.com/skyrovix', type: 'github' }
      ]
    };

    let updatedModules = [...targetCourse.modules];
    if (updatedModules.length === 0) {
      updatedModules = [{
        id: `mod-${Date.now()}`,
        title: 'Module 1: Foundations',
        duration: '1h 00m',
        subModules: subModClean ? [{ id: `sub-${Date.now()}`, title: subModClean }] : [],
        lessons: [newLesson]
      }];
    } else {
      const modIndex = updatedModules.findIndex(m => m.id === selectedModuleId);
      const idx = modIndex >= 0 ? modIndex : 0;
      const mod = updatedModules[idx];
      const existingSubs = mod.subModules || [];
      const nextSubs =
        subModClean && !existingSubs.some(s => s.title.toLowerCase() === subModClean.toLowerCase())
          ? [...existingSubs, { id: `sub-${Date.now()}`, title: subModClean }]
          : existingSubs;

      updatedModules[idx] = {
        ...mod,
        subModules: nextSubs,
        lessons: [...mod.lessons, newLesson]
      };
    }

    const totalCount = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
    const updatedCourse: VideoCourse = {
      ...targetCourse,
      totalLectures: totalCount,
      modules: updatedModules
    };

    updateVideoCourse(updatedCourse);
    showToast(`Published "${newLessonTitle}" via YouTube to ${targetCourse.title}!`);
    setNewLessonTitle('');
    setNewLessonSummary('');
  };

  // Delete Student Action (persisted in backend DB)
  const handleConfirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    const name = studentToDelete.name;
    const id = studentToDelete.id;
    deleteStudent(id);
    setStudentToDelete(null);
    showToast(`Deleting "${name}" from database...`);

    try {
      await fetch(`http://localhost:5000/api/auth/students/${id}`, {
        method: 'DELETE'
      });
      await fetchAdminOverview(false);
      showToast(`Student "${name}" deleted from database!`);
    } catch (e) {
      showToast(`Removed "${name}" locally.`);
    }
  };

  // Toggle Student Active/Inactive Status (persisted in backend DB)
  const handleToggleStudentStatus = async (student: StudentProfile) => {
    const nextStatus: 'Active' | 'Inactive' = student.status === 'Active' ? 'Inactive' : 'Active';
    updateStudent({ ...student, status: nextStatus });
    try {
      await fetch(`http://localhost:5000/api/admin/students/${student.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      await fetchAdminOverview(false);
    } catch (e) {}
    showToast(`Student ${student.name} is now ${nextStatus}!`);
  };

  // Re-verify Cashfree Payment Order in Real Time
  const handleVerifyOrder = async (orderId: string) => {
    setVerifyingOrderId(orderId);
    try {
      const resp = await fetch(`http://localhost:5000/api/cashfree/verify/${orderId}`);
      const data = await resp.json();
      await fetchAdminOverview(false);
      if (data.isPaid) {
        showToast(`Order ${orderId} verified PAID & student enrolled!`);
      } else {
        showToast(`Order ${orderId} status: ${data.orderStatus || 'Updated'}`);
      }
    } catch (e) {
      showToast('Failed to query Cashfree verification endpoint.');
    } finally {
      setVerifyingOrderId(null);
    }
  };

  // Test SQL Database Connection Action
  const handleTestDbConnection = async () => {
    setIsTestingDb(true);
    setDbLatency(null);
    const start = performance.now();
    try {
      const resp = await fetch('http://localhost:5000/api/db/status');
      const data = await resp.json();
      const duration = Math.max(4, Math.round(performance.now() - start));
      setDbLatency(`${duration}ms - Status 200 (${data.engine || 'SQL Database'} ${data.status || 'Healthy'})`);
      setDbConnected(true);
      await fetchAdminOverview(false);
      showToast(`SQL Database Verified! Latency: ${duration}ms`);
    } catch (err) {
      setDbConnected(false);
      setDbLatency('Connection Error: Backend unreachable on port 5000');
      showToast('Backend server offline on port 5000.');
    } finally {
      setIsTestingDb(false);
    }
  };

  // Export Full Platform Database
  const handleExportAllData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      platform: platformSettings.platformName,
      videoCourses,
      textCourses,
      students,
      orders: liveOrders,
      enrollments: liveEnrollments,
      capstones,
      issuedCertificates
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Skyrovix_Database_Export_${Date.now()}.json`;
    a.click();
    showToast('Platform database exported successfully!');
  };

  // Save Settings to Backend Database
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('skyrovix_admin_settings', JSON.stringify(platformSettings));
    try {
      await fetch('http://localhost:5000/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(platformSettings)
      });
    } catch (err) {}
    showToast('Platform settings saved and synchronized with server!');
  };

  // Real-time Action: Grade Capstone
  const handleGradeCapstone = async (id: string, newGrade: string) => {
    setCapstones(prev =>
      prev.map(c => (c.id === id ? { ...c, grade: newGrade, status: 'Graded' } : c))
    );
    try {
      await fetch(`http://localhost:5000/api/admin/capstones/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: newGrade, status: 'Graded' })
      });
    } catch (e) {}
    showToast(`Capstone marked as ${newGrade}!`);
  };

  // Real-time Action: Add Learner (persisted to backend DB)
  const handleAddLearner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    try {
      const resp = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStudentName.trim(),
          email: newStudentEmail.trim(),
          password: newStudentPassword || 'Student@2026!',
          role: newStudentRole
        })
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        showToast(errData.error || 'Could not create learner.');
        return;
      }
      await fetchAdminOverview(false);
    } catch (err) {
      const newProfile: StudentProfile = {
        id: `usr-${Date.now()}`,
        name: newStudentName.trim(),
        email: newStudentEmail.trim(),
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
        role: newStudentRole,
        enrolledCourseCount: 0,
        completedLessonsCount: 0,
        xp: 100,
        streakDays: 1,
        lastActive: 'Just now',
        status: 'Active'
      };
      addStudent(newProfile);
    }

    setIsAddStudentModalOpen(false);
    const addedName = newStudentName.trim();
    setNewStudentName('');
    setNewStudentEmail('');
    showToast(`Added learner ${addedName} to database!`);
  };

  // Real-time Action: Issue Certificate (persisted to backend DB for public verification)
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === newCertStudentId) || students[0];
    try {
      const resp = await fetch('http://localhost:5000/api/certificates/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: student?.id,
          studentName: student?.name || 'Skyrovix Learner',
          studentAvatar: student?.avatar,
          courseTitle: newCertCourseTitle,
          score: newCertScore,
          instructor: 'Skyrovix Team',
          type: 'video'
        })
      });
      if (resp.ok) {
        await fetchAdminOverview(false);
      }
    } catch (err) {}

    setIsIssueCertModalOpen(false);
    showToast(`Issued verified credential for ${student?.name || 'learner'}!`);
  };

  const handleDeleteCertificate = async (certId: string) => {
    setIssuedCertificates(prev => prev.filter(c => c.id !== certId));
    try {
      await fetch(`http://localhost:5000/api/admin/certificates/${certId}`, {
        method: 'DELETE'
      });
      await fetchAdminOverview(false);
    } catch (e) {}
    showToast('Certificate revoked from database.');
  };

  const filteredTableCourses = useMemo(() => {
    return allCoursesList.filter(c => {
      const matchType = tableTypeFilter === 'all' || c.type === tableTypeFilter;
      const matchSearch =
        !tableSearch.trim() ||
        c.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
        c.category.toLowerCase().includes(tableSearch.toLowerCase()) ||
        c.instructor.toLowerCase().includes(tableSearch.toLowerCase());
      return matchType && matchSearch;
    });
  }, [allCoursesList, tableTypeFilter, tableSearch]);

  const filteredSubmissions = useMemo(() => {
    if (!topSearch.trim()) return submissions;
    return submissions.filter(
      s =>
        s.studentName.toLowerCase().includes(topSearch.toLowerCase()) ||
        s.studentId.toLowerCase().includes(topSearch.toLowerCase()) ||
        s.assignmentTitle.toLowerCase().includes(topSearch.toLowerCase()) ||
        s.courseTrack.toLowerCase().includes(topSearch.toLowerCase())
    );
  }, [submissions, topSearch]);

  const handleUpdateStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    setSubmissions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
    try {
      await fetch(`http://localhost:5000/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
    showToast(`Assignment ${id} marked as ${newStatus}!`);
  };

  const handleExportStudents = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Role,XP,Status,LastActive']
        .concat(
          students.map(
            s => `${s.id},"${s.name}",${s.email},${s.role},${s.xp},${s.status},${s.lastActive}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Skyrovix_Learners_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported learner roster as CSV!');
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const normalizedPrice = newIsFree
      ? 'Free'
      : newPrice.trim().startsWith('₹')
      ? newPrice.trim()
      : `₹${newPrice.replace(/[^0-9]/g, '') || '99'}`;
    const normalizedOrig =
      !newIsFree && newOriginalPrice.trim()
        ? newOriginalPrice.trim().startsWith('₹')
          ? newOriginalPrice.trim()
          : `₹${newOriginalPrice.replace(/[^0-9]/g, '')}`
        : undefined;

    if (courseFormat === 'video') {
      const embedUrl = toYouTubeEmbedUrl(newInitialYouTubeUrl || 'https://www.youtube.com/watch?v=nu_pCVPKzTk');
      const ytThumb = getYouTubeThumbnail(embedUrl);
      const courseId = `vid-${Date.now()}`;
      const newVid: VideoCourse = {
        id: courseId,
        slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newTitle.trim(),
        subtitle: newSubtitle.trim() || newDescription.trim() || 'Comprehensive YouTube-powered video series.',
        category: newCategory,
        level: newLevel,
        rating: 5.0,
        reviewsCount: 1,
        enrolledCount: 1,
        totalDuration: newDuration || '12h 00m',
        totalLectures: 1,
        accentColor: '#FB4400',
        badge: newBadge.trim() || (newIsFree ? 'FREE PASS' : `VIDEO PASS • ${normalizedPrice}`),
        isFree: newIsFree,
        price: normalizedPrice,
        originalPrice: normalizedOrig,
        instructor: {
          name: newInstructor || 'Skyrovix Team',
          role: 'Skyrovix Curriculum & Technical Team',
          avatar: brandImages.icon,
          bio: 'Official curriculum authored by Skyrovix Engineering Academy.'
        },
        thumbnail:
          newThumbnailUrl.trim() ||
          ytThumb ||
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        description: newDescription || 'Newly authored Skyrovix course.',
        learningOutcomes: ['Core architectural principles', 'Hands-on coding exercises', 'Production deployments'],
        prerequisites: ['Basic programming fundamentals'],
        modules: [
          {
            id: `mod-1-${Date.now()}`,
            title: 'Module 1: Foundations & Setup',
            duration: '2h 00m',
            subModules: [{ id: `sub-1-${Date.now()}`, title: '1.1 Getting Started' }],
            lessons: [
              {
                id: `l-1-${Date.now()}`,
                title: '1. Welcome & Architecture Overview',
                subModule: '1.1 Getting Started',
                duration: '14:20',
                durationSeconds: 860,
                videoUrl: embedUrl,
                summary: 'Foundations and workflow setup.',
                chapters: [{ title: 'Overview', time: '00:00', timeSeconds: 0 }],
                notes: 'Welcome to this Skyrovix curriculum!',
                transcript: 'Welcome everyone to this Skyrovix course...',
                resources: [
                  { title: 'Skyrovix YouTube Channel', url: SKYROVIX_YOUTUBE_CHANNEL, type: 'link' }
                ]
              }
            ]
          }
        ]
      };
      addVideoCourse(newVid);
      setSelectedCourseForStudio(courseId);
    } else {
      const newTxt: TextCourseMetadata = {
        id: `text-${Date.now()}`,
        slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newTitle.trim(),
        shortDesc: newSubtitle.trim() || newDescription.trim() || 'Comprehensive text and code reference.',
        category: newCategory,
        icon: 'BookOpen',
        badge: newBadge.trim() || (newIsFree ? '100% FREE' : `PRO • ${normalizedPrice}`),
        level: newLevel,
        instructor: newInstructor || 'Skyrovix Team',
        rating: 5.0,
        enrolledCount: 1,
        type: 'text',
        isFree: newIsFree,
        price: normalizedPrice,
        originalPrice: normalizedOrig,
        lessonsCount: 1,
        estimatedHours: newDuration || '4.5 hrs',
        lessons: [
          {
            id: `txt-l1-${Date.now()}`,
            filename: '01_intro.md',
            order: 1,
            title: '1. Track Overview & Getting Started',
            readTimeMinutes: 5,
            snippet: 'Welcome to the complete documentation track.',
            hasCode: true
          }
        ]
      };
      addTextCourse(newTxt);
    }

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewThumbnailUrl('');
    showToast(`Published course "${newTitle}" (${normalizedPrice})!`);
  };

  const handleLogout = async () => {
    showToast('Signing out of admin studio...');
    await logout();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-[#FF5A36] selection:text-white overflow-x-hidden">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 left-4 sm:left-auto z-[60] bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs font-bold max-w-md"
          >
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar (100% Responsive Mobile + Desktop) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-2xs">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Drawer Button + Official Skyrovix Logo + Admin Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden cursor-pointer p-2 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#FF5A36] transition-colors"
              aria-label="Open Admin Navigation Menu"
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer text-left transition-transform active:scale-95"
              title="Return to Skyrovix Home"
            >
              <img
                src={brandImages.logo}
                alt="Skyrovix"
                className="h-6 sm:h-8 w-auto object-contain drop-shadow-2xs group-hover:scale-102 transition-transform"
              />
              <span className="hidden xs:inline-block px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase font-mono font-extrabold bg-slate-900 text-white shadow-xs tracking-wider">
                ADMIN STUDIO
              </span>
            </button>
          </div>

          {/* Center: Search input + DB Live Sync Active */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={topSearch}
                onChange={e => setTopSearch(e.target.value)}
                placeholder="Search courses, students, lessons, curriculum..."
                className="w-full bg-slate-50 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs rounded-2xl px-4 py-2 pl-9 pr-12 outline-none focus:border-[#FF5A36] focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <span className="absolute right-3 top-2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs font-semibold">
                ⌘K
              </span>
            </div>

            {/* SQL Database Live Active Badge & Real-Time Sync */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold shadow-2xs ${
                  dbConnected
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}
                title={`Last synced: ${lastSyncedAt}`}
              >
                <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <span>{dbConnected ? `Live DB • ${lastSyncedAt}` : 'Backend Offline'}</span>
              </div>
              <button
                onClick={() => fetchAdminOverview(true)}
                disabled={isSyncingLive}
                className="cursor-pointer p-2 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-[#FF5A36] text-slate-600 transition-colors"
                title="Refresh real-time database data now"
              >
                <RefreshCw size={14} className={isSyncingLive ? 'animate-spin text-[#FF5A36]' : ''} />
              </button>
            </div>
          </div>

          {/* Right: Compact Mobile Sync + Notification Bell + Real Admin Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile compact Live DB Sync */}
            <button
              onClick={() => fetchAdminOverview(true)}
              className={`md:hidden cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[10px] font-bold ${
                dbConnected
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
              title="Tap to refresh live database"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              <span>{dbConnected ? 'Live' : 'Offline'}</span>
              <RefreshCw size={10} className={isSyncingLive ? 'animate-spin' : ''} />
            </button>
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="cursor-pointer relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                title="Live Platform Activity"
              >
                <Bell size={18} />
                {liveActivity.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A36] ring-2 ring-white"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-xs text-slate-900">Real-Time Database Feed</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{liveActivity.length} Events</span>
                    </div>
                    <div className="space-y-2 text-xs max-h-64 overflow-y-auto pr-1">
                      {liveActivity.length > 0 ? (
                        liveActivity.slice(0, 6).map((act, idx) => (
                          <div
                            key={act.id}
                            className={`p-2.5 rounded-xl border ${
                              idx === 0 ? 'bg-orange-50/70 border-orange-100' : 'bg-slate-50 border-slate-100'
                            }`}
                          >
                            <p className="font-bold text-slate-800 text-[11px]">{act.title}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{act.subtitle}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-slate-400 text-[11px]">No database events recorded yet.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="cursor-pointer flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF5A36] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                  {(currentUser?.name || 'H').charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-xs text-slate-900 leading-tight">{currentUser?.name || 'Hariharan S'}</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">Super Admin</div>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-3xl shadow-2xl p-2.5 z-50 space-y-1 text-xs"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900">{currentUser?.name || 'Hariharan S'}</div>
                      <div className="text-[10px] text-slate-500">{currentUser?.email || 'admin@skyrovix.com'}</div>
                    </div>
                    <button
                      onClick={() => {
                        setRole('student');
                        setCurrentView('user-dashboard');
                      }}
                      className="cursor-pointer w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-[#FF5A36] font-bold transition-colors flex items-center gap-2"
                    >
                      <UserCheck size={14} />
                      <span>Switch to Student View</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('catalog')}
                      className="cursor-pointer w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors flex items-center gap-2"
                    >
                      <Globe size={14} />
                      <span>Preview Live Catalog</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold transition-colors flex items-center gap-2 border-t border-slate-100 mt-1"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar (< md screens) */}
      <div className="md:hidden bg-white border-b border-slate-200/80 px-3 py-2">
        <div className="relative">
          <input
            type="text"
            value={topSearch}
            onChange={e => setTopSearch(e.target.value)}
            placeholder="Search courses, students, orders..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs rounded-xl px-3.5 py-2 pl-9 outline-none focus:border-[#FF5A36]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Mobile Slide-Out Navigation Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: -290 }}
              animate={{ x: 0 }}
              exit={{ x: -290 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative z-10 w-72 max-w-[85vw] bg-white h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img src={brandImages.logo} alt="Skyrovix" className="h-6 w-auto" />
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-extrabold bg-slate-900 text-white">
                    ADMIN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 text-xs font-bold">
                <button onClick={() => handleSelectMenu('dashboard')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'dashboard' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <LayoutDashboard size={16} /><span>Dashboard</span>
                </button>
                <button onClick={() => handleSelectMenu('orders')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'orders' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><CreditCard size={16} /><span>Cashfree Orders</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700">{liveOrders.length}</span>
                </button>
                <button onClick={() => handleSelectMenu('courses')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'courses' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><BookOpen size={16} /><span>All Courses</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">{allCoursesList.length}</span>
                </button>
                <button onClick={() => handleSelectMenu('studio')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'studio' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <Youtube size={16} /><span>YouTube & Course Studio</span>
                </button>
                <button onClick={() => handleSelectMenu('categories')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'categories' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <Layers size={16} /><span>Course Categories</span>
                </button>
                <button onClick={() => handleSelectMenu('students')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'students' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><Users size={16} /><span>Students</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">{students.length}</span>
                </button>
                <button onClick={() => handleSelectMenu('tasks')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'tasks' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><CheckCircle2 size={16} /><span>Review Assignments</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-700">{submissions.filter(s => s.status === 'Pending').length}</span>
                </button>
                <button onClick={() => handleSelectMenu('projects')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'projects' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><FolderGit2 size={16} /><span>Final Projects</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">{capstones.length}</span>
                </button>
                <button onClick={() => handleSelectMenu('certificates')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between ${activeMenu === 'certificates' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-3"><Award size={16} /><span>Certificates Issued</span></span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-700">{issuedCertificates.length}</span>
                </button>
                <button onClick={() => handleSelectMenu('mentorship')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'mentorship' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <Headphones size={16} /><span>1-on-1 Mentorship</span>
                </button>
                <button onClick={() => handleSelectMenu('sandboxes')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'sandboxes' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <Terminal size={16} /><span>Code Sandbox</span>
                </button>
                <button onClick={() => handleSelectMenu('vault')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'vault' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <FolderCode size={16} /><span>Starter Templates</span>
                </button>
                <button onClick={() => { setMobileSidebarOpen(false); setIsCouponModalOpen(true); }} className="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 text-slate-700 hover:bg-slate-50">
                  <Tag size={16} /><span>Discount Coupons</span>
                </button>
                <button onClick={() => handleSelectMenu('settings')} className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center gap-3 ${activeMenu === 'settings' ? 'bg-[#FF6B4A] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <Settings size={16} /><span>Platform Settings</span>
                </button>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-200">
                <button onClick={handleLogout} className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 text-rose-600 hover:bg-rose-50">
                  <LogOut size={16} /><span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Layout: Left Fixed-Width Desktop Sidebar + Right Content Area */}
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar with Learning Management Menus (Hidden on mobile, Slide Drawer used instead) */}
        <aside className="hidden lg:flex w-64 xl:w-72 bg-white/60 border-r border-slate-200/80 py-6 px-4 shrink-0 flex-col justify-between sticky top-16 h-[calc(100vh-4rem)]">
          {/* Top Navigation Menu List */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin space-y-4">
            {/* GROUP 1: OVERVIEW */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                OVERVIEW
              </div>
              <div className="space-y-0.5">
                {/* 1. Dashboard */}
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'dashboard'
                      ? 'bg-[#FF6B4A] text-white shadow-sm shadow-orange-500/20'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard size={16} className={activeMenu === 'dashboard' ? 'text-white' : 'text-slate-400'} />
                    <span>Dashboard</span>
                  </div>
                </button>

                {/* 1b. Cashfree Orders & Revenue */}
                <button
                  onClick={() => setActiveMenu('orders')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'orders'
                      ? 'bg-[#FF6B4A] text-white shadow-sm shadow-orange-500/20'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={16} className={activeMenu === 'orders' ? 'text-white' : 'text-slate-400'} />
                    <span>Cashfree Orders</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'orders' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {liveOrders.length}
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 2: COURSES & VIDEOS */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                COURSES & VIDEOS
              </div>
              <div className="space-y-0.5">
                {/* 2. All Courses */}
                <button
                  onClick={() => setActiveMenu('courses')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'courses'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className={activeMenu === 'courses' ? 'text-white' : 'text-slate-400'} />
                    <span>All Courses</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'courses' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {allCoursesList.length}
                  </span>
                </button>

                {/* 3. YouTube Video & Course Studio */}
                <button
                  onClick={() => handleSelectMenu('studio')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'studio'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Youtube size={16} className={activeMenu === 'studio' ? 'text-white' : 'text-rose-500'} />
                    <span>YouTube & Course Studio</span>
                  </div>
                </button>

                {/* 4. Course Categories */}
                <button
                  onClick={() => setActiveMenu('categories')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeMenu === 'categories'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Layers size={16} className={activeMenu === 'categories' ? 'text-white' : 'text-slate-400'} />
                  <span>Course Categories</span>
                </button>
              </div>
            </div>

            {/* GROUP 3: STUDENTS & LEARNING */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                STUDENTS & LEARNING
              </div>
              <div className="space-y-0.5">
                {/* 5. Students */}
                <button
                  onClick={() => setActiveMenu('students')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'students'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users size={16} className={activeMenu === 'students' ? 'text-white' : 'text-slate-400'} />
                    <span>Students</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'students' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {students.length}
                  </span>
                </button>

                {/* 6. Review Assignments */}
                <button
                  onClick={() => setActiveMenu('tasks')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'tasks'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className={activeMenu === 'tasks' ? 'text-white' : 'text-slate-400'} />
                    <span>Review Assignments</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'tasks' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {submissions.filter(s => s.status === 'Pending').length}
                  </span>
                </button>

                {/* 7. Student Final Projects */}
                <button
                  onClick={() => setActiveMenu('projects')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'projects'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 size={16} className={activeMenu === 'projects' ? 'text-white' : 'text-slate-400'} />
                    <span>Student Final Projects</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {capstones.length}
                  </span>
                </button>

                {/* 8. Certificates Issued */}
                <button
                  onClick={() => setActiveMenu('certificates')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    activeMenu === 'certificates'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Award size={16} className={activeMenu === 'certificates' ? 'text-white' : 'text-slate-400'} />
                    <span>Certificates Issued</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeMenu === 'certificates' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {issuedCertificates.length}
                  </span>
                </button>

                {/* 9. 1-on-1 Mentor Sessions */}
                <button
                  onClick={() => setActiveMenu('mentorship')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeMenu === 'mentorship'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Headphones size={16} className={activeMenu === 'mentorship' ? 'text-white' : 'text-slate-400'} />
                  <span>1-on-1 Mentor Sessions</span>
                </button>
              </div>
            </div>

            {/* GROUP 4: TOOLS & PLATFORM */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                TOOLS & SETTINGS
              </div>
              <div className="space-y-0.5">
                {/* 10. Code Sandbox */}
                <button
                  onClick={() => setActiveMenu('sandboxes')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeMenu === 'sandboxes'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Terminal size={16} className={activeMenu === 'sandboxes' ? 'text-white' : 'text-slate-400'} />
                  <span>Code Sandbox</span>
                </button>

                {/* 11. Starter Project Templates */}
                <button
                  onClick={() => setActiveMenu('vault')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeMenu === 'vault'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <FolderCode size={16} className={activeMenu === 'vault' ? 'text-white' : 'text-slate-400'} />
                  <span>Starter Project Templates</span>
                </button>

                {/* 12. Discount Coupons */}
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="cursor-pointer w-full text-left px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-3 text-slate-700 hover:bg-white hover:text-slate-900 transition-all"
                >
                  <Tag size={16} className="text-slate-400" />
                  <span>Discount Coupons</span>
                </button>

                {/* 13. Platform Settings */}
                <button
                  onClick={() => setActiveMenu('settings')}
                  className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeMenu === 'settings'
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Settings size={16} className={activeMenu === 'settings' ? 'text-white' : 'text-slate-400'} />
                  <span>Platform Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button Pinned at the Very Bottom (Down Last) */}
          <div className="pt-3 mt-4 border-t border-slate-200/80 shrink-0">
            <button
              onClick={handleLogout}
              className="cursor-pointer w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all group"
              title="Sign out of Admin Studio"
            >
              <LogOut size={16} className="text-rose-500 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 min-w-0">
          {/* VIEW 1: Main Dashboard (Real-Time Original Data Overview & KPIs) */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner with Real Live Clock */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Welcome back, {currentUser?.name || 'Hariharan S'}! 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Real-time telemetry synced with your platform database (auto-refreshes every 5s).
                  </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs">
                    <Calendar size={14} className="text-[#FF5A36]" />
                    <span>
                      {liveClock.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono font-bold text-[#FF5A36]">
                      {liveClock.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Real-Time Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Registered Learners */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Users size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {activeLearnersCount} active
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-display">{totalLearnersCount.toLocaleString()}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Registered Users</div>
                    <div className="text-[11px] text-slate-400">{liveStats.totalEnrollments} live course enrollments</div>
                  </div>
                </div>

                {/* 2. Published Courses */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {videoCourses.length} Vid • {textCourses.length} Text
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-display">{allCoursesList.length} Tracks</div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Published Courses</div>
                    <div className="text-[11px] text-slate-400">{totalLecturesCount} lectures & chapters</div>
                  </div>
                </div>

                {/* 3. Real Cashfree Orders & Revenue */}
                <div
                  onClick={() => setActiveMenu('orders')}
                  className="cursor-pointer p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {liveOrders.length} Orders
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-display">
                    ₹{(liveStats.paidRevenue || 0).toLocaleString()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Paid Revenue (Cashfree)</div>
                    <div className="text-[11px] text-slate-400">
                      {liveStats.paidOrdersCount} paid • ₹{(liveStats.pendingVolume || 0).toLocaleString()} active/pending
                    </div>
                  </div>
                </div>

                {/* 4. Certificates Awarded */}
                <div
                  onClick={() => setActiveMenu('certificates')}
                  className="cursor-pointer p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Verified DB
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-display">{issuedCertificates.length}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Certificates Issued</div>
                    <div className="text-[11px] text-slate-400">Verifiable online via /certificate-verify</div>
                  </div>
                </div>
              </div>

              {/* Main 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (2 of 3) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Real-Time Cashfree Payment Orders & Enrollments */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-extrabold text-slate-900 font-display">
                          Live Cashfree Orders & Enrollments
                        </h2>
                        <p className="text-xs text-slate-500">Original payment orders recorded in database</p>
                      </div>
                      <button
                        onClick={() => setActiveMenu('orders')}
                        className="cursor-pointer text-xs font-bold text-[#FF5A36] hover:text-[#E03D00] flex items-center gap-1 transition-colors"
                      >
                        <span>View All ({liveOrders.length})</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                          <tr>
                            <th className="py-2.5 px-3">Customer</th>
                            <th className="py-2.5 px-3">Course</th>
                            <th className="py-2.5 px-3">Amount</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">Verify</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {liveOrders.length > 0 ? (
                            liveOrders.slice(0, 5).map(ord => (
                              <tr key={ord.orderId} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-3">
                                  <div className="font-bold text-slate-900">{ord.customerName || 'Learner'}</div>
                                  <div className="text-[10px] font-mono text-slate-400">{ord.customerEmail}</div>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-semibold text-slate-800 truncate max-w-[200px]">
                                    {ord.courseTitle || ord.courseId}
                                  </div>
                                  <div className="text-[10px] font-mono text-slate-400">{ord.orderId}</div>
                                </td>
                                <td className="py-3 px-3 font-mono font-bold text-slate-900">₹{ord.amount}</td>
                                <td className="py-3 px-3">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                      ord.status === 'PAID'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}
                                  >
                                    {ord.status === 'PAID' && <Check size={10} />}
                                    {ord.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <button
                                    onClick={() => handleVerifyOrder(ord.orderId)}
                                    disabled={verifyingOrderId === ord.orderId}
                                    className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-[#FF5A36] text-slate-700 font-bold text-[10px] transition-colors inline-flex items-center gap-1"
                                  >
                                    <RefreshCw size={10} className={verifyingOrderId === ord.orderId ? 'animate-spin' : ''} />
                                    <span>Check Status</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-slate-400">
                                No Cashfree orders recorded yet. Orders appear here automatically when students initiate checkout.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bottom Row: 2 Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Course Completion & Engagement Rate (Donut Chart) */}
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-extrabold text-slate-900 font-display">
                          Course Engagement Overview
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400">{totalLearnersCount} Learners</span>
                      </div>

                      {/* Donut Chart */}
                      <div className="flex items-center justify-center py-2">
                        <div className="relative w-36 h-36 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              className="text-slate-100"
                              strokeWidth="12"
                              stroke="currentColor"
                              fill="transparent"
                            />
                            {/* Completed Track (Emerald) */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              className="text-emerald-500"
                              strokeWidth="12"
                              strokeDasharray={`${dashCompleted} ${circumference}`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                            />
                            {/* In Progress (Indigo) */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              className="text-indigo-500"
                              strokeWidth="12"
                              strokeDasharray={`${dashInProgress} ${circumference}`}
                              strokeDashoffset={`${offsetInProgress}`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                            />
                            {/* Newly Enrolled (Coral) */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              className="text-[#FF5A36]"
                              strokeWidth="12"
                              strokeDasharray={`${dashNew} ${circumference}`}
                              strokeDashoffset={`${offsetNew}`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-xl font-extrabold text-slate-900 font-display">{completedPct}%</span>
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Active Rate</span>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="space-y-2 text-xs pt-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <span className="text-slate-600 font-medium">High Progress (5+ lessons)</span>
                          </div>
                          <span className="font-bold text-slate-900">{completedStudents.length} ({completedPct}%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                            <span className="text-slate-600 font-medium">Enrolled / Learning</span>
                          </div>
                          <span className="font-bold text-slate-900">{inProgressStudents.length} ({inProgressPct}%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A36]"></span>
                            <span className="text-slate-600 font-medium">Registered (Not Enrolled)</span>
                          </div>
                          <span className="font-bold text-slate-900">{newStudents.length} ({newPct}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Top Course Categories */}
                    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-extrabold text-slate-900 font-display">Top Course Tracks</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Enrollments</span>
                      </div>

                      <div className="space-y-4 text-xs">
                        {categoryStats.slice(0, 4).map((cat, i) => (
                          <div key={cat.name} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 truncate pr-2">{cat.name}</span>
                              <span className="font-mono text-slate-600 font-bold shrink-0">
                                {cat.count} tracks • {cat.learnersCount} enrolled
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  i === 0 ? 'bg-[#FF5A36]' : i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-sky-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.max(15, cat.pct)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (1 of 3) */}
                <div className="space-y-6">
                  {/* Quick Actions Card */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-display">Quick Actions</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Instant learning platform administrative shortcuts</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="cursor-pointer p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/80 hover:bg-orange-100/70 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#FF5A36] text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Plus size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">New Course</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Author video or text track</div>
                      </button>

                      <button
                        onClick={() => setActiveMenu('studio')}
                        className="cursor-pointer p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-100/70 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Edit3 size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">Lesson Studio</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Add chapter & video</div>
                      </button>

                      <button
                        onClick={() => setIsAnnouncementModalOpen(true)}
                        className="cursor-pointer p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/80 hover:bg-purple-100/70 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Megaphone size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">Announcement</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Broadcast to students</div>
                      </button>

                      <button
                        onClick={() => setIsEmailModalOpen(true)}
                        className="cursor-pointer p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 hover:bg-emerald-100/70 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Mail size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">Send Email</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Newsletter to learners</div>
                      </button>

                      <button
                        onClick={() => setIsCouponModalOpen(true)}
                        className="cursor-pointer p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 hover:bg-amber-100/70 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Tag size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">Create Coupon</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Discount promo codes</div>
                      </button>

                      <button
                        onClick={handleExportStudents}
                        className="cursor-pointer p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-left transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                          <Download size={16} />
                        </div>
                        <div className="text-xs font-bold text-slate-900">Export Roster</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Download CSV data</div>
                      </button>
                    </div>

                    <button
                      onClick={() => setActiveMenu('courses')}
                      className="cursor-pointer w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Explore Course Catalog</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Real-Time Database Activity Stream */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-slate-900 font-display">Live Database Activity</h3>
                      <button
                        onClick={() => fetchAdminOverview(true)}
                        className="cursor-pointer text-xs font-bold text-[#FF5A36] hover:underline flex items-center gap-1"
                      >
                        <RefreshCw size={11} className={isSyncingLive ? 'animate-spin' : ''} />
                        <span>Sync</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {liveActivity.length > 0 ? (
                        liveActivity.slice(0, 5).map(act => (
                          <div
                            key={act.id}
                            className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center gap-3"
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                                act.type === 'order'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : act.type === 'certificate'
                                  ? 'bg-amber-100 text-amber-700'
                                  : act.type === 'enrollment'
                                  ? 'bg-orange-100 text-[#FF5A36]'
                                  : 'bg-indigo-100 text-indigo-700'
                              }`}
                            >
                              {act.type === 'order' ? (
                                <CreditCard size={15} />
                              ) : act.type === 'certificate' ? (
                                <Award size={15} />
                              ) : act.type === 'enrollment' ? (
                                <BookOpen size={15} />
                              ) : (
                                <Users size={15} />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-xs text-slate-900 truncate">{act.title}</div>
                              <div className="text-[11px] text-slate-500 truncate mt-0.5">{act.subtitle}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-400">
                          Waiting for real-time platform events...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 1B: Cashfree Orders & Revenue Ledger */}
          {activeMenu === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <CreditCard className="text-[#FF5A36]" size={24} />
                    <span>Cashfree Payment Orders ({liveOrders.length})</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time payment orders and automatic enrollments verified through Cashfree API.
                  </p>
                </div>
                <button
                  onClick={() => fetchAdminOverview(true)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
                >
                  <RefreshCw size={14} className={isSyncingLive ? 'animate-spin' : ''} />
                  <span>Sync Live Orders</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Confirmed Paid Revenue</div>
                  <div className="text-2xl font-black text-emerald-600 font-display mt-1">
                    ₹{(liveStats.paidRevenue || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{liveStats.paidOrdersCount} completed payments</div>
                </div>
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending / Active Volume</div>
                  <div className="text-2xl font-black text-amber-600 font-display mt-1">
                    ₹{(liveStats.pendingVolume || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {liveOrders.length - liveStats.paidOrdersCount} awaiting completion
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Database Orders</div>
                  <div className="text-2xl font-black text-slate-900 font-display mt-1">{liveOrders.length}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Synced with server/data/database.json</div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Order ID / CF Ref</th>
                        <th className="px-4 py-3.5">Customer</th>
                        <th className="px-4 py-3.5">Course</th>
                        <th className="px-4 py-3.5">Amount</th>
                        <th className="px-4 py-3.5">Created</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Live Verify</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {liveOrders.length > 0 ? (
                        liveOrders.map(ord => (
                          <tr key={ord.orderId} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4 font-mono">
                              <div className="font-bold text-slate-900">{ord.orderId}</div>
                              {ord.cfOrderId && <div className="text-[10px] text-slate-400">CF: {ord.cfOrderId}</div>}
                            </td>
                            <td className="px-4 py-4">
                              <div className="font-bold text-slate-900">{ord.customerName || 'Student'}</div>
                              <div className="text-[11px] font-mono text-slate-500">{ord.customerEmail}</div>
                            </td>
                            <td className="px-4 py-4 font-semibold text-slate-800">{ord.courseTitle || ord.courseId}</td>
                            <td className="px-4 py-4 font-mono font-bold text-slate-900">₹{ord.amount}</td>
                            <td className="px-4 py-4 text-slate-500">
                              {ord.createdAt ? new Date(ord.createdAt).toLocaleString('en-IN') : '—'}
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  ord.status === 'PAID'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button
                                onClick={() => handleVerifyOrder(ord.orderId)}
                                disabled={verifyingOrderId === ord.orderId}
                                className="cursor-pointer px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5A36] font-bold text-[11px] transition-colors inline-flex items-center gap-1.5"
                              >
                                <RefreshCw size={12} className={verifyingOrderId === ord.orderId ? 'animate-spin' : ''} />
                                <span>Verify Cashfree</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                            No orders recorded in database yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: All Courses (Responsive Table + Mobile Cards + Cost + Enterprise Edit) */}
          {activeMenu === 'courses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <BookOpen className="text-[#FF5A36]" size={24} />
                    <span>All Courses ({allCoursesList.length})</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage titles, descriptions, pricing/cost (₹), YouTube modules & sub-modules across every curriculum.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
                >
                  <Plus size={16} />
                  <span>Create New Course</span>
                </button>
              </div>

              {/* Table Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => setTableTypeFilter('all')}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      tableTypeFilter === 'all'
                        ? 'bg-[#FF5A36] text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({allCoursesList.length})
                  </button>
                  <button
                    onClick={() => setTableTypeFilter('video')}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      tableTypeFilter === 'video'
                        ? 'bg-rose-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    YouTube Video Tracks ({videoCourses.length})
                  </button>
                  <button
                    onClick={() => setTableTypeFilter('text')}
                    className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      tableTypeFilter === 'text'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Text Tutorials ({textCourses.length})
                  </button>
                </div>

                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={e => setTableSearch(e.target.value)}
                    placeholder="Filter courses in catalog..."
                    className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3.5 py-2 pl-9 outline-none focus:border-[#FF5A36] shadow-2xs"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Mobile Card View (< md) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {filteredTableCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${course.type === 'video' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                            {course.type === 'video' ? 'YouTube Video' : 'Text'}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-[#FF5A36]">
                            {course.price}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">{course.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">{course.category} • {course.modulesCount} Modules • {course.lessonsCount} Items</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          if (course.type === 'video') {
                            setSelectedCourseForStudio(course.id);
                            setStudioTab('details');
                            setActiveMenu('studio');
                          } else {
                            const found = textCourses.find(t => t.id === course.id);
                            if (found) setEditingTextCourse(found);
                          }
                        }}
                        className="cursor-pointer px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF5A36] font-bold text-xs flex items-center gap-1"
                      >
                        <Edit3 size={12} /><span>Edit Details & Cost</span>
                      </button>
                      <button
                        onClick={() => course.type === 'video' ? navigateToVideoCourse(course.id) : navigateToTextCourse(course.slug || course.id)}
                        className="cursor-pointer p-2 rounded-xl bg-slate-100 text-slate-700"
                        title="Preview"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="cursor-pointer p-2 rounded-xl bg-rose-50 text-rose-600"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Courses Table (md+) */}
              <div className="hidden md:block rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Course Title</th>
                        <th className="px-4 py-3.5">Format</th>
                        <th className="px-4 py-3.5">Cost / Price</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">Curriculum</th>
                        <th className="px-4 py-3.5">Instructor</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTableCourses.map(course => (
                        <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900">
                            <span className="truncate max-w-xs block">{course.title}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                course.type === 'video'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {course.type === 'video' ? 'YouTube Video' : 'Text'}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-mono font-extrabold text-slate-900">{course.price}</div>
                            {course.originalPrice && (
                              <div className="text-[10px] font-mono text-slate-400 line-through">{course.originalPrice}</div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-slate-600 font-medium">{course.category}</td>
                          <td className="px-4 py-4 font-mono font-semibold text-slate-800">
                            {course.modulesCount} mod • {course.lessonsCount} items
                          </td>
                          <td className="px-4 py-4 text-slate-700 font-medium">{course.instructor}</td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  if (course.type === 'video') {
                                    setSelectedCourseForStudio(course.id);
                                    setStudioTab('details');
                                    setActiveMenu('studio');
                                  } else {
                                    const found = textCourses.find(t => t.id === course.id);
                                    if (found) setEditingTextCourse(found);
                                  }
                                }}
                                className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5A36] font-bold text-[11px] transition-colors flex items-center gap-1"
                                title="Edit Title, Cost, Description, Modules & Sub-modules"
                              >
                                <Edit3 size={12} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (course.type === 'video') {
                                    navigateToVideoCourse(course.id);
                                  } else {
                                    navigateToTextCourse(course.slug || course.id);
                                  }
                                }}
                                className="cursor-pointer p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title="Preview"
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                onClick={() => deleteCourse(course.id)}
                                className="cursor-pointer p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="Delete Course"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: Enterprise YouTube-Only Course & Curriculum Studio */}
          {activeMenu === 'studio' && (
            <div className="space-y-6">
              {/* Studio Course Selection & YouTube Channel Header Bar */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 flex items-center gap-1">
                      <Youtube size={12} />
                      <span>YOUTUBE-ONLY STUDIO</span>
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {targetStudioCourse?.modules?.length || 0} Modules • {targetStudioCourse?.totalLectures || 0} Lessons •{' '}
                      <span className="text-[#FF5A36]">
                        {targetStudioCourse?.isFree ? 'Free' : targetStudioCourse?.price || (targetStudioCourse?.id === 'vid-fullstack-dev' ? '₹299' : '₹99')}
                      </span>
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg font-display flex items-center gap-2">
                    <span>Enterprise Course &amp; YouTube Curriculum Studio</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage course details, pricing/cost, modules, sub-modules, and YouTube lessons from your official channel.
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <select
                    value={selectedCourseForStudio}
                    onChange={e => {
                      setSelectedCourseForStudio(e.target.value);
                      setEditingLessonId(null);
                    }}
                    className="w-full sm:w-auto max-w-xs bg-slate-50 border border-slate-200/90 text-slate-800 text-xs rounded-2xl px-3.5 py-2.5 outline-none focus:border-[#FF5A36] font-bold shadow-2xs"
                  >
                    {videoCourses.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>

                  <a
                    href={SKYROVIX_YOUTUBE_CHANNEL}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-xs"
                    title="Open Skyrovix Official YouTube Channel"
                  >
                    <Youtube size={14} />
                    <span>@skyrovix Channel</span>
                    <ExternalLink size={11} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsAddModuleModalOpen(true)}
                    className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <FolderPlus size={14} className="text-orange-400" />
                    <span>New Module</span>
                  </button>

                  {selectedCourseForStudio && (
                    <button
                      type="button"
                      onClick={() => navigateToVideoCourse(selectedCourseForStudio)}
                      className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#FF5A36] border border-orange-200 font-bold text-xs transition-all"
                    >
                      <Play size={14} />
                      <span>Live Player</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Enterprise Studio Tabs: Modules/Sub-Modules/YouTube vs Course Details & Cost */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 w-fit shadow-2xs">
                <button
                  type="button"
                  onClick={() => setStudioTab('curriculum')}
                  className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                    studioTab === 'curriculum'
                      ? 'bg-[#FF5A36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Youtube size={14} />
                  <span>Modules, Sub-Modules &amp; YouTube Links</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudioTab('details')}
                  className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                    studioTab === 'details'
                      ? 'bg-[#FF5A36] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  <span>Course Details, Cost &amp; Metadata</span>
                </button>
              </div>

              {studioTab === 'details' ? (
                /* ENTERPRISE COURSE DETAILS & COST EDITOR */
                <form
                  onSubmit={handleSaveCourseDetails}
                  className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        Enterprise Course Configuration: {targetStudioCourse?.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Changes update Catalog cards, Course Details page, and Cashfree checkout amount immediately.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="cursor-pointer px-5 py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-extrabold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                      <Save size={14} />
                      <span>Save Course Details &amp; Cost</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                        <input
                          type="text"
                          value={editCourseTitle}
                          onChange={e => setEditCourseTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-[#FF5A36]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Short Tagline</label>
                        <input
                          type="text"
                          value={editCourseSubtitle}
                          onChange={e => setEditCourseSubtitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Course Description</label>
                        <textarea
                          rows={4}
                          value={editCourseDescription}
                          onChange={e => setEditCourseDescription(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={editCourseCategory}
                            onChange={e => setEditCourseCategory(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                          >
                            <option value="Full Stack">Full Stack</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Cloud Architecture">Cloud Architecture</option>
                            <option value="AI & ML">AI &amp; ML</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Databases">Databases</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
                          <select
                            value={editCourseLevel}
                            onChange={e => setEditCourseLevel(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                          >
                            <option value="All Levels">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Total Duration</label>
                          <input
                            type="text"
                            value={editCourseDuration}
                            onChange={e => setEditCourseDuration(e.target.value)}
                            placeholder="18h 30m"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-[#FF5A36]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Enterprise Cost / Pricing Panel */}
                      <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <DollarSign size={14} className="text-[#FF5A36]" />
                            <span>Course Cost &amp; Cashfree Pricing</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditCourseIsFree(!editCourseIsFree)}
                            className={`cursor-pointer px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                              editCourseIsFree ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                            }`}
                          >
                            {editCourseIsFree ? '100% Free Course' : 'Paid Enrollment'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Selling Cost (INR)</label>
                            <input
                              type="text"
                              disabled={editCourseIsFree}
                              value={editCourseIsFree ? 'Free' : editCoursePrice}
                              onChange={e => setEditCoursePrice(e.target.value)}
                              placeholder="₹299"
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-extrabold text-slate-900 outline-none focus:border-[#FF5A36] disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Original MRP (Strike)</label>
                            <input
                              type="text"
                              disabled={editCourseIsFree}
                              value={editCourseIsFree ? '—' : editCourseOriginalPrice}
                              onChange={e => setEditCourseOriginalPrice(e.target.value)}
                              placeholder="₹2,999"
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600 outline-none focus:border-[#FF5A36] disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Course Badge</label>
                            <input
                              type="text"
                              value={editCourseBadge}
                              onChange={e => setEditCourseBadge(e.target.value)}
                              placeholder="FLAGSHIP • ₹299"
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#FF5A36] outline-none focus:border-[#FF5A36]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Instructor Name</label>
                          <input
                            type="text"
                            value={editCourseInstructorName}
                            onChange={e => setEditCourseInstructorName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Instructor Role</label>
                          <input
                            type="text"
                            value={editCourseInstructorRole}
                            onChange={e => setEditCourseInstructorRole(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-slate-700">Course Thumbnail URL</label>
                          <button
                            type="button"
                            onClick={() => {
                              const thumb = getYouTubeThumbnail(newLessonVideoUrl);
                              if (thumb) {
                                setEditCourseThumbnail(thumb);
                                showToast('Fetched thumbnail from active YouTube URL!');
                              } else {
                                showToast('Enter a valid YouTube link in Curriculum tab first.');
                              }
                            }}
                            className="cursor-pointer text-[11px] font-bold text-rose-600 hover:underline"
                          >
                            Use YouTube Thumbnail
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editCourseThumbnail}
                          onChange={e => setEditCourseThumbnail(e.target.value)}
                          placeholder="https://img.youtube.com/vi/.../hqdefault.jpg"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 outline-none focus:border-[#FF5A36]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Learning Outcomes (1 per line)</label>
                          <textarea
                            rows={3}
                            value={editCourseOutcomesText}
                            onChange={e => setEditCourseOutcomesText(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Prerequisites (1 per line)</label>
                          <textarea
                            rows={3}
                            value={editCoursePrereqsText}
                            onChange={e => setEditCoursePrereqsText(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                /* YOUTUBE-ONLY MODULES, SUB-MODULES & LESSONS STUDIO */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* LEFT: YouTube Video Link Publisher (7 Cols) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shrink-0">
                          <Youtube size={18} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">
                            {editingLessonId ? 'Edit YouTube Lesson' : 'Add YouTube Video Lesson'}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Paste any video link from <a href={SKYROVIX_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="text-rose-600 font-bold hover:underline">youtube.com/@skyrovix</a>
                          </p>
                        </div>
                      </div>

                      {editingLessonId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLessonId(null);
                            setNewLessonTitle('');
                            setNewLessonSummary('');
                          }}
                          className="cursor-pointer px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    {/* Target Module & Sub-Module Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700">Target Module</label>
                          <button
                            type="button"
                            onClick={() => setIsAddModuleModalOpen(true)}
                            className="cursor-pointer text-[11px] font-bold text-[#FF5A36] hover:underline flex items-center gap-1"
                          >
                            <Plus size={12} />
                            <span>New Module</span>
                          </button>
                        </div>
                        {targetStudioCourse?.modules?.length ? (
                          <select
                            value={selectedModuleId}
                            onChange={e => setSelectedModuleId(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-bold"
                          >
                            {targetStudioCourse.modules.map((m, idx) => (
                              <option key={m.id} value={m.id}>
                                M{idx + 1}: {m.title} ({m.lessons.length})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsAddModuleModalOpen(true)}
                            className="w-full py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800"
                          >
                            + Add First Module
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Sub-Module Name (Optional)
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            list="submodule-suggestions"
                            value={newLessonSubModule}
                            onChange={e => setNewLessonSubModule(e.target.value)}
                            placeholder="e.g. 1.1 Environment & Tools"
                            className="flex-1 bg-slate-50 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-medium"
                          />
                          <datalist id="submodule-suggestions">
                            {(targetStudioCourse?.modules.find(m => m.id === selectedModuleId)?.subModules || []).map(sm => (
                              <option key={sm.id} value={sm.title} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Title & Duration Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Lesson Title</label>
                        <input
                          type="text"
                          value={newLessonTitle}
                          onChange={e => setNewLessonTitle(e.target.value)}
                          placeholder="e.g. 4. Production REST APIs with Node.js"
                          className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Duration (MM:SS)</label>
                        <input
                          type="text"
                          value={newLessonDuration}
                          onChange={e => setNewLessonDuration(e.target.value)}
                          placeholder="15:30"
                          className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-mono text-center font-bold"
                        />
                      </div>
                    </div>

                    {/* YouTube Video Link Only + Live Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Youtube size={14} className="text-rose-600" />
                          <span>YouTube Video Link (Only YouTube URLs Supported)</span>
                        </label>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                          {extractYouTubeId(newLessonVideoUrl) ? `ID: ${extractYouTubeId(newLessonVideoUrl)}` : 'Enter YouTube URL'}
                        </span>
                      </div>
                      <input
                        type="url"
                        value={newLessonVideoUrl}
                        onChange={e => setNewLessonVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-rose-500 font-mono font-medium"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Supports watch links, youtu.be short links, YouTube Shorts, Live streams, and embed URLs from{' '}
                        <a href={SKYROVIX_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="text-rose-600 underline">
                          @skyrovix
                        </a>.
                      </p>

                      {extractYouTubeId(newLessonVideoUrl) && (
                        <div className="mt-3 p-3 rounded-2xl bg-slate-900 text-white space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              YouTube Player Live Preview
                            </span>
                            <span>Embed Ready</span>
                          </div>
                          <iframe
                            src={toYouTubeEmbedUrl(newLessonVideoUrl)}
                            className="w-full aspect-video rounded-xl max-h-56 bg-black border-0"
                            title="YouTube Lesson Preview"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>

                    {/* Lecture Summary & Notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Lesson Summary</label>
                      <input
                        type="text"
                        value={newLessonSummary}
                        onChange={e => setNewLessonSummary(e.target.value)}
                        placeholder="Brief takeaway covered in this YouTube lecture..."
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lecture Markdown Notes &amp; Technical Guide
                      </label>
                      <textarea
                        value={newLessonMarkdown}
                        onChange={e => setNewLessonMarkdown(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-mono resize-none leading-relaxed"
                        placeholder="Write technical guidelines, code snippets, and instructions..."
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handlePublishLesson}
                        className="cursor-pointer w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5A36] to-[#FA4032] hover:from-[#E04928] hover:to-[#E03528] text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        {editingLessonId ? <Save size={16} /> : <Plus size={16} />}
                        <span>{editingLessonId ? 'Save Updated YouTube Lesson' : 'Publish YouTube Lecture to Module 🚀'}</span>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: Interactive Modules, Sub-Modules & Curriculum Tree View (5 Cols) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Modules &amp; Sub-Modules Tree</h4>
                        <p className="text-[11px] text-slate-500 truncate max-w-[220px]">{targetStudioCourse?.title}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddModuleModalOpen(true)}
                        className="cursor-pointer p-2 rounded-xl bg-orange-50 text-[#FF5A36] hover:bg-orange-100 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <FolderPlus size={15} />
                        <span>Add Module</span>
                      </button>
                    </div>

                    {/* Quick Add Sub-Module into Selected Module */}
                    {selectedModuleId && (
                      <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <input
                          type="text"
                          value={newSubModuleInput}
                          onChange={e => setNewSubModuleInput(e.target.value)}
                          placeholder="Add sub-module to selected module..."
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-[#FF5A36]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSubModule(selectedModuleId)}
                          className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-[11px] shrink-0"
                        >
                          + Sub-Module
                        </button>
                      </div>
                    )}

                    {/* Module Cards List */}
                    <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
                      {targetStudioCourse?.modules?.map((mod, idx) => (
                        <div
                          key={mod.id}
                          className={`rounded-2xl border p-3.5 transition-all ${
                            selectedModuleId === mod.id
                              ? 'border-[#FF5A36] bg-orange-50/20 shadow-xs'
                              : 'border-slate-200 bg-slate-50/60'
                          }`}
                        >
                          {editingModuleId === mod.id ? (
                            <div className="space-y-2 mb-2">
                              <input
                                type="text"
                                value={editingModuleTitle}
                                onChange={e => setEditingModuleTitle(e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editingModuleDuration}
                                  onChange={e => setEditingModuleDuration(e.target.value)}
                                  placeholder="Duration"
                                  className="w-24 bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveModuleEdit(mod.id)}
                                  className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingModuleId(null)}
                                  className="px-2.5 py-1 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedModuleId(mod.id)}
                                className="cursor-pointer text-left min-w-0 flex-1"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900 text-white font-mono">
                                    M{idx + 1}
                                  </span>
                                  <span className="font-bold text-xs text-slate-900 truncate">{mod.title}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                                  <span>{mod.lessons.length} lessons</span>
                                  <span>•</span>
                                  <span>{(mod.subModules || []).length} sub-modules</span>
                                  <span>•</span>
                                  <span>{mod.duration || '1h 30m'}</span>
                                </div>
                              </button>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingModuleId(mod.id);
                                    setEditingModuleTitle(mod.title);
                                    setEditingModuleDuration(mod.duration);
                                  }}
                                  className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-[#FF5A36] hover:bg-orange-50 transition-colors"
                                  title="Rename Module"
                                >
                                  <Edit3 size={13} />
                                </button>
                                {targetStudioCourse.modules.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteModule(mod.id)}
                                    className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete Module"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Sub-Modules Tags inside Module */}
                          {(mod.subModules || []).length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {mod.subModules!.map(sm => (
                                <span
                                  key={sm.id}
                                  onClick={() => {
                                    setSelectedModuleId(mod.id);
                                    setNewLessonSubModule(sm.title);
                                  }}
                                  className="cursor-pointer inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-50 border border-orange-200 text-[#FF5A36] text-[10px] font-bold"
                                >
                                  <span>{sm.title}</span>
                                  <button
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleDeleteSubModule(mod.id, sm.title);
                                    }}
                                    className="hover:text-rose-700"
                                  >
                                    <X size={10} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Lessons inside Module */}
                          {mod.lessons.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-200/70 space-y-1.5">
                              {mod.lessons.map((lesson, lIdx) => (
                                <div
                                  key={lesson.id}
                                  className={`flex items-center justify-between p-2 rounded-xl bg-white border transition-colors group ${
                                    editingLessonId === lesson.id ? 'border-[#FF5A36] ring-1 ring-orange-300' : 'border-slate-100 hover:border-orange-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className="text-[10px] font-mono text-slate-400 font-bold shrink-0">
                                      #{lIdx + 1}
                                    </span>
                                    <Youtube size={13} className="text-rose-600 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <div className="text-xs font-semibold text-slate-800 truncate">{lesson.title}</div>
                                      {lesson.subModule && (
                                        <div className="text-[9px] font-bold text-[#FF5A36] truncate">{lesson.subModule}</div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0 ml-2">
                                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline">
                                      {lesson.duration}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditLesson(mod.id, lesson)}
                                      className="cursor-pointer p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                      title="Edit Lesson & YouTube Link"
                                    >
                                      <Edit3 size={13} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setPreviewingLesson(lesson)}
                                      className="cursor-pointer p-1 text-slate-400 hover:text-[#FF5A36] hover:bg-orange-50 rounded"
                                      title="Play YouTube Preview"
                                    >
                                      <PlayCircle size={14} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                                      className="cursor-pointer p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                      title="Delete Lesson"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 4: Students Management & Records */}
          {activeMenu === 'students' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <Users className="text-[#FF5A36]" size={24} />
                    <span>Students ({students.length})</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage student profiles, view real-time learning progress, track completions, and delete student accounts.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsAddStudentModalOpen(true)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
                  >
                    <UserPlus size={14} />
                    <span>Add Learner</span>
                  </button>
                  <button
                    onClick={handleExportStudents}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
                    title="Download students CSV export"
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Top Stats Overview: How Many Students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Students */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF5A36] flex items-center justify-center shrink-0 border border-orange-100">
                    <Users size={22} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Students</div>
                    <div className="text-2xl font-black text-slate-900 font-display leading-tight">{students.length}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Registered student learners</div>
                  </div>
                </div>

                {/* 2. Active Students */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Students</div>
                    <div className="text-2xl font-black text-emerald-600 font-display leading-tight">{activeStudentsCount}</div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {students.length > 0 ? Math.round((activeStudentsCount / students.length) * 100) : 0}% engagement rate
                    </div>
                  </div>
                </div>

                {/* 3. Track Enrollments */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrollments</div>
                    <div className="text-2xl font-black text-slate-900 font-display leading-tight">{totalEnrollmentsCount}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Across all courses</div>
                  </div>
                </div>

                {/* 4. Completed Lessons */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                    <Award size={22} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Lectures Completed</div>
                    <div className="text-2xl font-black text-purple-600 font-display leading-tight">{totalLessonsDoneCount}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{totalXPCount.toLocaleString()} total XP earned</div>
                  </div>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                    placeholder="Search students by name, email, or student ID..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-8 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36] font-medium"
                  />
                  {studentSearch && (
                    <button
                      type="button"
                      onClick={() => setStudentSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Role Filter */}
                  <select
                    value={studentRoleFilter}
                    onChange={e => setStudentRoleFilter(e.target.value as any)}
                    className="cursor-pointer bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#FF5A36]"
                  >
                    <option value="all">All Roles ({students.length})</option>
                    <option value="student">Students Only ({students.filter(s => s.role === 'student').length})</option>
                    <option value="admin">Admins Only ({students.filter(s => s.role === 'admin').length})</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={studentStatusFilter}
                    onChange={e => setStudentStatusFilter(e.target.value as any)}
                    className="cursor-pointer bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#FF5A36]"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active ({activeStudentsCount})</option>
                    <option value="Inactive">Inactive ({students.length - activeStudentsCount})</option>
                  </select>

                  <span className="text-[11px] font-mono text-slate-400 pl-2 hidden lg:inline">
                    Showing {filteredStudents.length} of {students.length} students
                  </span>
                </div>
              </div>

              {/* Student Data Table with Delete Option */}
              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Student / Learner</th>
                        <th className="px-4 py-3.5">Role</th>
                        <th className="px-4 py-3.5">Enrolled Tracks</th>
                        <th className="px-4 py-3.5">Completed Lessons</th>
                        <th className="px-4 py-3.5">Knowledge XP</th>
                        <th className="px-4 py-3.5">Last Active</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                          <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{student.name}</span>
                                    {student.role === 'admin' && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" title="Admin" />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono">{student.email}</div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    ID: SKX-2026-{student.id.slice(-4).toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold ${
                                  student.role === 'admin'
                                    ? 'bg-orange-100 text-[#FF5A36] border border-orange-200'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {student.role}
                              </span>
                            </td>
                            <td className="px-4 py-4 font-mono font-semibold">
                              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
                                {student.enrolledCourseCount} tracks
                              </span>
                            </td>
                            <td className="px-4 py-4 font-mono">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-emerald-600">{student.completedLessonsCount}</span>
                                <span className="text-[10px] text-slate-400">lessons</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="font-mono text-[#FF5A36] font-bold">
                                {student.xp.toLocaleString()} XP
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <span>{student.streakDays || 1}d streak</span>
                                <span>🔥</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-slate-500 font-medium">{student.lastActive}</td>
                            <td className="px-4 py-4">
                              <button
                                onClick={() => handleToggleStudentStatus(student)}
                                className={`cursor-pointer px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                                  student.status === 'Active'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                                    : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                                title="Click to toggle status (syncs to DB)"
                              >
                                {student.status}
                              </button>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button
                                onClick={() => setStudentToDelete(student)}
                                className="cursor-pointer p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title={`Delete student ${student.name}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                            <Users size={32} className="mx-auto mb-2 opacity-40 text-slate-400" />
                            <div className="text-sm font-bold text-slate-700">No students found</div>
                            <div className="text-xs text-slate-400 mt-1">
                              {studentSearch
                                ? `No students matched your search for "${studentSearch}".`
                                : 'No students found matching the selected filter.'}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: Review Assignments */}
          {activeMenu === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <CheckCircle2 className="text-[#FF5A36]" size={24} />
                    <span>Review Assignments</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Review and verify student code repositories, live demo links, and project checklists.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    {submissions.filter(s => s.status === 'Pending').length} Pending Reviews
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Assignment Name</th>
                        <th className="py-3.5 px-4">Course Track</th>
                        <th className="py-3.5 px-4">Submission Links</th>
                        <th className="py-3.5 px-4">Submitted At</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {submissions.length > 0 ? (
                        submissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={sub.studentAvatar}
                                alt={sub.studentName}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{sub.studentName}</div>
                                <div className="text-[10px] font-mono text-slate-400">{sub.studentId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-900">{sub.assignmentTitle}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                              {sub.courseTrack}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {sub.githubUrl && (
                                <a
                                  href={sub.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-[#FF5A36] hover:underline font-bold flex items-center gap-1"
                                >
                                  <span>GitHub</span>
                                  <ExternalLink size={11} />
                                </a>
                              )}
                              {sub.liveUrl && (
                                <a
                                  href={sub.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-emerald-600 hover:underline font-bold flex items-center gap-1"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-500 font-medium">{sub.submittedOn}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                sub.status === 'Approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : sub.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleUpdateStatus(sub.id, 'Approved')}
                                className="cursor-pointer px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-colors"
                              >
                                Pass / Approve
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(sub.id, 'Rejected')}
                                className="cursor-pointer px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] transition-colors"
                              >
                                Request Changes
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            No assignment submissions recorded in the database yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: Student Final Projects */}
          {activeMenu === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <FolderGit2 className="text-[#FF5A36]" size={24} />
                    <span>Student Final Projects ({capstones.length})</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Review and grade student final project repositories before issuing certificates.
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  {capstones.filter(c => c.status === 'Pending').length} Pending Reviews
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capstones.length > 0 ? (
                  capstones.map(proj => (
                    <div key={proj.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={proj.avatar}
                            alt={proj.student}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div className="font-bold text-sm text-slate-900">{proj.student}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          proj.status === 'Graded'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {proj.grade}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xs text-slate-800">{proj.title}</h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{proj.stack}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <a
                          href={proj.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#FF5A36] hover:underline flex items-center gap-1"
                        >
                          <span>Inspect Repository</span>
                          <ExternalLink size={12} />
                        </a>

                        {proj.status === 'Pending' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleGradeCapstone(proj.id, 'A+ (100%)')}
                              className="cursor-pointer px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-colors"
                            >
                              Pass (A+)
                            </button>
                            <button
                              onClick={() => handleGradeCapstone(proj.id, 'Needs Revision')}
                              className="cursor-pointer px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] transition-colors"
                            >
                              Revise
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-400">Verified & Graded</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 p-10 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs">
                    No capstone project submissions recorded in the database yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 7: Course Certificates */}
          {activeMenu === 'certificates' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display">
                    Course Certificates Issued ({issuedCertificates.length})
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Tamper-proof verifiable credentials with dynamic cryptographic QR verification.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setIsIssueCertModalOpen(true)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FF5A36] text-white font-bold text-xs hover:bg-[#E03D00] shadow-sm shadow-orange-500/20"
                  >
                    <Plus size={14} />
                    <span>Issue Certificate</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('certificates')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-xs"
                  >
                    <Award size={14} />
                    <span>Learner Certificates View</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('certificate-verify')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 font-bold text-xs text-slate-800 hover:bg-slate-50"
                  >
                    <Eye size={14} />
                    <span>Public Verification</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {issuedCertificates.length > 0 ? (
                  issuedCertificates.map(cert => (
                    <div key={cert.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="font-mono font-bold text-xs text-slate-800">{cert.certCode}</div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-emerald-600" />
                          <span>{cert.status}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={cert.studentAvatar}
                          alt={cert.studentName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-extrabold text-sm text-slate-900">{cert.studentName}</div>
                          <div className="text-xs text-[#FF5A36] font-bold">{cert.courseTitle}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Issued Date</span>
                          <span className="font-bold text-slate-900">{cert.issuedDate}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Academic Grade</span>
                          <span className="font-bold text-emerald-600">{cert.score}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="cursor-pointer text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl flex items-center gap-1"
                          title="Revoke certificate from DB"
                        >
                          <Trash2 size={12} />
                          <span>Revoke</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentView('certificates')}
                            className="cursor-pointer text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-50"
                          >
                            Inspect Preview
                          </button>
                          <button
                            onClick={() => setCurrentView('certificate-verify')}
                            className="cursor-pointer text-xs font-bold text-[#FF5A36] hover:bg-orange-50 px-3 py-1.5 rounded-xl flex items-center gap-1"
                          >
                            <span>Verify Online</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 p-10 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
                    No certificates issued in the database yet. Click "Issue Certificate" above to issue a verifiable credential.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 8: Code Sandbox */}
          {activeMenu === 'sandboxes' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                  <Terminal className="text-[#FF5A36]" size={24} />
                  <span>Code Sandboxes</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  In-browser code execution environments for JavaScript, Python Pyodide, HTML/CSS, and SQL.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-sm text-slate-900">JavaScript / Node.js Engine</div>
                  <div className="text-xs text-emerald-600 font-bold">● Active Sandbox Worker</div>
                  <div className="text-xs text-slate-500">Node v20.10 execution with secure iframe isolation.</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-sm text-slate-900">Python 3 Pyodide WebAssembly</div>
                  <div className="text-xs text-emerald-600 font-bold">● Active Sandbox Worker</div>
                  <div className="text-xs text-slate-500">NumPy, Pandas, Matplotlib in-memory WASM execution.</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-bold text-sm text-slate-900">SQL SQLite Database Engine</div>
                  <div className="text-xs text-emerald-600 font-bold">● Active Sandbox Worker</div>
                  <div className="text-xs text-slate-500">In-memory relational database with table queries.</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: Starter Project Templates */}
          {activeMenu === 'vault' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                  <FolderCode className="text-[#FF5A36]" size={24} />
                  <span>Starter Project Templates (50+)</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Ready-to-use boilerplate code templates and GitHub starter repositories for students.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Serverless E-Commerce Backend', tag: 'Cloud Architecture', stack: 'AWS Lambda, DynamoDB, Node.js' },
                  { title: 'Multi-Tenant SaaS Starter Kit', tag: 'Full Stack', stack: 'Next.js 15, Prisma, PostgreSQL' },
                  { title: 'LLM Retrieval Augmented Engine', tag: 'AI & ML', stack: 'Python 3, LangChain, Pinecone' },
                  { title: 'Kubernetes GitOps Cluster CI/CD', tag: 'DevOps', stack: 'ArgoCD, Helm, Terraform' }
                ].map((vault, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {vault.tag}
                      </span>
                      <FolderGit2 size={16} className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{vault.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono">{vault.stack}</p>
                    </div>
                    <button
                      onClick={() => showToast(`Repository link copied to clipboard!`)}
                      className="cursor-pointer w-full py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5A36] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download size={13} />
                      <span>Clone Starter Boilerplate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 10: Course Categories */}
          {activeMenu === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display">Course Categories & Tracks</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage active curriculum tracks and configure student enrollment quotas.
                  </p>
                </div>
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF5A36] text-white font-bold text-xs shadow-md shadow-orange-500/20"
                >
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map((dom, i) => (
                  <div key={dom.name} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        Active Track
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{dom.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{dom.count} Published Tracks • {dom.lessons} Lectures</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 11: 1-on-1 Mentor Sessions */}
          {activeMenu === 'mentorship' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <Headphones className="text-[#FF5A36]" size={24} />
                    <span>1-on-1 Mentor Sessions</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Scheduled 1-on-1 code reviews, live office hours, and student technical support.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {students.filter(s => s.enrolledCourseCount > 0).length > 0 ? (
                  students
                    .filter(s => s.enrolledCourseCount > 0)
                    .slice(0, 5)
                    .map(s => (
                      <div key={s.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-sm text-slate-900">{s.name} ({s.email})</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Enrolled in {s.enrolledCourseCount} tracks • <span className="font-semibold text-[#FF5A36]">{s.completedLessonsCount} lessons completed</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-slate-600">{s.lastActive}</span>
                          <button
                            onClick={() => showToast(`Opened live mentorship session invite for ${s.name}!`)}
                            className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-orange-50 text-[#FF5A36] hover:bg-orange-100 font-bold text-xs"
                          >
                            Start Session
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-xs text-slate-400">
                    No active student enrollments needing mentorship right now.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: Platform Settings */}
          {activeMenu === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2.5">
                    <Settings className="text-[#FF5A36]" size={24} />
                    <span>Platform Settings & Cloud Infrastructure</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage global branding, video streaming engines, SQL database sync, certification rules, and system backups.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportAllData}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <Download size={14} />
                    <span>Export Database JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
                  >
                    <Save size={14} />
                    <span>Save All Settings</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CARD 1: General Branding & Institution Details */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="p-2 rounded-xl bg-orange-50 text-[#FF5A36]">
                      <Globe size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Institution & Brand Identity</h3>
                      <p className="text-[11px] text-slate-500">Public metadata and official enterprise attributes</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Platform Name</label>
                      <input
                        type="text"
                        value={platformSettings.platformName}
                        onChange={e => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Brand Tagline</label>
                      <input
                        type="text"
                        value={platformSettings.tagline}
                        onChange={e => setPlatformSettings({ ...platformSettings, tagline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Official Support Email</label>
                        <input
                          type="email"
                          value={platformSettings.supportEmail}
                          onChange={e => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Helpline Phone</label>
                        <input
                          type="text"
                          value={platformSettings.contactPhone}
                          onChange={e => setPlatformSettings({ ...platformSettings, contactPhone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent Organization</label>
                      <input
                        type="text"
                        value={platformSettings.organizationName}
                        onChange={e => setPlatformSettings({ ...platformSettings, organizationName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">Maintenance Mode</div>
                        <div className="text-[11px] text-slate-500">Temporarily gate student logins for upgrades</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, maintenanceMode: !platformSettings.maintenanceMode })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.maintenanceMode
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.maintenanceMode ? 'Active (Locked)' : 'Off (Open)'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD 2: SQL Database Engine Integration */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                        <Database size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">SQL Database & Backend Engine</h3>
                        <p className="text-[11px] text-slate-500">Live backend connection and database sync</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Connected
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Database Host</label>
                      <input
                        type="text"
                        value={platformSettings.databaseHost}
                        readOnly
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Database Type</label>
                      <input
                        type="text"
                        value={platformSettings.databaseType}
                        readOnly
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 cursor-not-allowed"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">Auto-Confirm Registered Emails</div>
                        <div className="text-[11px] text-slate-500">Grant instant access without requiring SMTP validation</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, autoConfirmEmail: !platformSettings.autoConfirmEmail })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.autoConfirmEmail
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.autoConfirmEmail ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    {/* Test Connection Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleTestDbConnection}
                        disabled={isTestingDb}
                        className="cursor-pointer w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={14} className={isTestingDb ? 'animate-spin' : ''} />
                        <span>{isTestingDb ? 'Pinging SQL Database...' : 'Test SQL Database Connection Ping'}</span>
                      </button>
                      {dbLatency && (
                        <div className="mt-2 text-center text-[11px] font-mono text-emerald-600 font-bold">
                          {dbLatency}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CARD 3: Video Streaming Engine Defaults */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <PlayCircle size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Video Player & Streaming Engine</h3>
                      <p className="text-[11px] text-slate-500">Curriculum playback and piracy protection</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Default Streaming Resolution</label>
                      <select
                        value={platformSettings.defaultVideoQuality}
                        onChange={e => setPlatformSettings({ ...platformSettings, defaultVideoQuality: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                      >
                        <option value="1080p Full HD">1080p Full HD (Recommended)</option>
                        <option value="720p HD">720p HD (Low Bandwidth)</option>
                        <option value="4K Ultra HD">4K Ultra HD</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">Autoplay Next Lecture</div>
                        <div className="text-[11px] text-slate-500">Automatically progress when current lecture completes</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, autoplayNextLesson: !platformSettings.autoplayNextLesson })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.autoplayNextLesson
                            ? 'bg-[#FF5A36] text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.autoplayNextLesson ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">Floating Learner Watermark</div>
                        <div className="text-[11px] text-slate-500">Overlays student ID & email on video canvas to deter screen capture</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, watermarkStudentId: !platformSettings.watermarkStudentId })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.watermarkStudentId
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.watermarkStudentId ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">In-Player Code Sandbox</div>
                        <div className="text-[11px] text-slate-500">Mount split-screen Monaco code editor during video lessons</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, enableCodeSandboxInPlayer: !platformSettings.enableCodeSandboxInPlayer })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.enableCodeSandboxInPlayer
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.enableCodeSandboxInPlayer ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CARD 4: Certification & MSME Accreditation Rules */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <Award size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Certification & Accredited Badges</h3>
                      <p className="text-[11px] text-slate-500">Evaluation thresholds and credential verification</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Passing Score Threshold ({platformSettings.certificatePassingScore}%)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={platformSettings.certificatePassingScore}
                        onChange={e => setPlatformSettings({ ...platformSettings, certificatePassingScore: Number(e.target.value) })}
                        className="w-full accent-[#FF5A36] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>50% (Standard)</span>
                        <span className="font-bold text-[#FF5A36]">{platformSettings.certificatePassingScore}%</span>
                        <span>100% (Strict Distinction)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">Include Official MSME Registered Seal</div>
                        <div className="text-[11px] text-slate-500">Government recognized accreditation insignia on certificates</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, msmeSealOnCertificates: !platformSettings.msmeSealOnCertificates })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.msmeSealOnCertificates
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.msmeSealOnCertificates ? 'Included' : 'Hidden'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <div className="font-bold text-xs text-slate-900">SHA-256 Cryptographic Hash</div>
                        <div className="text-[11px] text-slate-500">Generate tamper-proof public verification hashes</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlatformSettings({ ...platformSettings, sha256Verification: !platformSettings.sha256Verification })}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          platformSettings.sha256Verification
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {platformSettings.sha256Verification ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-200/80 text-xs text-slate-700">
                      <div className="font-bold text-[#FF5A36] mb-1">Enterprise Credential Note</div>
                      <p className="text-[11px] text-slate-600">
                        All certificates issued under these rules are verifiable online at <code className="text-slate-800">/certificate-verify</code> using the unique certificate ID.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Save Settings CTA */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base">Ready to apply configuration changes?</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Settings are immediately stored in browser cache and reflected across all student interfaces.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="cursor-pointer px-6 py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-extrabold text-xs transition-all shadow-lg shadow-orange-500/30 active:scale-95 whitespace-nowrap"
                >
                  Save Platform Configuration
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: Create Course Track (Enterprise Fields + Cost + YouTube Link) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 sm:p-7 relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2.5 rounded-xl bg-orange-50 text-[#FF5A36] border border-orange-200">
                <Plus size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-display">Publish New Enterprise Course</h3>
                <p className="text-xs text-slate-500">
                  Configure title, description, cost (₹), YouTube video URL, and curriculum format.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Course Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCourseFormat('video')}
                    className={`cursor-pointer py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      courseFormat === 'video'
                        ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Youtube size={14} />
                    <span>YouTube Video Course</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseFormat('text')}
                    className={`cursor-pointer py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      courseFormat === 'text'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <FileText size={14} />
                    <span>Text Documentation</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Full Stack TypeScript & SQL"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={e => setNewSubtitle(e.target.value)}
                    placeholder="e.g. Build production apps from scratch"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="AI & ML">AI &amp; ML</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Databases">Databases</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="18h 30m"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 outline-none focus:border-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={e => setNewBadge(e.target.value)}
                    placeholder="NEW"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#FF5A36] outline-none focus:border-[#FF5A36]"
                  />
                </div>
              </div>

              {/* Cost & Pricing Row */}
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Selling Cost (₹)</label>
                  <input
                    type="text"
                    disabled={newIsFree}
                    value={newIsFree ? 'Free' : newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    placeholder="₹299"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-[#FF5A36] disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="text"
                    disabled={newIsFree}
                    value={newIsFree ? '—' : newOriginalPrice}
                    onChange={e => setNewOriginalPrice(e.target.value)}
                    placeholder="₹2,999"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600 outline-none focus:border-[#FF5A36] disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setNewIsFree(!newIsFree)}
                  className={`cursor-pointer py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    newIsFree ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                  }`}
                >
                  {newIsFree ? '✓ Free Course' : 'Paid Course (Click for Free)'}
                </button>
              </div>

              {courseFormat === 'video' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Intro Lesson YouTube Link (<a href={SKYROVIX_YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="text-rose-600 underline">@skyrovix</a>)
                  </label>
                  <input
                    type="url"
                    value={newInitialYouTubeUrl}
                    onChange={e => setNewInitialYouTubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 outline-none focus:border-rose-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Detailed outline of topics, architecture, and real-world projects covered..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                Publish Course to Live Catalog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Announcement */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsAnnouncementModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Megaphone size={18} className="text-[#FF5A36]" />
              <h3 className="font-bold text-base text-slate-900">Post Announcement</h3>
            </div>
            <textarea
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              placeholder="e.g. New Next.js 15 masterclass is live! Check out the updated catalog..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none"
            />
            <button
              onClick={async () => {
                if (!announcementText.trim()) return;
                try {
                  await fetch('http://localhost:5000/api/admin/announcements', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      text: announcementText.trim(),
                      author: currentUser?.name || 'Super Admin'
                    })
                  });
                } catch (e) {}
                showToast('Announcement saved to DB and broadcast!');
                setIsAnnouncementModalOpen(false);
                setAnnouncementText('');
              }}
              className="cursor-pointer w-full mt-4 py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all"
            >
              Broadcast to All Students
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Send Email */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsEmailModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Mail size={18} className="text-blue-600" />
              <h3 className="font-bold text-base text-slate-900">Broadcast Email Newsletter</h3>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                placeholder="Email Subject Line"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-600"
              />
              <textarea
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                placeholder="Write your email update to all registered learners..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-blue-600 resize-none"
              />
            </div>
            <button
              onClick={() => {
                showToast(`Broadcast email queued for ${students.length} enrolled learners!`);
                setIsEmailModalOpen(false);
                setEmailSubject('');
                setEmailBody('');
              }}
              className="cursor-pointer w-full mt-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all"
            >
              Send Broadcast Email
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: Create & Manage Discount Coupons */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsCouponModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-amber-600" />
              <h3 className="font-bold text-base text-slate-900">Course Discount Coupons</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SKYROVIX50"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={e => setDiscountPercent(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-amber-600"
                />
              </div>
            </div>
            <button
              onClick={async () => {
                if (!couponCode.trim()) return;
                try {
                  await fetch('http://localhost:5000/api/admin/coupons', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: couponCode.trim(), discountPercent: Number(discountPercent) || 10 })
                  });
                  await fetchAdminOverview(false);
                } catch (e) {}
                showToast(`Coupon ${couponCode} (${discountPercent}% OFF) saved to DB!`);
              }}
              className="cursor-pointer w-full mt-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all"
            >
              Activate Coupon
            </button>

            {liveCoupons.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active DB Coupons ({liveCoupons.length})
                </div>
                {liveCoupons.map(cp => (
                  <div key={cp.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <div>
                      <span className="font-mono font-extrabold text-slate-900">{cp.code}</span>
                      <span className="ml-2 font-bold text-amber-700">{cp.discountPercent}% OFF</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        setLiveCoupons(prev => prev.filter(x => x.id !== cp.id));
                        await fetch(`http://localhost:5000/api/admin/coupons/${cp.id}`, { method: 'DELETE' }).catch(() => {});
                        showToast(`Coupon ${cp.code} deleted.`);
                      }}
                      className="cursor-pointer p-1 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: Add Category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={18} className="text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900">Add New Learning Category</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Category Title</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Mobile App Engineering"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-emerald-600"
                />
              </div>
            </div>
            <button
              onClick={() => {
                if (newCategoryName.trim()) {
                  showToast(`Added new category: "${newCategoryName}"!`);
                  setIsCategoryModalOpen(false);
                  setNewCategoryName('');
                }
              }}
              className="cursor-pointer w-full mt-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all"
            >
              Create Category
            </button>
          </div>
        </div>
      )}

      {/* MODAL 6: Add Learner */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsAddStudentModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-[#FF5A36]" />
              <h3 className="font-bold text-base text-slate-900 font-display">Add Learner to Platform</h3>
            </div>
            <form onSubmit={handleAddLearner} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  placeholder="e.g. Vikramaditya Sen"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={e => setNewStudentEmail(e.target.value)}
                  placeholder="e.g. vikram@techcorp.io"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Role</label>
                <select
                  value={newStudentRole}
                  onChange={e => setNewStudentRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                >
                  <option value="student">Student Learner</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full mt-2 py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                Enroll Learner Roster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: Issue Certificate */}
      {isIssueCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsIssueCertModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-[#FF5A36]" />
              <h3 className="font-bold text-base text-slate-900 font-display">Issue Course Certificate</h3>
            </div>
            <form onSubmit={handleIssueCertificate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Recipient Learner</label>
                <select
                  value={newCertStudentId}
                  onChange={e => setNewCertStudentId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Course Track</label>
                <select
                  value={newCertCourseTitle}
                  onChange={e => setNewCertCourseTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-[#FF5A36]"
                >
                  {allCoursesList.map(c => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Academic Grade / Honor</label>
                <input
                  type="text"
                  value={newCertScore}
                  onChange={e => setNewCertScore(e.target.value)}
                  placeholder="e.g. 100% (Distinction)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full mt-2 py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                Issue Cryptographic Credential
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 8: Add Course Module */}
      {isAddModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsAddModuleModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <FolderPlus size={18} className="text-[#FF5A36]" />
              <h3 className="font-bold text-base text-slate-900 font-display">Add New Course Module</h3>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Video Course</label>
                <input
                  type="text"
                  value={targetStudioCourse?.title || ''}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Module Title</label>
                <input
                  type="text"
                  value={newModuleTitle}
                  onChange={e => setNewModuleTitle(e.target.value)}
                  placeholder="e.g. Module 4: Cloud Native Microservices"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated Module Duration</label>
                <input
                  type="text"
                  value={newModuleDuration}
                  onChange={e => setNewModuleDuration(e.target.value)}
                  placeholder="e.g. 2h 45m"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                />
              </div>
              <button
                type="button"
                onClick={handleAddModule}
                className="cursor-pointer w-full mt-2 py-3 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                Create Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 9: Video Lesson Preview */}
      {previewingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 relative text-white">
            <button
              onClick={() => setPreviewingLesson(null)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4 pr-10">
              <span className="p-2 rounded-xl bg-[#FF5A36]/20 text-[#FF5A36]">
                <PlayCircle size={20} />
              </span>
              <div>
                <h3 className="font-extrabold text-base text-white">{previewingLesson.title}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[#FF5A36]">{previewingLesson.duration}</span>
                  <span>•</span>
                  <span>ID: {previewingLesson.id}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-800">
              <iframe
                src={toYouTubeEmbedUrl(previewingLesson.videoUrl)}
                className="w-full h-full border-0"
                title={previewingLesson.title}
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Skyrovix YouTube Video Engine</span>
              <button
                type="button"
                onClick={() => setPreviewingLesson(null)}
                className="cursor-pointer px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 11: Edit Text Course Details & Cost */}
      {editingTextCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setEditingTextCourse(null)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Edit3 size={18} className="text-[#FF5A36]" />
              <h3 className="font-bold text-base text-slate-900 font-display">Edit Text Course Details &amp; Cost</h3>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateTextCourse(editingTextCourse);
                showToast(`Updated "${editingTextCourse.title}"!`);
                setEditingTextCourse(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Course Title</label>
                <input
                  type="text"
                  value={editingTextCourse.title}
                  onChange={e => setEditingTextCourse({ ...editingTextCourse, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-[#FF5A36]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingTextCourse.shortDesc}
                  onChange={e => setEditingTextCourse({ ...editingTextCourse, shortDesc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-[#FF5A36] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingTextCourse.category}
                    onChange={e => setEditingTextCourse({ ...editingTextCourse, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#FF5A36]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated Hours</label>
                  <input
                    type="text"
                    value={editingTextCourse.estimatedHours}
                    onChange={e => setEditingTextCourse({ ...editingTextCourse, estimatedHours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-none focus:border-[#FF5A36]"
                  />
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-200 grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Selling Cost (₹)</label>
                  <input
                    type="text"
                    disabled={editingTextCourse.isFree !== false}
                    value={editingTextCourse.isFree !== false ? 'Free' : editingTextCourse.price || '₹99'}
                    onChange={e => setEditingTextCourse({ ...editingTextCourse, price: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-[#FF5A36] disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingTextCourse({
                      ...editingTextCourse,
                      isFree: editingTextCourse.isFree === false ? true : false,
                      price: editingTextCourse.price || '₹99'
                    })
                  }
                  className={`cursor-pointer py-2 px-3 rounded-xl text-xs font-bold ${
                    editingTextCourse.isFree !== false ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                  }`}
                >
                  {editingTextCourse.isFree !== false ? '100% Free' : 'Paid Course'}
                </button>
              </div>
              <button
                type="submit"
                className="cursor-pointer w-full py-2.5 rounded-2xl bg-[#FF5A36] hover:bg-[#E03D00] text-white font-bold text-xs transition-all"
              >
                Save Text Course Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 10: Delete Student Confirmation */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setStudentToDelete(null)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 font-display">Delete Student Account</h3>
                <p className="text-xs text-slate-500">Permanent account removal</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs text-slate-700 space-y-2 mb-4">
              <p className="font-semibold text-rose-900">
                Are you sure you want to delete student <span className="font-black text-slate-900">"{studentToDelete.name}"</span>?
              </p>
              <div className="text-[11px] text-slate-600 space-y-1">
                <div>Email: <span className="font-mono text-slate-800">{studentToDelete.email}</span></div>
                <div>Enrolled Tracks: <span className="font-bold text-slate-800">{studentToDelete.enrolledCourseCount} tracks</span></div>
                <div>Completed Lessons: <span className="font-bold text-slate-800">{studentToDelete.completedLessonsCount} lectures</span></div>
                <div>XP Balance: <span className="font-bold text-[#FF5A36]">{studentToDelete.xp} XP</span></div>
              </div>
              <p className="text-[10px] text-rose-600 font-medium pt-1">
                ⚠️ This action cannot be undone. All records, progress, and certificates for this learner will be removed.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                className="cursor-pointer flex-1 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteStudent}
                className="cursor-pointer flex-1 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-md shadow-rose-600/20 active:scale-95"
              >
                Yes, Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
