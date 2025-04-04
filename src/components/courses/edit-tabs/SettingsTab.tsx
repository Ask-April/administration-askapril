
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium">Course Settings</h3>
        <p className="text-muted-foreground mb-4">
          Configure additional course settings.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={editedCourse.status || "draft"}
            onChange={(e) =>
              setEditedCourse({
                ...editedCourse,
                status: e.target.value,
              })
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Number of Lessons
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={editedCourse.lessons || 0}
            onChange={(e) =>
              setEditedCourse({
                ...editedCourse,
                lessons: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Students
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={editedCourse.students || 0}
            onChange={(e) =>
              setEditedCourse({
                ...editedCourse,
                students: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
