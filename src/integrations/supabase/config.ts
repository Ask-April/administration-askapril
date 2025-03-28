
/**
 * This file exports Supabase configuration that can be shared with other projects
 */

// Supabase project URL and anon key
export const SUPABASE_URL = "https://dculncdvxlaatruzgktr.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdWxuY2R2eGxhYXRydXpna3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzYwMDAsImV4cCI6MjA1ODcxMjAwMH0.NJr6WEJlS6VESyigPeag5HBXg1Ne6XZGuiLM8xUbXSY";

// Database types (these would be imported from the types file)
// This is just a reference to remind you to import the types in the other project

/**
 * To use this configuration in another project:
 * 
 * 1. Copy this file to your other Lovable project
 * 2. Initialize Supabase client using these constants:
 * 
 * import { createClient } from '@supabase/supabase-js';
 * import { SUPABASE_URL, SUPABASE_ANON_KEY } from './path/to/config';
 * 
 * export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 * 
 * 3. Copy the database types file (src/integrations/supabase/types.ts) to ensure type safety
 */
