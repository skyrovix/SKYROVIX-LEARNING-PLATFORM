import fs from 'fs';
import path from 'path';

// Video URLs (High quality developer tutorials / default embeds)
const DEFAULT_EMBED = 'https://www.youtube.com/embed/nu_pCVPKzTk';

// 1. HTML Lessons (10 videos) - Linked to src/assets/courses/HTML/1.1.mp4 - 1.10.mp4
const htmlLessons = [
  {
    title: '1. Web basics: browser, server, HTTP/HTTPS, DNS, URL, HTML document structure',
    duration: '07:48',
    summary: 'Understand the fundamental architecture of the web: DNS resolution, client-server model, HTTP/HTTPS protocols, request-response lifecycles, and HTML document boilerplate structure.'
  },
  {
    title: '2. Text and links: headings, paragraphs, formatting tags, anchor tag, absolute vs relative paths',
    duration: '06:35',
    summary: 'Master typographic semantics: h1-h6 hierarchy, paragraphs, bold/emphasis tags, relative versus absolute pathing, and anchor links.'
  },
  {
    title: '3. Images and media: img, alt, figure, picture, audio, video, iframe',
    duration: '08:04',
    summary: 'Embed responsive media: responsive image sets with picture tag, accessibility alt rules, audio, video players, and sandboxed iframes.'
  },
  {
    title: '4. Lists and tables: ul, ol, nested lists, table, colspan, rowspan',
    duration: '09:48',
    summary: 'Structure ordered and unordered lists, nested navigations, tabular data, table headers, colspans, and rowspans.'
  },
  {
    title: '5. Forms part 1: input types, label, select, textarea, button',
    duration: '06:47',
    summary: 'Form architecture: connecting labels to inputs using for/id, handling text, email, number, select dropdowns, textareas, and submit buttons.'
  },
  {
    title: '6. Forms part 2: validation attributes, fieldset, datalist',
    duration: '05:49',
    summary: 'Native HTML5 form constraints: required, min/max, pattern regex, grouping with fieldset/legend, and autocomplete with datalists.'
  },
  {
    title: '7. Semantic HTML: header, nav, main, section, article, aside, footer',
    duration: '07:28',
    summary: 'Eliminate unsemantic div soup by adopting landmark elements that boost SEO and screen reader accessibility navigation.'
  },
  {
    title: '8. Accessibility: ARIA, alt text, tab order, keyboard navigation',
    duration: '06:41',
    summary: 'WCAG compliance standards: accessible roles, aria-live regions, keyboard tab indexing, skip links, and focus indicators.'
  },
  {
    title: '9. SEO and HTML5 APIs: meta tags, Open Graph, localStorage, geolocation',
    duration: '06:56',
    summary: 'Search engine optimization: meta viewport, Open Graph social share tags, robots indexing, and browser Web APIs.'
  },
  {
    title: '10. Mini project: profile page and registration form',
    duration: '06:25',
    summary: 'Complete end-to-end hands-on project: craft an accessible personal portfolio profile page with an interactive validated registration form.'
  }
];

// 2. CSS Lessons (10 videos) - Linked to src/assets/courses/CSS/2.1.mp4 - 2.10.mp4
const cssLessons = [
  {
    title: '1. CSS basics: ways to add CSS, selectors, specificity, inheritance',
    duration: '08:40',
    summary: 'CSS fundamentals: inline vs internal vs external stylesheets, selector engines, calculation of specificity points, and property inheritance.'
  },
  {
    title: '2. Colors, units and typography: hex, rgb, hsl, px, rem, vw, fonts, Google Fonts',
    duration: '06:19',
    summary: 'Visual fundamentals: color formats (HEX, RGB, HSL), relative sizing with rem/em/vw/vh, typography hierarchy, and Google Fonts integration.'
  },
  {
    title: '3. Box model: padding, border, margin, box-sizing, backgrounds, shadows',
    duration: '06:36',
    summary: 'Deep dive into content, padding, border, and margin. Understand box-sizing: border-box, background layers, and multi-layered drop shadows.'
  },
  {
    title: '4. Display and position: block, inline, relative, absolute, fixed, sticky, z-index',
    duration: '10:02',
    summary: 'Document flow and coordinate positioning: relative, absolute positioning within containers, sticky headers, fixed navbars, and z-index stacking.'
  },
  {
    title: '5. Flexbox part 1: container properties, alignment, wrapping, gap',
    duration: '08:19',
    summary: '1D Layouts with Flexbox: flex-direction, justify-content, align-items, flex-wrap, and modern gap spacing.'
  },
  {
    title: '6. Flexbox part 2: item properties and common layouts (navbar, cards)',
    duration: '08:45',
    summary: 'Flex items: flex-grow, flex-shrink, flex-basis, align-self, and building real-world responsive navigation bars and pricing card grids.'
  },
  {
    title: '7. CSS Grid: rows, columns, fr unit, grid areas, auto-fit, minmax',
    duration: '06:42',
    summary: '2D Layouts with CSS Grid: fractional units (fr), grid-template-areas, repeat syntax, auto-fit, auto-fill, and dynamic minmax constraints.'
  },
  {
    title: '8. Responsive design: mobile-first, media queries, breakpoints, responsive images',
    duration: '05:41',
    summary: 'Mobile-first responsive design: layout fluidification, breakpoint strategies, and picture elements.'
  },
  {
    title: '9. Transitions, transforms and animations: keyframes, CSS variables, dark mode',
    duration: '08:51',
    summary: 'Motion & Modern CSS: transition timing curves, 2D/3D hardware-accelerated transforms, CSS variables, and dark mode themes.'
  },
  {
    title: '10. Mini project: responsive landing page',
    duration: '07:19',
    summary: 'Mini project capstone: assemble modern responsive CSS concepts into a polished production SaaS landing page.'
  }
];

