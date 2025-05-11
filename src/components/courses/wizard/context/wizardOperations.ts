
import { toast } from 'sonner';
import { courseService } from '@/services/course';
import { CourseData, CurriculumSection } from '../types';
import { SaveCurriculumOptions } from './types';

export const saveCourse = async (
  courseData: CourseData,
  setIsLoading: (loading: boolean) => void
): Promise<{ success: boolean; courseId?: string }> => {
  try {
    setIsLoading(true);
    
    // Create the course
    const course = await courseService.createCourse({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      image: courseData.image,
      status: courseData.status,
      lessons: courseData.lessons,
      students: 0
    });

    if (!course || !course.course_id) {
      throw new Error('Failed to create course');
    }

    return { success: true, courseId: course.course_id };
  } catch (error) {
    console.error('Error creating course:', error);
    return { success: false };
  } finally {
    setIsLoading(false);
  }
};

export const saveCurriculum = async (options: SaveCurriculumOptions): Promise<boolean> => {
  const { courseId, sections } = options;
  
  try {
    if (!sections || sections.length === 0) {
      return true; // Nothing to save
    }

    // Transform curriculum sections as needed by the API
    const transformedSections = sections.map(section => ({
      id: section.id || crypto.randomUUID(),
      course_id: courseId,
      title: section.title,
      position: section.position,
      lessons: section.lessons.map((lesson) => ({
        id: lesson.id || crypto.randomUUID(),
        section_id: section.id,
        title: lesson.title,
        type: lesson.type || 'video',
        position: lesson.position,
        content: lesson.content,
        content_url: lesson.contentUrl,
        video_url: lesson.videoUrl,
        duration: lesson.duration || 0,
        is_preview: lesson.isPreview || false,
        is_draft: lesson.isDraft || false,
        is_compulsory: lesson.isCompulsory || true,
        enable_discussion: lesson.enableDiscussion || false
      }))
    }));

    // Save curriculum if we have any sections
    if (transformedSections.length > 0) {
      await courseService.saveCurriculum(courseId, transformedSections);
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving curriculum:', error);
    return false;
  }
};
