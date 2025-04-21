
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AIGenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  isDisabled?: boolean;
}

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({ 
  onClick, 
  isGenerating, 
  isDisabled = false 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={onClick} 
            disabled={isGenerating || isDisabled}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Description with AI
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDisabled ? "Enter a course title first" : "Create an AI-generated description based on your title"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AIGenerateButton;
