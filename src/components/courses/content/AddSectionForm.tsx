
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContentOrganizationHook } from "@/hooks/useContentOrganization";

interface AddSectionFormProps {
  hook: ContentOrganizationHook;
}

const AddSectionForm: React.FC<AddSectionFormProps> = ({ hook }) => {
  const { 
    newSectionTitle, 
    setNewSectionTitle, 
    handleAddSection 
  } = hook;

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Input
        value={newSectionTitle}
        onChange={(e) => setNewSectionTitle(e.target.value)}
        placeholder="Enter section title"
        className="flex-grow"
      />
      <Button onClick={handleAddSection}>Add Section</Button>
    </div>
  );
};

export default AddSectionForm;
