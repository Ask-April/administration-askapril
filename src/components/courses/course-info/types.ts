
export interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  lessons: number;
  status: "draft" | "published";
  students?: number;
  created_at?: string;
  updated_at?: string;
  // Add additional properties to match the Course type
  featured?: boolean;
  price_visible?: boolean;
  hidden?: boolean;
  has_certificate?: boolean;
  has_enrollment_limit?: boolean;
  max_enrollments?: number;
  subtitle?: string;
  slug?: string;
}

export interface CourseFormErrors {
  title?: string[];
  description?: string[];
  category?: string[];
  image?: string[];
  info?: string[];
}
