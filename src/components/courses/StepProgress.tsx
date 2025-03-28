
import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: string;
  currentStepIndex: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ 
  steps, 
  currentStep,
  currentStepIndex
}) => {
  const progressPercent = Math.round((currentStepIndex / (steps.length - 1)) * 100);
  
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center"
          >
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStepIndex 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span 
              className={cn(
                "text-xs mt-1",
                index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].label}
      </div>
    </div>
  );
};

export default StepProgress;
