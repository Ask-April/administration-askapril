
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Trash2, LayoutDashboard, FileText, BookOpen, DollarSign, Settings, Users, Loader2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { toast } from "sonner";
import { useCourseById } from "@/hooks/useCourses";
import { EmptyState, LoadingSkeleton } from "@/components/ui/loading-states";
import { updateCourse } from "@/pages/api/courses";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch the course data using our useCourseById hook
  const { data: course, isLoading, error, isError } = useCourseById(id);
  
  // Local state for edited course data - initialize as null
  const [editedCourse, setEditedCourse] = useState<any>(null);
  
  // Update local state when the data is loaded
  useEffect(() => {
    if (course) {
      setEditedCourse({
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        image: course.image || '',
        duration: course.duration || '',
        lessons: course.lessons || 0,
        status: course.status || 'draft',
        students: course.students || 0
      });
    }
  }, [course]);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (id && editedCourse) {
        // Call the updateCourse API function
        await updateCourse(id, {
          title: editedCourse.title,
          description: editedCourse.description,
          status: editedCourse.status,
          category: editedCourse.category,
          image: editedCourse.image,
          duration: editedCourse.duration,
          lessons: editedCourse.lessons,
          students: editedCourse.students
        });
        
        toast.success("Course saved successfully!");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
    } finally {
      setIsSaving(false);
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

  if (isError || !id) {
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
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          }
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="price" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <DollarSign className="h-4 w-4 mr-2" />
              Price
            </TabsTrigger>
            <TabsTrigger value="automate" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <Settings className="h-4 w-4 mr-2" />
              Automate
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Course Overview</h3>
                <p className="text-muted-foreground mb-4">View and edit basic course information.</p>
                <div className="space-y-4">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
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
          
          <TabsContent value="price">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Price & Plans</h3>
                <p className="text-muted-foreground mb-4">Set pricing options for your course.</p>
                
                <div className="space-y-4">
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
                  
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-2">Pricing Plans</h4>
                    <div className="bg-muted rounded-md p-6 text-center">
                      <p>No pricing plans yet</p>
                      <Button className="mt-4" variant="outline">Add Plan</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automate">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Automation</h3>
                <p className="text-muted-foreground mb-4">Set up automated emails and actions for your course.</p>
                <div className="bg-muted rounded-md p-6 text-center">
                  <p>Automation features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium">Students</h3>
                <p className="text-muted-foreground mb-4">Manage students enrolled in this course.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Students</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded-md" 
                      value={editedCourse.students || 0}
                      onChange={(e) => setEditedCourse({...editedCourse, students: parseInt(e.target.value, 10) || 0})}
                    />
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-2">Enrolled Students</h4>
                    <div className="bg-muted rounded-md p-6 text-center">
                      <p>No students enrolled yet</p>
                    </div>
                  </div>
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
