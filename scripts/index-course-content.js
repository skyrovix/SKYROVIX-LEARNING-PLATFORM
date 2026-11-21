import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const courseContentDir = path.resolve(__dirname, '../course-content');
const outputDir = path.resolve(__dirname, '../src/data');
const coursesContentOutputDir = path.resolve(__dirname, '../src/data/text-courses');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(coursesContentOutputDir)) {
  fs.mkdirSync(coursesContentOutputDir, { recursive: true });
}

// Meta mapping for the 12 text courses
const COURSE_METADATA = {
  html: {
    id: 'text-html',
    slug: 'html',
    title: 'HTML5 Semantic Web Architecture',
    shortDesc: 'Master semantic markup, accessibility, modern forms, multimedia, and web page architecture from ground up.',
    category: 'Frontend',
    icon: 'Code2',
    badge: 'Standard',
    level: 'Beginner',
    instructor: 'Alex Rivera',
    rating: 4.9,
    enrolledCount: 14200
  },
  css: {
    id: 'text-css',
    slug: 'css',
    title: 'CSS3 & Modern Responsive Design',
    shortDesc: 'Deep dive into Flexbox, Grid, Box Model, typography, animations, variables, and responsive layout patterns.',
    category: 'Frontend',
    icon: 'Palette',
    badge: 'Popular',
    level: 'Beginner to Intermediate',
    instructor: 'Elena Rostova',
    rating: 4.9,
    enrolledCount: 19800
  },
  javascript: {
    id: 'text-javascript',
    slug: 'javascript',
    title: 'Modern JavaScript (ES6+ to Async)',
    shortDesc: 'Complete guide to closures, prototypes, asynchronous JS, DOM manipulation, promises, and modern ES features.',
    category: 'Frontend & Fullstack',
    icon: 'FileCode2',
    badge: 'Essential',
    level: 'Beginner to Advanced',
    instructor: 'David Kim',
    rating: 4.95,
    enrolledCount: 28400
  },
  python: {
    id: 'text-python',
    slug: 'python',
    title: 'Python Core to Advanced Programming',
    shortDesc: 'From syntax, OOP, and data structures to file manipulation, virtual environments, and modular architecture.',
    category: 'Backend & Data',
    icon: 'Terminal',
    badge: 'Top Rated',
    level: 'All Levels',
    instructor: 'Sarah Jenkins',
    rating: 4.92,
    enrolledCount: 31200
  },
  mysql: {
    id: 'text-mysql',
    slug: 'mysql',
    title: 'MySQL Relational Database Engineering',
    shortDesc: 'Relational data modeling, SQL queries, joins, indexes, ACID transactions, and stored procedures.',
    category: 'Database',
    icon: 'Database',
    badge: 'Core Backend',
    level: 'Intermediate',
    instructor: 'Skyrovix Team',
    rating: 4.88,
    enrolledCount: 15600
  },
  java: {
    id: 'text-java',
    slug: 'java',
    title: 'Java Enterprise & Object-Oriented Design',
    shortDesc: 'Enterprise OOP principles, collections framework, multi-threading, memory management, and stream APIs.',
    category: 'Backend',
    icon: 'Coffee',
    badge: 'Enterprise',
    level: 'Intermediate to Advanced',
    instructor: 'Vikram Patel',
    rating: 4.87,
    enrolledCount: 17900
  },
  php: {
    id: 'text-php',
    slug: 'php',
    title: 'PHP 8 Web Development & Server Systems',
    shortDesc: 'Server-side scripting, OOP PHP, sessions, security practices, RESTful APIs, and database integration.',
    category: 'Backend',
    icon: 'Globe',
    badge: 'Web Classic',
    level: 'Beginner to Intermediate',
    instructor: 'Julian Meyer',
    rating: 4.82,
    enrolledCount: 11400
  },
  django: {
    id: 'text-django',
    slug: 'django',
    title: 'Django Web Framework & REST Architecture',
    shortDesc: 'Build robust Python web apps with Django ORM, authentication, view controllers, and REST framework APIs.',
    category: 'Backend',
    icon: 'Server',
    badge: 'Framework',
    level: 'Intermediate',
    instructor: 'Sarah Jenkins',
    rating: 4.91,
    enrolledCount: 13800
  },
  numpy: {
    id: 'text-numpy',
    slug: 'numpy',
    title: 'NumPy High-Performance Vectorized Computing',
    shortDesc: 'N-dimensional arrays, vectorization, linear algebra routines, broadcasting, and numerical analysis.',
    category: 'Data Science',
    icon: 'Binary',
    badge: 'Data Science',
    level: 'Intermediate',
    instructor: 'Dr. Aris Thorne',
    rating: 4.89,
    enrolledCount: 12200
  },
  pandas: {
    id: 'text-pandas',
    slug: 'pandas',
    title: 'Pandas Data Wrangling & Analytical Workflows',
    shortDesc: 'Series, DataFrames, group-by aggregations, missing data treatment, time series analysis, and ETL pipelines.',
    category: 'Data Science',
    icon: 'Table',
    badge: 'Data Analysis',
    level: 'Intermediate',
    instructor: 'Dr. Aris Thorne',
    rating: 4.93,
    enrolledCount: 16500
  },
  matplotlib: {
    id: 'text-matplotlib',
    slug: 'matplotlib',
    title: 'Matplotlib Data Visualization & Plotting',
    shortDesc: 'Publication-quality visual graphics, custom subplots, statistical charts, styling, and 3D plotting.',
    category: 'Data Science',
    icon: 'LineChart',
    badge: 'Visualization',
    level: 'Intermediate',
    instructor: 'Dr. Aris Thorne',
    rating: 4.85,
    enrolledCount: 9800
  },
  scipy: {
    id: 'text-scipy',
    slug: 'scipy',
    title: 'SciPy Scientific Computing & Optimization',
    shortDesc: 'Scientific algorithms for optimization, integration, interpolation, signal processing, and statistics.',
    category: 'Data Science',
    icon: 'Cpu',
    badge: 'Scientific',
    level: 'Advanced',
    instructor: 'Dr. Aris Thorne',
    rating: 4.86,
    enrolledCount: 8400
  }
};

