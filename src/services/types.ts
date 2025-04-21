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
  // external_metadata: any | null; // removed from DB and type
  slug: string | null;
  created_at?: string;
  updated_at?: string;
  // Virtual properties - not in DB but used in UI
  image?: string;
  category?: string;
  lessons?: number;
  students?: number;
  certificateTemplate?: string; // Added this property
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

// ---- LEADS ---- //
export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: string;
  created_at: string;
  phone?: string;
  tags?: string[];
  last_contacted?: string;
}

// ---- CONTENT REPORTS ---- //
export interface ContentReport {
  id: string;
  community_id: string;
  reporter_id: string;
  content_type: string;
  content_id: string;
  content_excerpt?: string;
  reason: string;
  severity?: 'low' | 'medium' | 'high';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}

// ---- COMMUNITY SETTINGS ---- //
export interface CommunitySetting {
  id: string;
  name: string;
  description: string | null;
  category: string;
  value: boolean;
}

// ---- LEAD SOURCES ---- //
export interface Source {
  id: string;
  name: string;
  count: number;
  conversion: string;
  trend: 'up' | 'down';
  change: string;
}

// ---- COURSE CURRICULUM ---- //
export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  position: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  section_id?: string;
  title: string;
  type: string;
  position: number;
  content?: string;
  duration?: number;
  video_url?: string;
  content_url?: string;
  is_preview?: boolean;
  is_draft?: boolean;
  is_compulsory?: boolean;
  enable_discussion?: boolean;
}
