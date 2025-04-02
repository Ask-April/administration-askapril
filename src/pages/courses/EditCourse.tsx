
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Trash2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { toast } from "sonner";
import { useCourseById } from "@/hooks/useCourses";
import { EmptyState, LoadingSkeleton } from "@/components/ui/loading-states";
import { updateCourse } from "@/pages/api/courses";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error } = useCourseById(id);
  
  // Local state for edited course data - initialize as null
  const [editedCourse, setEditedCourse] = useState<any>(null);
  
  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse(course);
    }
  }, [course]);
  
  const handleSave = async () => {
    try {
      if (id && editedCourse) {
        // Call the updateCourse API function
        await updateCourse(id, {
          title: editedCourse.title,
          description: editedCourse.description,
          status: editedCourse.status,
          // Add other fields as needed
        });
        
        toast.success("Course saved successfully!");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
    }
  };

  const handleDelete = async () => {
    // For now, just show a toast and navigate away
    // In a real implementation, you would call an API to delete the course
    toast.error("Course deleted!");
    navigate('/courses/overview');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !course) {
    return (
      <EmptyState 
        title="Course Not Found" 
        description="The course you're looking for doesn't exist or has been removed."
        action={<Button onClick={() => navigate('/courses/overview')}>Back to Courses</Button>}
      />
    );
  }

  // Only render the form if editedCourse is available
  if (!editedCourse) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <CoursePageHeader 
          title={`Edit Course: ${editedCourse.title || 'Untitled Course'}`} 
          backPath="/courses/overview"
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          }
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Course Information</h3>
                    <p className="text-muted-foreground mb-4">Basic information about your course.</p>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          value={editedCourse.title || ''}
                          onChange={(e) => setEditedCourse({...editedCourse, title: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                          className="w-full p-2 border rounded-md min-h-[100px]" 
                          value={editedCourse.description || ''}
                          onChange={(e) => setEditedCourse({...editedCourse, description: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          value={editedCourse.category || ''}
                          onChange={(e) => setEditedCourse({...editedCourse, category: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          value={editedCourse.image || ''}
                          onChange={(e) => setEditedCourse({...editedCourse, image: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Course Content</h3>
                <p className="text-muted-foreground mb-4">Manage your course content, sections and lessons.</p>
                <div className="p-4 bg-muted rounded-md text-center">
                  <p>Content editor coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-muted-foreground mb-4">Set pricing options for your course.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md" 
                    value={editedCourse.duration || ''}
                    onChange={(e) => setEditedCourse({...editedCourse, duration: e.target.value})}
                    placeholder="e.g., 8 hours"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Course Settings</h3>
                <p className="text-muted-foreground mb-4">Configure additional course settings.</p>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={editedCourse.status || 'draft'}
                    onChange={(e) => setEditedCourse({...editedCourse, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Number of Lessons</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-md" 
                    value={editedCourse.lessons || 0}
                    onChange={(e) => setEditedCourse({...editedCourse, lessons: parseInt(e.target.value, 10)})}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Students</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-md" 
                    value={editedCourse.students || 0}
                    onChange={(e) => setEditedCourse({...editedCourse, students: parseInt(e.target.value, 10)})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default EditCourse;
