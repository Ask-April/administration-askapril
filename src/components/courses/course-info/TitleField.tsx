
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import CourseFormField from "./CourseFormField";
import { CourseData } from "./types";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  onGenerateContent: () => void;
  isGeneratingContent: boolean;
}

const TitleField: React.FC<TitleFieldProps> = ({ 
  value, 
  onChange, 
  errors, 
  onGenerateContent, 
  isGeneratingContent 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);

  // Show AI suggestion only for title field if length > 3
  useEffect(() => {
    if (value.length >= 3 && !showAISuggestion) {
      setShowAISuggestion(true);
    } else if (value.length < 3 && showAISuggestion) {
      setShowAISuggestion(false);
    }
  }, [value, showAISuggestion]);

  return (
    <CourseFormField id="title" label="Course Title" required errors={errors}>
      <div className="relative">
        <Input 
          id="title" 
          ref={inputRef} 
          placeholder="Enter course title" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className={errors ? "border-red-500" : ""}
        />
        {showAISuggestion && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute right-3 top-2.5 cursor-pointer">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button 
                        type="button" 
                        className="bg-transparent p-1 rounded-full hover:bg-primary/10 transition-colors" 
                        onClick={onGenerateContent} 
                        disabled={isGeneratingContent}
                      >
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div>
                          <h4 className="text-sm font-semibold">Generate with AI</h4>
                          <p className="text-sm text-muted-foreground">
                            Click to generate a course description based on your title.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate description with AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </CourseFormField>
  );
};

export default TitleField;