// 3. Git and GitHub Lessons (3 videos)
const gitLessons = [
  {
    title: '1. Git basics: init, status, add, commit, log, .gitignore',
    duration: '18:50',
    summary: 'Version control fundamentals: initializing repositories, staging changes, writing semantic commits, inspecting logs, and configuring .gitignore.'
  },
  {
    title: '2. Branching and merging: branch, switch, merge, resolving conflicts',
    duration: '23:15',
    summary: 'Git branching strategy: creating feature branches, switching, merging with fast-forward vs 3-way merge, and step-by-step merge conflict resolution.'
  },
  {
    title: '3. GitHub: push, pull, clone, pull requests, GitHub Pages',
    duration: '25:40',
    summary: 'Cloud collaboration: remote origin setup, cloning repositories, opening Pull Requests (PRs), code reviews, and deploying via GitHub Pages.'
  }
];

// 4. JavaScript Lessons (12 videos)
const jsLessons = [
  {
    title: '1. JS basics: setup, variables (var, let, const), data types, operators',
    duration: '22:30',
    summary: 'Modern JavaScript core: let vs const scoping, primitive types, type coercion, arithmetic, assignment, logical, and comparison operators.'
  },
  {
    title: '2. Conditions and loops: if/else, switch, for, while, for...of',
    duration: '24:15',
    summary: 'Control flow: conditional branching, switch statements, ternary operator, classic for loops, while loops, and modern for...of / for...in iteration.'
  },
  {
    title: '3. Functions: declaration, arrow, parameters, return, callbacks, scope, closures',
    duration: '31:50',
    summary: 'Master JavaScript functions: arrow syntax, default parameters, rest parameters, first-class functions, higher-order callbacks, lexical scope, and closures.'
  },
  {
    title: '4. Strings and arrays: methods, map, filter, reduce, find, sort, spread',
    duration: '33:40',
    summary: 'Immutable array transformations: map, filter, reduce, find, some, every, sort comparator algorithms, string interpolation, and spread operator.'
  },
  {
    title: '5. Objects and JSON: destructuring, spread, methods, JSON parse and stringify',
    duration: '27:20',
    summary: 'Object data structures: computed property keys, deep vs shallow copying, object destructuring, serialization with JSON.parse and JSON.stringify.'
  },
  {
    title: '6. Error handling and ES6+ modules: try/catch, import/export',
    duration: '21:10',
    summary: 'Resilient JavaScript: try/catch/finally blocks, throwing custom Error instances, ES modules (named vs default imports/exports), and circular dependencies.'
  },
  {
    title: '7. Classes and prototypes: constructors, inheritance, this, call/apply/bind',
    duration: '29:30',
    summary: 'Object-oriented JS: prototype chain, ES6 classes, constructor methods, super keyword, private fields, and explicit binding of "this" context.'
  },
  {
    title: '8. DOM part 1: selecting elements, changing text, styles, classes, creating and removing elements',
    duration: '28:45',
    summary: 'DOM manipulation: querySelector, getElementById, textContent, innerHTML, classList API, style property, createElement, and appendChild.'
  },
  {
    title: '9. DOM part 2: events, bubbling, delegation, form handling, localStorage, timers',
    duration: '32:10',
    summary: 'Event architecture: addEventListener, event bubbling, event capturing, event delegation, form submit prevention, and localStorage persistence.'
  },
  {
    title: '10. Async JS: event loop, callbacks, promises, async/await',
    duration: '35:40',
    summary: 'Asynchronous JavaScript: call stack, web APIs, task queue, microtask queue, Promise lifecycle (resolve/reject), and async/await syntax.'
  },
  {
    title: '11. Fetch API: GET/POST/PUT/DELETE, headers, working with public APIs',
    duration: '30:25',
    summary: 'HTTP networking in JS: making GET/POST requests with fetch, sending JSON request bodies, setting custom authorization headers, and error handling.'
  },
  {
    title: '12. Mini projects: to-do app, weather app, quiz app',
    duration: '45:00',
    summary: 'Three production mini projects: build a persistent Todo App with localStorage, an API-powered Weather App, and an interactive Quiz App.'
  }
];

