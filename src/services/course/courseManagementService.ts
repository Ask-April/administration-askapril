
import { Course } from "../types";

/**
 * Service for managing course data - using mock data instead of Supabase
 */
export const courseManagementService = {
  /**
   * Get all published courses
   */
  getPublicCourses: async (): Promise<Course[]> => {
    // Mock data
    return [
      {
        course_id: "1",
        title: "Introduction to Web Development",
        description: "Learn the basics of web development with HTML, CSS, and JavaScript",
        category_id: "1",
        image_url: "https://example.com/web-dev.jpg",
        status: "published",
        site_id: "site-1",
        featured: true,
        price_visible: true,
        hidden: false,
        has_certificate: true,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: "Start your journey as a web developer",
        external_id: null,
        external_metadata: null,
        slug: "intro-web-dev",
        image: "https://example.com/web-dev.jpg",
        category: "Web Development",
        duration: "8 weeks",
        lessons: 24,
        students: 120,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        course_id: "2",
        title: "Advanced React",
        description: "Take your React skills to the next level",
        category_id: "1",
        image_url: "https://example.com/react.jpg",
        status: "published",
        site_id: "site-1",
        featured: true,
        price_visible: true,
        hidden: false,
        has_certificate: true,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: "Master React.js",
        external_id: null,
        external_metadata: null,
        slug: "advanced-react",
        image: "https://example.com/react.jpg",
        category: "Web Development",
        duration: "6 weeks",
        lessons: 18,
        students: 85,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  },
  
  /**
   * Get a single course by id
   */
  getCourseById: async (id: string): Promise<Course> => {
    // Mock data
    return {
      course_id: id,
      title: "Introduction to Web Development",
      description: "Learn the basics of web development with HTML, CSS, and JavaScript",
      category_id: "1",
      image_url: "https://example.com/web-dev.jpg",
      status: "published",
      site_id: "site-1",
      featured: true,
      price_visible: true,
      hidden: false,
      has_certificate: true,
      has_enrollment_limit: false,
      max_enrollments: null,
      subtitle: "Start your journey as a web developer",
      external_id: null,
      external_metadata: null,
      slug: "intro-web-dev",
      image: "https://example.com/web-dev.jpg",
      category: "Web Development",
      duration: "8 weeks",
      lessons: 24,
      students: 120,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },
  
  /**
   * Get courses by category
   */
  getCoursesByCategory: async (category: string): Promise<Course[]> => {
    // Mock data
    return [
      {
        course_id: "1",
        title: "Introduction to Web Development",
        description: "Learn the basics of web development with HTML, CSS, and JavaScript",
        category_id: "1",
        image_url: "https://example.com/web-dev.jpg",
        status: "published",
        site_id: "site-1",
        featured: true,
        price_visible: true,
        hidden: false,
        has_certificate: true,
        has_enrollment_limit: false,
        max_enrollments: null,
        subtitle: "Start your journey as a web developer",
        external_id: null,
        external_metadata: null,
        slug: "intro-web-dev",
        image: "https://example.com/web-dev.jpg",
        category: "Web Development",
        duration: "8 weeks",
        lessons: 24,
        students: 120,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  },
  
  /**
   * Create a new course (admin/teacher only)
   */
  createCourse: async (courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    status: "draft" | "published";
    lessons: number;
    students: number;
  }): Promise<Course> => {
    console.log("CourseService - Creating course with data:", courseData);
    
    // Generate a course_id since it's required
    const course_id = crypto.randomUUID();
    const site_id = crypto.randomUUID();
    
    const newCourse: Course = {
      course_id,
      title: courseData.title,
      description: courseData.description,
      category_id: null,
      image_url: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      status: courseData.status,
      site_id,
      featured: false,
      price_visible: true,
      hidden: false,
      has_certificate: false,
      has_enrollment_limit: false,
      max_enrollments: null,
      subtitle: null,
      external_id: null,
      external_metadata: null,
      slug: null,
      // Virtual properties
      image: courseData.image,
      category: courseData.category,
      duration: courseData.duration,
      lessons: courseData.lessons,
      students: courseData.students,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log("CourseService - Course created successfully:", newCourse);
    return newCourse;
  },
  
  /**
   * Update an existing course (admin/teacher only)
   */
  updateCourse: async (id: string, courseData: Partial<Course>): Promise<Course> => {
    console.log(`Updating course ${id} with data:`, courseData);
    
    // In a real implementation, this would update the database
    return {
      course_id: id,
      title: courseData.title || "Updated Course",
      description: courseData.description || "Updated description",
      category_id: courseData.category_id || null,
      image_url: courseData.image_url || null,
      status: courseData.status || "draft",
      site_id: "site-1",
      featured: courseData.featured || false,
      price_visible: courseData.price_visible || true,
      hidden: courseData.hidden || false,
      has_certificate: courseData.has_certificate || false,
      has_enrollment_limit: courseData.has_enrollment_limit || false,
      max_enrollments: courseData.max_enrollments || null,
      subtitle: courseData.subtitle || null,
      external_id: courseData.external_id || null,
      external_metadata: courseData.external_metadata || null,
      slug: courseData.slug || null,
      // Virtual properties
      image: courseData.image || "https://example.com/updated.jpg",
      category: courseData.category || "Updated Category",
      duration: courseData.duration || "10 weeks",
      lessons: courseData.lessons || 30,
      students: courseData.students || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },
  
  /**
   * Delete a course (admin/teacher only)
   */
  deleteCourse: async (id: string): Promise<boolean> => {
    console.log(`Deleting course with id ${id}`);
    
    // In a real implementation, this would delete the course from the database
    return true;
  },
};
