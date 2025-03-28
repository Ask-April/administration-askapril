
import React from "react";
import { HelpCircle } from "lucide-react";

const QuizEditor: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="text-center p-4 border-2 border-dashed rounded-md">
        <HelpCircle className="w-10 h-10 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">Quiz builder coming soon</p>
        <p className="text-xs text-muted-foreground">You'll be able to add questions after creating this lesson</p>
      </div>
    </div>
  );
};

export default QuizEditor;
