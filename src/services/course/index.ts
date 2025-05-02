
import { courseManagementService } from './courseManagementService';
import { curriculumService } from './curriculum';
import { getCourseById } from './getCourseById';
import { getPublicCourses } from './getPublicCourses';
import { createCourse } from './createCourse';
import { deleteCourse } from './deleteCourse';
import { updateCourse } from './updateCourse';
import { getCoursesByCategory } from './getCoursesByCategory';
import { enrollmentService } from './enrollmentService';
import { categoryService } from './categoryService';

// Combined course service
export const courseService = {
  ...courseManagementService,
  ...curriculumService,
  getCourseById,
  getPublicCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  getCoursesByCategory,
  ...enrollmentService,
  ...categoryService,
};

// Re-export for backward compatibility
export { 
  courseManagementService, 
  curriculumService,
  getCourseById,
  getPublicCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  getCoursesByCategory,
  enrollmentService,
  categoryService
};
