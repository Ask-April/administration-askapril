
/**
 * Types synchronized with Supabase tables schema. (Do not add unused types here!)
 */

/* === COURSES === */
export interface Course {
  course_id: string;
  title: string | null;
  description: string | null;
  category: string | null;
  image: string | null;
  duration: string | null;
  lessons: number | null;
  status: string | null;
  students: number | null;
  site_id: string;
  created_at: string | null;
  updated_at: string | null;
}

/* === USERS === */
export interface User {
  user_id: string;
  site_id: string;
  name: string | null;
  email: string | null;
  password_hash?: string | null; // nullable
  signup_date: string | null;
}

/* === ENROLLMENT === */
export interface Enrollment {
  enrollment_id: string;
  student_id: string;
  course_id: string;
  status: string | null;
  progress_percent: number | null;
  enroll_date: string | null;
}

/* === COURSE CATEGORY === */
export interface Category {
  category_id: string;
  site_id: string;
  name: string | null;
}

/* === PROFILES (sync with Supabase) === */
export interface Profile {
  id: string;
  display_name: string | null; // includes full name or email user
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/* === Additional models can be extended here, copying field definitions from Supabase tables === */

