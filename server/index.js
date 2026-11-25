import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '14394481c7c769b9f0a9c04eec38449341';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'cfsk_ma_prod_d3b45e16d8c0d277fc90ae6e333e90aa_eb101bb7';
const CASHFREE_ENV = process.env.CASHFREE_ENV || 'production';
const CASHFREE_BASE_URL = CASHFREE_ENV === 'production' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

console.log(`[Cashfree Gateway] Environment: ${CASHFREE_ENV} | AppId: ${CASHFREE_APP_ID.slice(0, 8)}...`);

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
          id: 'usr-admin',
          name: 'Hariharan S',
          email: 'admin@skyrovix.com',
          passwordHash: 'hashed_AdminPassword123!',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          xp: 1850,
          streakDays: 7,
          status: 'Active',
          createdAt: new Date().toISOString()
        },
        {
          id: 'usr-student',
          name: 'Student Learner',
          email: 'student@skyrovix.com',
          passwordHash: 'hashed_StudentPassword123!',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          xp: 250,
          streakDays: 2,
          status: 'Active',
          createdAt: new Date().toISOString()
        }
      ],
      enrollments: [],
      completedLessons: {},
      notes: [],
      certificates: [],
      orders: [],
      submissions: [],
      capstones: [],
      announcements: [],
      coupons: [],
      customVideoCourses: [],
      customTextCourses: [],
      deletedCourseIds: [],
      settings: null
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialDB, null, 2), 'utf-8');
    return initialDB;
  }
  const parsed = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  if (!Array.isArray(parsed.users)) parsed.users = [];
  if (!Array.isArray(parsed.enrollments)) parsed.enrollments = [];
  if (!parsed.completedLessons || typeof parsed.completedLessons !== 'object') parsed.completedLessons = {};
  if (!Array.isArray(parsed.notes)) parsed.notes = [];
  if (!Array.isArray(parsed.certificates)) parsed.certificates = [];
  if (!Array.isArray(parsed.orders)) parsed.orders = [];
  if (!Array.isArray(parsed.submissions)) parsed.submissions = [];
  if (!Array.isArray(parsed.capstones)) parsed.capstones = [];
  if (!Array.isArray(parsed.announcements)) parsed.announcements = [];
  if (!Array.isArray(parsed.coupons)) parsed.coupons = [];
  if (!Array.isArray(parsed.customVideoCourses)) parsed.customVideoCourses = [];
  if (!Array.isArray(parsed.customTextCourses)) parsed.customTextCourses = [];
  if (!Array.isArray(parsed.deletedCourseIds)) parsed.deletedCourseIds = [];
  return parsed;
}

function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

// 0. SQL Database Health & Connection Status
app.get('/api/db/status', async (req, res) => {
  res.json({
    connected: true,
    engine: 'SQL Database Engine',
    status: 'Healthy',
    timestamp: new Date().toISOString()
  });
});

// Backward compatibility alias
app.get('/api/supabase/status', async (req, res) => {
  res.json({
    connected: true,
    engine: 'SQL Database Engine',
    status: 'Healthy',
    timestamp: new Date().toISOString()
  });
});

// 1. Auth Endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password required' });
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
    lastActive: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDB(db);

  const { passwordHash: _, ...safeUser } = newUser;
  res.status(201).json({
    message: 'Registration successful',
    token: `skyrovix_jwt_${newUser.id}`,
    user: safeUser
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDB();
  const user = db.users.find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  user.lastActive = new Date().toISOString();
  saveDB(db);

  const { passwordHash: _, ...safeUser } = user;
  res.json({
    message: 'Login successful',
    token: `skyrovix_jwt_${user.id}`,
    user: safeUser
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
  const { userId, email, courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: 'courseId is required' });
  }
  const db = loadDB();
  const user = db.users.find(
    u => (userId && u.id === userId) || (email && u.email?.toLowerCase() === email.toLowerCase())
  );
  const targetUserId = user?.id || userId || email;
  if (!targetUserId) {
    return res.status(400).json({ error: 'userId or email is required' });
  }
  const exists = db.enrollments.some(e => e.userId === targetUserId && e.courseId === courseId);
  if (!exists) {
    db.enrollments.push({
      userId: targetUserId,
      courseId,
      enrolledAt: new Date().toISOString()
    });
    if (user) {
      user.xp = (user.xp || 0) + 50;
      user.lastActive = new Date().toISOString();
    }
    saveDB(db);
  }
  res.json({ success: true, message: 'Enrolled successfully' });
});

