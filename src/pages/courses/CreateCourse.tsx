
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import WizardNavigation from "@/components/courses/wizard/WizardNavigation";
import CourseInfoForm from "@/components/courses/CourseInfoForm";
import CourseCurriculum from "@/components/courses/CourseCurriculum";
import StepProgress from "@/components/courses/StepProgress";
import { CourseWizardProvider, useCourseWizard } from "@/components/courses/wizard/CourseWizardContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { PricingModels } from "@/components/courses/pricing";
import { CourseData } from "@/components/courses/wizard/types";

// Pricing component with real pricing options
const CoursePricing: React.FC = () => {
  const { courseData, updateCourseData } = useCourseWizard();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Course Pricing</h2>
      <Alert variant="default" className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Set Your Course Pricing</AlertTitle>
        <AlertDescription>
          Choose the pricing model that works best for your course content and target audience.
        </AlertDescription>
      </Alert>
      
      <PricingModels 
        editedCourse={courseData} 
        updateCourseData={updateCourseData} 
      />
      
      <div className="p-4 border rounded-md mt-6">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium">Total Lessons</h3>
          <p className="text-2xl font-bold mt-2">{courseData.lessons || 0}</p>
        </div>
      </div>
    </div>
  );
};

// Settings component - remove duration
const CourseSettings: React.FC = () => {
  const { courseData } = useCourseWizard();
  
  // Format pricing info for display
  const getPricingInfo = () => {
    if (!courseData.pricing_data || !courseData.pricing_data.model) {
      return "Free";
    }
    
    const pricingData = courseData.pricing_data;
    const model = pricingData.model;
    
    if (model === 'free') {
      return "Free";
    } else if (model === 'one-time') {
      return `One-time purchase: ${pricingData.currency || 'USD'} ${pricingData.basePrice || 0}`;
    } else if (model === 'subscription') {
      return `Subscription: ${pricingData.currency || 'USD'} ${pricingData.basePrice || 0}/month`;
    } else if (model === 'payment-plan') {
      return `Payment plan: ${pricingData.currency || 'USD'} ${pricingData.basePrice || 0} (${pricingData.installments || 3} payments)`;
    }
    
    return "Not set";
  };
  
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
              <p className="text-sm font-medium">Pricing</p>
              <p className="text-sm">{getPricingInfo()}</p>
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
          <CourseInfoForm 
            courseData={courseData} 
            updateCourseData={updateCourseData} 
          />
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
