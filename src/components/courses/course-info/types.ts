
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
}

export interface CourseFormErrors {
  title?: string[];
  description?: string[];
  category?: string[];
  image?: string[];
  info?: string[];
}