function formatTitle(filename, rawTitle) {
  if (rawTitle && rawTitle.trim()) {
    // Strip leading markdown '# ' or numbers like '# 1. '
    let clean = rawTitle.replace(/^#\s*(\d+[\.\-_]\s*)?/, '').trim();
    if (clean) return clean;
  }
  // Fallback to filename
  const base = path.basename(filename, '.md');
  const parts = base.replace(/^\d+_/, '').split('_');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

function processCourseContent() {
  console.log('Indexing course-content...');
  if (!fs.existsSync(courseContentDir)) {
    console.error(`Directory not found: ${courseContentDir}`);
    return;
  }

  const categoryDirs = fs.readdirSync(courseContentDir).filter(f => {
    return fs.statSync(path.join(courseContentDir, f)).isDirectory();
  });

  const catalog = [];

  categoryDirs.forEach(cat => {
    const meta = COURSE_METADATA[cat] || {
      id: `text-${cat}`,
      slug: cat,
      title: cat.toUpperCase() + ' Complete Track',
      shortDesc: `Comprehensive lessons in ${cat}`,
      category: 'General',
      icon: 'BookOpen',
      badge: 'Course',
      level: 'All Levels',
      instructor: 'Skyrovix Staff',
      rating: 4.9,
      enrolledCount: 5000
    };

    const catPath = path.join(courseContentDir, cat);
    const mdFiles = fs.readdirSync(catPath)
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/^\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/^\d+/)?.[0] || '0', 10);
        return numA - numB;
      });

    const lessonsMetadata = [];
    const fullLessons = [];

    let totalWordCount = 0;

    mdFiles.forEach((file, idx) => {
      const fullFilePath = path.join(catPath, file);
      const content = fs.readFileSync(fullFilePath, 'utf-8');
      
      const lines = content.split('\n');
      const firstHeading = lines.find(l => l.startsWith('# '));
      const title = formatTitle(file, firstHeading);
      
      // Calculate word count & estimated read time
      const words = content.trim().split(/\s+/).length;
      totalWordCount += words;
      const readTime = Math.max(3, Math.ceil(words / 150));

      // Extract a snippet or overview
      let snippet = '';
      const introLineIdx = lines.findIndex(l => l.includes('Introduction') || l.includes('Overview'));
      if (introLineIdx !== -1 && lines[introLineIdx + 2]) {
        snippet = lines[introLineIdx + 2].slice(0, 160) + '...';
      } else {
        snippet = lines.find(l => l.trim().length > 30 && !l.startsWith('#'))?.slice(0, 160) + '...' || '';
      }

      // Check for code blocks
      const hasCode = content.includes('```');

      const lessonSummary = {
        id: `${cat}_${path.basename(file, '.md')}`,
        filename: file,
        order: idx + 1,
        title,
        readTimeMinutes: readTime,
        snippet,
        hasCode
      };

      lessonsMetadata.push(lessonSummary);

      fullLessons.push({
        ...lessonSummary,
        content
      });
    });

    const totalHours = (totalWordCount / (150 * 60)).toFixed(1);

    const courseCatalogItem = {
      ...meta,
      type: 'text',
      lessonsCount: lessonsMetadata.length,
      estimatedHours: `${totalHours} hrs`,
      lessons: lessonsMetadata
    };

    catalog.push(courseCatalogItem);

    // Save individual full course file for lazy on-demand loading
    fs.writeFileSync(
      path.join(coursesContentOutputDir, `${meta.slug}.json`),
      JSON.stringify({
        ...courseCatalogItem,
        fullLessons
      }, null, 2),
      'utf-8'
    );
  });

  // Save the master catalog
  fs.writeFileSync(
    path.join(outputDir, 'textCoursesCatalog.json'),
    JSON.stringify(catalog, null, 2),
    'utf-8'
  );

  console.log(`Successfully indexed ${catalog.length} text courses with ${catalog.reduce((acc, c) => acc + c.lessonsCount, 0)} total lessons!`);
}

processCourseContent();

