import { createClient } from '@supabase/supabase-js';

// Supabase Configuration from Environment
export const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://mofnqyqdipnrkxvpchqe.supabase.co';
export const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZm5xeXFkaXBucmt4dnBjaHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwMDM4MTAsImV4cCI6MjExMDU3OTgxMH0.HXzWzTHSFAKy1Uoko7cA7z5xYwWzoAB75q_DytF21Sw';
export const supabaseProjectId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PROJECT_ID) || 'mofnqyqdipnrkxvpchqe';

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// ================= AUTHENTICATION HELPERS =================

/**
 * Sign up a new user with email, password, and metadata
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string, role: 'student' | 'admin' = 'student') {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || email.split('@')[0],
          role: role
        }
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    console.error('Supabase SignUp Error:', err);
    return { data: null, error: err.message || 'Sign up failed' };
  }
}

/**
 * Sign in existing user with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    console.error('Supabase SignIn Error:', err);
    return { data: null, error: err.message || 'Authentication failed' };
  }
}

/**
 * Sign out the currently logged in user
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (err: any) {
    console.error('Supabase SignOut Error:', err);
    return { error: err.message || 'Sign out failed' };
  }
}

/**
 * Get current session
 */
export async function getSupabaseSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (err) {
    return null;
  }
}

/**
 * Get current authenticated user
 */
export async function getSupabaseUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (err) {
    return null;
  }
}

// ================= DATABASE SYNC HELPERS =================

/**
 * Fetch or create learner profile
 */
export async function fetchProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

/**
 * Upsert learner profile
 */
export async function upsertProfile(profile: {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  xp?: number;
  streak_days?: number;
  status?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

/**
 * Fetch enrollments for user
 */
export async function fetchUserEnrollments(userId: string) {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', userId);

    if (error) throw error;
    return (data || []).map(row => row.course_id);
  } catch (err) {
    return [];
  }
}

/**
 * Enroll user in a course
 */
export async function recordEnrollment(userId: string, courseId: string) {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: userId, course_id: courseId })
      .select();

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Record completed lesson
 */
export async function recordLessonCompletion(userId: string, courseId: string, lessonId: string) {
  try {
    const { error } = await supabase
      .from('completed_lessons')
      .upsert({ user_id: userId, course_id: courseId, lesson_id: lessonId });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

