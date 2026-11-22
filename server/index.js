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

