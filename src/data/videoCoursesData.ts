import { HTML_VIDEOS, CSS_VIDEOS } from '../assets/courseVideos';
import skLogoOfficial from '../images/sk-logo-official.png';
import bannerFullstackSvg from '../images/banners/banner-fullstack.svg';
import bannerHtmlSvg from '../images/banners/banner-html.svg';
import bannerCssSvg from '../images/banners/banner-css.svg';
import bannerGitSvg from '../images/banners/banner-git.svg';
import bannerJavascriptSvg from '../images/banners/banner-javascript.svg';
import bannerReactSvg from '../images/banners/banner-react.svg';
import bannerNodejsSvg from '../images/banners/banner-nodejs.svg';
import bannerDatabaseSvg from '../images/banners/banner-database.svg';
import bannerNextjsSvg from '../images/banners/banner-nextjs.svg';


export const SKYROVIX_INSTRUCTOR = {
  name: 'Skyrovix Team',
  role: 'Skyrovix Curriculum & Technical Team',
  avatar: skLogoOfficial,
  bio: 'Official curriculum engineered by the senior engineering and curriculum architecture team at Skyrovix Engineering Academy.'
};

export interface VideoChapter {
  title: string;
  time: string;
  timeSeconds: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'github' | 'pdf' | 'doc' | 'link';
}

export interface VideoLesson {
  id: string;
  title: string;
  subModule?: string;
  duration: string;
  durationSeconds: number;
  videoUrl: string; // YouTube URL (watch, youtu.be, shorts, live, or embed)
  summary: string;
  chapters: VideoChapter[];
  notes: string;
  transcript: string;
  resources: ResourceLink[];
  quiz?: QuizQuestion;
}

export interface SubModuleItem {
  id: string;
  title: string;
  duration?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  subModules?: SubModuleItem[];
  lessons: VideoLesson[];
}

export interface VideoCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  totalDuration: string;
  totalLectures: number;
  accentColor: string;
  badge: string;
  isFree?: boolean;
  price?: string;
  originalPrice?: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  description: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
}

