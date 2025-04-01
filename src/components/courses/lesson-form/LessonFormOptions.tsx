
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LessonFormOptionsProps {
  enableFreePreview: boolean;
  setEnableFreePreview: (value: boolean) => void;
  setAsDraft: boolean;
  setSetAsDraft: (value: boolean) => void;
  setAsCompulsory: boolean;
  setSetAsCompulsory: (value: boolean) => void;
  enableDiscussion: boolean;
  setEnableDiscussion: (value: boolean) => void;
}

const LessonFormOptions: React.FC<LessonFormOptionsProps> = ({
  enableFreePreview,
  setEnableFreePreview,
  setAsDraft,
  setSetAsDraft,
  setAsCompulsory,
  setSetAsCompulsory,
  enableDiscussion,
  setEnableDiscussion
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="free-preview" 
          checked={enableFreePreview} 
          onCheckedChange={checked => setEnableFreePreview(!!checked)} 
        />
        <Label htmlFor="free-preview">Enable Free Preview</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="as-draft" 
          checked={setAsDraft} 
          onCheckedChange={checked => setSetAsDraft(!!checked)} 
        />
        <Label htmlFor="as-draft">Set as Draft</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="as-compulsory" 
          checked={setAsCompulsory} 
          onCheckedChange={checked => setSetAsCompulsory(!!checked)} 
        />
        <Label htmlFor="as-compulsory">Set as Compulsory</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="enable-discussion" 
          checked={enableDiscussion} 
          onCheckedChange={checked => setEnableDiscussion(!!checked)} 
        />
        <Label htmlFor="enable-discussion">Enable Discussion</Label>
      </div>
    </div>
  );
};

export default LessonFormOptions;
