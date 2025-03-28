
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Button } from "@/components/ui/button";
import CourseInfoForm from "@/components/courses/CourseInfoForm";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import StepProgress from "@/components/courses/StepProgress";

type Step = "info" | "curriculum" | "pricing" | "settings";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("info");
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    duration: "",
    lessons: 0,
    status: "draft" as const,
  });
  
  const steps = [
    { id: "info", label: "Basic Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "pricing", label: "Pricing" },
    { id: "settings", label: "Settings" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  const handleNext = () => {
    if (currentStep === "info") setCurrentStep("curriculum");
    else if (currentStep === "curriculum") setCurrentStep("pricing");
    else if (currentStep === "pricing") setCurrentStep("settings");
    else if (currentStep === "settings") handleFinish();
  };
  
  const handlePrevious = () => {
    if (currentStep === "curriculum") setCurrentStep("info");
    else if (currentStep === "pricing") setCurrentStep("curriculum");
    else if (currentStep === "settings") setCurrentStep("pricing");
  };
  
  const handleFinish = () => {
    navigate("/courses/overview");
  };
  
  const handleCancel = () => {
    navigate("/courses/overview");
  };

  const updateCourseData = (data: Partial<typeof courseData>) => {
    setCourseData(prev => ({ ...prev, ...data }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "info":
        return <CourseInfoForm 
                 courseData={courseData} 
                 updateCourseData={updateCourseData} 
               />;
      case "curriculum":
        return <CourseCurriculum 
                 courseData={courseData} 
                 updateCourseData={updateCourseData} 
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
    <PageTransition>
      <div className="container px-4 py-6">
        <CoursePageHeader 
          title="Create New Course" 
          backPath="/courses/overview" 
        />
        
        <div className="max-w-4xl mx-auto mb-6">
          <StepProgress 
            steps={steps} 
            currentStep={currentStep as string} 
            currentStepIndex={currentStepIndex}
          />
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            {renderStepContent()}
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={currentStep === "info" ? handleCancel : handlePrevious}
                className="gap-2"
              >
                {currentStep === "info" ? "Cancel" : (
                  <>
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </>
                )}
              </Button>
              
              <Button onClick={handleNext} className="gap-2">
                {currentStep === "settings" ? "Finish" : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default CreateCourse;
