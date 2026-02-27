import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 🛡️ Fail fast if environment is not configured
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables! Check .env.local.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = typeof window === 'undefined' 
  ? createClient(supabaseUrl, supabaseServiceKey || '')
  : null;