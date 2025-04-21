import { toast } from 'sonner';
import { courseService } from '@/services/course';
import { CourseData } from './types';
import { CourseSection } from '@/services/types';

export const saveCurrentStepData = async (
  currentStep: string,
  courseData: CourseData,
  curriculumSections: any[],
  createdCourseId: string | null
): Promise<string | null> => {
  try {
    if (currentStep === 'info') {
      if (!createdCourseId) {
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
        
        toast.success('Course information saved!');
        return course.course_id;
      } else {
        // Update existing course
        await courseService.updateCourse(createdCourseId, {
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          image: courseData.image,
          status: courseData.status,
          lessons: courseData.lessons,
        });
        toast.success('Course information updated!');
        return createdCourseId;
      }
    } else if (currentStep === 'curriculum' && createdCourseId) {
      if (curriculumSections.length > 0) {
        // Transform the curriculum sections to match the CourseSection type
        const courseSections: CourseSection[] = curriculumSections.map(section => ({
          id: section.id || uuidv4(),
          course_id: createdCourseId,
          title: section.title,
          position: section.position,
          lessons: section.lessons.map((lesson: any) => ({
            id: lesson.id || uuidv4(),
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
        
        await courseService.saveCurriculum(createdCourseId, courseSections);
        toast.success('Curriculum saved successfully!');
      } else {
        toast.info('No curriculum sections to save.');
      }
      return createdCourseId;
    } else if (currentStep === 'pricing' && createdCourseId) {
      // Save pricing information
      await courseService.updateCourse(createdCourseId, {});
      toast.success('Pricing information saved!');
      return createdCourseId;
    } else if (currentStep === 'settings' && createdCourseId) {
      // Save settings information
      await courseService.updateCourse(createdCourseId, {
        status: courseData.status,
        lessons: courseData.lessons
      });
      toast.success('Settings saved!');
      return createdCourseId;
    }
    return createdCourseId;
  } catch (error) {
    console.error(`Error saving ${currentStep}:`, error);
    toast.error(`Failed to save ${currentStep}. Please try again.`);
    throw error;
  }
};

export const finalizeCourse = async (courseId: string): Promise<void> => {
  try {
    if (courseId) {
      await courseService.updateCourse(courseId, {
        status: 'published'
      });
      
      toast.success('Course created successfully!');
    }
  } catch (error) {
    console.error('Error finalizing course:', error);
    toast.error('Failed to finalize course. Please try again.');
    throw error;
  }
};

// Helper function to generate UUID
const uuidv4 = (): string => {
  return crypto.randomUUID();
};
