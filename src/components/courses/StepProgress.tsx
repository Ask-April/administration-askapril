
import React from "react";
import { Progress } from "@/components/ui/progress";
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
  // Calculate progress percentage
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-sm font-medium">
          Step {currentStepIndex + 1} of {steps.length}
        </h2>
        <span className="text-sm text-muted-foreground">
          {progressPercentage.toFixed(0)}% Complete
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <nav aria-label="Progress">
        <ol role="list" className="flex justify-between w-full mt-2">
          {steps.map((step, index) => (
            <li key={step.id} className={cn(
              "relative",
              index !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
            )}>
              <div className={cn(
                "flex items-center",
                index < currentStepIndex ? "text-primary" : 
                index === currentStepIndex ? "text-primary" : "text-muted-foreground"
              )}>
                <span className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  index < currentStepIndex ? "bg-primary text-primary-foreground" : 
                  index === currentStepIndex ? "border-2 border-primary bg-background" : "border border-muted-foreground/30 bg-background"
                )}>
                  {index + 1}
                </span>
                <span className="ml-2 text-sm font-medium hidden sm:inline-block">
                  {step.label}
                </span>
              </div>
              
              {index !== steps.length - 1 && (
                <div className={cn(
                  "absolute left-0 top-4 -ml-0.5 mt-0.5 h-0.5 w-8 sm:w-20",
                  index < currentStepIndex ? "bg-primary" : "bg-border"
                )} />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default StepProgress;
