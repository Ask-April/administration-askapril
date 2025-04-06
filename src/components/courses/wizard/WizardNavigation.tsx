
import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourseWizard } from './CourseWizardContext';

const WizardNavigation: React.FC = () => {
  const { 
    currentStep, 
    setCurrentStep, 
    saveCurrentStep, 
    finishWizard, 
    cancelWizard,
    isLoading,
    steps,
    currentStepIndex,
    validateCurrentStep,
    hasUnsavedChanges
  } = useCourseWizard();

  const handlePrevious = () => {
    if (currentStep === "curriculum") setCurrentStep("info");
    else if (currentStep === "pricing") setCurrentStep("curriculum");
    else if (currentStep === "settings") setCurrentStep("pricing");
  };

  const handleNext = async () => {
    // First validate the current step
    if (!validateCurrentStep()) {
      return;
    }
    
    const success = await saveCurrentStep();
    if (!success) return;
    
    if (currentStep === "info") setCurrentStep("curriculum");
    else if (currentStep === "curriculum") setCurrentStep("pricing");
    else if (currentStep === "pricing") setCurrentStep("settings");
    else if (currentStep === "settings") await finishWizard();
  };

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={currentStep === "info" ? cancelWizard : handlePrevious}
        className="gap-2"
        disabled={isLoading}
      >
        {currentStep === "info" ? "Cancel" : (
          <>
            <ArrowLeft className="h-4 w-4" />
            Previous
          </>
        )}
      </Button>
      
      <Button 
        onClick={handleNext} 
        className="gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {currentStep === "settings" ? "Finishing..." : "Saving..."}
          </>
        ) : currentStep === "settings" ? (
          <>
            Finish
            <CheckCircle className="h-4 w-4" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default WizardNavigation;
