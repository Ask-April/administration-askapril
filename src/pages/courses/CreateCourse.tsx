
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import WizardNavigation from "@/components/courses/wizard/WizardNavigation";
import CourseInfoForm from "@/components/courses/CourseInfoForm";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import StepProgress from "@/components/courses/StepProgress";
import { CourseWizardProvider, useCourseWizard } from "@/components/courses/wizard/CourseWizardContext";
import CourseAIAssistant from "@/components/courses/wizard/CourseAIAssistant";

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
        return <div className="py-8 text-center text-muted-foreground">Pricing options will be available in the future</div>;
      case "settings":
        return <div className="py-8 text-center text-muted-foreground">Settings options will be available in the future</div>;
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