// 5. Frontend with React Lessons (10 videos)
const reactLessons = [
  {
    title: '1. React intro: why React, Vite setup, project structure, JSX',
    duration: '24:10',
    summary: 'The React mental model: declarative UI, virtual DOM diffing, Vite scaffolding, project directory layout, and JSX syntax rules.'
  },
  {
    title: '2. Components and props: children, conditional rendering, lists and keys',
    duration: '27:30',
    summary: 'Component architecture: functional components, prop passing, children prop, ternary conditional rendering, and mapping arrays with unique keys.'
  },
  {
    title: '3. Events and forms: controlled vs uncontrolled inputs',
    duration: '26:45',
    summary: 'User interactions: synthetic event handlers, controlled input components with value and onChange, and form submit handling.'
  },
  {
    title: '4. useState: state, lifting state up',
    duration: '28:50',
    summary: 'Managing component state: useState hook, updater functions, immutable state updates for arrays and objects, and lifting state up to parent components.'
  },
  {
    title: '5. useEffect: side effects, dependency array, cleanup',
    duration: '33:20',
    summary: 'Synchronizing with external systems: useEffect hook, understanding dependency arrays, data fetching patterns, and cleanup functions for timers/subscriptions.'
  },
  {
    title: '6. Other hooks: useRef, useMemo, useCallback, useContext, useReducer, custom hooks',
    duration: '38:15',
    summary: 'Advanced React hooks: DOM access with useRef, memoization with useMemo & useCallback, global state with useContext, useReducer, and custom hooks.'
  },
  {
    title: '7. React Router: routes, links, params, nested and protected routes',
    duration: '31:40',
    summary: 'Client-side routing: React Router v6, BrowserRouter, Routes, Route, Link, NavLink, useParams, useSearchParams, and protected authentication gates.'
  },
  {
    title: '8. API integration and state management: fetch/axios, loading and error states, Context, Zustand',
    duration: '34:20',
    summary: 'Data fetching and state: Axios vs Fetch, managing loading/error states, Context API for user auth, and lightweight store management with Zustand.'
  },
  {
    title: '9. Forms and styling: React Hook Form, Zod, Tailwind CSS, shadcn/ui',
    duration: '32:50',
    summary: 'Modern frontend tooling: performant forms with React Hook Form, schema validation with Zod, rapid styling with Tailwind CSS, and shadcn/ui.'
  },
  {
    title: '10. Mini project: dashboard or e-commerce frontend',
    duration: '48:30',
    summary: 'Full frontend capstone: build a comprehensive responsive analytics dashboard or e-commerce storefront with cart state and filtering.'
  }
];

// 6. Backend with Node.js Lessons (8 videos)
const nodeLessons = [
  {
    title: '1. Node basics: runtime, npm, package.json, core modules, dotenv',
    duration: '23:40',
    summary: 'Server-side JavaScript: Node.js runtime environment, npm scripts, package.json dependencies, fs/path core modules, and managing environment variables.'
  },
  {
    title: '2. Express basics: routing, params, query strings, project structure',
    duration: '26:15',
    summary: 'Express web framework: initializing Express apps, route methods (GET, POST), URL parameters (req.params), query strings (req.query), and MVC architecture.'
  },
  {
    title: '3. Middleware: built-in, custom, cors, helmet, morgan, error handling',
    duration: '29:50',
    summary: 'The middleware chain: req, res, next lifecycle, logging with Morgan, CORS headers, security with Helmet, and centralized global error handling.'
  },
  {
    title: '4. REST API design: HTTP methods, status codes, validation, Multer file upload',
    duration: '34:10',
    summary: 'RESTful API principles: HTTP status codes (200, 201, 400, 401, 404, 500), schema validation with Zod/Joi, and multipart/form-data file uploads with Multer.'
  },
  {
    title: '5. Authentication part 1: bcrypt password hashing, JWT, cookies',
    duration: '37:20',
    summary: 'Secure authentication: hashing passwords with bcrypt salt rounds, generating JSON Web Tokens (JWT), and sending httpOnly secure session cookies.'
  },
  {
    title: '6. Authentication part 2: refresh tokens, role-based access, Google login intro',
    duration: '35:45',
    summary: 'Enterprise auth patterns: access vs refresh token rotation, Role-Based Access Control (RBAC) middleware (Admin vs Student), and OAuth2 Google Login.'
  },
  {
    title: '7. Security: CORS, rate limiting, sanitization, XSS, CSRF, SQL injection basics',
    duration: '31:15',
    summary: 'Backend defensive security: preventing SQL/NoSQL injection, sanitizing user inputs against XSS, CSRF protection, and DDoS rate limiting with express-rate-limit.'
  },
  {
    title: '8. Extras and project: Nodemailer, Postman, Swagger, blog or report API',
    duration: '44:00',
    summary: 'Complete backend capstone: transactional emails with Nodemailer, API testing with Postman, Swagger OpenAPI docs, and building a full CRUD API.'
  }
];

// 7. Databases Lessons (8 videos)
const dbLessons = [
  {
    title: '1. Database concepts and SQL basics: tables, keys, CRUD',
    duration: '24:30',
    summary: 'Database foundations: Relational vs Non-Relational mental models, tables, columns, primary keys, foreign keys, and fundamental CRUD SQL queries.'
  },
  {
    title: '2. SQL queries: WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions',
    duration: '28:15',
    summary: 'Advanced querying: filtering with WHERE, sorting with ORDER BY, aggregations (COUNT, SUM, AVG), GROUP BY grouping, and HAVING conditions.'
  },
  {
    title: '3. Joins and relationships: inner, left, right, 1:1, 1:N, M:N',
    duration: '33:40',
    summary: 'Relational algebra: INNER JOIN, LEFT JOIN, RIGHT JOIN, full joins, and modeling One-to-One, One-to-Many, and Many-to-Many relationships with junction tables.'
  },
  {
    title: '4. Constraints, indexes, normalization, transactions, views',
    duration: '32:10',
    summary: 'Database optimization: UNIQUE, NOT NULL, CHECK constraints, B-Tree indexes, database normalization (1NF, 2NF, 3NF), ACID transactions, and database views.'
  },
  {
    title: '5. Supabase part 1: setup, tables, auth, storage',
    duration: '30:45',
    summary: 'Cloud PostgreSQL with Supabase: creating project, managing schema with Table Editor, built-in Supabase Auth, and file storage buckets.'
  },
  {
    title: '6. Supabase part 2: Row Level Security, realtime, client in React and Next.js',
    duration: '34:20',
    summary: 'Production Supabase: writing Row Level Security (RLS) policies, subscribing to PostgreSQL Realtime events, and connecting the Supabase JS client.'
  },
  {
    title: '7. MongoDB and Mongoose: documents, CRUD, schemas, queries, aggregation',
    duration: '36:50',
    summary: 'NoSQL with MongoDB: collections, BSON documents, defining schemas and models with Mongoose, deep populate queries, and aggregation pipelines.'
  },
  {
    title: '8. Schema design: ER diagrams, e-commerce and report system design, Prisma intro',
    duration: '39:10',
    summary: 'Architectural schema design: drawing ER diagrams, modeling production schemas for e-commerce, and introduction to modern ORMs with Prisma.'
  }
];

