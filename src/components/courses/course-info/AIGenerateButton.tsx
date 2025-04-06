
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
    <Button 
      type="button" 
      variant="outline" 
      className="w-full flex items-center justify-center gap-2" 
      onClick={onClick} 
      disabled={isGenerating || isDisabled}
    >
      <Sparkles className="h-4 w-4" />
      {isGenerating ? "Generating..." : "Generate Description with AI"}
    </Button>
  );
};

export default AIGenerateButton;
