
import { getCurriculum } from './getCurriculum';
import { saveCurriculum } from './saveCurriculum';
import { getSectionById } from './getSectionById';
import { getLessonById } from './getLessonById';

// Create an object with all exports
export const curriculumService = {
  getCurriculum,
  saveCurriculum,
  getSectionById,
  getLessonById
};

// Named exports
export {
  getCurriculum,
  saveCurriculum,
  getSectionById,
  getLessonById
};
