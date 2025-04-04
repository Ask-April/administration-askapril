
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface GeneralTabProps {
  editedCourse: any;
  setEditedCourse: (course: any) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ 
  editedCourse, 
  setEditedCourse 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">
              Course Information
            </h3>
            <p className="text-muted-foreground mb-4">
              Basic information about your course.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editedCourse.title || ""}
                    onChange={(e) =>
                      setEditedCourse({
                        ...editedCourse,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    value={editedCourse.description || ""}
                    onChange={(e) =>
                      setEditedCourse({
                        ...editedCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editedCourse.category || ""}
                    onChange={(e) =>
                      setEditedCourse({
                        ...editedCourse,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Right Column - Thumbnail */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thumbnail
                </label>
                <div className="relative w-full h-full min-h-[250px] bg-gray-100 rounded-md overflow-hidden">
                  {editedCourse.image ? (
                    <img
                      src={editedCourse.image}
                      alt="Course"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No image uploaded
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditedCourse({
                            ...editedCourse,
                            image: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    style={{ zIndex: 1 }}
                    title="Click to change image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
