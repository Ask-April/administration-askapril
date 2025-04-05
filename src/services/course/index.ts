
import { courseManagementService } from './courseManagementService';
import { curriculumService } from './curriculumService';

export const courseService = {
  ...courseManagementService,
  ...curriculumService
};