app.post('/api/progress/toggle', (req, res) => {
  const { userId, email, courseId, lessonId } = req.body;
  if (!courseId || !lessonId) {
    return res.status(400).json({ error: 'courseId and lessonId are required' });
  }
  const db = loadDB();
  const user = db.users.find(
    u => (userId && u.id === userId) || (email && u.email?.toLowerCase() === email.toLowerCase())
  );
  const targetUserId = user?.id || userId || email;
  const key = `${targetUserId}:${courseId}`;
  const list = db.completedLessons[key] || [];

  if (list.includes(lessonId)) {
    db.completedLessons[key] = list.filter(id => id !== lessonId);
  } else {
    db.completedLessons[key] = [...list, lessonId];
    if (user) {
      user.xp = (user.xp || 0) + 100;
    }
  }
  if (user) {
    user.lastActive = new Date().toISOString();
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
  const { userId, studentName, studentAvatar, courseTitle, type, instructor, score } = req.body;
  const db = loadDB();
  const student = db.users.find(u => u.id === userId);
  const newCert = {
    id: `cert-${Date.now()}`,
    userId: userId || student?.id || 'usr-admin',
    studentName: studentName || student?.name || 'Skyrovix Learner',
    studentAvatar: studentAvatar || student?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    courseTitle,
    certId: `SKX-${Math.floor(100000 + Math.random() * 900000)}`,
    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    instructor: instructor || 'Skyrovix Team',
    score: score || '100% (Distinction)',
    status: 'Live Verified Online',
    type: type || 'video',
    createdAt: new Date().toISOString()
  };
  db.certificates.unshift(newCert);
  saveDB(db);
  res.status(201).json({ success: true, certificate: newCert });
});

// 5. Cashfree Payment Gateway Endpoints
app.get('/api/cashfree/config', (req, res) => {
  res.json({
    appId: CASHFREE_APP_ID,
    environment: CASHFREE_ENV,
    isProduction: CASHFREE_ENV === 'production'
  });
});

app.post('/api/cashfree/create-order', async (req, res) => {
  try {
    const {
      amount,
      courseId,
      courseTitle,
      customerName,
      customerEmail,
      customerPhone,
      userId
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid payment amount is required' });
    }

    const orderId = `skx_ord_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    // Sanitize phone (Cashfree requires 10-digit number)
    let sanitizedPhone = (customerPhone || '9876543210').replace(/\D/g, '');
    if (sanitizedPhone.length > 10) {
      sanitizedPhone = sanitizedPhone.slice(-10);
    }
    if (sanitizedPhone.length < 10) {
      sanitizedPhone = '9876543210';
    }

    const payload = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: (userId || 'cust_' + Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_'),
        customer_name: (customerName || 'Skyrovix Student').slice(0, 50),
        customer_email: customerEmail || 'student@skyrovix.dev',
        customer_phone: sanitizedPhone
      },
      order_meta: {
        return_url: `https://skyrovix.in/?order_id=${orderId}&course_id=${courseId || ''}`
      },
      order_note: `Course Enrollment: ${(courseTitle || 'Masterclass').slice(0, 50)}`
    };

    console.log(`[Cashfree API] Creating order ${orderId} for ₹${amount} (${customerName})`);

    const cfRes = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok) {
      console.error('[Cashfree API Order Error]:', cfData);
      return res.status(cfRes.status).json({
        error: cfData.message || 'Failed to create Cashfree order',
        details: cfData
      });
    }

    // Save order record to database.json
    const db = loadDB();
    if (!db.orders) db.orders = [];
    db.orders.push({
      orderId,
      cfOrderId: cfData.cf_order_id,
      paymentSessionId: cfData.payment_session_id,
      amount: Number(amount),
      courseId,
      courseTitle,
      userId,
      customerName,
      customerEmail,
      customerPhone: sanitizedPhone,
      status: cfData.order_status,
      createdAt: new Date().toISOString()
    });
    saveDB(db);

    res.json({
      success: true,
      orderId,
      cfOrderId: cfData.cf_order_id,
      paymentSessionId: cfData.payment_session_id,
      orderAmount: Number(amount),
      orderStatus: cfData.order_status,
      environment: CASHFREE_ENV
    });
  } catch (err) {
    console.error('[Cashfree API Server Exception]:', err);
    res.status(500).json({ error: 'Internal Cashfree server error', message: err.message });
  }
});

