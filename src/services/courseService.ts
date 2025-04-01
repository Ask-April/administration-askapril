import { supabase } from "@/integrations/supabase/client";

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

type CreateCourseData = {
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  status: "draft" | "published";
  lessons: number;
  students: number;
};

/**
 * Service for interacting with courses data in Supabase
 * This can be used by this project or imported into another project
 */
export const courseService = {
  /**
   * Get all published courses
   */
  getPublicCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching public courses:", error);
      throw error;
    }
    
    return data as Course[];
  },
  
  /**
   * Get a single course by id
   */
  getCourseById: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('course_id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
    
    return data as Course;
  },
  
  /**
   * Get courses by category
   */
  getCoursesByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching courses for category ${category}:`, error);
      throw error;
    }
    
    return data as Course[];
  },
  
  /**
   * Create a new course (admin/teacher only)
   */
  createCourse: async (courseData: CreateCourseData) => {
    console.log("CourseService - Creating course with data:", courseData);
    
    // Generate a site_id since it's required
    const site_id = crypto.randomUUID();
    
    const sanitizedData = {
      ...courseData,
      image: courseData.image || "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      site_id: site_id,
    };
    
    console.log("CourseService - Sanitized data:", sanitizedData);
    
    const { data, error } = await supabase
      .from('courses')
      .insert(sanitizedData)
      .select('*')
      .single();
    
    if (error) {
      console.error("CourseService - Error creating course:", error);
      throw error;
    }
    
    console.log("CourseService - Course created successfully:", data);
    return data;
  },
  
  /**
   * Create a course section
   */
  createSection: async (sectionData: Omit<CourseSection, 'id' | 'created_at' | 'updated_at'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a section");
    }
    
    const { data, error } = await supabase
      .from('course_sections')
      .insert(sectionData)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating section:", error);
      throw error;
    }
    
    return data as CourseSection;
  },
  
  /**
   * Create a course lesson
   */
  createLesson: async (lessonData: Omit<CourseLesson, 'id' | 'created_at' | 'updated_at'>) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to create a lesson");
    }
    
    const { data, error } = await supabase
      .from('course_lessons')
      .insert({
        section_id: lessonData.section_id,
        title: lessonData.title,
        type: lessonData.type,
        content: lessonData.content,
        content_url: lessonData.content_url,
        video_url: lessonData.video_url,
        duration: lessonData.duration,
        position: lessonData.position,
        is_preview: lessonData.is_preview,
        is_draft: lessonData.is_draft,
        is_compulsory: lessonData.is_compulsory,
        enable_discussion: lessonData.enable_discussion
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
    
    return data as CourseLesson;
  },
  
  /**
   * Get all sections and lessons for a course
   */
  getCourseCurriculum: async (courseId: string) => {
    // First get all sections
    const { data: sections, error: sectionsError } = await supabase
      .from('course_sections')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true });
    
    if (sectionsError) {
      console.error("Error fetching course sections:", sectionsError);
      throw sectionsError;
    }
    
    if (!sections || sections.length === 0) {
      return [];
    }
    
    // Now get all lessons for these sections
    const sectionIds = sections.map(section => section.id);
    const { data: lessons, error: lessonsError } = await supabase
      .from('course_lessons')
      .select('*')
      .in('section_id', sectionIds)
      .order('position', { ascending: true });
    
    if (lessonsError) {
      console.error("Error fetching course lessons:", lessonsError);
      throw lessonsError;
    }
    
    // Combine sections with their lessons
    const sectionsWithLessons = sections.map(section => ({
      ...section,
      lessons: (lessons || []).filter(lesson => lesson.section_id === section.id)
    }));
    
    return sectionsWithLessons;
  },
  
  /**
   * Update an existing course (admin/teacher only)
   */
  updateCourse: async (id: string, courseData: Partial<Omit<Course, 'course_id' | 'created_at' | 'updated_at'>>) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to update a course");
    }
    
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('course_id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating course with id ${id}:`, error);
      throw error;
    }
    
    return data as Course;
  },
  
  /**
   * Delete a course (admin/teacher only)
   */
  deleteCourse: async (id: string) => {
    // Check authentication first
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error("Authentication required to delete a course");
    }
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('course_id', id);
    
    if (error) {
      console.error(`Error deleting course with id ${id}:`, error);
      throw error;
    }
    
    return true;
  },
  
  /**
   * Save complete curriculum (sections and lessons)
   */
  saveCurriculum: async (courseId: string, sections: any[]) => {
    console.log("CourseService - Saving curriculum for course:", courseId, sections);
    
    // First, save all sections
    for (const section of sections) {
      // Ensure we're using a valid UUID for section id
      if (!section.id || typeof section.id !== 'string' || !section.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.error("Invalid section ID format:", section.id);
        throw new Error("Invalid section ID format: must be a valid UUID");
      }
      
      console.log("Saving section:", section);
      
      const { error: sectionError } = await supabase
        .from('course_sections')
        .upsert({
          id: section.id,
          course_id: courseId,
          title: section.title,
          position: section.position
        }, { onConflict: 'id' });
      
      if (sectionError) {
        console.error("CourseService - Error saving section:", sectionError);
        throw sectionError;
      }
      
      // Then save all lessons for this section
      for (const lesson of section.lessons) {
        // Ensure we're using a valid UUID for lesson id
        if (!lesson.id || typeof lesson.id !== 'string' || !lesson.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          console.error("Invalid lesson ID format:", lesson.id);
          throw new Error("Invalid lesson ID format: must be a valid UUID");
        }
        
        console.log("Saving lesson:", lesson);
        
        const { error: lessonError } = await supabase
          .from('course_lessons')
          .upsert({
            id: lesson.id,
            section_id: section.id,
            title: lesson.title,
            type: lesson.type || 'video',
            position: lesson.position,
            content: lesson.content || '',
            duration: lesson.duration || 0,
            is_draft: lesson.isDraft || false
          }, { onConflict: 'id' });
        
        if (lessonError) {
          console.error("CourseService - Error saving lesson:", lessonError);
          throw lessonError;
        }
      }
    }
    
    // Update total lessons count in the course
    const totalLessons = sections.reduce((count, section) => count + section.lessons.length, 0);
    
    const { error: updateError } = await supabase
      .from('courses')
      .update({ lessons: totalLessons })
      .eq('course_id', courseId);
    
    if (updateError) {
      console.error("CourseService - Error updating lesson count:", updateError);
      throw updateError;
    }
    
    console.log("CourseService - Curriculum saved successfully");
    return { success: true };
  }
};
