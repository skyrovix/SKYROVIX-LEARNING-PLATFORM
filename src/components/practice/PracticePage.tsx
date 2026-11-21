import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CodePlayground } from '../playground/CodePlayground';
import {
  Terminal,
  Code2,
  Sparkles,
  Layers,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle2,
  Cpu,
  Globe,
  FileCode,
  Play,
  RotateCcw,
  Zap,
  Laptop
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeItem {
  id: string;
  title: string;
  category: 'Frontend' | 'JavaScript' | 'Python';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  desc: string;
  code: {
    language: 'html' | 'python';
    html?: string;
    css?: string;
    js?: string;
    python?: string;
  };
}

const TEMPLATES: Record<string, {
  name: string;
  icon: string;
  code: {
    language: 'html' | 'python';
    html?: string;
    css?: string;
    js?: string;
    python?: string;
  };
}> = {
  starter: {
    name: '🚀 Web App Starter',
    icon: '🚀',
    code: {
      language: 'html',
      html: `<div class="skyrovix-card">
  <div class="badge">SKYROVIX PRACTICE</div>
  <h1>Interactive Sandbox</h1>
  <p>Modify this code live and watch changes render instantly in the browser.</p>
  <button id="counter-btn">Clicks: <span id="count">0</span></button>
  <div id="log-msg"></div>
</div>`,
      css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  margin: 0;
}

.skyrovix-card {
  background: #ffffff;
  border: 1px solid #fed7aa;
  padding: 2.2rem;
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px -5px rgba(251, 68, 0, 0.12);
  text-align: center;
  max-width: 440px;
}

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #fb4400;
  background: #fff7ed;
  border: 1px solid #ffedd5;
  padding: 3px 10px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

h1 {
  background: linear-gradient(135deg, #fb4400, #ea580c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px 0;
  font-size: 1.8rem;
}

p {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

button {
  background: #fb4400;
  color: #ffffff;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(251, 68, 0, 0.25);
}

button:hover {
  background: #e03d00;
  transform: translateY(-1px);
}

#log-msg {
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: #fb4400;
}`,
      js: `let count = 0;
const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');
const log = document.getElementById('log-msg');

btn.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
  log.textContent = \`Awesome! You clicked \${count} time\${count > 1 ? 's' : ''}.\`;
});`
    }
  },
  grid: {
    name: '🎨 Modern CSS Grid',
    icon: '🎨',
    code: {
      language: 'html',
      html: `<div class="container">
  <div class="card card-1">
    <h3>01. Speed</h3>
    <p>Sub-millisecond DOM rendering inside sandboxed iframe.</p>
  </div>
  <div class="card card-2">
    <h3>02. Design</h3>
    <p>Flame Orange accents with obsidian contrast.</p>
  </div>
  <div class="card card-3">
    <h3>03. Code</h3>
    <p>Zero configuration live execution environment.</p>
  </div>
</div>`,
      css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  margin: 0;
  padding: 20px;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 650px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(251, 68, 0, 0.15);
  border-color: #fed7aa;
}

.card h3 {
  margin: 0 0 8px 0;
  color: #fb4400;
  font-size: 16px;
}

.card p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.4;
}`,
      js: `// Add subtle interactive highlight on click
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.style.borderColor = '#fb4400';
    setTimeout(() => {
      card.style.borderColor = '#e2e8f0';
    }, 600);
  });
});`
    }
  },
  pythonAlgo: {
    name: '🐍 Python Algorithm',
    icon: '🐍',
    code: {
      language: 'python',
      python: `# Skyrovix Python Algorithm Sandbox
def fibonacci_memoized(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo)
    return memo[n]

print("Calculating Fibonacci sequence:")
for i in range(1, 11):
    val = fibonacci_memoized(i)
    print(f"Fib({i}) = {val}")

print("Algorithm executed successfully!")`
    }
  }
};

const CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-1',
    title: 'Create an Animated Accordion',
    category: 'Frontend',
    difficulty: 'Beginner',
    xp: 50,
    desc: 'Build an interactive FAQ accordion that smoothly reveals content when clicked using CSS transitions.',
    code: {
      language: 'html',
      html: `<div class="faq">
  <div class="faq-item">
    <div class="faq-header">What is Skyrovix?</div>
    <div class="faq-body">A dual-track technical education ecosystem.</div>
  </div>
</div>`,
      css: `.faq { max-width: 400px; margin: 40px auto; font-family: sans-serif; }
