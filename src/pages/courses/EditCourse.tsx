
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
import { CourseSection } from "@/services/types";
import { curriculumService } from "@/services/course/curriculumService";
import { 
  OverviewTab,
  DetailsTab, 
  ContentTab, 
  StudentsTab,
  PricingTab,
  AutomationTab,
  SettingsTab 
} from "@/components/courses/edit-tabs";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);
  const [temporarySections, setTemporarySections] = useState<CourseSection[]>([]);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

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

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // First save the course details
      const success = await handleSave();
      
      // Then save the curriculum if we have pending section changes
      if (success && id && temporarySections.length > 0) {
        try {
          console.log("Saving curriculum with sections:", temporarySections);
          const saved = await curriculumService.saveCurriculum(id, temporarySections);
          
          if (saved) {
            toast.success("Course content saved successfully!");
            setHasPendingChanges(false);
          } else {
            toast.error("Failed to save course content. Please try again.");
            return false;
          }
        } catch (error) {
          console.error("Failed to save curriculum:", error);
          toast.error("Failed to save course content");
          return false;
        }
      }
      
      if (success) {
        toast.success("Course saved successfully!");
        return true;
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // Update the temporary sections and mark that we have pending changes
  const handleUpdateTemporarySections = (sections: CourseSection[]) => {
    console.log("Updating temporary sections:", sections);
    setTemporarySections(sections);
    setHasPendingChanges(true);
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
          title={editedCourse.title || "Untitled Course"}
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
              <Button onClick={saveChanges} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="animate-spin mr-2">⊚</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes {hasPendingChanges && "•"}
                  </>
                )}
              </Button>
            </div>
          }
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

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
              temporarySections={temporarySections}
              setTemporarySections={handleUpdateTemporarySections}
            />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab courseId={id} />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingTab 
              editedCourse={editedCourse}
              setEditedCourse={setEditedCourse}
            />
          </TabsContent>

          <TabsContent value="automation">
            <AutomationTab courseId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default EditCourse;
