import { createClient } from '@supabase/supabase-js';

// 🏛️ Retrieve keys from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🛡️ Guard: If keys are missing, we log a warning instead of letting Supabase throw a fatal error
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Imperial Warning: Supabase environment variables are missing!");
}

// Initialize the client with fallbacks to empty strings to prevent the 'required' crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Admin client (Server-side only)
export const supabaseAdmin = typeof window === 'undefined' 
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )
  : null;