
import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z.string().optional(),
  lessons: z.coerce.number().min(1, {
    message: "Course must have at least 1 lesson.",
  }),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
