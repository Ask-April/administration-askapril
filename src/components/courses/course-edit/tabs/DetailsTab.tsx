
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DetailsTabProps {
  category: string;
  image: string;
  status: string;
  onUpdateCategory: (value: string) => void;
  onUpdateImage: (value: string) => void;
  onUpdateStatus: (value: string) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ 
  category,
  image,
  status,
  onUpdateCategory,
  onUpdateImage,
  onUpdateStatus
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Course Details</h3>
        <p className="text-muted-foreground mb-4">Additional course information and settings.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md" 
              value={category || ''}
              onChange={(e) => onUpdateCategory(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md" 
              value={image || ''}
              onChange={(e) => onUpdateImage(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={status || 'draft'}
              onChange={(e) => onUpdateStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
