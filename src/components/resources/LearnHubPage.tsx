import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Sparkles,
  ArrowLeft,
  Search,
  BookOpen,
  Code2,
  CheckCircle2,
  Circle,
  Download,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Database,
  Cloud,
  ChevronRight,
  Bookmark,
  Share2
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  duration: string;
  desc: string;
  topics: string[];
  courseId?: string;
  courseTitle?: string;
}

interface RoadmapTrack {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  level: string;
  estimatedWeeks: number;
  color: string;
  milestones: Milestone[];
}

const ROADMAPS: RoadmapTrack[] = [
  {
    id: 'fullstack',
    name: 'Full Stack Web Architect',
    subtitle: 'From frontend basics to full production cloud applications with databases',
    icon: '🌐',
    level: 'Beginner to Advanced',
    estimatedWeeks: 24,
    color: '#FB4400',
    milestones: [
      {
        id: 'fs-1',
        title: 'Phase 1: Modern Web Foundations (HTML5, Semantic UI, CSS Flex/Grid)',
        duration: '3 Weeks',
        desc: 'Master the core building blocks of the web: semantic markup, accessible HTML5, responsive layout design using Flexbox and CSS Grid, and Git version control.',
        topics: ['HTML5 Semantic Tags', 'CSS3 Box Model', 'Flexbox & CSS Grid', 'Responsive Media Queries', 'Git & GitHub Workflow'],
        courseId: 'vid-fullstack-dev',
        courseTitle: 'Full Stack Web Development Masterclass'
      },
      {
        id: 'fs-2',
        title: 'Phase 2: Modern JavaScript (ES2024, Async/Await & DOM APIs)',
        duration: '4 Weeks',
        desc: 'Deep dive into JavaScript engine internals: closures, event loop, promises, async/await, array methods, and modern DOM manipulation.',
        topics: ['Arrow Functions & Scope', 'Promises & Async/Await', 'Fetch API & REST APIs', 'Event Loop & Concurrency', 'LocalStorage & Storage APIs'],
        courseId: 'vid-fullstack-dev',
        courseTitle: 'Full Stack Web Development Masterclass'
      },
      {
        id: 'fs-3',
        title: 'Phase 3: React 19 Ecosystem & State Management',
        duration: '5 Weeks',
        desc: 'Build component-driven single page applications using React 19 hooks, custom hooks, context API, Tailwind CSS, and client-side routing.',
        topics: ['Functional Components & JSX', 'useState, useEffect, useMemo', 'React 19 Actions & use() Hook', 'Tailwind CSS Utility Styling', 'State Management & Context'],
        courseId: 'vid-react-mastery',
        courseTitle: 'Modern React 19 & Next.js Masterclass'
      },
      {
        id: 'fs-4',
        title: 'Phase 4: Backend Engineering with Node.js, Express & Auth',
        duration: '5 Weeks',
        desc: 'Develop secure, scalable server-side RESTful microservices with Node.js, Express, JWT authentication, and file upload pipelines.',
        topics: ['Node.js Runtime & Event Loop', 'Express Router & Middlewares', 'JWT & Bcrypt Authentication', 'Error Handling & Validation', 'CORS & Security Best Practices'],
        courseId: 'vid-nodejs-backend',
        courseTitle: 'Backend Architecture with Node.js & Express'
      },
      {
        id: 'fs-5',
        title: 'Phase 5: Databases, ORMs & Supabase Architecture',
        duration: '4 Weeks',
        desc: 'Architect relational and NoSQL databases: PostgreSQL schemas, SQL indexing, Supabase Row-Level Security, and MongoDB aggregation pipelines.',
        topics: ['PostgreSQL & SQL Schema Design', 'Supabase Real-Time & RLS', 'MongoDB & Mongoose Models', 'Indexing & Query Optimization', 'Migrations & Data Seeding'],
        courseId: 'vid-database-sql',
        courseTitle: 'Database Engineering: PostgreSQL & MongoDB'
      },
      {
        id: 'fs-6',
        title: 'Phase 6: Production Deployment, CI/CD & Cloud Hosting',
        duration: '3 Weeks',
        desc: 'Containerize applications with Docker, automate testing pipelines with GitHub Actions, and deploy to Vercel, Railway, and AWS.',
        topics: ['Docker & Containerization', 'GitHub Actions CI/CD Pipelines', 'Vercel & Railway Deployment', 'Environment Variables & Secrets', 'Application Monitoring & Logging'],
        courseId: 'vid-cloud-devops',
        courseTitle: 'DevOps & Cloud Architecture Masterclass'
      }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Specialist (React 19 & Next.js)',
    subtitle: 'Master responsive UI, high-performance web applications, and interactive design',
    icon: '🎨',
    level: 'Intermediate',
    estimatedWeeks: 16,
    color: '#0284C7',
    milestones: [
      {
        id: 'fe-1',
        title: 'Phase 1: Advanced CSS, Tailwind & Design Systems',
        duration: '3 Weeks',
        desc: 'Create design-token driven component libraries with Tailwind CSS, CSS animations, and micro-interactions.',
        topics: ['Tailwind JIT & Arbitrary Values', 'CSS Animations & Keyframes', 'Color Palettes & Typography', 'Accessibility (WCAG 2.1 AA)'],
        courseId: 'vid-react-mastery',
        courseTitle: 'Modern React 19 & Next.js Masterclass'
      },
      {
        id: 'fe-2',
        title: 'Phase 2: React 19 Architecture & Server Components',
        duration: '5 Weeks',
        desc: 'Master React 19 features including React Server Components (RSC), server actions, optimistic UI, and form handling.',
        topics: ['React Server Components vs Client', 'useOptimistic & useTransition', 'Suspense & Streaming UI', 'Custom Hooks Architecture'],
        courseId: 'vid-react-mastery',
        courseTitle: 'Modern React 19 & Next.js Masterclass'
      },
      {
        id: 'fe-3',
        title: 'Phase 3: Next.js 15 App Router & SSR',
        duration: '5 Weeks',
        desc: 'Build blazing fast web applications using Next.js 15 App Router, dynamic routes, metadata SEO, and parallel routes.',
        topics: ['App Router Layouts & Pages', 'Static Site Generation (SSG)', 'Server-Side Rendering (SSR)', 'Incremental Static Regeneration (ISR)'],
        courseId: 'vid-react-mastery',
        courseTitle: 'Modern React 19 & Next.js Masterclass'
      },
      {
        id: 'fe-4',
        title: 'Phase 4: Web Performance & Lighthouse 100',
        duration: '3 Weeks',
        desc: 'Optimize Core Web Vitals (LCP, FID, CLS), lazy loading, tree shaking, and code splitting.',
        topics: ['Core Web Vitals Optimization', 'Dynamic Imports & React.lazy', 'Image & Font Optimization', 'Bundle Analyzer & Profiling'],
        courseId: 'vid-react-mastery',
        courseTitle: 'Modern React 19 & Next.js Masterclass'
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Systems Architect',
    subtitle: 'Build enterprise-grade microservices, high-throughput APIs, and relational schemas',
    icon: '⚙️',
    level: 'Intermediate to Advanced',
    estimatedWeeks: 18,
    color: '#059669',
    milestones: [
      {
        id: 'be-1',
        title: 'Phase 1: Node.js Internals & Asynchronous Architecture',
        duration: '4 Weeks',
        desc: 'Understand libuv, event loop phases, worker threads, streams, and buffer manipulation.',
        topics: ['Node.js Event Loop Phases', 'Streams & Buffer Management', 'File System & OS Modules', 'Child Processes & Cluster'],
        courseId: 'vid-nodejs-backend',
        courseTitle: 'Backend Architecture with Node.js & Express'
      },
      {
        id: 'be-2',
        title: 'Phase 2: Enterprise API Design & Microservices',
        duration: '5 Weeks',
        desc: 'Design idempotent REST APIs, GraphQL endpoints, rate limiting, and Redis caching layers.',
        topics: ['RESTful API Best Practices', 'Redis In-Memory Caching', 'Rate Limiting & Throttling', 'API Gateway Patterns'],
        courseId: 'vid-nodejs-backend',
        courseTitle: 'Backend Architecture with Node.js & Express'
      },
      {
        id: 'be-3',
        title: 'Phase 3: Advanced SQL, Transactions & PostgreSQL',
        duration: '5 Weeks',
        desc: 'ACID transactions, foreign keys, row locks, composite indexing, and database partitioning.',
        topics: ['ACID Transactions & Rollbacks', 'Indexes (B-Tree, GIN, Hash)', 'Joins & Subqueries', 'Supabase Database Functions & Triggers'],
        courseId: 'vid-database-sql',
        courseTitle: 'Database Engineering: PostgreSQL & MongoDB'
      },
      {
        id: 'be-4',
        title: 'Phase 4: System Design & Scalability',
        duration: '4 Weeks',
        desc: 'Horizontal scaling, load balancing, message queues (RabbitMQ/Kafka), and WebSockets.',
        topics: ['Load Balancing (NGINX/ALB)', 'Message Queues & Background Workers', 'WebSockets & Real-Time Sync', 'High Availability & Failovers'],
        courseId: 'vid-cloud-devops',
        courseTitle: 'DevOps & Cloud Architecture Masterclass'
      }
    ]
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning Engineer',
    subtitle: 'From mathematical foundations and Python to LLM fine-tuning and AI APIs',
    icon: '🤖',
    level: 'Beginner to Advanced',
    estimatedWeeks: 20,
    color: '#7C3AED',
    milestones: [
      {
        id: 'ai-1',
        title: 'Phase 1: Python for Data Science (NumPy & Pandas)',
        duration: '4 Weeks',
        desc: 'Data wrangling, matrix manipulation, vectorization, and statistical analysis.',
        topics: ['Python OOP & Generators', 'NumPy Multi-dimensional Arrays', 'Pandas DataFrames & Cleaning', 'Matplotlib & Seaborn Visuals'],
        courseId: 'vid-python-data',
        courseTitle: 'Python for Data Science & AI'
      },
      {
        id: 'ai-2',
        title: 'Phase 2: Machine Learning Algorithms (Scikit-Learn)',
        duration: '5 Weeks',
        desc: 'Supervised and unsupervised learning: regressions, classification, trees, and clustering.',
        topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'K-Means Clustering', 'Cross-Validation & Metrics'],
        courseId: 'vid-ai-ml',
        courseTitle: 'Artificial Intelligence & Machine Learning'
      },
      {
        id: 'ai-3',
        title: 'Phase 3: Deep Learning & Neural Networks (PyTorch)',
        duration: '6 Weeks',
        desc: 'Build convolutional neural networks (CNNs), recurrent neural networks, and transfer learning.',
        topics: ['Tensors & Autograd in PyTorch', 'Convolutional Networks for Vision', 'Recurrent Networks & Attention', 'Transfer Learning with HuggingFace'],
        courseId: 'vid-ai-ml',
        courseTitle: 'Artificial Intelligence & Machine Learning'
      },
      {
        id: 'ai-4',
        title: 'Phase 4: Generative AI, RAG & LLM Agents',
        duration: '5 Weeks',
        desc: 'Integrate OpenAI, Gemini, LangChain, vector databases (Pinecone/Chroma), and autonomous agents.',
        topics: ['Prompt Engineering & Few-Shot', 'Vector Embeddings & Semantic Search', 'Retrieval-Augmented Generation (RAG)', 'Building Multi-Agent Workflows'],
        courseId: 'vid-ai-ml',
        courseTitle: 'Artificial Intelligence & Machine Learning'
      }
    ]
  }
];

interface Cheatsheet {
  id: string;
  title: string;
  category: string;
  icon: string;
  snippetCount: number;
  previewSnippet: string;
  code: string;
}

const CHEATSHEETS: Cheatsheet[] = [
  {
    id: 'cs-react',
    title: 'React 19 Essential Hooks & Actions',
    category: 'Frontend',
    icon: '⚛️',
    snippetCount: 8,
    previewSnippet: 'const [state, formAction, isPending] = useActionState(fn, init);',
    code: `// 1. React 19 useActionState
import { useActionState } from 'react';

async function updateProfile(prevState, formData) {
  const name = formData.get('name');
  return { success: true, name };
}

export function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  return (
    <form action={formAction}>
      <input name="name" required />
      <button disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</button>
    </form>
  );
}

// 2. React 19 use() API for Promises & Context
import { use } from 'react';
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}`
  },
  {
    id: 'cs-flexgrid',
    title: 'CSS Flexbox & CSS Grid Quick Reference',
    category: 'Styling',
    icon: '🎨',
    snippetCount: 6,
    previewSnippet: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
    code: `/* Perfect Center in CSS */
.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Auto-Fit Grid (No Media Queries!) */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Flex Spacer Push Pattern */
.nav-row {
  display: flex;
  align-items: center;
}
.push-right {
  margin-left: auto;
}`
  },
  {
    id: 'cs-sql',
    title: 'PostgreSQL & SQL High-Performance Queries',
    category: 'Database',
    icon: '🐘',
    snippetCount: 7,
    previewSnippet: 'SELECT u.name, COUNT(e.id) FROM users u LEFT JOIN enrollments e...',
    code: `-- 1. Aggregation with Index Scan
SELECT 
  u.id, 
  u.name, 
  COUNT(e.id) AS total_enrolled,
  COALESCE(SUM(c.duration_hours), 0) AS total_hours
FROM users u
LEFT JOIN enrollments e ON e.user_id = u.id
LEFT JOIN courses c ON c.id = e.course_id
WHERE u.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
ORDER BY total_enrolled DESC
LIMIT 10;

-- 2. Create B-Tree Index for Fast Filter
CREATE INDEX CONCURRENTLY idx_users_email_lower 
ON users (LOWER(email));`
  },
  {
    id: 'cs-git',
    title: 'Git & GitHub Pro Terminal Commands',
    category: 'DevOps',
    icon: '🐙',
    snippetCount: 10,
    previewSnippet: 'git switch -c feature/auth && git commit -am "feat: jwt"',
    code: `# Create and switch to new branch
git switch -c feature/new-module

# Stash uncommitted changes with descriptive message
git stash push -m "wip: navbar dropdown work"
git stash pop

# Interactive rebase last 3 commits
git rebase -i HEAD~3

# Pretty Git Log graph
git log --graph --oneline --decorate --all -n 15`
  }
];

export const LearnHubPage: React.FC = () => {
  const { setCurrentView, navigateToVideoCourse, showGlobalToast } = usePlatform();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('fullstack');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Load completed milestones from localStorage
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('skyrovix_completed_milestones');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { 'fs-1': true };
  });

  const activeTrack = ROADMAPS.find(r => r.id === selectedTrackId) || ROADMAPS[0];

  const toggleMilestone = (id: string, title: string) => {
    const updated = {
      ...completedMilestones,
      [id]: !completedMilestones[id]
    };
    setCompletedMilestones(updated);
    try {
      localStorage.setItem('skyrovix_completed_milestones', JSON.stringify(updated));
    } catch (e) {}
    
    if (updated[id]) {
      showGlobalToast(`Milestone Completed: ${title.slice(0, 30)}... (+50 XP)`);
    }
  };

  const completedCount = activeTrack.milestones.filter(m => completedMilestones[m.id]).length;
  const progressPercent = Math.round((completedCount / activeTrack.milestones.length) * 100);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    showGlobalToast('Cheatsheet copied to clipboard!');
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const filteredCheatsheets = CHEATSHEETS.filter(cs =>
    cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-orange-100/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400] shadow-2xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Skyrovix</span>
              <span>/</span>
              <span className="text-[#FB4400] font-bold">Learn Hub & Roadmaps</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Interactive Hub
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-[#FB4400] text-xs font-extrabold shadow-2xs">
              <Sparkles size={14} />
              <span>OFFICIAL SKYROVIX LEARNER ROADMAPS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Developer Roadmaps & Interactive Knowledge Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Step-by-step career path guides designed by industry engineers. Track your milestone progress live, download production cheatsheets, and launch relevant masterclass courses.
            </p>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Track Switcher Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers size={18} className="text-[#FB4400]" />
              <span>Choose Your Career Track</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Track Progress: <strong className="text-slate-900">{completedCount} of {activeTrack.milestones.length}</strong> Completed ({progressPercent}%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ROADMAPS.map(track => {
              const isSelected = track.id === selectedTrackId;
              const count = track.milestones.filter(m => completedMilestones[m.id]).length;
              const pct = Math.round((count / track.milestones.length) * 100);

              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`cursor-pointer p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#FB4400] shadow-md ring-2 ring-orange-500/15'
                      : 'bg-white/80 border-slate-200/90 hover:border-orange-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{track.icon}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {track.estimatedWeeks} Weeks
                      </span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 leading-tight mb-1">
                      {track.name}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">
                      {track.subtitle}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Progress</span>
                    <span className="font-bold text-slate-800">{pct}%</span>
                  </div>
                  {/* Miniature progress bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-[#FB4400] transition-all duration-300 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Roadmap Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FB4400] uppercase tracking-wider">
                <span>{activeTrack.icon}</span>
                <span>Active Track: {activeTrack.level}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {activeTrack.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {activeTrack.subtitle}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-3 flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-[#FB4400] flex items-center justify-center font-extrabold text-xs text-slate-900 bg-white shadow-2xs">
                {progressPercent}%
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  {completedCount} / {activeTrack.milestones.length} Milestones
                </div>
                <div className="text-[10px] text-slate-500">
                  Click checkmarks to track completed topics
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 sm:before:left-6">
            {activeTrack.milestones.map((milestone, idx) => {
              const isDone = !!completedMilestones[milestone.id];

              return (
                <div
                  key={milestone.id}
                  className="relative flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Step Node Marker */}
                  <button
                    onClick={() => toggleMilestone(milestone.id, milestone.title)}
                    className={`cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all shadow-sm ${
                      isDone
                        ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105'
                        : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-[#FB4400] hover:text-[#FB4400]'
                    }`}
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? <Check size={20} className="stroke-[3]" /> : <span className="font-bold text-xs">{idx + 1}</span>}
                  </button>

                  {/* Milestone Card */}
                  <div className={`flex-1 rounded-2xl p-5 border transition-all ${
                    isDone
                      ? 'bg-emerald-50/40 border-emerald-200/80 shadow-2xs'
                      : 'bg-[#FBFBFB] border-slate-200/90 hover:border-orange-200 hover:bg-white shadow-2xs'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-[#FB4400]">
                          {milestone.duration}
                        </span>
                        {isDone && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleMilestone(milestone.id, milestone.title)}
                        className="cursor-pointer text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        {isDone ? 'Mark Incomplete' : 'Mark as Done (+50 XP)'}
                      </button>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 mb-1.5">
                      {milestone.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {milestone.desc}
                    </p>

                    {/* Key Topics Badges */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                        Key Skills & Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.topics.map((t, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer: Launch Related Masterclass */}
                    {milestone.courseId && (
                      <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <BookOpen size={14} className="text-[#FB4400]" />
                          <span>Corresponding Course: <strong className="text-slate-900">{milestone.courseTitle}</strong></span>
                        </div>
                        <button
                          onClick={() => {
                            if (milestone.courseId) navigateToVideoCourse(milestone.courseId);
                          }}
                          className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#FB4400] hover:bg-[#E03D00] px-3.5 py-1.5 rounded-xl shadow-2xs transition-all active:scale-95"
                        >
                          <span>Launch Masterclass</span>
                          <ExternalLink size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Developer Cheatsheets Section */}
        <div className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Code2 size={20} className="text-[#FB4400]" />
                <span>Production Developer Cheatsheets & Snippets</span>
              </h2>
              <p className="text-xs text-slate-500">
                Quick-reference snippets verified for modern production environments
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search snippets (React, CSS, SQL)..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB4400] shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCheatsheets.map(sheet => (
              <div
                key={sheet.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sheet.icon}</span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        {sheet.title}
                      </div>
                      <span className="text-[10px] font-bold text-[#FB4400] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                        {sheet.category} • {sheet.snippetCount} Snippets
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyCode(sheet.id, sheet.code)}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-[#FB4400] border border-slate-200 hover:border-orange-200 transition-all active:scale-95"
                    title="Copy full cheatsheet"
                  >
                    {copiedSnippetId === sheet.id ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56">
                  <pre>{sheet.code}</pre>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>ATS & production-ready syntax</span>
                  <button
                    onClick={() => handleCopyCode(sheet.id, sheet.code)}
                    className="cursor-pointer text-[#FB4400] font-bold hover:underline"
                  >
                    Quick Copy Snippet →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

