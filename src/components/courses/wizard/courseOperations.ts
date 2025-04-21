
import { toast } from 'sonner';
import { courseService } from '@/services/course';
import { CourseData, CurriculumSection } from './types';

export const saveCurrentStepData = async (
  currentStep: string,
  courseData: CourseData,
  curriculumSections: CurriculumSection[],
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
          duration: courseData.duration || '0 hours',
          status: courseData.status,
          lessons: courseData.lessons,
          students: 0
        });
        
        toast.success('Course information saved!');
        return course.course_id;
      } else {
        // Update existing course
        await courseService.updateCourse(createdCourseId, {
          ...courseData,
          // These fields are accepted now because we updated the Course type
        });
        toast.success('Course information updated!');
        return createdCourseId;
      }
    } else if (currentStep === 'curriculum' && createdCourseId) {
      if (curriculumSections.length > 0) {
        await courseService.saveCurriculum(createdCourseId, curriculumSections);
        toast.success('Curriculum saved successfully!');
      } else {
        toast.info('No curriculum sections to save.');
      }
      return createdCourseId;
    } else if (currentStep === 'pricing' && createdCourseId) {
      // Save pricing information
      await courseService.updateCourse(createdCourseId, {
        duration: courseData.duration
        // This is now valid with our updated Course type
      });
      toast.success('Pricing information saved!');
      return createdCourseId;
    } else if (currentStep === 'settings' && createdCourseId) {
      // Save settings information
      await courseService.updateCourse(createdCourseId, {
        status: courseData.status,
        lessons: courseData.lessons
        // This is now valid with our updated Course type
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
