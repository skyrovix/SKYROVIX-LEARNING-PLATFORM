import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mofnqyqdipnrkxvpchqe.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZm5xeXFkaXBucmt4dnBjaHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTAwMzgxMCwiZXhwIjoyMTEwNTc5ODEwfQ.sZN3GrTbR_GFTvRDABzMlUUxXWU0Qz0-Ca-1VhqslCw';

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('[Supabase Server] Connected to:', SUPABASE_URL);

/**
 * Test connectivity
 */
export async function testConnection() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) throw error;
    return { ok: true, usersCount: data.users.length };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