export const VIDEO_COURSES: VideoCourse[] = [
  {
    "id": "vid-fullstack-dev",
    "slug": "full-stack-development",
    "title": "Full Stack Web Development Masterclass",
    "subtitle": "The complete end-to-end career track: Web Basics (HTML/CSS/Git), JavaScript, React 19, Node.js, Databases (SQL/Supabase/MongoDB), Next.js 15, Cloud Deployment, and 3 Capstones.",
    "category": "Full Stack",
    "level": "All Levels",
    "rating": 4.96,
    "reviewsCount": 4280,
    "enrolledCount": 38450,
    "totalDuration": "43h 25m",
    "totalLectures": 80,
    "accentColor": "#6366F1",
    "badge": "FLAGSHIP • ₹299",
    "isFree": false,
    "price": "₹299",
    "originalPrice": "₹2,999",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerFullstackSvg,
    "description": "The definitive end-to-end full stack web development curriculum. 8 comprehensive modules covering Web Basics (HTML5, CSS3, Git/GitHub), Modern JavaScript, Frontend with React 19, Backend APIs with Node.js & Express, Databases (SQL, Supabase, MongoDB), Next.js 15 App Router, Cloud Deployment & CI/CD, and 3 enterprise Capstone Projects.",
    "learningOutcomes": [
      "Master HTML5 semantic elements, forms, SEO, and WCAG accessibility standards",
      "Build responsive, animated modern layouts with Flexbox, CSS Grid, and custom variables",
      "Write clean, modern JavaScript with async/await, closures, DOM manipulation, and Fetch API",
      "Engineer single-page applications using React 19, hooks, React Router, and state management",
      "Design and deploy production-grade REST APIs with Node.js, Express, JWT, and bcrypt",
      "Model database schemas in SQL (PostgreSQL), Supabase (RLS), and MongoDB / Mongoose",
      "Architect full-stack hybrid web applications with Next.js 15 App Router and Server Actions",
      "Deploy applications on Vercel, Render, Railway with CI/CD GitHub Actions and Docker",
      "Build and launch 3 portfolio capstone projects (E-Commerce, Report Management, Custom Idea)"
    ],
    "prerequisites": [
      "No prior programming experience required. Starts from absolute fundamentals."
    ],
    "modules": [
      {
        "id": "fs-m1",
        "title": "Module 1: Web Basics (HTML, CSS, Git & GitHub)",
        "duration": "3h 30m",
        "lessons": [
          {
            "id": "fs-m1-html-l1",
            "title": "1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure",
            "duration": "07:48",
            "durationSeconds": 468,
            "videoUrl": HTML_VIDEOS[1],
            "summary": "Understand the fundamental architecture of the web: DNS resolution, client-server model, HTTP/HTTPS protocols, request-response lifecycles, and HTML document boilerplate structure.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:20",
                "timeSeconds": 140
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:04",
                "timeSeconds": 304
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:48",
                "timeSeconds": 468
              }
            ],
            "notes": "# 1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure\n\n## 📘 Summary\nUnderstand the fundamental architecture of the web: DNS resolution, client-server model, HTTP/HTTPS protocols, request-response lifecycles, and HTML document boilerplate structure.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Web basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l2",
            "title": "2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths",
            "duration": "06:35",
            "durationSeconds": 395,
            "videoUrl": HTML_VIDEOS[2],
            "summary": "Master typographic semantics: h1-h6 hierarchy, paragraphs, bold/emphasis tags, relative versus absolute pathing, and anchor links.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:58",
                "timeSeconds": 118
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:16",
                "timeSeconds": 256
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:35",
                "timeSeconds": 395
              }
            ],
            "notes": "# 2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths\n\n## 📘 Summary\nMaster typographic semantics: h1-h6 hierarchy, paragraphs, bold/emphasis tags, relative versus absolute pathing, and anchor links.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Text and links\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l3",
            "title": "3. Images and media: img, alt, figure, picture, audio, video, iframe",
            "duration": "08:04",
            "durationSeconds": 484,
            "videoUrl": HTML_VIDEOS[3],
            "summary": "Embed responsive media: responsive image sets with picture tag, accessibility alt rules, audio, video players, and sandboxed iframes.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:25",
                "timeSeconds": 145
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:14",
                "timeSeconds": 314
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:04",
                "timeSeconds": 484
              }
            ],
            "notes": "# 3. Images and media: img, alt, figure, picture, audio, video, iframe\n\n## 📘 Summary\nEmbed responsive media: responsive image sets with picture tag, accessibility alt rules, audio, video players, and sandboxed iframes.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Images and media: img, alt, figure, picture, audio, video, iframe\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Images and media\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l4",
            "title": "4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan",
            "duration": "09:48",
            "durationSeconds": 588,
            "videoUrl": HTML_VIDEOS[4],
            "summary": "Structure ordered and unordered lists, nested navigations, tabular data, table headers, colspans, and rowspans.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:56",
                "timeSeconds": 176
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "06:22",
                "timeSeconds": 382
              },
              {
                "title": "Summary & Best Practices",
                "time": "09:48",
                "timeSeconds": 588
              }
            ],
            "notes": "# 4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan\n\n## 📘 Summary\nStructure ordered and unordered lists, nested navigations, tabular data, table headers, colspans, and rowspans.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Lists and tables\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l5",
            "title": "5. Forms part 1: input types, label, select, textarea, button",
            "duration": "06:47",
            "durationSeconds": 407,
            "videoUrl": HTML_VIDEOS[5],
            "summary": "Form architecture: connecting labels to inputs using for/id, handling text, email, number, select dropdowns, textareas, and submit buttons.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:02",
                "timeSeconds": 122
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:24",
                "timeSeconds": 264
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:47",
                "timeSeconds": 407
              }
            ],
            "notes": "# 5. Forms part 1: input types, label, select, textarea, button\n\n## 📘 Summary\nForm architecture: connecting labels to inputs using for/id, handling text, email, number, select dropdowns, textareas, and submit buttons.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Forms part 1: input types, label, select, textarea, button\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Forms part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l6",
            "title": "6. Forms part 2: validation attributes, fieldset, datalist",
            "duration": "05:49",
            "durationSeconds": 349,
            "videoUrl": HTML_VIDEOS[6],
            "summary": "Native HTML5 form constraints: required, min/max, pattern regex, grouping with fieldset/legend, and autocomplete with datalists.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:44",
                "timeSeconds": 104
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "03:46",
                "timeSeconds": 226
              },
              {
                "title": "Summary & Best Practices",
                "time": "05:49",
                "timeSeconds": 349
              }
            ],
            "notes": "# 6. Forms part 2: validation attributes, fieldset, datalist\n\n## 📘 Summary\nNative HTML5 form constraints: required, min/max, pattern regex, grouping with fieldset/legend, and autocomplete with datalists.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Forms part 2: validation attributes, fieldset, datalist\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Forms part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l7",
            "title": "7. Semantic HTML: header, nav, main, section, article, aside, footer",
            "duration": "07:28",
            "durationSeconds": 448,
            "videoUrl": HTML_VIDEOS[7],
            "summary": "Eliminate unsemantic div soup by adopting landmark elements that boost SEO and screen reader accessibility navigation.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:14",
                "timeSeconds": 134
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:51",
                "timeSeconds": 291
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:28",
                "timeSeconds": 448
              }
            ],
            "notes": "# 7. Semantic HTML: header, nav, main, section, article, aside, footer\n\n## 📘 Summary\nEliminate unsemantic div soup by adopting landmark elements that boost SEO and screen reader accessibility navigation.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Semantic HTML: header, nav, main, section, article, aside, footer\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Semantic HTML\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l8",
            "title": "8. Accessibility: ARIA, alt text, tab order, keyboard navigation",
            "duration": "06:41",
            "durationSeconds": 401,
            "videoUrl": HTML_VIDEOS[8],
            "summary": "WCAG compliance standards: accessible roles, aria-live regions, keyboard tab indexing, skip links, and focus indicators.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:00",
                "timeSeconds": 120
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:20",
                "timeSeconds": 260
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:41",
                "timeSeconds": 401
              }
            ],
            "notes": "# 8. Accessibility: ARIA, alt text, tab order, keyboard navigation\n\n## 📘 Summary\nWCAG compliance standards: accessible roles, aria-live regions, keyboard tab indexing, skip links, and focus indicators.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Accessibility: ARIA, alt text, tab order, keyboard navigation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Accessibility\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l9",
            "title": "9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation",
            "duration": "06:56",
            "durationSeconds": 416,
            "videoUrl": HTML_VIDEOS[9],
            "summary": "Search engine optimization: meta viewport, Open Graph social share tags, robots indexing, and browser Web APIs.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:04",
                "timeSeconds": 124
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:30",
                "timeSeconds": 270
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:56",
                "timeSeconds": 416
              }
            ],
            "notes": "# 9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation\n\n## 📘 Summary\nSearch engine optimization: meta viewport, Open Graph social share tags, robots indexing, and browser Web APIs.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. SEO and HTML5 APIs\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-html-l10",
            "title": "10. Mini project: profile page and registration form",
            "duration": "06:25",
            "durationSeconds": 385,
            "videoUrl": HTML_VIDEOS[10],
            "summary": "Complete end-to-end hands-on project: craft an accessible personal portfolio profile page with an interactive validated registration form.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:55",
                "timeSeconds": 115
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:10",
                "timeSeconds": 250
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:25",
                "timeSeconds": 385
              }
            ],
            "notes": "# 10. Mini project: profile page and registration form\n\n## 📘 Summary\nComplete end-to-end hands-on project: craft an accessible personal portfolio profile page with an interactive validated registration form.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: profile page and registration form\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l1",
            "title": "1. CSS basics: ways to add CSS, selectors, specificity, inheritance",
            "duration": "08:40",
            "durationSeconds": 520,
            "videoUrl": CSS_VIDEOS[1],
            "summary": "CSS fundamentals: inline vs internal vs external stylesheets, selector engines, calculation of specificity points, and property inheritance.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:36",
                "timeSeconds": 156
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:38",
                "timeSeconds": 338
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:40",
                "timeSeconds": 520
              }
            ],
            "notes": "# 1. CSS basics: ways to add CSS, selectors, specificity, inheritance\n\n## 📘 Summary\nCSS fundamentals: inline vs internal vs external stylesheets, selector engines, calculation of specificity points, and property inheritance.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. CSS basics: ways to add CSS, selectors, specificity, inheritance\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. CSS basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l2",
            "title": "2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts",
            "duration": "06:19",
            "durationSeconds": 379,
            "videoUrl": CSS_VIDEOS[2],
            "summary": "Visual fundamentals: color formats (HEX, RGB, HSL), relative sizing with rem/em/vw/vh, typography hierarchy, and Google Fonts integration.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:53",
                "timeSeconds": 113
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:06",
                "timeSeconds": 246
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:19",
                "timeSeconds": 379
              }
            ],
            "notes": "# 2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts\n\n## 📘 Summary\nVisual fundamentals: color formats (HEX, RGB, HSL), relative sizing with rem/em/vw/vh, typography hierarchy, and Google Fonts integration.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Colors, units and typography\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l3",
            "title": "3. Box model: padding, border, margin, box-sizing, backgrounds, shadows",
            "duration": "06:36",
            "durationSeconds": 396,
            "videoUrl": CSS_VIDEOS[3],
            "summary": "Deep dive into content, padding, border, and margin. Understand box-sizing: border-box, background layers, and multi-layered drop shadows.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:58",
                "timeSeconds": 118
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:17",
                "timeSeconds": 257
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:36",
                "timeSeconds": 396
              }
            ],
            "notes": "# 3. Box model: padding, border, margin, box-sizing, backgrounds, shadows\n\n## 📘 Summary\nDeep dive into content, padding, border, and margin. Understand box-sizing: border-box, background layers, and multi-layered drop shadows.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Box model: padding, border, margin, box-sizing, backgrounds, shadows\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Box model\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l4",
            "title": "4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index",
            "duration": "10:02",
            "durationSeconds": 602,
            "videoUrl": CSS_VIDEOS[4],
            "summary": "Document flow and coordinate positioning: relative, absolute positioning within containers, sticky headers, fixed navbars, and z-index stacking.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "03:00",
                "timeSeconds": 180
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "06:31",
                "timeSeconds": 391
              },
              {
                "title": "Summary & Best Practices",
                "time": "10:02",
                "timeSeconds": 602
              }
            ],
            "notes": "# 4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index\n\n## 📘 Summary\nDocument flow and coordinate positioning: relative, absolute positioning within containers, sticky headers, fixed navbars, and z-index stacking.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Display and position\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l5",
            "title": "5. Flexbox part 1: container properties, alignment, wrapping, gap",
            "duration": "08:19",
            "durationSeconds": 499,
            "videoUrl": CSS_VIDEOS[5],
            "summary": "1D Layouts with Flexbox: flex-direction, justify-content, align-items, flex-wrap, and modern gap spacing.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:29",
                "timeSeconds": 149
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:24",
                "timeSeconds": 324
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:19",
                "timeSeconds": 499
              }
            ],
            "notes": "# 5. Flexbox part 1: container properties, alignment, wrapping, gap\n\n## 📘 Summary\n1D Layouts with Flexbox: flex-direction, justify-content, align-items, flex-wrap, and modern gap spacing.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Flexbox part 1: container properties, alignment, wrapping, gap\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Flexbox part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l6",
            "title": "6. Flexbox part 2: item properties and common layouts (navbar, cards)",
            "duration": "08:45",
            "durationSeconds": 525,
            "videoUrl": CSS_VIDEOS[6],
            "summary": "Flex items: flex-grow, flex-shrink, flex-basis, align-self, and building real-world responsive navigation bars and pricing card grids.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:37",
                "timeSeconds": 157
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:41",
                "timeSeconds": 341
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:45",
                "timeSeconds": 525
              }
            ],
            "notes": "# 6. Flexbox part 2: item properties and common layouts (navbar, cards)\n\n## 📘 Summary\nFlex items: flex-grow, flex-shrink, flex-basis, align-self, and building real-world responsive navigation bars and pricing card grids.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Flexbox part 2: item properties and common layouts (navbar, cards)\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Flexbox part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l7",
            "title": "7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax",
            "duration": "06:42",
            "durationSeconds": 402,
            "videoUrl": CSS_VIDEOS[7],
            "summary": "2D Layouts with CSS Grid: fractional units (fr), grid-template-areas, repeat syntax, auto-fit, auto-fill, and dynamic minmax constraints.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:00",
                "timeSeconds": 120
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:21",
                "timeSeconds": 261
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:42",
                "timeSeconds": 402
              }
            ],
            "notes": "# 7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax\n\n## 📘 Summary\n2D Layouts with CSS Grid: fractional units (fr), grid-template-areas, repeat syntax, auto-fit, auto-fill, and dynamic minmax constraints.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. CSS Grid\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l8",
            "title": "8. Responsive design: mobile-first, media queries, breakpoints, responsive images",
            "duration": "05:41",
            "durationSeconds": 341,
            "videoUrl": CSS_VIDEOS[8],
            "summary": "Mobile-first responsive design: layout fluidification, breakpoint strategies, and picture elements.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:42",
                "timeSeconds": 102
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "03:41",
                "timeSeconds": 221
              },
              {
                "title": "Summary & Best Practices",
                "time": "05:41",
                "timeSeconds": 341
              }
            ],
            "notes": "# 8. Responsive design: mobile-first, media queries, breakpoints, responsive images\n\n## 📘 Summary\nMobile-first responsive design: layout fluidification, breakpoint strategies, and picture elements.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Responsive design: mobile-first, media queries, breakpoints, responsive images\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Responsive design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l9",
            "title": "9. Transitions, transforms and animations: keyframes, CSS variables, dark mode",
            "duration": "08:51",
            "durationSeconds": 531,
            "videoUrl": CSS_VIDEOS[9],
            "summary": "Motion & Modern CSS: transition timing curves, 2D/3D hardware-accelerated transforms, CSS variables, and dark mode themes.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:39",
                "timeSeconds": 159
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:45",
                "timeSeconds": 345
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:51",
                "timeSeconds": 531
              }
            ],
            "notes": "# 9. Transitions, transforms and animations: keyframes, CSS variables, dark mode\n\n## 📘 Summary\nMotion & Modern CSS: transition timing curves, 2D/3D hardware-accelerated transforms, CSS variables, and dark mode themes.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. Transitions, transforms and animations: keyframes, CSS variables, dark mode\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. Transitions, transforms and animations\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-css-l10",
            "title": "10. Mini project: responsive landing page",
            "duration": "07:19",
            "durationSeconds": 439,
            "videoUrl": CSS_VIDEOS[10],
            "summary": "Mini project capstone: assemble modern responsive CSS concepts into a polished production SaaS landing page.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:11",
                "timeSeconds": 131
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:45",
                "timeSeconds": 285
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:19",
                "timeSeconds": 439
              }
            ],
            "notes": "# 10. Mini project: responsive landing page\n\n## 📘 Summary\nMini project capstone: assemble modern responsive CSS concepts into a polished production SaaS landing page.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: responsive landing page\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-git-l1",
            "title": "1. Git basics: init, status, add, commit, log, .gitignore",
            "duration": "18:50",
            "durationSeconds": 1130,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Version control fundamentals: initializing repositories, staging changes, writing semantic commits, inspecting logs, and configuring .gitignore.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "05:39",
                "timeSeconds": 339
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "12:14",
                "timeSeconds": 734
              },
              {
                "title": "Summary & Best Practices",
                "time": "18:50",
                "timeSeconds": 1130
              }
            ],
            "notes": "# 1. Git basics: init, status, add, commit, log, .gitignore\n\n## 📘 Summary\nVersion control fundamentals: initializing repositories, staging changes, writing semantic commits, inspecting logs, and configuring .gitignore.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Git basics: init, status, add, commit, log, .gitignore\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Git basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-git-l2",
            "title": "2. Branching and merging: branch, switch, merge, resolving conflicts",
            "duration": "23:15",
            "durationSeconds": 1395,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Git branching strategy: creating feature branches, switching, merging with fast-forward vs 3-way merge, and step-by-step merge conflict resolution.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:58",
                "timeSeconds": 418
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:06",
                "timeSeconds": 906
              },
              {
                "title": "Summary & Best Practices",
                "time": "23:15",
                "timeSeconds": 1395
              }
            ],
            "notes": "# 2. Branching and merging: branch, switch, merge, resolving conflicts\n\n## 📘 Summary\nGit branching strategy: creating feature branches, switching, merging with fast-forward vs 3-way merge, and step-by-step merge conflict resolution.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Branching and merging: branch, switch, merge, resolving conflicts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Branching and merging\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m1-git-l3",
            "title": "3. GitHub: push, pull, clone, pull requests, GitHub Pages",
            "duration": "25:40",
            "durationSeconds": 1540,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Cloud collaboration: remote origin setup, cloning repositories, opening Pull Requests (PRs), code reviews, and deploying via GitHub Pages.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:42",
                "timeSeconds": 462
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "16:41",
                "timeSeconds": 1001
              },
              {
                "title": "Summary & Best Practices",
                "time": "25:40",
                "timeSeconds": 1540
              }
            ],
            "notes": "# 3. GitHub: push, pull, clone, pull requests, GitHub Pages\n\n## 📘 Summary\nCloud collaboration: remote origin setup, cloning repositories, opening Pull Requests (PRs), code reviews, and deploying via GitHub Pages.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. GitHub: push, pull, clone, pull requests, GitHub Pages\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. GitHub\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m2",
        "title": "Module 2: JavaScript Deep Dive",
        "duration": "6h 15m",
        "lessons": [
          {
            "id": "fs-m2-js-l1",
            "title": "1. JS basics: setup, variables (var, let, const), data types, operators",
            "duration": "22:30",
            "durationSeconds": 1350,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern JavaScript core: let vs const scoping, primitive types, type coercion, arithmetic, assignment, logical, and comparison operators.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:45",
                "timeSeconds": 405
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "14:37",
                "timeSeconds": 877
              },
              {
                "title": "Summary & Best Practices",
                "time": "22:30",
                "timeSeconds": 1350
              }
            ],
            "notes": "# 1. JS basics: setup, variables (var, let, const), data types, operators\n\n## 📘 Summary\nModern JavaScript core: let vs const scoping, primitive types, type coercion, arithmetic, assignment, logical, and comparison operators.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. JS basics: setup, variables (var, let, const), data types, operators\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. JS basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l2",
            "title": "2. Conditions and loops: if/else, switch, for, while, for...of",
            "duration": "24:15",
            "durationSeconds": 1455,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Control flow: conditional branching, switch statements, ternary operator, classic for loops, while loops, and modern for...of / for...in iteration.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:16",
                "timeSeconds": 436
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:45",
                "timeSeconds": 945
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:15",
                "timeSeconds": 1455
              }
            ],
            "notes": "# 2. Conditions and loops: if/else, switch, for, while, for...of\n\n## 📘 Summary\nControl flow: conditional branching, switch statements, ternary operator, classic for loops, while loops, and modern for...of / for...in iteration.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Conditions and loops: if/else, switch, for, while, for...of\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Conditions and loops\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l3",
            "title": "3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures",
            "duration": "31:50",
            "durationSeconds": 1910,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Master JavaScript functions: arrow syntax, default parameters, rest parameters, first-class functions, higher-order callbacks, lexical scope, and closures.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:33",
                "timeSeconds": 573
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:41",
                "timeSeconds": 1241
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:50",
                "timeSeconds": 1910
              }
            ],
            "notes": "# 3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures\n\n## 📘 Summary\nMaster JavaScript functions: arrow syntax, default parameters, rest parameters, first-class functions, higher-order callbacks, lexical scope, and closures.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Functions\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l4",
            "title": "4. Strings and arrays: methods, map, filter, reduce, find, sort, spread",
            "duration": "33:40",
            "durationSeconds": 2020,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Immutable array transformations: map, filter, reduce, find, some, every, sort comparator algorithms, string interpolation, and spread operator.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:06",
                "timeSeconds": 606
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:53",
                "timeSeconds": 1313
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:40",
                "timeSeconds": 2020
              }
            ],
            "notes": "# 4. Strings and arrays: methods, map, filter, reduce, find, sort, spread\n\n## 📘 Summary\nImmutable array transformations: map, filter, reduce, find, some, every, sort comparator algorithms, string interpolation, and spread operator.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Strings and arrays: methods, map, filter, reduce, find, sort, spread\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Strings and arrays\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l5",
            "title": "5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify",
            "duration": "27:20",
            "durationSeconds": 1640,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Object data structures: computed property keys, deep vs shallow copying, object destructuring, serialization with JSON.parse and JSON.stringify.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:12",
                "timeSeconds": 492
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:46",
                "timeSeconds": 1066
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:20",
                "timeSeconds": 1640
              }
            ],
            "notes": "# 5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify\n\n## 📘 Summary\nObject data structures: computed property keys, deep vs shallow copying, object destructuring, serialization with JSON.parse and JSON.stringify.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Objects and JSON\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l6",
            "title": "6. Error handling and ES6+ modules: try/catch, import/export",
            "duration": "21:10",
            "durationSeconds": 1270,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Resilient JavaScript: try/catch/finally blocks, throwing custom Error instances, ES modules (named vs default imports/exports), and circular dependencies.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:21",
                "timeSeconds": 381
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "13:45",
                "timeSeconds": 825
              },
              {
                "title": "Summary & Best Practices",
                "time": "21:10",
                "timeSeconds": 1270
              }
            ],
            "notes": "# 6. Error handling and ES6+ modules: try/catch, import/export\n\n## 📘 Summary\nResilient JavaScript: try/catch/finally blocks, throwing custom Error instances, ES modules (named vs default imports/exports), and circular dependencies.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Error handling and ES6+ modules: try/catch, import/export\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Error handling and ES6+ modules\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l7",
            "title": "7. Classes and prototypes: constructors, inheritance, this, call/apply/bind",
            "duration": "29:30",
            "durationSeconds": 1770,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Object-oriented JS: prototype chain, ES6 classes, constructor methods, super keyword, private fields, and explicit binding of \"this\" context.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:51",
                "timeSeconds": 531
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:10",
                "timeSeconds": 1150
              },
              {
                "title": "Summary & Best Practices",
                "time": "29:30",
                "timeSeconds": 1770
              }
            ],
            "notes": "# 7. Classes and prototypes: constructors, inheritance, this, call/apply/bind\n\n## 📘 Summary\nObject-oriented JS: prototype chain, ES6 classes, constructor methods, super keyword, private fields, and explicit binding of \"this\" context.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Classes and prototypes: constructors, inheritance, this, call/apply/bind\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Classes and prototypes\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l8",
            "title": "8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements",
            "duration": "28:45",
            "durationSeconds": 1725,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "DOM manipulation: querySelector, getElementById, textContent, innerHTML, classList API, style property, createElement, and appendChild.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:37",
                "timeSeconds": 517
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:41",
                "timeSeconds": 1121
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:45",
                "timeSeconds": 1725
              }
            ],
            "notes": "# 8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements\n\n## 📘 Summary\nDOM manipulation: querySelector, getElementById, textContent, innerHTML, classList API, style property, createElement, and appendChild.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. DOM part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l9",
            "title": "9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers",
            "duration": "32:10",
            "durationSeconds": 1930,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Event architecture: addEventListener, event bubbling, event capturing, event delegation, form submit prevention, and localStorage persistence.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:39",
                "timeSeconds": 579
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:54",
                "timeSeconds": 1254
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:10",
                "timeSeconds": 1930
              }
            ],
            "notes": "# 9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers\n\n## 📘 Summary\nEvent architecture: addEventListener, event bubbling, event capturing, event delegation, form submit prevention, and localStorage persistence.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. DOM part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l10",
            "title": "10. Async JS: event loop, callbacks, promises, async/await",
            "duration": "35:40",
            "durationSeconds": 2140,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Asynchronous JavaScript: call stack, web APIs, task queue, microtask queue, Promise lifecycle (resolve/reject), and async/await syntax.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:42",
                "timeSeconds": 642
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:11",
                "timeSeconds": 1391
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:40",
                "timeSeconds": 2140
              }
            ],
            "notes": "# 10. Async JS: event loop, callbacks, promises, async/await\n\n## 📘 Summary\nAsynchronous JavaScript: call stack, web APIs, task queue, microtask queue, Promise lifecycle (resolve/reject), and async/await syntax.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Async JS: event loop, callbacks, promises, async/await\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Async JS\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l11",
            "title": "11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs",
            "duration": "30:25",
            "durationSeconds": 1825,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "HTTP networking in JS: making GET/POST requests with fetch, sending JSON request bodies, setting custom authorization headers, and error handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:07",
                "timeSeconds": 547
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:46",
                "timeSeconds": 1186
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:25",
                "timeSeconds": 1825
              }
            ],
            "notes": "# 11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs\n\n## 📘 Summary\nHTTP networking in JS: making GET/POST requests with fetch, sending JSON request bodies, setting custom authorization headers, and error handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"11. Fetch API\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m2-js-l12",
            "title": "12. Mini projects: to-do app, weather app, quiz app",
            "duration": "45:00",
            "durationSeconds": 2700,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Three production mini projects: build a persistent Todo App with localStorage, an API-powered Weather App, and an interactive Quiz App.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "13:30",
                "timeSeconds": 810
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "29:15",
                "timeSeconds": 1755
              },
              {
                "title": "Summary & Best Practices",
                "time": "45:00",
                "timeSeconds": 2700
              }
            ],
            "notes": "# 12. Mini projects: to-do app, weather app, quiz app\n\n## 📘 Summary\nThree production mini projects: build a persistent Todo App with localStorage, an API-powered Weather App, and an interactive Quiz App.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"12. Mini projects: to-do app, weather app, quiz app\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"12. Mini projects\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m3",
        "title": "Module 3: Frontend with React",
        "duration": "5h 45m",
        "lessons": [
          {
            "id": "fs-m3-react-l1",
            "title": "1. React intro: why React, Vite setup, project structure, JSX",
            "duration": "24:10",
            "durationSeconds": 1450,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The React mental model: declarative UI, virtual DOM diffing, Vite scaffolding, project directory layout, and JSX syntax rules.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:15",
                "timeSeconds": 435
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:42",
                "timeSeconds": 942
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:10",
                "timeSeconds": 1450
              }
            ],
            "notes": "# 1. React intro: why React, Vite setup, project structure, JSX\n\n## 📘 Summary\nThe React mental model: declarative UI, virtual DOM diffing, Vite scaffolding, project directory layout, and JSX syntax rules.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. React intro: why React, Vite setup, project structure, JSX\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. React intro\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l2",
            "title": "2. Components and props: children, conditional rendering, lists and keys",
            "duration": "27:30",
            "durationSeconds": 1650,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Component architecture: functional components, prop passing, children prop, ternary conditional rendering, and mapping arrays with unique keys.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:15",
                "timeSeconds": 495
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:52",
                "timeSeconds": 1072
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:30",
                "timeSeconds": 1650
              }
            ],
            "notes": "# 2. Components and props: children, conditional rendering, lists and keys\n\n## 📘 Summary\nComponent architecture: functional components, prop passing, children prop, ternary conditional rendering, and mapping arrays with unique keys.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Components and props: children, conditional rendering, lists and keys\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Components and props\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l3",
            "title": "3. Events and forms: controlled vs uncontrolled inputs",
            "duration": "26:45",
            "durationSeconds": 1605,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "User interactions: synthetic event handlers, controlled input components with value and onChange, and form submit handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:01",
                "timeSeconds": 481
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:23",
                "timeSeconds": 1043
              },
              {
                "title": "Summary & Best Practices",
                "time": "26:45",
                "timeSeconds": 1605
              }
            ],
            "notes": "# 3. Events and forms: controlled vs uncontrolled inputs\n\n## 📘 Summary\nUser interactions: synthetic event handlers, controlled input components with value and onChange, and form submit handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Events and forms: controlled vs uncontrolled inputs\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Events and forms\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l4",
            "title": "4. useState: state, lifting state up",
            "duration": "28:50",
            "durationSeconds": 1730,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Managing component state: useState hook, updater functions, immutable state updates for arrays and objects, and lifting state up to parent components.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:39",
                "timeSeconds": 519
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:44",
                "timeSeconds": 1124
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:50",
                "timeSeconds": 1730
              }
            ],
            "notes": "# 4. useState: state, lifting state up\n\n## 📘 Summary\nManaging component state: useState hook, updater functions, immutable state updates for arrays and objects, and lifting state up to parent components.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. useState: state, lifting state up\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. useState\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l5",
            "title": "5. useEffect: side effects, dependency array, cleanup",
            "duration": "33:20",
            "durationSeconds": 2000,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Synchronizing with external systems: useEffect hook, understanding dependency arrays, data fetching patterns, and cleanup functions for timers/subscriptions.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:00",
                "timeSeconds": 600
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:40",
                "timeSeconds": 1300
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:20",
                "timeSeconds": 2000
              }
            ],
            "notes": "# 5. useEffect: side effects, dependency array, cleanup\n\n## 📘 Summary\nSynchronizing with external systems: useEffect hook, understanding dependency arrays, data fetching patterns, and cleanup functions for timers/subscriptions.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. useEffect: side effects, dependency array, cleanup\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. useEffect\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l6",
            "title": "6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks",
            "duration": "38:15",
            "durationSeconds": 2295,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Advanced React hooks: DOM access with useRef, memoization with useMemo & useCallback, global state with useContext, useReducer, and custom hooks.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:28",
                "timeSeconds": 688
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:51",
                "timeSeconds": 1491
              },
              {
                "title": "Summary & Best Practices",
                "time": "38:15",
                "timeSeconds": 2295
              }
            ],
            "notes": "# 6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks\n\n## 📘 Summary\nAdvanced React hooks: DOM access with useRef, memoization with useMemo & useCallback, global state with useContext, useReducer, and custom hooks.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Other hooks\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l7",
            "title": "7. React Router: routes, links, params, nested and protected routes",
            "duration": "31:40",
            "durationSeconds": 1900,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Client-side routing: React Router v6, BrowserRouter, Routes, Route, Link, NavLink, useParams, useSearchParams, and protected authentication gates.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:30",
                "timeSeconds": 570
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:35",
                "timeSeconds": 1235
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:40",
                "timeSeconds": 1900
              }
            ],
            "notes": "# 7. React Router: routes, links, params, nested and protected routes\n\n## 📘 Summary\nClient-side routing: React Router v6, BrowserRouter, Routes, Route, Link, NavLink, useParams, useSearchParams, and protected authentication gates.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. React Router: routes, links, params, nested and protected routes\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. React Router\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l8",
            "title": "8. API integration and state management: fetch/axios, loading and error states, Context, Zustand",
            "duration": "34:20",
            "durationSeconds": 2060,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Data fetching and state: Axios vs Fetch, managing loading/error states, Context API for user auth, and lightweight store management with Zustand.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:18",
                "timeSeconds": 618
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:19",
                "timeSeconds": 1339
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:20",
                "timeSeconds": 2060
              }
            ],
            "notes": "# 8. API integration and state management: fetch/axios, loading and error states, Context, Zustand\n\n## 📘 Summary\nData fetching and state: Axios vs Fetch, managing loading/error states, Context API for user auth, and lightweight store management with Zustand.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. API integration and state management: fetch/axios, loading and error states, Context, Zustand\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. API integration and state management\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l9",
            "title": "9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui",
            "duration": "32:50",
            "durationSeconds": 1970,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern frontend tooling: performant forms with React Hook Form, schema validation with Zod, rapid styling with Tailwind CSS, and shadcn/ui.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:51",
                "timeSeconds": 591
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:20",
                "timeSeconds": 1280
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:50",
                "timeSeconds": 1970
              }
            ],
            "notes": "# 9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui\n\n## 📘 Summary\nModern frontend tooling: performant forms with React Hook Form, schema validation with Zod, rapid styling with Tailwind CSS, and shadcn/ui.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. Forms and styling\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m3-react-l10",
            "title": "10. Mini project: dashboard or e-commerce frontend",
            "duration": "48:30",
            "durationSeconds": 2910,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Full frontend capstone: build a comprehensive responsive analytics dashboard or e-commerce storefront with cart state and filtering.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "14:33",
                "timeSeconds": 873
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "31:31",
                "timeSeconds": 1891
              },
              {
                "title": "Summary & Best Practices",
                "time": "48:30",
                "timeSeconds": 2910
              }
            ],
            "notes": "# 10. Mini project: dashboard or e-commerce frontend\n\n## 📘 Summary\nFull frontend capstone: build a comprehensive responsive analytics dashboard or e-commerce storefront with cart state and filtering.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: dashboard or e-commerce frontend\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m4",
        "title": "Module 4: Backend with Node.js & Express",
        "duration": "4h 15m",
        "lessons": [
          {
            "id": "fs-m4-node-l1",
            "title": "1. Node basics: runtime, npm, package.json, core modules, dotenv",
            "duration": "23:40",
            "durationSeconds": 1420,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Server-side JavaScript: Node.js runtime environment, npm scripts, package.json dependencies, fs/path core modules, and managing environment variables.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:06",
                "timeSeconds": 426
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:23",
                "timeSeconds": 923
              },
              {
                "title": "Summary & Best Practices",
                "time": "23:40",
                "timeSeconds": 1420
              }
            ],
            "notes": "# 1. Node basics: runtime, npm, package.json, core modules, dotenv\n\n## 📘 Summary\nServer-side JavaScript: Node.js runtime environment, npm scripts, package.json dependencies, fs/path core modules, and managing environment variables.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Node basics: runtime, npm, package.json, core modules, dotenv\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Node basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l2",
            "title": "2. Express basics: routing, params, query strings, project structure",
            "duration": "26:15",
            "durationSeconds": 1575,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Express web framework: initializing Express apps, route methods (GET, POST), URL parameters (req.params), query strings (req.query), and MVC architecture.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:52",
                "timeSeconds": 472
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:03",
                "timeSeconds": 1023
              },
              {
                "title": "Summary & Best Practices",
                "time": "26:15",
                "timeSeconds": 1575
              }
            ],
            "notes": "# 2. Express basics: routing, params, query strings, project structure\n\n## 📘 Summary\nExpress web framework: initializing Express apps, route methods (GET, POST), URL parameters (req.params), query strings (req.query), and MVC architecture.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Express basics: routing, params, query strings, project structure\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Express basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l3",
            "title": "3. Middleware: built-in, custom, cors, helmet, morgan, error handling",
            "duration": "29:50",
            "durationSeconds": 1790,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The middleware chain: req, res, next lifecycle, logging with Morgan, CORS headers, security with Helmet, and centralized global error handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:57",
                "timeSeconds": 537
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:23",
                "timeSeconds": 1163
              },
              {
                "title": "Summary & Best Practices",
                "time": "29:50",
                "timeSeconds": 1790
              }
            ],
            "notes": "# 3. Middleware: built-in, custom, cors, helmet, morgan, error handling\n\n## 📘 Summary\nThe middleware chain: req, res, next lifecycle, logging with Morgan, CORS headers, security with Helmet, and centralized global error handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Middleware: built-in, custom, cors, helmet, morgan, error handling\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Middleware\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l4",
            "title": "4. REST API design: HTTP methods, status codes, validation, Multer file upload",
            "duration": "34:10",
            "durationSeconds": 2050,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "RESTful API principles: HTTP status codes (200, 201, 400, 401, 404, 500), schema validation with Zod/Joi, and multipart/form-data file uploads with Multer.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:15",
                "timeSeconds": 615
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:12",
                "timeSeconds": 1332
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:10",
                "timeSeconds": 2050
              }
            ],
            "notes": "# 4. REST API design: HTTP methods, status codes, validation, Multer file upload\n\n## 📘 Summary\nRESTful API principles: HTTP status codes (200, 201, 400, 401, 404, 500), schema validation with Zod/Joi, and multipart/form-data file uploads with Multer.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. REST API design: HTTP methods, status codes, validation, Multer file upload\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. REST API design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l5",
            "title": "5. Authentication part 1: bcrypt password hashing, JWT, cookies",
            "duration": "37:20",
            "durationSeconds": 2240,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Secure authentication: hashing passwords with bcrypt salt rounds, generating JSON Web Tokens (JWT), and sending httpOnly secure session cookies.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:12",
                "timeSeconds": 672
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:16",
                "timeSeconds": 1456
              },
              {
                "title": "Summary & Best Practices",
                "time": "37:20",
                "timeSeconds": 2240
              }
            ],
            "notes": "# 5. Authentication part 1: bcrypt password hashing, JWT, cookies\n\n## 📘 Summary\nSecure authentication: hashing passwords with bcrypt salt rounds, generating JSON Web Tokens (JWT), and sending httpOnly secure session cookies.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Authentication part 1: bcrypt password hashing, JWT, cookies\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Authentication part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l6",
            "title": "6. Authentication part 2: refresh tokens, role-based access, Google login intro",
            "duration": "35:45",
            "durationSeconds": 2145,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Enterprise auth patterns: access vs refresh token rotation, Role-Based Access Control (RBAC) middleware (Admin vs Student), and OAuth2 Google Login.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:43",
                "timeSeconds": 643
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:14",
                "timeSeconds": 1394
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:45",
                "timeSeconds": 2145
              }
            ],
            "notes": "# 6. Authentication part 2: refresh tokens, role-based access, Google login intro\n\n## 📘 Summary\nEnterprise auth patterns: access vs refresh token rotation, Role-Based Access Control (RBAC) middleware (Admin vs Student), and OAuth2 Google Login.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Authentication part 2: refresh tokens, role-based access, Google login intro\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Authentication part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l7",
            "title": "7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics",
            "duration": "31:15",
            "durationSeconds": 1875,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Backend defensive security: preventing SQL/NoSQL injection, sanitizing user inputs against XSS, CSRF protection, and DDoS rate limiting with express-rate-limit.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:22",
                "timeSeconds": 562
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:18",
                "timeSeconds": 1218
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:15",
                "timeSeconds": 1875
              }
            ],
            "notes": "# 7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics\n\n## 📘 Summary\nBackend defensive security: preventing SQL/NoSQL injection, sanitizing user inputs against XSS, CSRF protection, and DDoS rate limiting with express-rate-limit.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Security\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m4-node-l8",
            "title": "8. Extras and project: Nodemailer, Postman, Swagger, blog or report API",
            "duration": "44:00",
            "durationSeconds": 2640,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Complete backend capstone: transactional emails with Nodemailer, API testing with Postman, Swagger OpenAPI docs, and building a full CRUD API.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "13:12",
                "timeSeconds": 792
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "28:36",
                "timeSeconds": 1716
              },
              {
                "title": "Summary & Best Practices",
                "time": "44:00",
                "timeSeconds": 2640
              }
            ],
            "notes": "# 8. Extras and project: Nodemailer, Postman, Swagger, blog or report API\n\n## 📘 Summary\nComplete backend capstone: transactional emails with Nodemailer, API testing with Postman, Swagger OpenAPI docs, and building a full CRUD API.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Extras and project: Nodemailer, Postman, Swagger, blog or report API\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Extras and project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m5",
        "title": "Module 5: Databases (SQL, Supabase & MongoDB)",
        "duration": "4h 25m",
        "lessons": [
          {
            "id": "fs-m5-db-l1",
            "title": "1. Database concepts and SQL basics: tables, keys, CRUD",
            "duration": "24:30",
            "durationSeconds": 1470,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Database foundations: Relational vs Non-Relational mental models, tables, columns, primary keys, foreign keys, and fundamental CRUD SQL queries.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:21",
                "timeSeconds": 441
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:55",
                "timeSeconds": 955
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:30",
                "timeSeconds": 1470
              }
            ],
            "notes": "# 1. Database concepts and SQL basics: tables, keys, CRUD\n\n## 📘 Summary\nDatabase foundations: Relational vs Non-Relational mental models, tables, columns, primary keys, foreign keys, and fundamental CRUD SQL queries.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Database concepts and SQL basics: tables, keys, CRUD\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Database concepts and SQL basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l2",
            "title": "2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions",
            "duration": "28:15",
            "durationSeconds": 1695,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Advanced querying: filtering with WHERE, sorting with ORDER BY, aggregations (COUNT, SUM, AVG), GROUP BY grouping, and HAVING conditions.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:28",
                "timeSeconds": 508
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:21",
                "timeSeconds": 1101
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:15",
                "timeSeconds": 1695
              }
            ],
            "notes": "# 2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions\n\n## 📘 Summary\nAdvanced querying: filtering with WHERE, sorting with ORDER BY, aggregations (COUNT, SUM, AVG), GROUP BY grouping, and HAVING conditions.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. SQL queries\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l3",
            "title": "3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N",
            "duration": "33:40",
            "durationSeconds": 2020,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Relational algebra: INNER JOIN, LEFT JOIN, RIGHT JOIN, full joins, and modeling One-to-One, One-to-Many, and Many-to-Many relationships with junction tables.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:06",
                "timeSeconds": 606
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:53",
                "timeSeconds": 1313
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:40",
                "timeSeconds": 2020
              }
            ],
            "notes": "# 3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N\n\n## 📘 Summary\nRelational algebra: INNER JOIN, LEFT JOIN, RIGHT JOIN, full joins, and modeling One-to-One, One-to-Many, and Many-to-Many relationships with junction tables.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Joins and relationships\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l4",
            "title": "4. Constraints, indexes, normalization, transactions, views",
            "duration": "32:10",
            "durationSeconds": 1930,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Database optimization: UNIQUE, NOT NULL, CHECK constraints, B-Tree indexes, database normalization (1NF, 2NF, 3NF), ACID transactions, and database views.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:39",
                "timeSeconds": 579
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:54",
                "timeSeconds": 1254
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:10",
                "timeSeconds": 1930
              }
            ],
            "notes": "# 4. Constraints, indexes, normalization, transactions, views\n\n## 📘 Summary\nDatabase optimization: UNIQUE, NOT NULL, CHECK constraints, B-Tree indexes, database normalization (1NF, 2NF, 3NF), ACID transactions, and database views.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Constraints, indexes, normalization, transactions, views\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Constraints, indexes, normalization, transactions, views\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l5",
            "title": "5. Supabase part 1: setup, tables, auth, storage",
            "duration": "30:45",
            "durationSeconds": 1845,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Cloud PostgreSQL with Supabase: creating project, managing schema with Table Editor, built-in Supabase Auth, and file storage buckets.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:13",
                "timeSeconds": 553
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:59",
                "timeSeconds": 1199
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:45",
                "timeSeconds": 1845
              }
            ],
            "notes": "# 5. Supabase part 1: setup, tables, auth, storage\n\n## 📘 Summary\nCloud PostgreSQL with Supabase: creating project, managing schema with Table Editor, built-in Supabase Auth, and file storage buckets.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Supabase part 1: setup, tables, auth, storage\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Supabase part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l6",
            "title": "6. Supabase part 2: Row Level Security, realtime, client in React and Next.js",
            "duration": "34:20",
            "durationSeconds": 2060,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Production Supabase: writing Row Level Security (RLS) policies, subscribing to PostgreSQL Realtime events, and connecting the Supabase JS client.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:18",
                "timeSeconds": 618
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:19",
                "timeSeconds": 1339
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:20",
                "timeSeconds": 2060
              }
            ],
            "notes": "# 6. Supabase part 2: Row Level Security, realtime, client in React and Next.js\n\n## 📘 Summary\nProduction Supabase: writing Row Level Security (RLS) policies, subscribing to PostgreSQL Realtime events, and connecting the Supabase JS client.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Supabase part 2: Row Level Security, realtime, client in React and Next.js\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Supabase part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l7",
            "title": "7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation",
            "duration": "36:50",
            "durationSeconds": 2210,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "NoSQL with MongoDB: collections, BSON documents, defining schemas and models with Mongoose, deep populate queries, and aggregation pipelines.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:03",
                "timeSeconds": 663
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:56",
                "timeSeconds": 1436
              },
              {
                "title": "Summary & Best Practices",
                "time": "36:50",
                "timeSeconds": 2210
              }
            ],
            "notes": "# 7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation\n\n## 📘 Summary\nNoSQL with MongoDB: collections, BSON documents, defining schemas and models with Mongoose, deep populate queries, and aggregation pipelines.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. MongoDB and Mongoose\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m5-db-l8",
            "title": "8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro",
            "duration": "39:10",
            "durationSeconds": 2350,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Architectural schema design: drawing ER diagrams, modeling production schemas for e-commerce, and introduction to modern ORMs with Prisma.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:45",
                "timeSeconds": 705
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "25:27",
                "timeSeconds": 1527
              },
              {
                "title": "Summary & Best Practices",
                "time": "39:10",
                "timeSeconds": 2350
              }
            ],
            "notes": "# 8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro\n\n## 📘 Summary\nArchitectural schema design: drawing ER diagrams, modeling production schemas for e-commerce, and introduction to modern ORMs with Prisma.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Schema design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m6",
        "title": "Module 6: Full Stack with Next.js",
        "duration": "3h 30m",
        "lessons": [
          {
            "id": "fs-m6-next-l1",
            "title": "1. Next.js intro: setup, App Router, file-based routing, layouts",
            "duration": "27:10",
            "durationSeconds": 1630,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The modern React framework: create-next-app, App Router architecture, page.tsx, layout.tsx, template.tsx, loading.tsx, and not-found.tsx.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:09",
                "timeSeconds": 489
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:39",
                "timeSeconds": 1059
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:10",
                "timeSeconds": 1630
              }
            ],
            "notes": "# 1. Next.js intro: setup, App Router, file-based routing, layouts\n\n## 📘 Summary\nThe modern React framework: create-next-app, App Router architecture, page.tsx, layout.tsx, template.tsx, loading.tsx, and not-found.tsx.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Next.js intro: setup, App Router, file-based routing, layouts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Next.js intro\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m6-next-l2",
            "title": "2. Server vs client components, loading and error UI",
            "duration": "31:25",
            "durationSeconds": 1885,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "React Server Components (RSC): server components by default, \"use client\" boundary, streaming with React Suspense, and error.tsx boundaries.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:25",
                "timeSeconds": 565
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:25",
                "timeSeconds": 1225
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:25",
                "timeSeconds": 1885
              }
            ],
            "notes": "# 2. Server vs client components, loading and error UI\n\n## 📘 Summary\nReact Server Components (RSC): server components by default, \"use client\" boundary, streaming with React Suspense, and error.tsx boundaries.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Server vs client components, loading and error UI\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Server vs client components, loading and error UI\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m6-next-l3",
            "title": "3. Data fetching: SSR, SSG, ISR, caching",
            "duration": "35:40",
            "durationSeconds": 2140,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern data fetching: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (revalidate), and fetch cache tags.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:42",
                "timeSeconds": 642
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:11",
                "timeSeconds": 1391
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:40",
                "timeSeconds": 2140
              }
            ],
            "notes": "# 3. Data fetching: SSR, SSG, ISR, caching\n\n## 📘 Summary\nModern data fetching: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (revalidate), and fetch cache tags.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Data fetching: SSR, SSG, ISR, caching\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Data fetching\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m6-next-l4",
            "title": "4. API route handlers and server actions",
            "duration": "33:15",
            "durationSeconds": 1995,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Full-stack Next.js: building REST endpoints with route.ts handlers and mutating database state directly with Server Actions (\"use server\").",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:58",
                "timeSeconds": 598
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:36",
                "timeSeconds": 1296
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:15",
                "timeSeconds": 1995
              }
            ],
            "notes": "# 4. API route handlers and server actions\n\n## 📘 Summary\nFull-stack Next.js: building REST endpoints with route.ts handlers and mutating database state directly with Server Actions (\"use server\").\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. API route handlers and server actions\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. API route handlers and server actions\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m6-next-l5",
            "title": "5. Auth, database connection, forms and file upload",
            "duration": "38:00",
            "durationSeconds": 2280,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Production Next.js workflows: connecting PostgreSQL / Supabase, NextAuth (Auth.js) session handling, server action form validations with Zod.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:24",
                "timeSeconds": 684
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:42",
                "timeSeconds": 1482
              },
              {
                "title": "Summary & Best Practices",
                "time": "38:00",
                "timeSeconds": 2280
              }
            ],
            "notes": "# 5. Auth, database connection, forms and file upload\n\n## 📘 Summary\nProduction Next.js workflows: connecting PostgreSQL / Supabase, NextAuth (Auth.js) session handling, server action form validations with Zod.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Auth, database connection, forms and file upload\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Auth, database connection, forms and file upload\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m6-next-l6",
            "title": "6. SEO, metadata, image and font optimization, mini project",
            "duration": "42:30",
            "durationSeconds": 2550,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Performance and SEO: dynamic metadata generateMetadata(), next/image optimization, next/font, and building an end-to-end full stack Next.js mini project.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "12:45",
                "timeSeconds": 765
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "27:37",
                "timeSeconds": 1657
              },
              {
                "title": "Summary & Best Practices",
                "time": "42:30",
                "timeSeconds": 2550
              }
            ],
            "notes": "# 6. SEO, metadata, image and font optimization, mini project\n\n## 📘 Summary\nPerformance and SEO: dynamic metadata generateMetadata(), next/image optimization, next/font, and building an end-to-end full stack Next.js mini project.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. SEO, metadata, image and font optimization, mini project\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. SEO, metadata, image and font optimization, mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m7",
        "title": "Module 7: Cloud Deployment & DevOps",
        "duration": "1h 50m",
        "lessons": [
          {
            "id": "fs-m7-dep-l1",
            "title": "1. Environment variables, secrets, build process",
            "duration": "22:15",
            "durationSeconds": 1335,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Production readiness: managing production environment variables, separating client/server secrets, and optimizing webpack/vite production builds.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:40",
                "timeSeconds": 400
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "14:27",
                "timeSeconds": 867
              },
              {
                "title": "Summary & Best Practices",
                "time": "22:15",
                "timeSeconds": 1335
              }
            ],
            "notes": "# 1. Environment variables, secrets, build process\n\n## 📘 Summary\nProduction readiness: managing production environment variables, separating client/server secrets, and optimizing webpack/vite production builds.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Environment variables, secrets, build process\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Environment variables, secrets, build process\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m7-dep-l2",
            "title": "2. Deploying on Vercel, Netlify, Render, Railway",
            "duration": "28:30",
            "durationSeconds": 1710,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Cloud hosting walkthrough: deploying frontend to Vercel and Netlify, deploying Node.js backend servers to Render and Railway.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:33",
                "timeSeconds": 513
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:31",
                "timeSeconds": 1111
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:30",
                "timeSeconds": 1710
              }
            ],
            "notes": "# 2. Deploying on Vercel, Netlify, Render, Railway\n\n## 📘 Summary\nCloud hosting walkthrough: deploying frontend to Vercel and Netlify, deploying Node.js backend servers to Render and Railway.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Deploying on Vercel, Netlify, Render, Railway\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Deploying on Vercel, Netlify, Render, Railway\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m7-dep-l3",
            "title": "3. Domains, DNS, SSL",
            "duration": "24:45",
            "durationSeconds": 1485,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Custom domains and networking: configuring DNS records (A, CNAME, TXT), automated SSL/TLS certificates, and reverse proxy routing.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:25",
                "timeSeconds": 445
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "16:05",
                "timeSeconds": 965
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:45",
                "timeSeconds": 1485
              }
            ],
            "notes": "# 3. Domains, DNS, SSL\n\n## 📘 Summary\nCustom domains and networking: configuring DNS records (A, CNAME, TXT), automated SSL/TLS certificates, and reverse proxy routing.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Domains, DNS, SSL\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Domains, DNS, SSL\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m7-dep-l4",
            "title": "4. CI/CD with GitHub Actions and Docker basics",
            "duration": "34:10",
            "durationSeconds": 2050,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "DevOps pipelines: writing GitHub Actions workflows for automated testing and deployment, and containerizing full stack apps with Docker and Docker Compose.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:15",
                "timeSeconds": 615
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:12",
                "timeSeconds": 1332
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:10",
                "timeSeconds": 2050
              }
            ],
            "notes": "# 4. CI/CD with GitHub Actions and Docker basics\n\n## 📘 Summary\nDevOps pipelines: writing GitHub Actions workflows for automated testing and deployment, and containerizing full stack apps with Docker and Docker Compose.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. CI/CD with GitHub Actions and Docker basics\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. CI/CD with GitHub Actions and Docker basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      },
      {
        "id": "fs-m8",
        "title": "Module 8: Real-World Capstone Projects",
        "duration": "5h 40m",
        "lessons": [
          {
            "id": "fs-m8-cap-l1",
            "title": "1. E-Commerce App: Requirements, wireframes and database design",
            "duration": "32:00",
            "durationSeconds": 1920,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 1 Architecture: defining product requirements, user journeys, wireframing cart & checkout flows, and designing PostgreSQL schemas.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:36",
                "timeSeconds": 576
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:48",
                "timeSeconds": 1248
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:00",
                "timeSeconds": 1920
              }
            ],
            "notes": "# 1. E-Commerce App: Requirements, wireframes and database design\n\n## 📘 Summary\nProject 1 Architecture: defining product requirements, user journeys, wireframing cart & checkout flows, and designing PostgreSQL schemas.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. E-Commerce App: Requirements, wireframes and database design\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. E-Commerce App\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l2",
            "title": "2. E-Commerce App: Frontend and backend build walkthrough",
            "duration": "52:15",
            "durationSeconds": 3135,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 1 Implementation: building React/Next.js product catalog, cart state, Express backend APIs, Stripe payments, and order processing.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "15:40",
                "timeSeconds": 940
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "33:57",
                "timeSeconds": 2037
              },
              {
                "title": "Summary & Best Practices",
                "time": "52:15",
                "timeSeconds": 3135
              }
            ],
            "notes": "# 2. E-Commerce App: Frontend and backend build walkthrough\n\n## 📘 Summary\nProject 1 Implementation: building React/Next.js product catalog, cart state, Express backend APIs, Stripe payments, and order processing.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. E-Commerce App: Frontend and backend build walkthrough\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. E-Commerce App\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l3",
            "title": "3. E-Commerce App: Deployment, README and demo",
            "duration": "28:40",
            "durationSeconds": 1720,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 1 Launch: production cloud deployment, writing professional GitHub README documentation, adding seed data, and live demo.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:36",
                "timeSeconds": 516
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:38",
                "timeSeconds": 1118
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:40",
                "timeSeconds": 1720
              }
            ],
            "notes": "# 3. E-Commerce App: Deployment, README and demo\n\n## 📘 Summary\nProject 1 Launch: production cloud deployment, writing professional GitHub README documentation, adding seed data, and live demo.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. E-Commerce App: Deployment, README and demo\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. E-Commerce App\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l4",
            "title": "4. Report Management System: Requirements, wireframes and database design",
            "duration": "30:15",
            "durationSeconds": 1815,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 2 Architecture: enterprise reporting portal requirements, role permissions, analytics wireframes, and relational schema modeling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:04",
                "timeSeconds": 544
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:39",
                "timeSeconds": 1179
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:15",
                "timeSeconds": 1815
              }
            ],
            "notes": "# 4. Report Management System: Requirements, wireframes and database design\n\n## 📘 Summary\nProject 2 Architecture: enterprise reporting portal requirements, role permissions, analytics wireframes, and relational schema modeling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Report Management System: Requirements, wireframes and database design\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Report Management System\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l5",
            "title": "5. Report Management System: Frontend and backend build walkthrough",
            "duration": "49:30",
            "durationSeconds": 2970,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 2 Implementation: dashboard data tables, charting with Recharts, CSV/PDF report generation, and role-based access control.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "14:51",
                "timeSeconds": 891
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "32:10",
                "timeSeconds": 1930
              },
              {
                "title": "Summary & Best Practices",
                "time": "49:30",
                "timeSeconds": 2970
              }
            ],
            "notes": "# 5. Report Management System: Frontend and backend build walkthrough\n\n## 📘 Summary\nProject 2 Implementation: dashboard data tables, charting with Recharts, CSV/PDF report generation, and role-based access control.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Report Management System: Frontend and backend build walkthrough\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Report Management System\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l6",
            "title": "6. Report Management System: Deployment, README and demo",
            "duration": "26:20",
            "durationSeconds": 1580,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 2 Launch: cloud deployment, configuring cron backup jobs, writing architectural docs, and production verification.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:54",
                "timeSeconds": 474
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:07",
                "timeSeconds": 1027
              },
              {
                "title": "Summary & Best Practices",
                "time": "26:20",
                "timeSeconds": 1580
              }
            ],
            "notes": "# 6. Report Management System: Deployment, README and demo\n\n## 📘 Summary\nProject 2 Launch: cloud deployment, configuring cron backup jobs, writing architectural docs, and production verification.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Report Management System: Deployment, README and demo\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Report Management System\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l7",
            "title": "7. Own Capstone Idea: Requirements, wireframes and database design",
            "duration": "28:10",
            "durationSeconds": 1690,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 3 Architecture: step-by-step guidance to plan, scope, design, and architect your own custom full-stack SaaS or startup idea.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:27",
                "timeSeconds": 507
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:18",
                "timeSeconds": 1098
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:10",
                "timeSeconds": 1690
              }
            ],
            "notes": "# 7. Own Capstone Idea: Requirements, wireframes and database design\n\n## 📘 Summary\nProject 3 Architecture: step-by-step guidance to plan, scope, design, and architect your own custom full-stack SaaS or startup idea.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Own Capstone Idea: Requirements, wireframes and database design\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Own Capstone Idea\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l8",
            "title": "8. Own Capstone Idea: Frontend and backend build walkthrough",
            "duration": "45:00",
            "durationSeconds": 2700,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 3 Implementation: architectural coding patterns, debugging complex workflows, and integrating AI or 3rd-party APIs.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "13:30",
                "timeSeconds": 810
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "29:15",
                "timeSeconds": 1755
              },
              {
                "title": "Summary & Best Practices",
                "time": "45:00",
                "timeSeconds": 2700
              }
            ],
            "notes": "# 8. Own Capstone Idea: Frontend and backend build walkthrough\n\n## 📘 Summary\nProject 3 Implementation: architectural coding patterns, debugging complex workflows, and integrating AI or 3rd-party APIs.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Own Capstone Idea: Frontend and backend build walkthrough\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Own Capstone Idea\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "fs-m8-cap-l9",
            "title": "9. Own Capstone Idea: Deployment, README and demo",
            "duration": "30:00",
            "durationSeconds": 1800,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Project 3 Launch: live deployment, domain binding, portfolio showcase presentation, and preparing for technical engineering interviews.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:00",
                "timeSeconds": 540
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:30",
                "timeSeconds": 1170
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:00",
                "timeSeconds": 1800
              }
            ],
            "notes": "# 9. Own Capstone Idea: Deployment, README and demo\n\n## 📘 Summary\nProject 3 Launch: live deployment, domain binding, portfolio showcase presentation, and preparing for technical engineering interviews.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. Own Capstone Idea: Deployment, README and demo\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. Own Capstone Idea\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-html",
    "slug": "html",
    "title": "HTML5 Modern Web Basics & Semantic Architecture",
    "subtitle": "Master browser architecture, document structure, semantic tags, forms, media, and WCAG accessibility.",
    "category": "Frontend",
    "level": "Beginner",
    "rating": 4.94,
    "reviewsCount": 2450,
    "enrolledCount": 24800,
    "totalDuration": "1h 12m",
    "totalLectures": 10,
    "accentColor": "#F97316",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹999",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerHtmlSvg,
    "description": "10 comprehensive video lectures covering web basics, text, links, responsive media, tables, lists, HTML5 forms, semantic landmarks, ARIA accessibility, SEO metadata, and a real-world registration profile mini project.",
    "learningOutcomes": [
      "Write 100% semantic and accessible HTML5 compliant with WCAG standards",
      "Structure advanced forms with native validation attributes and fieldsets",
      "Implement meta tags, OpenGraph social cards, and localStorage APIs",
      "Build an accessible profile page and registration form from scratch"
    ],
    "prerequisites": [
      "No prerequisites. Beginner friendly!"
    ],
    "modules": [
      {
        "id": "html-m1",
        "title": "HTML5 Complete Masterclass (10 Video Lessons)",
        "duration": "1h 12m",
        "lessons": [
          {
            "id": "html-l1",
            "title": "1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure",
            "duration": "07:48",
            "durationSeconds": 468,
            "videoUrl": HTML_VIDEOS[1],
            "summary": "Understand the fundamental architecture of the web: DNS resolution, client-server model, HTTP/HTTPS protocols, request-response lifecycles, and HTML document boilerplate structure.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:20",
                "timeSeconds": 140
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:04",
                "timeSeconds": 304
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:48",
                "timeSeconds": 468
              }
            ],
            "notes": "# 1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure\n\n## 📘 Summary\nUnderstand the fundamental architecture of the web: DNS resolution, client-server model, HTTP/HTTPS protocols, request-response lifecycles, and HTML document boilerplate structure.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Web basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l2",
            "title": "2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths",
            "duration": "06:35",
            "durationSeconds": 395,
            "videoUrl": HTML_VIDEOS[2],
            "summary": "Master typographic semantics: h1-h6 hierarchy, paragraphs, bold/emphasis tags, relative versus absolute pathing, and anchor links.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:58",
                "timeSeconds": 118
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:16",
                "timeSeconds": 256
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:35",
                "timeSeconds": 395
              }
            ],
            "notes": "# 2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths\n\n## 📘 Summary\nMaster typographic semantics: h1-h6 hierarchy, paragraphs, bold/emphasis tags, relative versus absolute pathing, and anchor links.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Text and links\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l3",
            "title": "3. Images and media: img, alt, figure, picture, audio, video, iframe",
            "duration": "08:04",
            "durationSeconds": 484,
            "videoUrl": HTML_VIDEOS[3],
            "summary": "Embed responsive media: responsive image sets with picture tag, accessibility alt rules, audio, video players, and sandboxed iframes.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:25",
                "timeSeconds": 145
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:14",
                "timeSeconds": 314
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:04",
                "timeSeconds": 484
              }
            ],
            "notes": "# 3. Images and media: img, alt, figure, picture, audio, video, iframe\n\n## 📘 Summary\nEmbed responsive media: responsive image sets with picture tag, accessibility alt rules, audio, video players, and sandboxed iframes.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Images and media: img, alt, figure, picture, audio, video, iframe\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Images and media\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l4",
            "title": "4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan",
            "duration": "09:48",
            "durationSeconds": 588,
            "videoUrl": HTML_VIDEOS[4],
            "summary": "Structure ordered and unordered lists, nested navigations, tabular data, table headers, colspans, and rowspans.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:56",
                "timeSeconds": 176
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "06:22",
                "timeSeconds": 382
              },
              {
                "title": "Summary & Best Practices",
                "time": "09:48",
                "timeSeconds": 588
              }
            ],
            "notes": "# 4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan\n\n## 📘 Summary\nStructure ordered and unordered lists, nested navigations, tabular data, table headers, colspans, and rowspans.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Lists and tables\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l5",
            "title": "5. Forms part 1: input types, label, select, textarea, button",
            "duration": "06:47",
            "durationSeconds": 407,
            "videoUrl": HTML_VIDEOS[5],
            "summary": "Form architecture: connecting labels to inputs using for/id, handling text, email, number, select dropdowns, textareas, and submit buttons.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:02",
                "timeSeconds": 122
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:24",
                "timeSeconds": 264
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:47",
                "timeSeconds": 407
              }
            ],
            "notes": "# 5. Forms part 1: input types, label, select, textarea, button\n\n## 📘 Summary\nForm architecture: connecting labels to inputs using for/id, handling text, email, number, select dropdowns, textareas, and submit buttons.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Forms part 1: input types, label, select, textarea, button\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Forms part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l6",
            "title": "6. Forms part 2: validation attributes, fieldset, datalist",
            "duration": "05:49",
            "durationSeconds": 349,
            "videoUrl": HTML_VIDEOS[6],
            "summary": "Native HTML5 form constraints: required, min/max, pattern regex, grouping with fieldset/legend, and autocomplete with datalists.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:44",
                "timeSeconds": 104
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "03:46",
                "timeSeconds": 226
              },
              {
                "title": "Summary & Best Practices",
                "time": "05:49",
                "timeSeconds": 349
              }
            ],
            "notes": "# 6. Forms part 2: validation attributes, fieldset, datalist\n\n## 📘 Summary\nNative HTML5 form constraints: required, min/max, pattern regex, grouping with fieldset/legend, and autocomplete with datalists.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Forms part 2: validation attributes, fieldset, datalist\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Forms part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l7",
            "title": "7. Semantic HTML: header, nav, main, section, article, aside, footer",
            "duration": "07:28",
            "durationSeconds": 448,
            "videoUrl": HTML_VIDEOS[7],
            "summary": "Eliminate unsemantic div soup by adopting landmark elements that boost SEO and screen reader accessibility navigation.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:14",
                "timeSeconds": 134
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:51",
                "timeSeconds": 291
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:28",
                "timeSeconds": 448
              }
            ],
            "notes": "# 7. Semantic HTML: header, nav, main, section, article, aside, footer\n\n## 📘 Summary\nEliminate unsemantic div soup by adopting landmark elements that boost SEO and screen reader accessibility navigation.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Semantic HTML: header, nav, main, section, article, aside, footer\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Semantic HTML\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l8",
            "title": "8. Accessibility: ARIA, alt text, tab order, keyboard navigation",
            "duration": "06:41",
            "durationSeconds": 401,
            "videoUrl": HTML_VIDEOS[8],
            "summary": "WCAG compliance standards: accessible roles, aria-live regions, keyboard tab indexing, skip links, and focus indicators.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:00",
                "timeSeconds": 120
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:20",
                "timeSeconds": 260
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:41",
                "timeSeconds": 401
              }
            ],
            "notes": "# 8. Accessibility: ARIA, alt text, tab order, keyboard navigation\n\n## 📘 Summary\nWCAG compliance standards: accessible roles, aria-live regions, keyboard tab indexing, skip links, and focus indicators.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Accessibility: ARIA, alt text, tab order, keyboard navigation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Accessibility\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l9",
            "title": "9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation",
            "duration": "06:56",
            "durationSeconds": 416,
            "videoUrl": HTML_VIDEOS[9],
            "summary": "Search engine optimization: meta viewport, Open Graph social share tags, robots indexing, and browser Web APIs.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:04",
                "timeSeconds": 124
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:30",
                "timeSeconds": 270
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:56",
                "timeSeconds": 416
              }
            ],
            "notes": "# 9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation\n\n## 📘 Summary\nSearch engine optimization: meta viewport, Open Graph social share tags, robots indexing, and browser Web APIs.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. SEO and HTML5 APIs\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "html-l10",
            "title": "10. Mini project: profile page and registration form",
            "duration": "06:25",
            "durationSeconds": 385,
            "videoUrl": HTML_VIDEOS[10],
            "summary": "Complete end-to-end hands-on project: craft an accessible personal portfolio profile page with an interactive validated registration form.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:55",
                "timeSeconds": 115
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:10",
                "timeSeconds": 250
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:25",
                "timeSeconds": 385
              }
            ],
            "notes": "# 10. Mini project: profile page and registration form\n\n## 📘 Summary\nComplete end-to-end hands-on project: craft an accessible personal portfolio profile page with an interactive validated registration form.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: profile page and registration form\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-css",
    "slug": "css",
    "title": "Modern CSS3, Flexbox, Grid & Responsive Design",
    "subtitle": "From box model and specificity to Flexbox, CSS Grid, mobile-first responsive design, animations, and dark mode.",
    "category": "Frontend",
    "level": "Beginner",
    "rating": 4.95,
    "reviewsCount": 2890,
    "enrolledCount": 29100,
    "totalDuration": "1h 17m",
    "totalLectures": 10,
    "accentColor": "#3B82F6",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹999",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerCssSvg,
    "description": "10 in-depth video lectures mastering CSS basics, color systems, typography, the Box Model, coordinates & positioning, Flexbox, CSS Grid, mobile-first responsive design, transitions, keyframes, CSS variables, and building a responsive landing page.",
    "learningOutcomes": [
      "Master the CSS box model, margin collapsing, and box-sizing",
      "Build flexible 1D layouts with Flexbox and 2D responsive grids with CSS Grid",
      "Write fluid media queries and implement mobile-first responsive layouts",
      "Create smooth micro-interactions, CSS keyframe animations, and dark mode themes"
    ],
    "prerequisites": [
      "Basic HTML knowledge."
    ],
    "modules": [
      {
        "id": "css-m1",
        "title": "Modern CSS3 & Responsive Design (10 Video Lessons)",
        "duration": "1h 17m",
        "lessons": [
          {
            "id": "css-l1",
            "title": "1. CSS basics: ways to add CSS, selectors, specificity, inheritance",
            "duration": "08:40",
            "durationSeconds": 520,
            "videoUrl": CSS_VIDEOS[1],
            "summary": "CSS fundamentals: inline vs internal vs external stylesheets, selector engines, calculation of specificity points, and property inheritance.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:36",
                "timeSeconds": 156
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:38",
                "timeSeconds": 338
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:40",
                "timeSeconds": 520
              }
            ],
            "notes": "# 1. CSS basics: ways to add CSS, selectors, specificity, inheritance\n\n## 📘 Summary\nCSS fundamentals: inline vs internal vs external stylesheets, selector engines, calculation of specificity points, and property inheritance.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. CSS basics: ways to add CSS, selectors, specificity, inheritance\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. CSS basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l2",
            "title": "2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts",
            "duration": "06:19",
            "durationSeconds": 379,
            "videoUrl": CSS_VIDEOS[2],
            "summary": "Visual fundamentals: color formats (HEX, RGB, HSL), relative sizing with rem/em/vw/vh, typography hierarchy, and Google Fonts integration.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:53",
                "timeSeconds": 113
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:06",
                "timeSeconds": 246
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:19",
                "timeSeconds": 379
              }
            ],
            "notes": "# 2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts\n\n## 📘 Summary\nVisual fundamentals: color formats (HEX, RGB, HSL), relative sizing with rem/em/vw/vh, typography hierarchy, and Google Fonts integration.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Colors, units and typography\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l3",
            "title": "3. Box model: padding, border, margin, box-sizing, backgrounds, shadows",
            "duration": "06:36",
            "durationSeconds": 396,
            "videoUrl": CSS_VIDEOS[3],
            "summary": "Deep dive into content, padding, border, and margin. Understand box-sizing: border-box, background layers, and multi-layered drop shadows.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:58",
                "timeSeconds": 118
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:17",
                "timeSeconds": 257
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:36",
                "timeSeconds": 396
              }
            ],
            "notes": "# 3. Box model: padding, border, margin, box-sizing, backgrounds, shadows\n\n## 📘 Summary\nDeep dive into content, padding, border, and margin. Understand box-sizing: border-box, background layers, and multi-layered drop shadows.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Box model: padding, border, margin, box-sizing, backgrounds, shadows\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Box model\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l4",
            "title": "4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index",
            "duration": "10:02",
            "durationSeconds": 602,
            "videoUrl": CSS_VIDEOS[4],
            "summary": "Document flow and coordinate positioning: relative, absolute positioning within containers, sticky headers, fixed navbars, and z-index stacking.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "03:00",
                "timeSeconds": 180
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "06:31",
                "timeSeconds": 391
              },
              {
                "title": "Summary & Best Practices",
                "time": "10:02",
                "timeSeconds": 602
              }
            ],
            "notes": "# 4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index\n\n## 📘 Summary\nDocument flow and coordinate positioning: relative, absolute positioning within containers, sticky headers, fixed navbars, and z-index stacking.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Display and position\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l5",
            "title": "5. Flexbox part 1: container properties, alignment, wrapping, gap",
            "duration": "08:19",
            "durationSeconds": 499,
            "videoUrl": CSS_VIDEOS[5],
            "summary": "1D Layouts with Flexbox: flex-direction, justify-content, align-items, flex-wrap, and modern gap spacing.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:29",
                "timeSeconds": 149
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:24",
                "timeSeconds": 324
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:19",
                "timeSeconds": 499
              }
            ],
            "notes": "# 5. Flexbox part 1: container properties, alignment, wrapping, gap\n\n## 📘 Summary\n1D Layouts with Flexbox: flex-direction, justify-content, align-items, flex-wrap, and modern gap spacing.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Flexbox part 1: container properties, alignment, wrapping, gap\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Flexbox part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l6",
            "title": "6. Flexbox part 2: item properties and common layouts (navbar, cards)",
            "duration": "08:45",
            "durationSeconds": 525,
            "videoUrl": CSS_VIDEOS[6],
            "summary": "Flex items: flex-grow, flex-shrink, flex-basis, align-self, and building real-world responsive navigation bars and pricing card grids.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:37",
                "timeSeconds": 157
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:41",
                "timeSeconds": 341
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:45",
                "timeSeconds": 525
              }
            ],
            "notes": "# 6. Flexbox part 2: item properties and common layouts (navbar, cards)\n\n## 📘 Summary\nFlex items: flex-grow, flex-shrink, flex-basis, align-self, and building real-world responsive navigation bars and pricing card grids.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Flexbox part 2: item properties and common layouts (navbar, cards)\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Flexbox part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l7",
            "title": "7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax",
            "duration": "06:42",
            "durationSeconds": 402,
            "videoUrl": CSS_VIDEOS[7],
            "summary": "2D Layouts with CSS Grid: fractional units (fr), grid-template-areas, repeat syntax, auto-fit, auto-fill, and dynamic minmax constraints.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:00",
                "timeSeconds": 120
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:21",
                "timeSeconds": 261
              },
              {
                "title": "Summary & Best Practices",
                "time": "06:42",
                "timeSeconds": 402
              }
            ],
            "notes": "# 7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax\n\n## 📘 Summary\n2D Layouts with CSS Grid: fractional units (fr), grid-template-areas, repeat syntax, auto-fit, auto-fill, and dynamic minmax constraints.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. CSS Grid\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l8",
            "title": "8. Responsive design: mobile-first, media queries, breakpoints, responsive images",
            "duration": "05:41",
            "durationSeconds": 341,
            "videoUrl": CSS_VIDEOS[8],
            "summary": "Mobile-first responsive design: layout fluidification, breakpoint strategies, and picture elements.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "01:42",
                "timeSeconds": 102
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "03:41",
                "timeSeconds": 221
              },
              {
                "title": "Summary & Best Practices",
                "time": "05:41",
                "timeSeconds": 341
              }
            ],
            "notes": "# 8. Responsive design: mobile-first, media queries, breakpoints, responsive images\n\n## 📘 Summary\nMobile-first responsive design: layout fluidification, breakpoint strategies, and picture elements.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Responsive design: mobile-first, media queries, breakpoints, responsive images\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Responsive design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l9",
            "title": "9. Transitions, transforms and animations: keyframes, CSS variables, dark mode",
            "duration": "08:51",
            "durationSeconds": 531,
            "videoUrl": CSS_VIDEOS[9],
            "summary": "Motion & Modern CSS: transition timing curves, 2D/3D hardware-accelerated transforms, CSS variables, and dark mode themes.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:39",
                "timeSeconds": 159
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "05:45",
                "timeSeconds": 345
              },
              {
                "title": "Summary & Best Practices",
                "time": "08:51",
                "timeSeconds": 531
              }
            ],
            "notes": "# 9. Transitions, transforms and animations: keyframes, CSS variables, dark mode\n\n## 📘 Summary\nMotion & Modern CSS: transition timing curves, 2D/3D hardware-accelerated transforms, CSS variables, and dark mode themes.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. Transitions, transforms and animations: keyframes, CSS variables, dark mode\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. Transitions, transforms and animations\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "css-l10",
            "title": "10. Mini project: responsive landing page",
            "duration": "07:19",
            "durationSeconds": 439,
            "videoUrl": CSS_VIDEOS[10],
            "summary": "Mini project capstone: assemble modern responsive CSS concepts into a polished production SaaS landing page.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "02:11",
                "timeSeconds": 131
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "04:45",
                "timeSeconds": 285
              },
              {
                "title": "Summary & Best Practices",
                "time": "07:19",
                "timeSeconds": 439
              }
            ],
            "notes": "# 10. Mini project: responsive landing page\n\n## 📘 Summary\nMini project capstone: assemble modern responsive CSS concepts into a polished production SaaS landing page.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: responsive landing page\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-git",
    "slug": "git-and-github",
    "title": "Git & GitHub Version Control & Team Workflows",
    "subtitle": "Master repository initialization, staging, commits, branches, resolving merge conflicts, and GitHub collaboration.",
    "category": "DevOps",
    "level": "Beginner",
    "rating": 4.93,
    "reviewsCount": 1820,
    "enrolledCount": 19800,
    "totalDuration": "1h 10m",
    "totalLectures": 3,
    "accentColor": "#EF4444",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹999",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerGitSvg,
    "description": "3 comprehensive video lectures mastering Git basics (init, add, commit, log, .gitignore), branching & merging (feature branches, conflict resolution), and GitHub collaboration (pull requests, code reviews, and GitHub Pages).",
    "learningOutcomes": [
      "Track code versions locally with atomic commits and meaningful messages",
      "Create, switch, and merge git branches and resolve merge conflicts with ease",
      "Collaborate on GitHub with remotes, pull requests, and deploy to GitHub Pages"
    ],
    "prerequisites": [
      "None. Works on Windows, Mac, and Linux."
    ],
    "modules": [
      {
        "id": "git-m1",
        "title": "Git & GitHub Essentials",
        "duration": "1h 10m",
        "lessons": [
          {
            "id": "git-l1",
            "title": "1. Git basics: init, status, add, commit, log, .gitignore",
            "duration": "18:50",
            "durationSeconds": 1130,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Version control fundamentals: initializing repositories, staging changes, writing semantic commits, inspecting logs, and configuring .gitignore.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "05:39",
                "timeSeconds": 339
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "12:14",
                "timeSeconds": 734
              },
              {
                "title": "Summary & Best Practices",
                "time": "18:50",
                "timeSeconds": 1130
              }
            ],
            "notes": "# 1. Git basics: init, status, add, commit, log, .gitignore\n\n## 📘 Summary\nVersion control fundamentals: initializing repositories, staging changes, writing semantic commits, inspecting logs, and configuring .gitignore.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Git basics: init, status, add, commit, log, .gitignore\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Git basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "git-l2",
            "title": "2. Branching and merging: branch, switch, merge, resolving conflicts",
            "duration": "23:15",
            "durationSeconds": 1395,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Git branching strategy: creating feature branches, switching, merging with fast-forward vs 3-way merge, and step-by-step merge conflict resolution.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:58",
                "timeSeconds": 418
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:06",
                "timeSeconds": 906
              },
              {
                "title": "Summary & Best Practices",
                "time": "23:15",
                "timeSeconds": 1395
              }
            ],
            "notes": "# 2. Branching and merging: branch, switch, merge, resolving conflicts\n\n## 📘 Summary\nGit branching strategy: creating feature branches, switching, merging with fast-forward vs 3-way merge, and step-by-step merge conflict resolution.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Branching and merging: branch, switch, merge, resolving conflicts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Branching and merging\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "git-l3",
            "title": "3. GitHub: push, pull, clone, pull requests, GitHub Pages",
            "duration": "25:40",
            "durationSeconds": 1540,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Cloud collaboration: remote origin setup, cloning repositories, opening Pull Requests (PRs), code reviews, and deploying via GitHub Pages.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:42",
                "timeSeconds": 462
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "16:41",
                "timeSeconds": 1001
              },
              {
                "title": "Summary & Best Practices",
                "time": "25:40",
                "timeSeconds": 1540
              }
            ],
            "notes": "# 3. GitHub: push, pull, clone, pull requests, GitHub Pages\n\n## 📘 Summary\nCloud collaboration: remote origin setup, cloning repositories, opening Pull Requests (PRs), code reviews, and deploying via GitHub Pages.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. GitHub: push, pull, clone, pull requests, GitHub Pages\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. GitHub\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-javascript",
    "slug": "javascript",
    "title": "JavaScript Complete Modern Programming Masterclass",
    "subtitle": "From variables and control flow to functions, closures, objects, ES6+ modules, DOM manipulation, and Async/Await.",
    "category": "Programming",
    "level": "All Levels",
    "rating": 4.97,
    "reviewsCount": 3950,
    "enrolledCount": 36200,
    "totalDuration": "6h 15m",
    "totalLectures": 12,
    "accentColor": "#FBBF24",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹999",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerJavascriptSvg,
    "description": "12 complete video lectures covering variables, operators, conditions, loops, functions, closures, arrays, objects, JSON, error handling, classes & prototypes, DOM selection & events, Async JavaScript, Fetch API, and 3 production mini projects.",
    "learningOutcomes": [
      "Master modern ES6+ features: arrow functions, destructuring, spread, and modules",
      "Understand JavaScript under the hood: event loop, call stack, and closures",
      "Manipulate the DOM dynamically and handle user events with event delegation",
      "Build asynchronous network applications with Promises, async/await, and Fetch API"
    ],
    "prerequisites": [
      "Basic HTML and CSS knowledge."
    ],
    "modules": [
      {
        "id": "js-m1",
        "title": "Modern JavaScript Complete Curriculum",
        "duration": "6h 15m",
        "lessons": [
          {
            "id": "js-l1",
            "title": "1. JS basics: setup, variables (var, let, const), data types, operators",
            "duration": "22:30",
            "durationSeconds": 1350,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern JavaScript core: let vs const scoping, primitive types, type coercion, arithmetic, assignment, logical, and comparison operators.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:45",
                "timeSeconds": 405
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "14:37",
                "timeSeconds": 877
              },
              {
                "title": "Summary & Best Practices",
                "time": "22:30",
                "timeSeconds": 1350
              }
            ],
            "notes": "# 1. JS basics: setup, variables (var, let, const), data types, operators\n\n## 📘 Summary\nModern JavaScript core: let vs const scoping, primitive types, type coercion, arithmetic, assignment, logical, and comparison operators.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. JS basics: setup, variables (var, let, const), data types, operators\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. JS basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l2",
            "title": "2. Conditions and loops: if/else, switch, for, while, for...of",
            "duration": "24:15",
            "durationSeconds": 1455,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Control flow: conditional branching, switch statements, ternary operator, classic for loops, while loops, and modern for...of / for...in iteration.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:16",
                "timeSeconds": 436
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:45",
                "timeSeconds": 945
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:15",
                "timeSeconds": 1455
              }
            ],
            "notes": "# 2. Conditions and loops: if/else, switch, for, while, for...of\n\n## 📘 Summary\nControl flow: conditional branching, switch statements, ternary operator, classic for loops, while loops, and modern for...of / for...in iteration.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Conditions and loops: if/else, switch, for, while, for...of\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Conditions and loops\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l3",
            "title": "3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures",
            "duration": "31:50",
            "durationSeconds": 1910,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Master JavaScript functions: arrow syntax, default parameters, rest parameters, first-class functions, higher-order callbacks, lexical scope, and closures.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:33",
                "timeSeconds": 573
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:41",
                "timeSeconds": 1241
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:50",
                "timeSeconds": 1910
              }
            ],
            "notes": "# 3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures\n\n## 📘 Summary\nMaster JavaScript functions: arrow syntax, default parameters, rest parameters, first-class functions, higher-order callbacks, lexical scope, and closures.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Functions\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l4",
            "title": "4. Strings and arrays: methods, map, filter, reduce, find, sort, spread",
            "duration": "33:40",
            "durationSeconds": 2020,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Immutable array transformations: map, filter, reduce, find, some, every, sort comparator algorithms, string interpolation, and spread operator.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:06",
                "timeSeconds": 606
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:53",
                "timeSeconds": 1313
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:40",
                "timeSeconds": 2020
              }
            ],
            "notes": "# 4. Strings and arrays: methods, map, filter, reduce, find, sort, spread\n\n## 📘 Summary\nImmutable array transformations: map, filter, reduce, find, some, every, sort comparator algorithms, string interpolation, and spread operator.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Strings and arrays: methods, map, filter, reduce, find, sort, spread\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Strings and arrays\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l5",
            "title": "5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify",
            "duration": "27:20",
            "durationSeconds": 1640,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Object data structures: computed property keys, deep vs shallow copying, object destructuring, serialization with JSON.parse and JSON.stringify.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:12",
                "timeSeconds": 492
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:46",
                "timeSeconds": 1066
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:20",
                "timeSeconds": 1640
              }
            ],
            "notes": "# 5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify\n\n## 📘 Summary\nObject data structures: computed property keys, deep vs shallow copying, object destructuring, serialization with JSON.parse and JSON.stringify.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Objects and JSON\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l6",
            "title": "6. Error handling and ES6+ modules: try/catch, import/export",
            "duration": "21:10",
            "durationSeconds": 1270,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Resilient JavaScript: try/catch/finally blocks, throwing custom Error instances, ES modules (named vs default imports/exports), and circular dependencies.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "06:21",
                "timeSeconds": 381
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "13:45",
                "timeSeconds": 825
              },
              {
                "title": "Summary & Best Practices",
                "time": "21:10",
                "timeSeconds": 1270
              }
            ],
            "notes": "# 6. Error handling and ES6+ modules: try/catch, import/export\n\n## 📘 Summary\nResilient JavaScript: try/catch/finally blocks, throwing custom Error instances, ES modules (named vs default imports/exports), and circular dependencies.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Error handling and ES6+ modules: try/catch, import/export\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Error handling and ES6+ modules\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l7",
            "title": "7. Classes and prototypes: constructors, inheritance, this, call/apply/bind",
            "duration": "29:30",
            "durationSeconds": 1770,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Object-oriented JS: prototype chain, ES6 classes, constructor methods, super keyword, private fields, and explicit binding of \"this\" context.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:51",
                "timeSeconds": 531
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:10",
                "timeSeconds": 1150
              },
              {
                "title": "Summary & Best Practices",
                "time": "29:30",
                "timeSeconds": 1770
              }
            ],
            "notes": "# 7. Classes and prototypes: constructors, inheritance, this, call/apply/bind\n\n## 📘 Summary\nObject-oriented JS: prototype chain, ES6 classes, constructor methods, super keyword, private fields, and explicit binding of \"this\" context.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Classes and prototypes: constructors, inheritance, this, call/apply/bind\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Classes and prototypes\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l8",
            "title": "8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements",
            "duration": "28:45",
            "durationSeconds": 1725,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "DOM manipulation: querySelector, getElementById, textContent, innerHTML, classList API, style property, createElement, and appendChild.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:37",
                "timeSeconds": 517
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:41",
                "timeSeconds": 1121
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:45",
                "timeSeconds": 1725
              }
            ],
            "notes": "# 8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements\n\n## 📘 Summary\nDOM manipulation: querySelector, getElementById, textContent, innerHTML, classList API, style property, createElement, and appendChild.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. DOM part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l9",
            "title": "9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers",
            "duration": "32:10",
            "durationSeconds": 1930,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Event architecture: addEventListener, event bubbling, event capturing, event delegation, form submit prevention, and localStorage persistence.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:39",
                "timeSeconds": 579
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:54",
                "timeSeconds": 1254
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:10",
                "timeSeconds": 1930
              }
            ],
            "notes": "# 9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers\n\n## 📘 Summary\nEvent architecture: addEventListener, event bubbling, event capturing, event delegation, form submit prevention, and localStorage persistence.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. DOM part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l10",
            "title": "10. Async JS: event loop, callbacks, promises, async/await",
            "duration": "35:40",
            "durationSeconds": 2140,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Asynchronous JavaScript: call stack, web APIs, task queue, microtask queue, Promise lifecycle (resolve/reject), and async/await syntax.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:42",
                "timeSeconds": 642
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:11",
                "timeSeconds": 1391
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:40",
                "timeSeconds": 2140
              }
            ],
            "notes": "# 10. Async JS: event loop, callbacks, promises, async/await\n\n## 📘 Summary\nAsynchronous JavaScript: call stack, web APIs, task queue, microtask queue, Promise lifecycle (resolve/reject), and async/await syntax.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Async JS: event loop, callbacks, promises, async/await\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Async JS\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l11",
            "title": "11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs",
            "duration": "30:25",
            "durationSeconds": 1825,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "HTTP networking in JS: making GET/POST requests with fetch, sending JSON request bodies, setting custom authorization headers, and error handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:07",
                "timeSeconds": 547
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:46",
                "timeSeconds": 1186
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:25",
                "timeSeconds": 1825
              }
            ],
            "notes": "# 11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs\n\n## 📘 Summary\nHTTP networking in JS: making GET/POST requests with fetch, sending JSON request bodies, setting custom authorization headers, and error handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"11. Fetch API\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "js-l12",
            "title": "12. Mini projects: to-do app, weather app, quiz app",
            "duration": "45:00",
            "durationSeconds": 2700,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Three production mini projects: build a persistent Todo App with localStorage, an API-powered Weather App, and an interactive Quiz App.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "13:30",
                "timeSeconds": 810
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "29:15",
                "timeSeconds": 1755
              },
              {
                "title": "Summary & Best Practices",
                "time": "45:00",
                "timeSeconds": 2700
              }
            ],
            "notes": "# 12. Mini projects: to-do app, weather app, quiz app\n\n## 📘 Summary\nThree production mini projects: build a persistent Todo App with localStorage, an API-powered Weather App, and an interactive Quiz App.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"12. Mini projects: to-do app, weather app, quiz app\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"12. Mini projects\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-react",
    "slug": "react",
    "title": "Frontend Development with React 19",
    "subtitle": "Build interactive SPAs with components, props, hooks (useState, useEffect, custom hooks), React Router, and state management.",
    "category": "Frontend",
    "level": "Intermediate",
    "rating": 4.96,
    "reviewsCount": 3410,
    "enrolledCount": 31400,
    "totalDuration": "5h 45m",
    "totalLectures": 10,
    "accentColor": "#06B6D4",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹1,499",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerReactSvg,
    "description": "10 comprehensive video lectures covering Vite setup, JSX, component props, controlled inputs, useState, useEffect, custom hooks, React Router v6, API integration, forms with Zod, Tailwind CSS, and a complete e-commerce frontend mini project.",
    "learningOutcomes": [
      "Architect reusable, declarative UI components using React 19 and JSX",
      "Manage component state and side-effects with useState, useEffect, and custom hooks",
      "Implement multi-page client routing with React Router and URL parameters",
      "Integrate backend REST APIs and validate user inputs with React Hook Form and Zod"
    ],
    "prerequisites": [
      "Solid proficiency in modern JavaScript (ES6+)."
    ],
    "modules": [
      {
        "id": "react-m1",
        "title": "React 19 Complete Curriculum",
        "duration": "5h 45m",
        "lessons": [
          {
            "id": "react-l1",
            "title": "1. React intro: why React, Vite setup, project structure, JSX",
            "duration": "24:10",
            "durationSeconds": 1450,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The React mental model: declarative UI, virtual DOM diffing, Vite scaffolding, project directory layout, and JSX syntax rules.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:15",
                "timeSeconds": 435
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:42",
                "timeSeconds": 942
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:10",
                "timeSeconds": 1450
              }
            ],
            "notes": "# 1. React intro: why React, Vite setup, project structure, JSX\n\n## 📘 Summary\nThe React mental model: declarative UI, virtual DOM diffing, Vite scaffolding, project directory layout, and JSX syntax rules.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. React intro: why React, Vite setup, project structure, JSX\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. React intro\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l2",
            "title": "2. Components and props: children, conditional rendering, lists and keys",
            "duration": "27:30",
            "durationSeconds": 1650,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Component architecture: functional components, prop passing, children prop, ternary conditional rendering, and mapping arrays with unique keys.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:15",
                "timeSeconds": 495
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:52",
                "timeSeconds": 1072
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:30",
                "timeSeconds": 1650
              }
            ],
            "notes": "# 2. Components and props: children, conditional rendering, lists and keys\n\n## 📘 Summary\nComponent architecture: functional components, prop passing, children prop, ternary conditional rendering, and mapping arrays with unique keys.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Components and props: children, conditional rendering, lists and keys\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Components and props\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l3",
            "title": "3. Events and forms: controlled vs uncontrolled inputs",
            "duration": "26:45",
            "durationSeconds": 1605,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "User interactions: synthetic event handlers, controlled input components with value and onChange, and form submit handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:01",
                "timeSeconds": 481
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:23",
                "timeSeconds": 1043
              },
              {
                "title": "Summary & Best Practices",
                "time": "26:45",
                "timeSeconds": 1605
              }
            ],
            "notes": "# 3. Events and forms: controlled vs uncontrolled inputs\n\n## 📘 Summary\nUser interactions: synthetic event handlers, controlled input components with value and onChange, and form submit handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Events and forms: controlled vs uncontrolled inputs\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Events and forms\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l4",
            "title": "4. useState: state, lifting state up",
            "duration": "28:50",
            "durationSeconds": 1730,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Managing component state: useState hook, updater functions, immutable state updates for arrays and objects, and lifting state up to parent components.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:39",
                "timeSeconds": 519
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:44",
                "timeSeconds": 1124
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:50",
                "timeSeconds": 1730
              }
            ],
            "notes": "# 4. useState: state, lifting state up\n\n## 📘 Summary\nManaging component state: useState hook, updater functions, immutable state updates for arrays and objects, and lifting state up to parent components.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. useState: state, lifting state up\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. useState\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l5",
            "title": "5. useEffect: side effects, dependency array, cleanup",
            "duration": "33:20",
            "durationSeconds": 2000,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Synchronizing with external systems: useEffect hook, understanding dependency arrays, data fetching patterns, and cleanup functions for timers/subscriptions.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:00",
                "timeSeconds": 600
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:40",
                "timeSeconds": 1300
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:20",
                "timeSeconds": 2000
              }
            ],
            "notes": "# 5. useEffect: side effects, dependency array, cleanup\n\n## 📘 Summary\nSynchronizing with external systems: useEffect hook, understanding dependency arrays, data fetching patterns, and cleanup functions for timers/subscriptions.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. useEffect: side effects, dependency array, cleanup\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. useEffect\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l6",
            "title": "6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks",
            "duration": "38:15",
            "durationSeconds": 2295,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Advanced React hooks: DOM access with useRef, memoization with useMemo & useCallback, global state with useContext, useReducer, and custom hooks.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:28",
                "timeSeconds": 688
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:51",
                "timeSeconds": 1491
              },
              {
                "title": "Summary & Best Practices",
                "time": "38:15",
                "timeSeconds": 2295
              }
            ],
            "notes": "# 6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks\n\n## 📘 Summary\nAdvanced React hooks: DOM access with useRef, memoization with useMemo & useCallback, global state with useContext, useReducer, and custom hooks.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Other hooks\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l7",
            "title": "7. React Router: routes, links, params, nested and protected routes",
            "duration": "31:40",
            "durationSeconds": 1900,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Client-side routing: React Router v6, BrowserRouter, Routes, Route, Link, NavLink, useParams, useSearchParams, and protected authentication gates.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:30",
                "timeSeconds": 570
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:35",
                "timeSeconds": 1235
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:40",
                "timeSeconds": 1900
              }
            ],
            "notes": "# 7. React Router: routes, links, params, nested and protected routes\n\n## 📘 Summary\nClient-side routing: React Router v6, BrowserRouter, Routes, Route, Link, NavLink, useParams, useSearchParams, and protected authentication gates.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. React Router: routes, links, params, nested and protected routes\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. React Router\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l8",
            "title": "8. API integration and state management: fetch/axios, loading and error states, Context, Zustand",
            "duration": "34:20",
            "durationSeconds": 2060,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Data fetching and state: Axios vs Fetch, managing loading/error states, Context API for user auth, and lightweight store management with Zustand.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:18",
                "timeSeconds": 618
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:19",
                "timeSeconds": 1339
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:20",
                "timeSeconds": 2060
              }
            ],
            "notes": "# 8. API integration and state management: fetch/axios, loading and error states, Context, Zustand\n\n## 📘 Summary\nData fetching and state: Axios vs Fetch, managing loading/error states, Context API for user auth, and lightweight store management with Zustand.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. API integration and state management: fetch/axios, loading and error states, Context, Zustand\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. API integration and state management\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l9",
            "title": "9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui",
            "duration": "32:50",
            "durationSeconds": 1970,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern frontend tooling: performant forms with React Hook Form, schema validation with Zod, rapid styling with Tailwind CSS, and shadcn/ui.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:51",
                "timeSeconds": 591
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:20",
                "timeSeconds": 1280
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:50",
                "timeSeconds": 1970
              }
            ],
            "notes": "# 9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui\n\n## 📘 Summary\nModern frontend tooling: performant forms with React Hook Form, schema validation with Zod, rapid styling with Tailwind CSS, and shadcn/ui.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"9. Forms and styling\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "react-l10",
            "title": "10. Mini project: dashboard or e-commerce frontend",
            "duration": "48:30",
            "durationSeconds": 2910,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Full frontend capstone: build a comprehensive responsive analytics dashboard or e-commerce storefront with cart state and filtering.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "14:33",
                "timeSeconds": 873
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "31:31",
                "timeSeconds": 1891
              },
              {
                "title": "Summary & Best Practices",
                "time": "48:30",
                "timeSeconds": 2910
              }
            ],
            "notes": "# 10. Mini project: dashboard or e-commerce frontend\n\n## 📘 Summary\nFull frontend capstone: build a comprehensive responsive analytics dashboard or e-commerce storefront with cart state and filtering.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"10. Mini project: dashboard or e-commerce frontend\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"10. Mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-node",
    "slug": "nodejs",
    "title": "Backend Engineering with Node.js & Express",
    "subtitle": "Construct secure, production-grade RESTful APIs with Express, middleware, bcrypt password hashing, JWT authentication, and security.",
    "category": "Backend",
    "level": "Intermediate",
    "rating": 4.95,
    "reviewsCount": 2980,
    "enrolledCount": 28400,
    "totalDuration": "4h 15m",
    "totalLectures": 8,
    "accentColor": "#10B981",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹1,499",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerNodejsSvg,
    "description": "8 complete video lectures covering Node runtime, Express routing, custom middleware, REST API standards, Multer file uploads, bcrypt password hashing, JWT cookies, rate limiting, XSS/CSRF security, Nodemailer, Postman, and a full API capstone.",
    "learningOutcomes": [
      "Design and structure clean, modular RESTful APIs using Express and MVC pattern",
      "Implement authentication with bcrypt salt hashing and JWT token expiration",
      "Secure backend servers against XSS, CORS, rate limiting, and parameter pollution",
      "Handle file uploads, transactional emails, and generate interactive Swagger docs"
    ],
    "prerequisites": [
      "Proficiency in JavaScript fundamentals and async programming."
    ],
    "modules": [
      {
        "id": "node-m1",
        "title": "Node.js & Express REST APIs",
        "duration": "4h 15m",
        "lessons": [
          {
            "id": "node-l1",
            "title": "1. Node basics: runtime, npm, package.json, core modules, dotenv",
            "duration": "23:40",
            "durationSeconds": 1420,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Server-side JavaScript: Node.js runtime environment, npm scripts, package.json dependencies, fs/path core modules, and managing environment variables.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:06",
                "timeSeconds": 426
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:23",
                "timeSeconds": 923
              },
              {
                "title": "Summary & Best Practices",
                "time": "23:40",
                "timeSeconds": 1420
              }
            ],
            "notes": "# 1. Node basics: runtime, npm, package.json, core modules, dotenv\n\n## 📘 Summary\nServer-side JavaScript: Node.js runtime environment, npm scripts, package.json dependencies, fs/path core modules, and managing environment variables.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Node basics: runtime, npm, package.json, core modules, dotenv\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Node basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l2",
            "title": "2. Express basics: routing, params, query strings, project structure",
            "duration": "26:15",
            "durationSeconds": 1575,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Express web framework: initializing Express apps, route methods (GET, POST), URL parameters (req.params), query strings (req.query), and MVC architecture.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:52",
                "timeSeconds": 472
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:03",
                "timeSeconds": 1023
              },
              {
                "title": "Summary & Best Practices",
                "time": "26:15",
                "timeSeconds": 1575
              }
            ],
            "notes": "# 2. Express basics: routing, params, query strings, project structure\n\n## 📘 Summary\nExpress web framework: initializing Express apps, route methods (GET, POST), URL parameters (req.params), query strings (req.query), and MVC architecture.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Express basics: routing, params, query strings, project structure\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Express basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l3",
            "title": "3. Middleware: built-in, custom, cors, helmet, morgan, error handling",
            "duration": "29:50",
            "durationSeconds": 1790,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The middleware chain: req, res, next lifecycle, logging with Morgan, CORS headers, security with Helmet, and centralized global error handling.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:57",
                "timeSeconds": 537
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:23",
                "timeSeconds": 1163
              },
              {
                "title": "Summary & Best Practices",
                "time": "29:50",
                "timeSeconds": 1790
              }
            ],
            "notes": "# 3. Middleware: built-in, custom, cors, helmet, morgan, error handling\n\n## 📘 Summary\nThe middleware chain: req, res, next lifecycle, logging with Morgan, CORS headers, security with Helmet, and centralized global error handling.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Middleware: built-in, custom, cors, helmet, morgan, error handling\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Middleware\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l4",
            "title": "4. REST API design: HTTP methods, status codes, validation, Multer file upload",
            "duration": "34:10",
            "durationSeconds": 2050,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "RESTful API principles: HTTP status codes (200, 201, 400, 401, 404, 500), schema validation with Zod/Joi, and multipart/form-data file uploads with Multer.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:15",
                "timeSeconds": 615
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:12",
                "timeSeconds": 1332
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:10",
                "timeSeconds": 2050
              }
            ],
            "notes": "# 4. REST API design: HTTP methods, status codes, validation, Multer file upload\n\n## 📘 Summary\nRESTful API principles: HTTP status codes (200, 201, 400, 401, 404, 500), schema validation with Zod/Joi, and multipart/form-data file uploads with Multer.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. REST API design: HTTP methods, status codes, validation, Multer file upload\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. REST API design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l5",
            "title": "5. Authentication part 1: bcrypt password hashing, JWT, cookies",
            "duration": "37:20",
            "durationSeconds": 2240,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Secure authentication: hashing passwords with bcrypt salt rounds, generating JSON Web Tokens (JWT), and sending httpOnly secure session cookies.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:12",
                "timeSeconds": 672
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:16",
                "timeSeconds": 1456
              },
              {
                "title": "Summary & Best Practices",
                "time": "37:20",
                "timeSeconds": 2240
              }
            ],
            "notes": "# 5. Authentication part 1: bcrypt password hashing, JWT, cookies\n\n## 📘 Summary\nSecure authentication: hashing passwords with bcrypt salt rounds, generating JSON Web Tokens (JWT), and sending httpOnly secure session cookies.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Authentication part 1: bcrypt password hashing, JWT, cookies\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Authentication part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l6",
            "title": "6. Authentication part 2: refresh tokens, role-based access, Google login intro",
            "duration": "35:45",
            "durationSeconds": 2145,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Enterprise auth patterns: access vs refresh token rotation, Role-Based Access Control (RBAC) middleware (Admin vs Student), and OAuth2 Google Login.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:43",
                "timeSeconds": 643
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:14",
                "timeSeconds": 1394
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:45",
                "timeSeconds": 2145
              }
            ],
            "notes": "# 6. Authentication part 2: refresh tokens, role-based access, Google login intro\n\n## 📘 Summary\nEnterprise auth patterns: access vs refresh token rotation, Role-Based Access Control (RBAC) middleware (Admin vs Student), and OAuth2 Google Login.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Authentication part 2: refresh tokens, role-based access, Google login intro\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Authentication part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l7",
            "title": "7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics",
            "duration": "31:15",
            "durationSeconds": 1875,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Backend defensive security: preventing SQL/NoSQL injection, sanitizing user inputs against XSS, CSRF protection, and DDoS rate limiting with express-rate-limit.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:22",
                "timeSeconds": 562
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:18",
                "timeSeconds": 1218
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:15",
                "timeSeconds": 1875
              }
            ],
            "notes": "# 7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics\n\n## 📘 Summary\nBackend defensive security: preventing SQL/NoSQL injection, sanitizing user inputs against XSS, CSRF protection, and DDoS rate limiting with express-rate-limit.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. Security\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "node-l8",
            "title": "8. Extras and project: Nodemailer, Postman, Swagger, blog or report API",
            "duration": "44:00",
            "durationSeconds": 2640,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Complete backend capstone: transactional emails with Nodemailer, API testing with Postman, Swagger OpenAPI docs, and building a full CRUD API.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "13:12",
                "timeSeconds": 792
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "28:36",
                "timeSeconds": 1716
              },
              {
                "title": "Summary & Best Practices",
                "time": "44:00",
                "timeSeconds": 2640
              }
            ],
            "notes": "# 8. Extras and project: Nodemailer, Postman, Swagger, blog or report API\n\n## 📘 Summary\nComplete backend capstone: transactional emails with Nodemailer, API testing with Postman, Swagger OpenAPI docs, and building a full CRUD API.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Extras and project: Nodemailer, Postman, Swagger, blog or report API\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Extras and project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-database",
    "slug": "database",
    "title": "Databases: SQL, Supabase & MongoDB Engineering",
    "subtitle": "Master relational SQL (queries, joins, indexes, transactions), Supabase (Auth, RLS, Realtime), and MongoDB (documents, Mongoose).",
    "category": "Databases",
    "level": "Intermediate",
    "rating": 4.94,
    "reviewsCount": 2640,
    "enrolledCount": 26100,
    "totalDuration": "4h 25m",
    "totalLectures": 8,
    "accentColor": "#8B5CF6",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹1,499",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerDatabaseSvg,
    "description": "8 comprehensive video lectures covering SQL basics, advanced queries, table joins, constraints & indexes, Supabase setup, Row Level Security, MongoDB collections, Mongoose schemas, and production database ER design.",
    "learningOutcomes": [
      "Write complex relational SQL queries with aggregate functions and table joins",
      "Implement database normalization, primary/foreign keys, and B-Tree indexes",
      "Build serverless databases with Supabase and secure tables with Row Level Security",
      "Model flexible document stores using MongoDB, Mongoose schemas, and Prisma"
    ],
    "prerequisites": [
      "Basic backend programming understanding."
    ],
    "modules": [
      {
        "id": "db-m1",
        "title": "SQL, Supabase & MongoDB Masterclass",
        "duration": "4h 25m",
        "lessons": [
          {
            "id": "db-l1",
            "title": "1. Database concepts and SQL basics: tables, keys, CRUD",
            "duration": "24:30",
            "durationSeconds": 1470,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Database foundations: Relational vs Non-Relational mental models, tables, columns, primary keys, foreign keys, and fundamental CRUD SQL queries.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "07:21",
                "timeSeconds": 441
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "15:55",
                "timeSeconds": 955
              },
              {
                "title": "Summary & Best Practices",
                "time": "24:30",
                "timeSeconds": 1470
              }
            ],
            "notes": "# 1. Database concepts and SQL basics: tables, keys, CRUD\n\n## 📘 Summary\nDatabase foundations: Relational vs Non-Relational mental models, tables, columns, primary keys, foreign keys, and fundamental CRUD SQL queries.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Database concepts and SQL basics: tables, keys, CRUD\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Database concepts and SQL basics\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l2",
            "title": "2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions",
            "duration": "28:15",
            "durationSeconds": 1695,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Advanced querying: filtering with WHERE, sorting with ORDER BY, aggregations (COUNT, SUM, AVG), GROUP BY grouping, and HAVING conditions.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:28",
                "timeSeconds": 508
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "18:21",
                "timeSeconds": 1101
              },
              {
                "title": "Summary & Best Practices",
                "time": "28:15",
                "timeSeconds": 1695
              }
            ],
            "notes": "# 2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions\n\n## 📘 Summary\nAdvanced querying: filtering with WHERE, sorting with ORDER BY, aggregations (COUNT, SUM, AVG), GROUP BY grouping, and HAVING conditions.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. SQL queries\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l3",
            "title": "3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N",
            "duration": "33:40",
            "durationSeconds": 2020,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Relational algebra: INNER JOIN, LEFT JOIN, RIGHT JOIN, full joins, and modeling One-to-One, One-to-Many, and Many-to-Many relationships with junction tables.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:06",
                "timeSeconds": 606
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:53",
                "timeSeconds": 1313
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:40",
                "timeSeconds": 2020
              }
            ],
            "notes": "# 3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N\n\n## 📘 Summary\nRelational algebra: INNER JOIN, LEFT JOIN, RIGHT JOIN, full joins, and modeling One-to-One, One-to-Many, and Many-to-Many relationships with junction tables.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Joins and relationships\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l4",
            "title": "4. Constraints, indexes, normalization, transactions, views",
            "duration": "32:10",
            "durationSeconds": 1930,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Database optimization: UNIQUE, NOT NULL, CHECK constraints, B-Tree indexes, database normalization (1NF, 2NF, 3NF), ACID transactions, and database views.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:39",
                "timeSeconds": 579
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:54",
                "timeSeconds": 1254
              },
              {
                "title": "Summary & Best Practices",
                "time": "32:10",
                "timeSeconds": 1930
              }
            ],
            "notes": "# 4. Constraints, indexes, normalization, transactions, views\n\n## 📘 Summary\nDatabase optimization: UNIQUE, NOT NULL, CHECK constraints, B-Tree indexes, database normalization (1NF, 2NF, 3NF), ACID transactions, and database views.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. Constraints, indexes, normalization, transactions, views\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. Constraints, indexes, normalization, transactions, views\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l5",
            "title": "5. Supabase part 1: setup, tables, auth, storage",
            "duration": "30:45",
            "durationSeconds": 1845,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Cloud PostgreSQL with Supabase: creating project, managing schema with Table Editor, built-in Supabase Auth, and file storage buckets.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:13",
                "timeSeconds": 553
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "19:59",
                "timeSeconds": 1199
              },
              {
                "title": "Summary & Best Practices",
                "time": "30:45",
                "timeSeconds": 1845
              }
            ],
            "notes": "# 5. Supabase part 1: setup, tables, auth, storage\n\n## 📘 Summary\nCloud PostgreSQL with Supabase: creating project, managing schema with Table Editor, built-in Supabase Auth, and file storage buckets.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Supabase part 1: setup, tables, auth, storage\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Supabase part 1\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l6",
            "title": "6. Supabase part 2: Row Level Security, realtime, client in React and Next.js",
            "duration": "34:20",
            "durationSeconds": 2060,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Production Supabase: writing Row Level Security (RLS) policies, subscribing to PostgreSQL Realtime events, and connecting the Supabase JS client.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:18",
                "timeSeconds": 618
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "22:19",
                "timeSeconds": 1339
              },
              {
                "title": "Summary & Best Practices",
                "time": "34:20",
                "timeSeconds": 2060
              }
            ],
            "notes": "# 6. Supabase part 2: Row Level Security, realtime, client in React and Next.js\n\n## 📘 Summary\nProduction Supabase: writing Row Level Security (RLS) policies, subscribing to PostgreSQL Realtime events, and connecting the Supabase JS client.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. Supabase part 2: Row Level Security, realtime, client in React and Next.js\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. Supabase part 2\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l7",
            "title": "7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation",
            "duration": "36:50",
            "durationSeconds": 2210,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "NoSQL with MongoDB: collections, BSON documents, defining schemas and models with Mongoose, deep populate queries, and aggregation pipelines.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:03",
                "timeSeconds": 663
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:56",
                "timeSeconds": 1436
              },
              {
                "title": "Summary & Best Practices",
                "time": "36:50",
                "timeSeconds": 2210
              }
            ],
            "notes": "# 7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation\n\n## 📘 Summary\nNoSQL with MongoDB: collections, BSON documents, defining schemas and models with Mongoose, deep populate queries, and aggregation pipelines.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"7. MongoDB and Mongoose\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "db-l8",
            "title": "8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro",
            "duration": "39:10",
            "durationSeconds": 2350,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Architectural schema design: drawing ER diagrams, modeling production schemas for e-commerce, and introduction to modern ORMs with Prisma.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:45",
                "timeSeconds": 705
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "25:27",
                "timeSeconds": 1527
              },
              {
                "title": "Summary & Best Practices",
                "time": "39:10",
                "timeSeconds": 2350
              }
            ],
            "notes": "# 8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro\n\n## 📘 Summary\nArchitectural schema design: drawing ER diagrams, modeling production schemas for e-commerce, and introduction to modern ORMs with Prisma.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"8. Schema design\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "vid-nextjs",
    "slug": "nextjs",
    "title": "Next.js 15 Full-Stack Framework & App Router",
    "subtitle": "Build production full-stack web applications with Server Components (RSC), Server Actions, SSR/SSG/ISR caching, and SEO optimization.",
    "category": "Full Stack",
    "level": "Advanced",
    "rating": 4.97,
    "reviewsCount": 3120,
    "enrolledCount": 29500,
    "totalDuration": "3h 30m",
    "totalLectures": 6,
    "accentColor": "#18181B",
    "badge": "VIDEO PASS • ₹99",
    "isFree": false,
    "price": "₹99",
    "originalPrice": "₹1,499",
    "instructor": SKYROVIX_INSTRUCTOR,
    "thumbnail": bannerNextjsSvg,
    "description": "6 in-depth video lectures covering the Next.js 15 App Router, React Server Components vs Client Components, SSR / SSG / ISR data fetching, Route Handlers, Server Actions, auth integration, and performance optimization.",
    "learningOutcomes": [
      "Architect modern web applications using the Next.js 15 App Router hierarchy",
      "Leverage React Server Components for zero-bundle-size server rendering",
      "Mutate database state securely using Next.js Server Actions without writing boilerplate APIs",
      "Optimize images, fonts, and dynamic metadata for near-perfect Lighthouse scores"
    ],
    "prerequisites": [
      "Strong foundation in React and modern JavaScript."
    ],
    "modules": [
      {
        "id": "next-m1",
        "title": "Next.js 15 Complete Curriculum",
        "duration": "3h 30m",
        "lessons": [
          {
            "id": "next-l1",
            "title": "1. Next.js intro: setup, App Router, file-based routing, layouts",
            "duration": "27:10",
            "durationSeconds": 1630,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "The modern React framework: create-next-app, App Router architecture, page.tsx, layout.tsx, template.tsx, loading.tsx, and not-found.tsx.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "08:09",
                "timeSeconds": 489
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "17:39",
                "timeSeconds": 1059
              },
              {
                "title": "Summary & Best Practices",
                "time": "27:10",
                "timeSeconds": 1630
              }
            ],
            "notes": "# 1. Next.js intro: setup, App Router, file-based routing, layouts\n\n## 📘 Summary\nThe modern React framework: create-next-app, App Router architecture, page.tsx, layout.tsx, template.tsx, loading.tsx, and not-found.tsx.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"1. Next.js intro: setup, App Router, file-based routing, layouts\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"1. Next.js intro\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "next-l2",
            "title": "2. Server vs client components, loading and error UI",
            "duration": "31:25",
            "durationSeconds": 1885,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "React Server Components (RSC): server components by default, \"use client\" boundary, streaming with React Suspense, and error.tsx boundaries.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:25",
                "timeSeconds": 565
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "20:25",
                "timeSeconds": 1225
              },
              {
                "title": "Summary & Best Practices",
                "time": "31:25",
                "timeSeconds": 1885
              }
            ],
            "notes": "# 2. Server vs client components, loading and error UI\n\n## 📘 Summary\nReact Server Components (RSC): server components by default, \"use client\" boundary, streaming with React Suspense, and error.tsx boundaries.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"2. Server vs client components, loading and error UI\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"2. Server vs client components, loading and error UI\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "next-l3",
            "title": "3. Data fetching: SSR, SSG, ISR, caching",
            "duration": "35:40",
            "durationSeconds": 2140,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Modern data fetching: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (revalidate), and fetch cache tags.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "10:42",
                "timeSeconds": 642
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "23:11",
                "timeSeconds": 1391
              },
              {
                "title": "Summary & Best Practices",
                "time": "35:40",
                "timeSeconds": 2140
              }
            ],
            "notes": "# 3. Data fetching: SSR, SSG, ISR, caching\n\n## 📘 Summary\nModern data fetching: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (revalidate), and fetch cache tags.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"3. Data fetching: SSR, SSG, ISR, caching\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"3. Data fetching\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "next-l4",
            "title": "4. API route handlers and server actions",
            "duration": "33:15",
            "durationSeconds": 1995,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Full-stack Next.js: building REST endpoints with route.ts handlers and mutating database state directly with Server Actions (\"use server\").",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "09:58",
                "timeSeconds": 598
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "21:36",
                "timeSeconds": 1296
              },
              {
                "title": "Summary & Best Practices",
                "time": "33:15",
                "timeSeconds": 1995
              }
            ],
            "notes": "# 4. API route handlers and server actions\n\n## 📘 Summary\nFull-stack Next.js: building REST endpoints with route.ts handlers and mutating database state directly with Server Actions (\"use server\").\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"4. API route handlers and server actions\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"4. API route handlers and server actions\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "next-l5",
            "title": "5. Auth, database connection, forms and file upload",
            "duration": "38:00",
            "durationSeconds": 2280,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Production Next.js workflows: connecting PostgreSQL / Supabase, NextAuth (Auth.js) session handling, server action form validations with Zod.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "11:24",
                "timeSeconds": 684
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "24:42",
                "timeSeconds": 1482
              },
              {
                "title": "Summary & Best Practices",
                "time": "38:00",
                "timeSeconds": 2280
              }
            ],
            "notes": "# 5. Auth, database connection, forms and file upload\n\n## 📘 Summary\nProduction Next.js workflows: connecting PostgreSQL / Supabase, NextAuth (Auth.js) session handling, server action form validations with Zod.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"5. Auth, database connection, forms and file upload\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"5. Auth, database connection, forms and file upload\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          },
          {
            "id": "next-l6",
            "title": "6. SEO, metadata, image and font optimization, mini project",
            "duration": "42:30",
            "durationSeconds": 2550,
            "videoUrl": "https://www.youtube.com/embed/nu_pCVPKzTk",
            "summary": "Performance and SEO: dynamic metadata generateMetadata(), next/image optimization, next/font, and building an end-to-end full stack Next.js mini project.",
            "chapters": [
              {
                "title": "Lecture Introduction & Core Concept",
                "time": "00:00",
                "timeSeconds": 0
              },
              {
                "title": "Architecture & Code Walkthrough",
                "time": "12:45",
                "timeSeconds": 765
              },
              {
                "title": "Hands-on Coding & Execution",
                "time": "27:37",
                "timeSeconds": 1657
              },
              {
                "title": "Summary & Best Practices",
                "time": "42:30",
                "timeSeconds": 2550
              }
            ],
            "notes": "# 6. SEO, metadata, image and font optimization, mini project\n\n## 📘 Summary\nPerformance and SEO: dynamic metadata generateMetadata(), next/image optimization, next/font, and building an end-to-end full stack Next.js mini project.\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.",
            "transcript": "Welcome to this technical masterclass on \"6. SEO, metadata, image and font optimization, mini project\". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...",
            "resources": [
              {
                "title": "Official Documentation & Specs",
                "url": "https://developer.mozilla.org",
                "type": "doc"
              },
              {
                "title": "GitHub Starter Repository",
                "url": "https://github.com",
                "type": "github"
              }
            ],
            "quiz": {
              "question": "What is the primary architectural takeaway from \"6. SEO, metadata, image and font optimization, mini project\"?",
              "options": [
                "Writing clean, modular, and maintainable production code",
                "Skipping validation to increase download speeds",
                "Storing sensitive keys in public client code",
                "Avoiding version control systems"
              ],
              "correctIndex": 0,
              "explanation": "Modern production software engineering demands clean code, strong separation of concerns, and robust testing."
            }
          }
        ]
      }
    ]
  }
];
