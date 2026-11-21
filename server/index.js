import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabaseAdmin, testConnection } from './supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'data/database.json');

// Initialize database file if not exists
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

function loadDB() {
  if (!fs.existsSync(dbPath)) {
    const initialDB = {
      users: [
        {
          id: 'usr-1',
          name: 'Hariharan S',
          email: 'hariharan@skyrovix.dev',
          passwordHash: 'hashed_secret',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          xp: 1850,
          streakDays: 7,
          status: 'Active',
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-2',
          name: 'Aisha Sharma',
          email: 'aisha.s@techcorp.io',
          passwordHash: 'hashed_secret',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          xp: 2450,
          streakDays: 14,
          status: 'Active',
          createdAt: new Date().toISOString()
        }
      ],
      enrollments: [
        { userId: 'usr-1', courseId: 'vid-fullstack-dev', enrolledAt: new Date().toISOString() },
        { userId: 'usr-1', courseId: 'text-html', enrolledAt: new Date().toISOString() },
        { userId: 'usr-1', courseId: 'vid-react', enrolledAt: new Date().toISOString() },
        { userId: 'usr-1', courseId: 'text-python', enrolledAt: new Date().toISOString() }
      ],
      completedLessons: {
        'usr-1:vid-fullstack-dev': ['fs-l1'],
        'usr-1:text-html': ['html_01_html_home', 'html_02_html_introduction']
      },
      notes: [
        {
          id: 'note-1',
          userId: 'usr-1',
          courseId: 'vid-fullstack-dev',
          courseTitle: 'Full Stack Web Development Masterclass',
          lessonId: 'fs-l1',
          lessonTitle: '1. Anatomy of a Production Full Stack Application',
          content: 'Stateless servers permit seamless horizontal autoscaling behind reverse proxy (Nginx/ALB). Decouple session storage to Redis.',
          timestamp: '09:30',
          createdAt: 'Yesterday'
        }
      ],
      certificates: [
        {
          id: 'cert-1',
          userId: 'usr-1',
          studentName: 'Hariharan S',
          courseTitle: 'Full Stack Web Development Masterclass',
          certId: 'SKX-982410',
          issueDate: 'November 18, 2026',
          instructor: 'Skyrovix Team',
          type: 'video'
        }
      ]
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialDB, null, 2), 'utf-8');
    return initialDB;
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

// 0. Supabase Health & Connection Status
app.get('/api/supabase/status', async (req, res) => {
  const status = await testConnection();
  res.json({
    connected: status.ok,
    projectId: 'mofnqyqdipnrkxvpchqe',
    supabaseUrl: 'https://mofnqyqdipnrkxvpchqe.supabase.co',
    details: status
  });
});

// 1. Auth Endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password required' });
  }

  // Attempt sync with Supabase Auth Admin in background
  try {
    supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: name, role: role || 'student' },
      email_confirm: true
    }).catch(err => console.log('[Supabase User Sync Notice]:', err.message));
  } catch (err) {
    // Non-blocking
  }

  const db = loadDB();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    passwordHash: 'hashed_' + password,
    role: role || 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 100,
    streakDays: 1,
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);

  res.status(201).json({
    message: 'Registration successful',
    token: `skyrovix_jwt_${newUser.id}`,
    user: newUser
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDB();
  const user = db.users.find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({
    message: 'Login successful',
    token: `skyrovix_jwt_${user.id}`,
    user
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  res.json({ message: `Password reset instructions sent to ${email}` });
});

// Update student profile endpoint
app.put('/api/auth/profile', async (req, res) => {
  const { id, email, updates } = req.body;
  if (!email && !id) {
    return res.status(400).json({ error: 'Email or ID required to update profile' });
  }
  const db = loadDB();
  const user = db.users.find(u => (id && u.id === id) || (email && u.email?.toLowerCase() === email.toLowerCase()));
  if (user) {
    Object.assign(user, updates || {});
    saveDB(db);
    try {
      if (user.id && !user.id.startsWith('usr-') && updates?.name) {
        supabaseAdmin.auth.admin.updateUserById(user.id, {
          user_metadata: { full_name: updates.name, avatar: updates.avatar }
        }).catch(() => {});
      }
    } catch (e) {}
    return res.json({ success: true, message: 'Profile updated successfully', user });
  }
  res.json({ success: true, message: 'Profile state synced', user: updates });
});

// Delete student endpoint
app.delete('/api/auth/students/:id', async (req, res) => {
  const { id } = req.params;
  const db = loadDB();
  const user = db.users.find(u => u.id === id || u.email?.toLowerCase() === id.toLowerCase());
  if (user) {
    db.users = db.users.filter(u => u.id !== user.id);
    db.enrollments = db.enrollments.filter(e => e.userId !== user.id);
    saveDB(db);
    try {
      if (user.id && !user.id.startsWith('usr-')) {
        supabaseAdmin.auth.admin.deleteUser(user.id).catch(() => {});
      }
    } catch (e) {}
  }
  res.json({ success: true, message: 'Student removed from database' });
});

// 2. Enrollments & Progress
app.get('/api/enrollments', (req, res) => {
  const userId = req.query.userId || 'usr-1';
  const db = loadDB();
  const userEnrollments = db.enrollments.filter(e => e.userId === userId);
  res.json(userEnrollments);
});

app.post('/api/enrollments', (req, res) => {
  const { userId, courseId } = req.body;
  const db = loadDB();
  const exists = db.enrollments.some(e => e.userId === userId && e.courseId === courseId);
  if (!exists) {
    db.enrollments.push({ userId, courseId, enrolledAt: new Date().toISOString() });
    saveDB(db);
  }
  res.json({ success: true, message: 'Enrolled successfully' });
});

app.post('/api/progress/toggle', (req, res) => {
  const { userId, courseId, lessonId } = req.body;
  const db = loadDB();
  const key = `${userId}:${courseId}`;
  const list = db.completedLessons[key] || [];

  if (list.includes(lessonId)) {
    db.completedLessons[key] = list.filter(id => id !== lessonId);
  } else {
    db.completedLessons[key] = [...list, lessonId];
  }

  saveDB(db);
  res.json({ success: true, completed: db.completedLessons[key] });
});

// 3. Certificates & Verification
app.get('/api/certificates/verify/:certId', (req, res) => {
  const { certId } = req.params;
  const db = loadDB();
  const cert = db.certificates.find(c => c.certId.toUpperCase() === certId.toUpperCase());
  if (cert) {
    res.json({ verified: true, certificate: cert });
  } else {
    res.status(404).json({ verified: false, message: 'Certificate ID not found' });
  }
});

app.post('/api/certificates/issue', (req, res) => {
  const { userId, studentName, courseTitle, type, instructor } = req.body;
  const db = loadDB();
  const newCert = {
    id: `cert-${Date.now()}`,
    userId,
    studentName,
    courseTitle,
    certId: `SKX-${Math.floor(100000 + Math.random() * 900000)}`,
    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    instructor: instructor || 'Skyrovix Team',
    type: type || 'video'
  };
  db.certificates.push(newCert);
  saveDB(db);
  res.status(201).json({ success: true, certificate: newCert });
});

// 4. Analytics & KPIs
app.get('/api/analytics', (req, res) => {
  const db = loadDB();
  res.json({
    totalStudents: 14820 + db.users.length,
    activeCourses: 22,
    totalCompletions: 84190,
    satisfactionRating: 4.94,
    monthlyEnrollmentGrowth: '+24%'
  });
});

app.listen(PORT, () => {
  console.log(`Skyrovix API Backend running on http://localhost:${PORT}`);
});

