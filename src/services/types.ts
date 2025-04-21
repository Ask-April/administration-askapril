
// Types synchronized with Supabase tables schema

// ---- COURSES ---- //
export interface Course {
  course_id: string;
  title: string | null;
  description: string | null;
  category_id: string | null; // references course_category.category_id
  image_url: string | null;
  status: string | null;
  site_id: string;
  featured: boolean | null;
  price_visible: boolean | null;
  hidden: boolean | null;
  has_certificate: boolean | null;
  has_enrollment_limit: boolean | null;
  max_enrollments: number | null;
  subtitle: string | null;
  external_id: string | null;
  external_metadata: any | null;
  slug: string | null;
  // No 'duration', 'lessons', 'students', 'created_at', 'updated_at' in DB schema for courses table
}

// ---- USERS ---- //
export interface User {
  user_id: string;
  site_id: string;
  name: string | null;
  email: string | null;
  password_hash?: string | null;
  signup_date: string | null;
}

// ---- ENROLLMENT ---- //
export interface Enrollment {
  enrollment_id: string;
  student_id: string | null;
  course_id: string | null;
  status: string | null;
  progress_percent: number | null;
  enroll_date: string | null;
}

// --- COURSE CATEGORY --- //
export interface Category {
  category_id: string;
  site_id: string;
  name: string | null;
}

// ---- PROFILES ---- //
// SYNC with public.profiles table
export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
}
