import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import type { CourseSection, CourseLesson } from "../types";

export const curriculumService = {
  /**
   * Create a course section in the DB
   */
  createSection: async (
    sectionData: Omit<CourseSection, "id" | "lessons">
  ): Promise<CourseSection> => {
    const { data, error } = await supabase
      .from("course_module")
      .insert([
        {
          course_id: sectionData.course_id,
          title: sectionData.title,
          position: sectionData.position,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating section:", error);
      throw error;
    }

    return {
      id: data.module_id,
      course_id: data.course_id,
      title: data.title,
      position: data.position,
      lessons: [],
    };
  },

  /**
   * Create a course lesson in the DB
   */
  createLesson: async (
    lessonData: Omit<CourseLesson, "id">
  ): Promise<CourseLesson> => {
    const { data, error } = await supabase
      .from("lessons")
      .insert([
        {
          module_id: lessonData.section_id,
          title: lessonData.title,
          type: lessonData.type || "video",
          position: lessonData.position,
          content: lessonData.content || null,
          content_url: lessonData.content_url || null,
          video_url: lessonData.video_url || null,
          duration: lessonData.duration || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }

    return {
      id: data.lesson_id,
      section_id: data.module_id,
      title: data.title,
      type: data.type || "video",
      position: data.position,
      content: data.content || undefined,
      content_url: data.content_url || undefined,
      video_url: data.video_url || undefined,
      duration: data.duration || undefined,
      is_preview: false,
      is_draft: false,
      is_compulsory: false,
      enable_discussion: false,
    };
  },

  /**
   * Get all sections and lessons for a course from DB
   */
  getCourseCurriculum: async (courseId: string): Promise<CourseSection[]> => {
    const { data: sections, error } = await supabase
      .from("course_module")
      .select("*")
      .eq("course_id", courseId)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error retrieving course sections:", error);
      throw error;
    }
    if (!sections || sections.length === 0) {
      // No sections found
      return [];
    }

    // Fetch all lessons for these sections
    const sectionIds = sections.map((s) => s.module_id);
    const { data: lessonsData, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .in("module_id", sectionIds);

    if (lessonsError) {
      console.error("Error retrieving course lessons:", lessonsError);
      throw lessonsError;
    }

    // Group lessons by section/module_id
    const lessonsBySection: Record<string, CourseLesson[]> = {};
    (lessonsData || []).forEach((lesson) => {
      if (!lessonsBySection[lesson.module_id]) lessonsBySection[lesson.module_id] = [];
      lessonsBySection[lesson.module_id].push({
        id: lesson.lesson_id,
        section_id: lesson.module_id,
        title: lesson.title,
        type: lesson.type || "video",
        position: lesson.position,
        content: lesson.content || undefined,
        content_url: lesson.content_url || undefined,
        video_url: lesson.video_url || undefined,
        duration: lesson.duration || undefined,
        is_preview: false,
        is_draft: false,
        is_compulsory: false,
        enable_discussion: false,
      });
    });

    // Combine sections with lessons
    return sections.map((section) => ({
      id: section.module_id,
      course_id: section.course_id,
      title: section.title,
      position: section.position,
      lessons: lessonsBySection[section.module_id] || [],
    }));
  },

  /**
   * Save complete curriculum (sections and lessons)
   * (usually this would be handled individually, but legacy API may want a full save)
   */
  saveCurriculum: async (courseId: string, sectionsIn: CourseSection[]): Promise<{ success: boolean }> => {
    // Usually you don't replace all data but here for legacy:
    // Delete all course's modules and lessons, then insert new ones

    // Delete all sections/modules for this course
    await supabase.from("course_module").delete().eq("course_id", courseId);
    // Delete all lessons for this course's modules
    // (You should do in batch - not shown for brevity)

    for (const section of sectionsIn) {
      const sectionRes = await supabase
        .from("course_module")
        .insert([{ course_id: courseId, title: section.title, position: section.position }])
        .select()
        .single();

      if (sectionRes.error) {
        console.error("Error inserting section:", sectionRes.error);
        throw sectionRes.error;
      }

      const sectionId = sectionRes.data.module_id;
      for (const lesson of section.lessons) {
        const lessonRes = await supabase
          .from("lessons")
          .insert([
            {
              module_id: sectionId,
              title: lesson.title,
              type: lesson.type || "video",
              position: lesson.position,
              content: lesson.content,
              content_url: lesson.content_url,
              video_url: lesson.video_url,
              duration: lesson.duration,
              is_preview: lesson.is_preview,
              is_draft: lesson.is_draft,
              is_compulsory: lesson.is_compulsory,
              enable_discussion: lesson.enable_discussion,
            },
          ]);
        if (lessonRes.error) {
          console.error("Error inserting lesson:", lessonRes.error);
          throw lessonRes.error;
        }
      }
    }

    return { success: true };
  },
};
