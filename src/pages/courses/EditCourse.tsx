
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Trash2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { toast } from "sonner";
import { useEditCourse } from "@/hooks/useEditCourse";
import { EmptyState, LoadingSkeleton } from "@/components/ui/loading-states";
import { 
  GeneralTab,
  OverviewTab,
  DetailsTab, 
  ContentTab, 
  StudentsTab,
  QuizzesTab,
  SalesTab,
  PricingTab,
  TriggersTab,
  SettingsTab 
} from "@/components/courses/edit-tabs";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  // Use our custom hook to manage course editing
  const { 
    editedCourse, 
    setEditedCourse, 
    isLoading, 
    error, 
    isError, 
    handleSave 
  } = useEditCourse(id);

  const handleDelete = async () => {
    // For now, just show a toast and navigate away
    // In a real implementation, you would call an API to delete the course
    toast.error("Course deleted!");
    navigate("/courses/overview");
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
        action={
          <Button onClick={() => navigate("/courses/overview")}>
            Back to Courses
          </Button>
        }
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
          title={`Edit Course: ${editedCourse.title || "Untitled Course"}`}
          backPath="/courses/overview"
          actions={
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-destructive"
              >
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
          <TabsList className="mb-4 grid grid-cols-10 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>

          <TabsContent value="overview">
            <OverviewTab courseId={id} />
          </TabsContent>

          <TabsContent value="details">
            <DetailsTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab courseId={id} />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizzesTab courseId={id} />
          </TabsContent>

          <TabsContent value="sales">
            <SalesTab courseId={id} />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>

          <TabsContent value="triggers">
            <TriggersTab courseId={id} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default EditCourse;
