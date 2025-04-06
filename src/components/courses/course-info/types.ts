
export interface CourseData {
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  lessons: number;
  status: "draft" | "published";
  students?: number;
}

export interface CourseFormErrors {
  title?: string[];
  description?: string[];
  category?: string[];
  image?: string[];
  info?: string[];
}

export interface PreviewContent {
  title: string;
  content: string;
  image: string;
}