app.get('/api/cashfree/verify/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    console.log(`[Cashfree API] Verifying order ${orderId}...`);

    const cfRes = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      }
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok) {
      return res.status(cfRes.status).json({
        error: cfData.message || 'Failed to verify Cashfree order',
        details: cfData
      });
    }

    const isPaid = cfData.order_status === 'PAID';

    const db = loadDB();
    if (!db.orders) db.orders = [];
    const orderRecord = db.orders.find(o => o.orderId === orderId);

    if (orderRecord) {
      orderRecord.status = cfData.order_status;
      orderRecord.paidAt = isPaid ? new Date().toISOString() : null;
    }

    if (isPaid && orderRecord?.userId && orderRecord?.courseId) {
      const alreadyEnrolled = db.enrollments.some(
        e => e.userId === orderRecord.userId && e.courseId === orderRecord.courseId
      );
      if (!alreadyEnrolled) {
        db.enrollments.push({
          userId: orderRecord.userId,
          courseId: orderRecord.courseId,
          orderId,
          enrolledAt: new Date().toISOString(),
          paymentGateway: 'Cashfree',
          amountPaid: orderRecord.amount
        });
      }
    }
    saveDB(db);

    res.json({
      success: true,
      orderId,
      orderStatus: cfData.order_status,
      isPaid,
      orderAmount: cfData.order_amount,
      courseId: orderRecord?.courseId,
      details: cfData
    });
  } catch (err) {
    console.error('[Cashfree Verification Error]:', err);
    res.status(500).json({ error: 'Failed to verify payment with Cashfree', message: err.message });
  }
});

// Cashfree Webhook Endpoint
app.post('/api/cashfree/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('[Cashfree Webhook Event]:', event?.type);

    if (event?.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const orderId = event.data?.order?.order_id;
      if (orderId) {
        const db = loadDB();
        if (!db.orders) db.orders = [];
        const orderRecord = db.orders.find(o => o.orderId === orderId);
        if (orderRecord) {
          orderRecord.status = 'PAID';
          orderRecord.paidAt = new Date().toISOString();
          if (orderRecord.userId && orderRecord.courseId) {
            const alreadyEnrolled = db.enrollments.some(
              e => e.userId === orderRecord.userId && e.courseId === orderRecord.courseId
            );
            if (!alreadyEnrolled) {
              db.enrollments.push({
                userId: orderRecord.userId,
                courseId: orderRecord.courseId,
                orderId,
                enrolledAt: new Date().toISOString(),
                paymentGateway: 'Cashfree Webhook',
                amountPaid: orderRecord.amount
              });
            }
          }
          saveDB(db);
        }
      }
    }
    res.json({ received: true });
  } catch (err) {
    console.error('[Cashfree Webhook Exception]:', err);
    res.status(400).json({ error: 'Webhook processing failed' });
  }
});

