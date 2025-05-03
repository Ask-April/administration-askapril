
import { courseManagementService } from './courseManagementService';
import { curriculumService } from './curriculumService';
import { lessonService } from './curriculum/getLessonById';

// Combined course service
export const courseService = {
  ...courseManagementService,
  ...curriculumService,
  ...lessonService,
};

// Re-export for backward compatibility
export { courseManagementService, curriculumService, lessonService };