// 8. Next.js Lessons (6 videos)
const nextLessons = [
  {
    title: '1. Next.js intro: setup, App Router, file-based routing, layouts',
    duration: '27:10',
    summary: 'The modern React framework: create-next-app, App Router architecture, page.tsx, layout.tsx, template.tsx, loading.tsx, and not-found.tsx.'
  },
  {
    title: '2. Server vs client components, loading and error UI',
    duration: '31:25',
    summary: 'React Server Components (RSC): server components by default, "use client" boundary, streaming with React Suspense, and error.tsx boundaries.'
  },
  {
    title: '3. Data fetching: SSR, SSG, ISR, caching',
    duration: '35:40',
    summary: 'Modern data fetching: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (revalidate), and fetch cache tags.'
  },
  {
    title: '4. API route handlers and server actions',
    duration: '33:15',
    summary: 'Full-stack Next.js: building REST endpoints with route.ts handlers and mutating database state directly with Server Actions ("use server").'
  },
  {
    title: '5. Auth, database connection, forms and file upload',
    duration: '38:00',
    summary: 'Production Next.js workflows: connecting PostgreSQL / Supabase, NextAuth (Auth.js) session handling, server action form validations with Zod.'
  },
  {
    title: '6. SEO, metadata, image and font optimization, mini project',
    duration: '42:30',
    summary: 'Performance and SEO: dynamic metadata generateMetadata(), next/image optimization, next/font, and building an end-to-end full stack Next.js mini project.'
  }
];

// 9. Deployment Lessons (4 videos)
const deploymentLessons = [
  {
    title: '1. Environment variables, secrets, build process',
    duration: '22:15',
    summary: 'Production readiness: managing production environment variables, separating client/server secrets, and optimizing webpack/vite production builds.'
  },
  {
    title: '2. Deploying on Vercel, Netlify, Render, Railway',
    duration: '28:30',
    summary: 'Cloud hosting walkthrough: deploying frontend to Vercel and Netlify, deploying Node.js backend servers to Render and Railway.'
  },
  {
    title: '3. Domains, DNS, SSL',
    duration: '24:45',
    summary: 'Custom domains and networking: configuring DNS records (A, CNAME, TXT), automated SSL/TLS certificates, and reverse proxy routing.'
  },
  {
    title: '4. CI/CD with GitHub Actions and Docker basics',
    duration: '34:10',
    summary: 'DevOps pipelines: writing GitHub Actions workflows for automated testing and deployment, and containerizing full stack apps with Docker and Docker Compose.'
  }
];

// 10. Capstone Projects (9 videos)
const capstoneLessons = [
  {
    title: '1. E-Commerce App: Requirements, wireframes and database design',
    duration: '32:00',
    summary: 'Project 1 Architecture: defining product requirements, user journeys, wireframing cart & checkout flows, and designing PostgreSQL schemas.'
  },
  {
    title: '2. E-Commerce App: Frontend and backend build walkthrough',
    duration: '52:15',
    summary: 'Project 1 Implementation: building React/Next.js product catalog, cart state, Express backend APIs, Stripe payments, and order processing.'
  },
  {
    title: '3. E-Commerce App: Deployment, README and demo',
    duration: '28:40',
    summary: 'Project 1 Launch: production cloud deployment, writing professional GitHub README documentation, adding seed data, and live demo.'
  },
  {
    title: '4. Report Management System: Requirements, wireframes and database design',
    duration: '30:15',
    summary: 'Project 2 Architecture: enterprise reporting portal requirements, role permissions, analytics wireframes, and relational schema modeling.'
  },
  {
    title: '5. Report Management System: Frontend and backend build walkthrough',
    duration: '49:30',
    summary: 'Project 2 Implementation: dashboard data tables, charting with Recharts, CSV/PDF report generation, and role-based access control.'
  },
  {
    title: '6. Report Management System: Deployment, README and demo',
    duration: '26:20',
    summary: 'Project 2 Launch: cloud deployment, configuring cron backup jobs, writing architectural docs, and production verification.'
  },
  {
    title: '7. Own Capstone Idea: Requirements, wireframes and database design',
    duration: '28:10',
    summary: 'Project 3 Architecture: step-by-step guidance to plan, scope, design, and architect your own custom full-stack SaaS or startup idea.'
  },
  {
    title: '8. Own Capstone Idea: Frontend and backend build walkthrough',
    duration: '45:00',
    summary: 'Project 3 Implementation: architectural coding patterns, debugging complex workflows, and integrating AI or 3rd-party APIs.'
  },
  {
    title: '9. Own Capstone Idea: Deployment, README and demo',
    duration: '30:00',
    summary: 'Project 3 Launch: live deployment, domain binding, portfolio showcase presentation, and preparing for technical engineering interviews.'
  }
];