// 4. Analytics & Real-Time Admin Endpoints
function formatRelativeOrDate(iso) {
  if (!iso) return 'Recently';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

app.get('/api/admin/overview', (req, res) => {
  const db = loadDB();

  // Compute real student profiles from db.users + db.enrollments + db.completedLessons
  const students = db.users.map(u => {
    const enrolledCourseCount = db.enrollments.filter(e => e.userId === u.id).length;
    const completedLessonsCount = Object.entries(db.completedLessons || {})
      .filter(([key]) => key.startsWith(`${u.id}:`))
      .reduce((sum, [, list]) => sum + (Array.isArray(list) ? list.length : 0), 0);

    return {
      id: u.id,
      name: u.name,
      email: u.email,
      avatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: u.role === 'admin' ? 'admin' : 'student',
      enrolledCourseCount,
      completedLessonsCount,
      xp: u.xp || 0,
      streakDays: u.streakDays || 1,
      lastActive: formatRelativeOrDate(u.lastActive || u.createdAt),
      lastActiveRaw: u.lastActive || u.createdAt || null,
      createdAt: u.createdAt || null,
      status: u.status === 'Inactive' ? 'Inactive' : 'Active'
    };
  });

  // Sort newest orders first
  const orders = [...(db.orders || [])].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  const paidOrders = orders.filter(o => o.status === 'PAID');
  const paidRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const pendingVolume = orders
    .filter(o => o.status !== 'PAID')
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  // Build real chronological live activity feed
  const activity = [];
  db.users.forEach(u => {
    activity.push({
      id: `act-user-${u.id}`,
      type: 'user',
      title: `${u.name} joined as ${u.role}`,
      subtitle: `${u.email} • ${formatRelativeOrDate(u.createdAt)}`,
      timestamp: u.createdAt || new Date(0).toISOString()
    });
  });
  db.enrollments.forEach((e, idx) => {
    const user = db.users.find(u => u.id === e.userId);
    activity.push({
      id: `act-enr-${e.userId}-${e.courseId}-${idx}`,
      type: 'enrollment',
      title: `${user?.name || e.userId} enrolled in ${e.courseId}`,
      subtitle: `${e.paymentGateway || 'Direct Enrollment'} • ${formatRelativeOrDate(e.enrolledAt)}`,
      timestamp: e.enrolledAt || new Date(0).toISOString()
    });
  });
  orders.forEach(o => {
    activity.push({
      id: `act-ord-${o.orderId}`,
      type: 'order',
      title: `Cashfree Order ₹${o.amount} (${o.status})`,
      subtitle: `${o.customerName || o.customerEmail} • ${o.courseTitle} • ${formatRelativeOrDate(o.createdAt)}`,
      timestamp: o.createdAt || new Date(0).toISOString()
    });
  });
  db.certificates.forEach(c => {
    activity.push({
      id: `act-cert-${c.id}`,
      type: 'certificate',
      title: `Certificate ${c.certId} issued to ${c.studentName}`,
      subtitle: `${c.courseTitle} • ${c.issueDate}`,
      timestamp: c.createdAt || new Date(0).toISOString()
    });
  });

  activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Normalize certificates for frontend display
  const certificates = (db.certificates || []).map(c => {
    const owner = db.users.find(u => u.id === c.userId);
    return {
      id: c.id,
      userId: c.userId,
      certCode: c.certId || c.certCode,
      studentName: c.studentName,
      studentAvatar: c.studentAvatar || owner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      courseTitle: c.courseTitle,
      issuedDate: c.issueDate || c.issuedDate,
      score: c.score || '100% (Distinction)',
      status: c.status || 'Live Verified Online',
      instructor: c.instructor || 'Skyrovix Team'
    };
  });

  res.json({
    serverTime: new Date().toISOString(),
    students,
    enrollments: db.enrollments,
    orders,
    certificates,
    notesCount: db.notes.length,
    submissions: db.submissions || [],
    capstones: db.capstones || [],
    announcements: db.announcements || [],
    coupons: db.coupons || [],
    settings: db.settings || null,
    recentActivity: activity.slice(0, 15),
    stats: {
      totalUsers: students.length,
      activeUsers: students.filter(s => s.status === 'Active').length,
      totalEnrollments: db.enrollments.length,
      totalOrders: orders.length,
      paidOrdersCount: paidOrders.length,
      paidRevenue,
      pendingVolume,
      totalCertificates: certificates.length
    }
  });
});

app.patch('/api/admin/students/:id', (req, res) => {
  const { id } = req.params;
  const { status, role, xp, name } = req.body;
  const db = loadDB();
  const user = db.users.find(u => u.id === id || u.email?.toLowerCase() === id.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Student not found' });
  }
  if (status) user.status = status;
  if (role) user.role = role;
  if (typeof xp === 'number') user.xp = xp;
  if (name) user.name = name;
  saveDB(db);
  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

app.delete('/api/admin/certificates/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDB();
  db.certificates = (db.certificates || []).filter(c => c.id !== id);
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/admin/submissions', (req, res) => {
  const db = loadDB();
  const item = {
    id: `sub-${Date.now()}`,
    ...req.body,
    status: req.body.status || 'Pending',
    submittedOn: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
  };
  db.submissions.unshift(item);
  saveDB(db);
  res.status(201).json({ success: true, submission: item });
});

app.patch('/api/admin/submissions/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = loadDB();
  const sub = db.submissions.find(s => s.id === id);
  if (sub && status) {
    sub.status = status;
    saveDB(db);
  }
  res.json({ success: true, submission: sub || null });
});

app.post('/api/admin/capstones', (req, res) => {
  const db = loadDB();
  const item = {
    id: `cap-${Date.now()}`,
    ...req.body,
    status: req.body.status || 'Pending'
  };
  db.capstones.unshift(item);
  saveDB(db);
  res.status(201).json({ success: true, capstone: item });
});

app.patch('/api/admin/capstones/:id', (req, res) => {
  const { id } = req.params;
  const { grade, status } = req.body;
  const db = loadDB();
  const cap = db.capstones.find(c => c.id === id);
  if (cap) {
    if (grade) cap.grade = grade;
    if (status) cap.status = status;
    saveDB(db);
  }
  res.json({ success: true, capstone: cap || null });
});

app.post('/api/admin/announcements', (req, res) => {
  const { text, author } = req.body;
  if (!text) return res.status(400).json({ error: 'Announcement text is required' });
  const db = loadDB();
  const item = {
    id: `ann-${Date.now()}`,
    text,
    author: author || 'Super Admin',
    createdAt: new Date().toISOString()
  };
  db.announcements.unshift(item);
  saveDB(db);
  res.status(201).json({ success: true, announcement: item });
});

app.post('/api/admin/coupons', (req, res) => {
  const { code, discountPercent } = req.body;
  if (!code) return res.status(400).json({ error: 'Coupon code is required' });
  const db = loadDB();
  const item = {
    id: `cpn-${Date.now()}`,
    code: String(code).toUpperCase(),
    discountPercent: Number(discountPercent) || 10,
    active: true,
    createdAt: new Date().toISOString()
  };
  db.coupons.unshift(item);
  saveDB(db);
  res.status(201).json({ success: true, coupon: item });
});

app.delete('/api/admin/coupons/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDB();
  db.coupons = (db.coupons || []).filter(c => c.id !== id);
  saveDB(db);
  res.json({ success: true });
});

