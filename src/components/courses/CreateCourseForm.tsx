
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { courseFormSchema, CourseFormValues } from "./schema/courseFormSchema";
import CourseFormFields from "./course-form/CourseFormFields";
import CourseFormActions from "./course-form/CourseFormActions";
import { createCourse } from "./services/courseFormService";
import { useNavigate } from "react-router-dom";

interface CreateCourseFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      lessons: 1,
      status: "draft",
    },
  });

  async function onSubmit(values: CourseFormValues) {
    try {
      setIsSubmitting(true);
      const courseId = await createCourse(values);
      toast.success("Course created successfully!");
      
      if (courseId) {
        // If we want to redirect to edit page
        navigate(`/courses/edit/${courseId}`);
      } else {
        onSuccess();
      }
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
