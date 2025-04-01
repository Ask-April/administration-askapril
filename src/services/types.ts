
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

export interface CourseSection {
  id: string;
  title: string;
  course_id: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  section_id: string;
  type?: string;
  content?: string;
  content_url?: string;
  video_url?: string;
  duration?: number;
  position: number;
  is_preview?: boolean;
  is_draft?: boolean;
  is_compulsory?: boolean;
  enable_discussion?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Enrollment {
  enrollment_id: string;
  student_id: string;
  course_id: string;
  status: string;
  progress_percent: number;
  enroll_date: string;
}

export interface Category {
  category_id: string;
  site_id: string;
  name: string;
}
