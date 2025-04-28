
import { toast } from 'sonner';
import { courseService } from '@/services/course';

// This function is now simplified since we're not saving steps incrementally
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
