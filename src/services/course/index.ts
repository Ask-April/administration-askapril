
import { courseManagementService } from './courseManagementService';
import { curriculumService } from './curriculumService';
import { enrollmentService } from './enrollmentService';
import { categoryService } from './categoryService';

// Export a combined service for backward compatibility
export const courseService = {
  ...courseManagementService,
  ...curriculumService,
  ...enrollmentService,
  ...categoryService
};

// Export individual services for more specific imports
export { courseManagementService, curriculumService, enrollmentService, categoryService };