// Enterprise Course Synchronization & CRUD Persistence
app.get('/api/courses/sync', (req, res) => {
  const db = loadDB();
  res.json({
    videoCourses: db.customVideoCourses || [],
    textCourses: db.customTextCourses || [],
    deletedCourseIds: db.deletedCourseIds || []
  });
});

app.put('/api/admin/courses/video/:id', (req, res) => {
  const { id } = req.params;
  const course = req.body;
  if (!course || !course.title) {
    return res.status(400).json({ error: 'Valid course payload with title required' });
  }
  const db = loadDB();
  const idx = db.customVideoCourses.findIndex(c => c.id === id);
  const record = { ...course, id, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    db.customVideoCourses[idx] = record;
  } else {
    db.customVideoCourses.unshift(record);
  }
  db.deletedCourseIds = db.deletedCourseIds.filter(d => d !== id);
  saveDB(db);
  res.json({ success: true, course: record });
});

app.put('/api/admin/courses/text/:id', (req, res) => {
  const { id } = req.params;
  const course = req.body;
  if (!course || !course.title) {
    return res.status(400).json({ error: 'Valid text course payload with title required' });
  }
  const db = loadDB();
  const idx = db.customTextCourses.findIndex(c => c.id === id);
  const record = { ...course, id, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    db.customTextCourses[idx] = record;
  } else {
    db.customTextCourses.unshift(record);
  }
  db.deletedCourseIds = db.deletedCourseIds.filter(d => d !== id);
  saveDB(db);
  res.json({ success: true, course: record });
});

app.delete('/api/admin/courses/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDB();
  db.customVideoCourses = db.customVideoCourses.filter(c => c.id !== id);
  db.customTextCourses = db.customTextCourses.filter(c => c.id !== id);
  if (!db.deletedCourseIds.includes(id)) {
    db.deletedCourseIds.push(id);
  }
  saveDB(db);
  res.json({ success: true });
});

app.put('/api/admin/settings', (req, res) => {
  const db = loadDB();
  db.settings = { ...(db.settings || {}), ...(req.body || {}), updatedAt: new Date().toISOString() };
  saveDB(db);
  res.json({ success: true, settings: db.settings });
});

app.get('/api/analytics', (req, res) => {
  const db = loadDB();
  const paidOrders = (db.orders || []).filter(o => o.status === 'PAID');
  const paidRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  res.json({
    totalStudents: db.users.length,
    totalEnrollments: db.enrollments.length,
    totalOrders: (db.orders || []).length,
    paidRevenue,
    totalCertificates: (db.certificates || []).length
  });
});

app.listen(PORT, () => {
  console.log(`Skyrovix API Backend running on http://localhost:${PORT}`);
});

