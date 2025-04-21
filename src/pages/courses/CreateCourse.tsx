
import React, { useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import WizardNavigation from "@/components/courses/wizard/WizardNavigation";
import CourseInfoForm from "@/components/courses/CourseInfoForm";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import StepProgress from "@/components/courses/StepProgress";
import { CourseWizardProvider, useCourseWizard } from "@/components/courses/wizard/CourseWizardContext";
import CourseAIAssistant from "@/components/courses/wizard/CourseAIAssistant";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

// Pricing component - without duration
const CoursePricing: React.FC = () => {
  const { courseData } = useCourseWizard();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Course Pricing</h2>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Pricing Info</AlertTitle>
        <AlertDescription>
          More advanced pricing options will be available in the future.
        </AlertDescription>
      </Alert>
      <div className="p-4 border rounded-md">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium">Total Lessons</h3>
          <p className="text-2xl font-bold mt-2">{courseData.lessons}</p>
        </div>
      </div>
    </div>
  );
};

// Settings component - remove duration
const CourseSettings: React.FC = () => {
  const { courseData } = useCourseWizard();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Course Settings</h2>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Course Ready for Publishing</AlertTitle>
        <AlertDescription>
          Your course is set up successfully! After clicking Finish, you can find it in your course dashboard.
        </AlertDescription>
      </Alert>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-medium">Course Summary</h3>
            <p className="text-sm text-muted-foreground">Here's a summary of your course details</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Title</p>
              <p className="text-sm">{courseData.title}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm">{courseData.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Lessons</p>
              <p className="text-sm">{courseData.lessons}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Status</p>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                <p className="text-sm capitalize">{courseData.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WizardContent: React.FC = () => {
  const { 
    currentStep, 
    courseData, 
    updateCourseData, 
    createdCourseId,
    updateCurriculumSections,
    steps,
    currentStepIndex
  } = useCourseWizard();

  const renderStepContent = () => {
    switch (currentStep) {
      case "info":
        return (
          <div className="space-y-6">
            <CourseInfoForm 
              courseData={courseData} 
              updateCourseData={updateCourseData} 
            />
            <CourseAIAssistant />
          </div>
        );
      case "curriculum":
        return <CourseCurriculum 
                 courseData={courseData} 
                 updateCourseData={updateCourseData}
                 courseId={createdCourseId || ""}
                 onUpdateSections={updateCurriculumSections}
               />;
      case "pricing":
        return <CoursePricing />;
      case "settings":
        return <CourseSettings />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mb-6">
        <StepProgress 
          steps={steps} 
          currentStep={currentStep} 
          currentStepIndex={currentStepIndex}
        />
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          {renderStepContent()}
          <WizardNavigation />
        </CardContent>
      </Card>
    </>
  );
};

const CreateCourse: React.FC = () => {
  return (
    <CourseWizardProvider>
      <PageTransition>
        <div className="container px-4 py-6">
          <CoursePageHeader 
            title="Create New Course" 
            backPath="/courses/overview" 
          />
          <WizardContent />
        </div>
      </PageTransition>
    </CourseWizardProvider>
  );
};

export default CreateCourse;