// Helper to build VideoLesson object
function makeLesson(idPrefix, index, l, customVideoUrl) {
  const num = index + 1;
  const id = `${idPrefix}-l${num}`;
  const totalSeconds = parseInt(l.duration.split(':')[0], 10) * 60 + parseInt(l.duration.split(':')[1] || '0', 10);
  const mid1 = Math.floor(totalSeconds * 0.3);
  const mid2 = Math.floor(totalSeconds * 0.65);
  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return {
    id,
    title: l.title,
    duration: l.duration,
    durationSeconds: totalSeconds,
    videoUrl: customVideoUrl || DEFAULT_EMBED,
    summary: l.summary,
    chapters: [
      { title: 'Lecture Introduction & Core Concept', time: '00:00', timeSeconds: 0 },
      { title: 'Architecture & Code Walkthrough', time: fmtTime(mid1), timeSeconds: mid1 },
      { title: 'Hands-on Coding & Execution', time: fmtTime(mid2), timeSeconds: mid2 },
      { title: 'Summary & Best Practices', time: l.duration, timeSeconds: totalSeconds }
    ],
    notes: `# ${l.title}\n\n## 📘 Summary\n${l.summary}\n\n## 🚀 Key Takeaways\n- Write modern, clean, production-grade code.\n- Implement security and performance best practices.\n- Test in the integrated code playground before deploying to production.`,
    transcript: `Welcome to this technical masterclass on "${l.title}". In this session, we will examine the core concepts, practical architecture, and step-by-step implementation...`,
    resources: [
      { title: 'Official Documentation & Specs', url: 'https://developer.mozilla.org', type: 'doc' },
      { title: 'GitHub Starter Repository', url: 'https://github.com', type: 'github' }
    ],
    quiz: {
      question: `What is the primary architectural takeaway from "${l.title.split(':')[0]}"?`,
      options: [
        'Writing clean, modular, and maintainable production code',
        'Skipping validation to increase download speeds',
        'Storing sensitive keys in public client code',
        'Avoiding version control systems'
      ],
      correctIndex: 0,
      explanation: 'Modern production software engineering demands clean code, strong separation of concerns, and robust testing.'
    }
  };
}

// 1. Full Stack Development Masterclass Modules
const fullStackModules = [
  {
    id: 'fs-m1',
    title: 'Module 1: Web Basics (HTML, CSS, Git & GitHub)',
    duration: '3h 30m',
    lessons: [
      ...htmlLessons.map((l, i) => makeLesson('fs-m1-html', i, l, `__HTML_VIDEOS_${i + 1}__`)),
      ...cssLessons.map((l, i) => makeLesson('fs-m1-css', i, l, `__CSS_VIDEOS_${i + 1}__`)),
      ...gitLessons.map((l, i) => makeLesson('fs-m1-git', i, l))
    ]
  },
  {
    id: 'fs-m2',
    title: 'Module 2: JavaScript Deep Dive',
    duration: '6h 15m',
    lessons: jsLessons.map((l, i) => makeLesson('fs-m2-js', i, l))
  },
  {
    id: 'fs-m3',
    title: 'Module 3: Frontend with React',
    duration: '5h 45m',
    lessons: reactLessons.map((l, i) => makeLesson('fs-m3-react', i, l))
  },
  {
    id: 'fs-m4',
    title: 'Module 4: Backend with Node.js & Express',
    duration: '4h 15m',
    lessons: nodeLessons.map((l, i) => makeLesson('fs-m4-node', i, l))
  },
  {
    id: 'fs-m5',
    title: 'Module 5: Databases (SQL, Supabase & MongoDB)',
    duration: '4h 25m',
    lessons: dbLessons.map((l, i) => makeLesson('fs-m5-db', i, l))
  },
  {
    id: 'fs-m6',
    title: 'Module 6: Full Stack with Next.js',
    duration: '3h 30m',
    lessons: nextLessons.map((l, i) => makeLesson('fs-m6-next', i, l))
  },
  {
    id: 'fs-m7',
    title: 'Module 7: Cloud Deployment & DevOps',
    duration: '1h 50m',
    lessons: deploymentLessons.map((l, i) => makeLesson('fs-m7-dep', i, l))
  },
  {
    id: 'fs-m8',
    title: 'Module 8: Real-World Capstone Projects',
    duration: '5h 40m',
    lessons: capstoneLessons.map((l, i) => makeLesson('fs-m8-cap', i, l))
  }
];

