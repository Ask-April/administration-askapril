
import { courseManagementService } from './courseManagementService';
import { curriculumService } from './curriculumService';

// Combined course service
export const courseService = {
  ...courseManagementService,
  ...curriculumService,
};

// Re-export for backward compatibility
export { courseManagementService, curriculumService };
