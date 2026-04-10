import { createClient } from '@supabase/supabase-js'

// Ye variables aapki .env.local file se values uthayenge
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// src/supabase.js mein ye line add karein
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);