const fullStackCourse = {
  id: 'vid-fullstack-dev',
  slug: 'full-stack-development',
  title: 'Full Stack Web Development Masterclass',
  subtitle: 'The complete end-to-end career track: Web Basics (HTML/CSS/Git), JavaScript, React 19, Node.js, Databases (SQL/Supabase/MongoDB), Next.js 15, Cloud Deployment, and 3 Capstones.',
  category: 'Full Stack',
  level: 'All Levels',
  rating: 4.96,
  reviewsCount: 4280,
  enrolledCount: 38450,
  totalDuration: '43h 25m',
  totalLectures: 80,
  accentColor: '#6366F1',
  badge: 'Flagship Career Track',
  isFree: false,
  price: '₹2,999',
  originalPrice: '₹9,999',
  instructor: {
    name: 'Skyrovix Team',
    role: 'Principal Systems Architects & Senior Engineers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Industry tech leads with over 15 years building high-scale distributed applications and mentoring engineers globally.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  description: 'The definitive end-to-end full stack web development curriculum. 8 comprehensive modules covering Web Basics (HTML5, CSS3, Git/GitHub), Modern JavaScript, Frontend with React 19, Backend APIs with Node.js & Express, Databases (SQL, Supabase, MongoDB), Next.js 15 App Router, Cloud Deployment & CI/CD, and 3 enterprise Capstone Projects.',
  learningOutcomes: [
    'Master HTML5 semantic elements, forms, SEO, and WCAG accessibility standards',
    'Build responsive, animated modern layouts with Flexbox, CSS Grid, and custom variables',
    'Write clean, modern JavaScript with async/await, closures, DOM manipulation, and Fetch API',
    'Engineer single-page applications using React 19, hooks, React Router, and state management',
    'Design and deploy production-grade REST APIs with Node.js, Express, JWT, and bcrypt',
    'Model database schemas in SQL (PostgreSQL), Supabase (RLS), and MongoDB / Mongoose',
    'Architect full-stack hybrid web applications with Next.js 15 App Router and Server Actions',
    'Deploy applications on Vercel, Render, Railway with CI/CD GitHub Actions and Docker',
    'Build and launch 3 portfolio capstone projects (E-Commerce, Report Management, Custom Idea)'
  ],
  prerequisites: ['No prior programming experience required. Starts from absolute fundamentals.'],
  modules: fullStackModules
};

// 2. Separate Courses
const htmlCourse = {
  id: 'vid-html',
  slug: 'html',
  title: 'HTML5 Modern Web Basics & Semantic Architecture',
  subtitle: 'Master browser architecture, document structure, semantic tags, forms, media, and WCAG accessibility.',
  category: 'Frontend',
  level: 'Beginner',
  rating: 4.94,
  reviewsCount: 2450,
  enrolledCount: 24800,
  totalDuration: '1h 12m',
  totalLectures: 10,
  accentColor: '#F97316',
  badge: 'Web Fundamentals',
  isFree: true,
  price: 'Free',
  originalPrice: '₹1,499',
  instructor: {
    name: 'Alex Rivera',
    role: 'Lead Accessibility Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'W3C accessibility contributor and author of Semantic Web Best Practices.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
  description: '10 comprehensive video lectures covering web basics, text, links, responsive media, tables, lists, HTML5 forms, semantic landmarks, ARIA accessibility, SEO metadata, and a real-world registration profile mini project.',
  learningOutcomes: [
    'Write 100% semantic and accessible HTML5 compliant with WCAG standards',
    'Structure advanced forms with native validation attributes and fieldsets',
    'Implement meta tags, OpenGraph social cards, and localStorage APIs',
    'Build an accessible profile page and registration form from scratch'
  ],
  prerequisites: ['No prerequisites. Beginner friendly!'],
  modules: [
    {
      id: 'html-m1',
      title: 'HTML5 Complete Masterclass (10 Video Lessons)',
      duration: '1h 12m',
      lessons: htmlLessons.map((l, i) => makeLesson('html', i, l, `__HTML_VIDEOS_${i + 1}__`))
    }
  ]
};

const cssCourse = {
  id: 'vid-css',
  slug: 'css',
  title: 'Modern CSS3, Flexbox, Grid & Responsive Design',
  subtitle: 'From box model and specificity to Flexbox, CSS Grid, mobile-first responsive design, animations, and dark mode.',
  category: 'Frontend',
  level: 'Beginner',
  rating: 4.95,
  reviewsCount: 2890,
  enrolledCount: 29100,
  totalDuration: '1h 17m',
  totalLectures: 10,
  accentColor: '#3B82F6',
  badge: 'Styling Masterclass',
  isFree: true,
  price: 'Free',
  originalPrice: '₹1,499',
  instructor: {
    name: 'Elena Rostova',
    role: 'Staff Design Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead frontend architect specializing in CSS Grid, subgrid, micro-animations, and fluid design systems.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  description: '10 in-depth video lectures mastering CSS basics, color systems, typography, the Box Model, coordinates & positioning, Flexbox, CSS Grid, mobile-first responsive design, transitions, keyframes, CSS variables, and building a responsive landing page.',
  learningOutcomes: [
    'Master the CSS box model, margin collapsing, and box-sizing',
    'Build flexible 1D layouts with Flexbox and 2D responsive grids with CSS Grid',
    'Write fluid media queries and implement mobile-first responsive layouts',
    'Create smooth micro-interactions, CSS keyframe animations, and dark mode themes'
  ],
  prerequisites: ['Basic HTML knowledge.'],
  modules: [
    {
      id: 'css-m1',
      title: 'Modern CSS3 & Responsive Design (10 Video Lessons)',
      duration: '1h 17m',
      lessons: cssLessons.map((l, i) => makeLesson('css', i, l, `__CSS_VIDEOS_${i + 1}__`))
    }
  ]
};

const gitCourse = {
  id: 'vid-git',
  slug: 'git-and-github',
  title: 'Git & GitHub Version Control & Team Workflows',
  subtitle: 'Master repository initialization, staging, commits, branches, resolving merge conflicts, and GitHub collaboration.',
  category: 'DevOps',
  level: 'Beginner',
  rating: 4.93,
  reviewsCount: 1820,
  enrolledCount: 19800,
  totalDuration: '1h 10m',
  totalLectures: 3,
  accentColor: '#EF4444',
  badge: 'Essential Tooling',
  isFree: true,
  price: 'Free',
  originalPrice: '₹999',
  instructor: {
    name: 'David Chen',
    role: 'Principal DevOps Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'DevOps lead managing high-scale git monorepos and automated CI/CD release pipelines.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
  description: '3 comprehensive video lectures mastering Git basics (init, add, commit, log, .gitignore), branching & merging (feature branches, conflict resolution), and GitHub collaboration (pull requests, code reviews, and GitHub Pages).',
  learningOutcomes: [
    'Track code versions locally with atomic commits and meaningful messages',
    'Create, switch, and merge git branches and resolve merge conflicts with ease',
    'Collaborate on GitHub with remotes, pull requests, and deploy to GitHub Pages'
  ],
  prerequisites: ['None. Works on Windows, Mac, and Linux.'],
  modules: [
    {
      id: 'git-m1',
      title: 'Git & GitHub Essentials',
      duration: '1h 10m',
      lessons: gitLessons.map((l, i) => makeLesson('git', i, l))
    }
  ]
};

const jsCourse = {
  id: 'vid-javascript',
  slug: 'javascript',
  title: 'JavaScript Complete Modern Programming Masterclass',
  subtitle: 'From variables and control flow to functions, closures, objects, ES6+ modules, DOM manipulation, and Async/Await.',
  category: 'Programming',
  level: 'All Levels',
  rating: 4.97,
  reviewsCount: 3950,
  enrolledCount: 36200,
  totalDuration: '6h 15m',
  totalLectures: 12,
  accentColor: '#FBBF24',
  badge: 'Core Language',
  isFree: true,
  price: 'Free',
  originalPrice: '₹1,999',
  instructor: {
    name: 'Devon Patel',
    role: 'Staff JavaScript Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'ECMAScript standard enthusiast and author of Modern JS Under the Hood.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=80',
  description: '12 complete video lectures covering variables, operators, conditions, loops, functions, closures, arrays, objects, JSON, error handling, classes & prototypes, DOM selection & events, Async JavaScript, Fetch API, and 3 production mini projects.',
  learningOutcomes: [
    'Master modern ES6+ features: arrow functions, destructuring, spread, and modules',
    'Understand JavaScript under the hood: event loop, call stack, and closures',
    'Manipulate the DOM dynamically and handle user events with event delegation',
    'Build asynchronous network applications with Promises, async/await, and Fetch API'
  ],
  prerequisites: ['Basic HTML and CSS knowledge.'],
  modules: [
    {
      id: 'js-m1',
      title: 'Modern JavaScript Complete Curriculum',
      duration: '6h 15m',
      lessons: jsLessons.map((l, i) => makeLesson('js', i, l))
    }
  ]
};

const reactCourse = {
  id: 'vid-react',
  slug: 'react',
  title: 'Frontend Development with React 19',
  subtitle: 'Build interactive SPAs with components, props, hooks (useState, useEffect, custom hooks), React Router, and state management.',
  category: 'Frontend',
  level: 'Intermediate',
  rating: 4.96,
  reviewsCount: 3410,
  enrolledCount: 31400,
  totalDuration: '5h 45m',
  totalLectures: 10,
  accentColor: '#06B6D4',
  badge: 'Popular Framework',
  isFree: false,
  price: '₹1,499',
  originalPrice: '₹3,999',
  instructor: {
    name: 'Sophia Sterling',
    role: 'Staff Frontend Engineer & React Core Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Architected large-scale SPAs serving over 5 million daily active users.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
  description: '10 comprehensive video lectures covering Vite setup, JSX, component props, controlled inputs, useState, useEffect, custom hooks, React Router v6, API integration, forms with Zod, Tailwind CSS, and a complete e-commerce frontend mini project.',
  learningOutcomes: [
    'Architect reusable, declarative UI components using React 19 and JSX',
    'Manage component state and side-effects with useState, useEffect, and custom hooks',
    'Implement multi-page client routing with React Router and URL parameters',
    'Integrate backend REST APIs and validate user inputs with React Hook Form and Zod'
  ],
  prerequisites: ['Solid proficiency in modern JavaScript (ES6+).'],
  modules: [
    {
      id: 'react-m1',
      title: 'React 19 Complete Curriculum',
      duration: '5h 45m',
      lessons: reactLessons.map((l, i) => makeLesson('react', i, l))
    }
  ]
};

const nodeCourse = {
  id: 'vid-node',
  slug: 'nodejs',
  title: 'Backend Engineering with Node.js & Express',
  subtitle: 'Construct secure, production-grade RESTful APIs with Express, middleware, bcrypt password hashing, JWT authentication, and security.',
  category: 'Backend',
  level: 'Intermediate',
  rating: 4.95,
  reviewsCount: 2980,
  enrolledCount: 28400,
  totalDuration: '4h 15m',
  totalLectures: 8,
  accentColor: '#10B981',
  badge: 'Backend Architecture',
  isFree: false,
  price: '₹1,499',
  originalPrice: '₹3,999',
  instructor: {
    name: 'Skyrovix Team',
    role: 'Principal Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in Node.js microservices, high-concurrency event loops, and API security.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  description: '8 complete video lectures covering Node runtime, Express routing, custom middleware, REST API standards, Multer file uploads, bcrypt password hashing, JWT cookies, rate limiting, XSS/CSRF security, Nodemailer, Postman, and a full API capstone.',
  learningOutcomes: [
    'Design and structure clean, modular RESTful APIs using Express and MVC pattern',
    'Implement authentication with bcrypt salt hashing and JWT token expiration',
    'Secure backend servers against XSS, CORS, rate limiting, and parameter pollution',
    'Handle file uploads, transactional emails, and generate interactive Swagger docs'
  ],
  prerequisites: ['Proficiency in JavaScript fundamentals and async programming.'],
  modules: [
    {
      id: 'node-m1',
      title: 'Node.js & Express REST APIs',
      duration: '4h 15m',
      lessons: nodeLessons.map((l, i) => makeLesson('node', i, l))
    }
  ]
};

const dbCourse = {
  id: 'vid-database',
  slug: 'database',
  title: 'Databases: SQL, Supabase & MongoDB Engineering',
  subtitle: 'Master relational SQL (queries, joins, indexes, transactions), Supabase (Auth, RLS, Realtime), and MongoDB (documents, Mongoose).',
  category: 'Databases',
  level: 'Intermediate',
  rating: 4.94,
  reviewsCount: 2640,
  enrolledCount: 26100,
  totalDuration: '4h 25m',
  totalLectures: 8,
  accentColor: '#8B5CF6',
  badge: 'Data Architecture',
  isFree: false,
  price: '₹1,499',
  originalPrice: '₹3,999',
  instructor: {
    name: 'Priya Sharma',
    role: 'Lead Database & Cloud Architect',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'PostgreSQL and distributed database tuning expert with 12+ years experience.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
  description: '8 comprehensive video lectures covering SQL basics, advanced queries, table joins, constraints & indexes, Supabase setup, Row Level Security, MongoDB collections, Mongoose schemas, and production database ER design.',
  learningOutcomes: [
    'Write complex relational SQL queries with aggregate functions and table joins',
    'Implement database normalization, primary/foreign keys, and B-Tree indexes',
    'Build serverless databases with Supabase and secure tables with Row Level Security',
    'Model flexible document stores using MongoDB, Mongoose schemas, and Prisma'
  ],
  prerequisites: ['Basic backend programming understanding.'],
  modules: [
    {
      id: 'db-m1',
      title: 'SQL, Supabase & MongoDB Masterclass',
      duration: '4h 25m',
      lessons: dbLessons.map((l, i) => makeLesson('db', i, l))
    }
  ]
};

const nextCourse = {
  id: 'vid-nextjs',
  slug: 'nextjs',
  title: 'Next.js 15 Full-Stack Framework & App Router',
  subtitle: 'Build production full-stack web applications with Server Components (RSC), Server Actions, SSR/SSG/ISR caching, and SEO optimization.',
  category: 'Full Stack',
  level: 'Advanced',
  rating: 4.97,
  reviewsCount: 3120,
  enrolledCount: 29500,
  totalDuration: '3h 30m',
  totalLectures: 6,
  accentColor: '#18181B',
  badge: 'Production Framework',
  isFree: false,
  price: '₹1,499',
  originalPrice: '₹3,999',
  instructor: {
    name: 'David Chen',
    role: 'Principal Next.js Solutions Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Next.js enterprise consultant building high-performance edge-rendered platforms.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  description: '6 in-depth video lectures covering the Next.js 15 App Router, React Server Components vs Client Components, SSR / SSG / ISR data fetching, Route Handlers, Server Actions, auth integration, and performance optimization.',
  learningOutcomes: [
    'Architect modern web applications using the Next.js 15 App Router hierarchy',
    'Leverage React Server Components for zero-bundle-size server rendering',
    'Mutate database state securely using Next.js Server Actions without writing boilerplate APIs',
    'Optimize images, fonts, and dynamic metadata for near-perfect Lighthouse scores'
  ],
  prerequisites: ['Strong foundation in React and modern JavaScript.'],
  modules: [
    {
      id: 'next-m1',
      title: 'Next.js 15 Complete Curriculum',
      duration: '3h 30m',
      lessons: nextLessons.map((l, i) => makeLesson('next', i, l))
    }
  ]
};

// All courses array
const allVideoCourses = [
  fullStackCourse,
  htmlCourse,
  cssCourse,
  gitCourse,
  jsCourse,
  reactCourse,
  nodeCourse,
  dbCourse,
  nextCourse
];

// Generate the TypeScript file content
const fileHeader = `import { HTML_VIDEOS, CSS_VIDEOS } from '../assets/courseVideos';

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
  duration: string;
  durationSeconds: number;
  videoUrl: string; // Embed or MP4 URL
  summary: string;
  chapters: VideoChapter[];
  notes: string;
  transcript: string;
  resources: ResourceLink[];
  quiz?: QuizQuestion;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
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

export const VIDEO_COURSES: VideoCourse[] = `;

let jsonStr = JSON.stringify(allVideoCourses, null, 2);

// Replace video placeholders with actual imported variables
for (let i = 1; i <= 10; i++) {
  jsonStr = jsonStr.replaceAll(`"__HTML_VIDEOS_${i}__"`, `HTML_VIDEOS[${i}]`);
  jsonStr = jsonStr.replaceAll(`"__CSS_VIDEOS_${i}__"`, `CSS_VIDEOS[${i}]`);
}

const outputPath = path.resolve('src/data/videoCoursesData.ts');
const content = fileHeader + jsonStr + ';\n';
fs.writeFileSync(outputPath, content, 'utf-8');
console.log('Successfully generated videoCoursesData.ts with all 8 modules and real video URLs!');

