
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { courseFormSchema, CourseFormValues } from "./schema/courseFormSchema";
import CourseFormFields from "./course-form/CourseFormFields";
import CourseFormActions from "./course-form/CourseFormActions";
import { createCourse } from "./services/courseFormService";

interface CreateCourseFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      duration: "",
      lessons: 1,
      status: "draft",
    },
  });

  async function onSubmit(values: CourseFormValues) {
    try {
      setIsSubmitting(true);
      await createCourse(values);
      toast.success("Course created successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred: " + (error.message || "Please try again"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CourseFormFields form={form} />
        <CourseFormActions 
          isSubmitting={isSubmitting} 
          onCancel={onCancel} 
        />
      </form>
    </Form>
  );
};

export default CreateCourseForm;
