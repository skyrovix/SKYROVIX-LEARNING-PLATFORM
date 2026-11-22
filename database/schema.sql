-- ==============================================================================
-- SKYROVIX TECHNICAL LEARNING PLATFORM - STANDARD SQL SCHEMA
-- Target Databases: PostgreSQL / MySQL / MariaDB / SQLite Compatible
-- ==============================================================================

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(32) DEFAULT 'student',
    avatar TEXT,
    headline VARCHAR(255),
    certificate_name VARCHAR(255),
    xp INT DEFAULT 0,
    streak_days INT DEFAULT 1,
    status VARCHAR(32) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. COURSES CATALOG TABLE
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(32) DEFAULT 'video',
    category VARCHAR(64) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    duration VARCHAR(64),
    price DECIMAL(10, 2) DEFAULT 0.00,
    rating DECIMAL(3, 2) DEFAULT 4.90,
    total_students INT DEFAULT 0,
    thumbnail_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    course_id VARCHAR(64) NOT NULL,
    order_id VARCHAR(128),
    payment_gateway VARCHAR(64) DEFAULT 'Cashfree',
    amount_paid DECIMAL(10, 2) DEFAULT 0.00,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- 4. COMPLETED LESSONS TRACKING
CREATE TABLE IF NOT EXISTS completed_lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    course_id VARCHAR(64) NOT NULL,
    lesson_id VARCHAR(128) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id, lesson_id)
);

-- 5. LEARNER NOTES TABLE
CREATE TABLE IF NOT EXISTS notes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    course_id VARCHAR(64) NOT NULL,
    course_title VARCHAR(255),
    lesson_id VARCHAR(128) NOT NULL,
    lesson_title VARCHAR(255),
    content TEXT NOT NULL,
    timestamp VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. OFFICIAL COURSE CERTIFICATES TABLE (QR VERIFIABLE)
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    cert_id VARCHAR(128) UNIQUE NOT NULL,
    issue_date VARCHAR(64) NOT NULL,
    instructor VARCHAR(255),
    type VARCHAR(32) DEFAULT 'video',
    verification_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. CASHFREE PAYMENT ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    course_id VARCHAR(64) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(16) DEFAULT 'INR',
    status VARCHAR(64) DEFAULT 'ACTIVE',
    payment_session_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. COURSE REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    course_id VARCHAR(64) NOT NULL,
    rating INT DEFAULT 5,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. PERFORMANCE INDEXES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_completed_lessons_user ON completed_lessons(user_id, course_id);
CREATE INDEX idx_notes_user ON notes(user_id);
CREATE INDEX idx_certificates_cert_id ON certificates(cert_id);
CREATE INDEX idx_orders_user ON orders(user_id);

-- 10. INITIAL SEED DATA
INSERT INTO users (id, name, email, role, avatar, headline, xp, streak_days, status)
VALUES 
    ('usr-founder', 'Hariharan S.', 'hariharan@skyrovix.in', 'admin', 'https://api.dicebear.com/7.x/bottts/svg?seed=Hariharan', 'Founder & Lead Developer, Skyrovix', 2500, 42, 'Active'),
    ('usr-cofounder', 'Maheshwaran S.', 'maheshwaran@skyrovix.in', 'admin', 'https://api.dicebear.com/7.x/bottts/svg?seed=Maheshwaran', 'Co-Founder & Lead Architect, Skyrovix', 2400, 38, 'Active')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

