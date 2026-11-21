-- ==============================================================================
-- SKYROVIX TECHNICAL LEARNING PLATFORM - SUPABASE SCHEMA
-- Project ID: mofnqyqdipnrkxvpchqe
-- Execute this script in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Profiles Table (Synchronized with Supabase Auth or custom users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    avatar TEXT,
    xp INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 1,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Course Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id)
);

-- 3. Completed Lessons Tracking Table
CREATE TABLE IF NOT EXISTS public.completed_lessons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id, lesson_id)
);

-- 4. Learner Notes & Highlights Table
CREATE TABLE IF NOT EXISTS public.notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    course_title TEXT,
    lesson_id TEXT NOT NULL,
    lesson_title TEXT,
    content TEXT NOT NULL,
    timestamp TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Official Course Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    cert_id TEXT UNIQUE NOT NULL,
    issue_date TEXT NOT NULL,
    instructor TEXT,
    type TEXT DEFAULT 'video',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indexes for lightning-fast lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_lessons_user ON public.completed_lessons(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_notes_user ON public.notes(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON public.certificates(cert_id);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 8. Permissive RLS Policies for Web Application
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Upsert Profiles" ON public.profiles;
CREATE POLICY "Allow Upsert Profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Enrollments" ON public.enrollments;
CREATE POLICY "Public Enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Completed Lessons" ON public.completed_lessons;
CREATE POLICY "Public Completed Lessons" ON public.completed_lessons FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Notes" ON public.notes;
CREATE POLICY "Public Notes" ON public.notes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Certificates" ON public.certificates;
CREATE POLICY "Public Certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

-- 9. Seed Initial Admin & Sample Student
INSERT INTO public.profiles (id, name, email, role, avatar, xp, streak_days, status)
VALUES 
    ('usr-1', 'Hariharan S', 'hariharan@skyrovix.dev', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 1850, 14, 'Active'),
    ('usr-2', 'Aisha Sharma', 'aisha.s@techcorp.io', 'student', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 2450, 7, 'Active')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    xp = EXCLUDED.xp;

-- 10. Seed Sample Course Certificate
INSERT INTO public.certificates (id, user_id, student_name, course_title, cert_id, issue_date, instructor, type)
VALUES 
    ('cert-1', 'usr-1', 'Hariharan S', 'Full Stack Cloud Architecture & Microservices', 'SKX-CERT-2026-9055', '18 October 2026', 'Hariharan S (Founder & CEO)', 'video')
ON CONFLICT (cert_id) DO NOTHING;