.faq-item { border: 1px solid #fed7aa; border-radius: 10px; overflow: hidden; background: white; }
.faq-header { padding: 14px 18px; font-weight: bold; cursor: pointer; background: #fff7ed; color: #fb4400; }
.faq-body { padding: 14px 18px; font-size: 14px; color: #475569; }`,
      js: `document.querySelector('.faq-header').addEventListener('click', () => {
  alert('Accordion header clicked!');
});`
    }
  },
  {
    id: 'ch-2',
    title: 'Array Transformation & Filtering',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    xp: 75,
    desc: 'Filter, map, and reduce an array of student project submissions to find average completion scores.',
    code: {
      language: 'html',
      html: `<div style="font-family: monospace; padding: 20px;">
  <h2>Student Submissions Analyzer</h2>
  <pre id="display"></pre>
</div>`,
      css: `body { background: #181619; color: #f8fafc; }
h2 { color: #fb4400; }
pre { background: #262328; padding: 16px; border-radius: 12px; color: #a3e635; }`,
      js: `const students = [
  { name: 'Hariharan', score: 98 },
  { name: 'Alex', score: 85 },
  { name: 'Priyanka', score: 94 },
  { name: 'Devon', score: 89 }
];

const avg = students.reduce((acc, s) => acc + s.score, 0) / students.length;
document.getElementById('display').textContent = JSON.stringify({
  topStudents: students.filter(s => s.score > 90),
  averageScore: avg.toFixed(1)
}, null, 2);`
    }
  },
  {
    id: 'ch-3',
    title: 'Python Sprint Velocity Estimator',
    category: 'Python',
    difficulty: 'Intermediate',
    xp: 80,
    desc: 'Write a Python function to compute moving sprint velocity with standard deviation bounds.',
    code: {
      language: 'python',
      python: `# Sprint Velocity & Output Estimator
def calculate_developer_velocity(tasks, velocity_rate):
    total = sum(tasks) * velocity_rate
    return f"Estimated Sprint Output: {total} story points"

sprint_tasks = [5, 8, 3, 13, 2]
print(calculate_developer_velocity(sprint_tasks, 1.25))`
    }
  }
];

export const PracticePage: React.FC = () => {
  const { setCurrentView } = usePlatform();
  const [activePreset, setActivePreset] = useState<string>('starter');
  const [activeCode, setActiveCode] = useState(TEMPLATES.starter.code);

  const handleSelectTemplate = (key: string) => {
    setActivePreset(key);
    setActiveCode(TEMPLATES[key].code);
    // Smooth scroll to IDE
    const el = document.getElementById('playground-editor');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLoadChallenge = (challenge: ChallengeItem) => {
    setActiveCode(challenge.code);
    const el = document.getElementById('playground-editor');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Hero Header Section */}
      <section className="border-b border-slate-200/80 bg-white pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => setCurrentView('home')}
              className="cursor-pointer hover:text-[#FB4400] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#FB4400] font-bold">Practice Sandbox</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FB4400] text-xs font-bold">
                <Terminal size={13} />
                <span>Zero-Setup Interactive Developer Sandbox</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Skyrovix Code Practice Arena
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Write, test, and debug HTML5, CSS3, Modern JavaScript, and Python code live in your browser. Practice key concepts with instant DOM preview and output simulation.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
              <div className="space-y-0.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Supported Engines
                </div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  HTML5 • CSS3 • ES6+ • Python
                </div>
              </div>
            </div>
          </div>

          {/* Quick Template Selector Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Quick Starters:</span>
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => handleSelectTemplate(key)}
                className={`cursor-pointer flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activePreset === key
                    ? 'bg-[#FB4400] text-white shadow-xs font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-orange-200'
                }`}
              >
                <span>{template.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main IDE Workspace */}
      <section id="playground-editor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="h-[740px] sm:h-[780px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
          <CodePlayground initialCode={activeCode} isEmbedded={true} />
        </div>
      </section>

      {/* Practice Challenge Exercises */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FB4400] uppercase tracking-wider">
              <Zap size={14} />
              <span>Skill Drills</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Interactive Coding Challenges
            </h2>
            <p className="text-xs text-slate-600">
              Pick a challenge to load boilerplate code directly into the editor above.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('catalog')}
              className="cursor-pointer flex items-center gap-1.5 text-xs font-bold text-[#FB4400] hover:text-[#E03D00] transition-colors"
            >
              <span>Explore All Tutorials (435 Lessons)</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHALLENGES.map(ch => (
            <div
              key={ch.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-200 hover:shadow-lg transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {ch.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FB4400]">
                    <Sparkles size={12} />
                    <span>+{ch.xp} XP</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#FB4400] transition-colors">
                  {ch.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {ch.difficulty}
                </span>

                <button
                  onClick={() => handleLoadChallenge(ch)}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#FB4400] text-[#FB4400] hover:text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <Play size={12} />
                  <span>Load Challenge</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border border-orange-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              Need structured lessons before practicing?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Study our 435 text documentation chapters and masterclass video courses. Every lesson links right back to this playground for hands-on mastery.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('catalog')}
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FB4400] hover:bg-[#E03D00] text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
            >
              <BookOpen size={14} />
              <span>Browse Tutorials</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

