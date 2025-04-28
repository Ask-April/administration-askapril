
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from "@/components/layout/PageTransition";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import CreateCourseForm from "@/components/courses/CreateCourseForm";

const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/courses/overview");
  };

  const handleCancel = () => {
    navigate("/courses/overview");
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <CoursePageHeader 
          title="Create New Course" 
          backPath="/courses/overview" 
        />
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateCourseForm
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateCoursePage;
