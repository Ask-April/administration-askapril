
import React from "react";
import SectionItem from "./SectionItem";
import LessonEditDrawer from "./LessonEditDrawer";
import AddSectionForm from "./AddSectionForm";
import AddLessonSidebar from "./AddLessonSidebar";
import { useContentOrganization } from "@/hooks/useContentOrganization";
import { CourseSection } from "@/services/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ContentOrganizationProps {
  sections: CourseSection[];
  updateSections: (sections: CourseSection[]) => void;
  showAddSection?: boolean;
}

const ContentOrganization: React.FC<ContentOrganizationProps> = ({ 
  sections, 
  updateSections,
  showAddSection = true
}) => {
  // Use our custom hook for all state and logic
  const contentOrgHook = useContentOrganization(sections, updateSections);
  const { 
    handleAddSection,
    handleDeleteSection,
    handleAddLesson,
    handleDeleteLesson,
    openLessonModal,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    changeLessonType,
    updateSectionTitle,
    selectedLesson,
    setSelectedLesson,
    isLessonModalOpen, 
    setIsLessonModalOpen,
    isNewLesson,
    content,
    setContent,
    contentUrl,
    setContentUrl,
    fileInputRef,
    handleFileChange,
    handleLessonContentSave,
    newSectionTitle,
    setNewSectionTitle
  } = contentOrgHook;

  return (
    <div className="space-y-4">
      {showAddSection && (
        <div className="flex items-center space-x-2 mb-4">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newSectionTitle.trim()) {
                handleAddSection();
              }
            }}
          />
          <Button onClick={handleAddSection} disabled={!newSectionTitle.trim()}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      )}
      
      <div className="space-y-4">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            onDeleteSection={handleDeleteSection}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
            onOpenLessonModal={openLessonModal}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            changeLessonType={changeLessonType}
            updateSectionTitle={updateSectionTitle}
          />
        ))}
      </div>
      
      {/* Lesson Content Edit Drawer */}
      <LessonEditDrawer
        isOpen={isLessonModalOpen}
        setIsOpen={setIsLessonModalOpen}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        content={content}
        setContent={setContent}
        contentUrl={contentUrl}
        setContentUrl={setContentUrl}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleLessonContentSave={handleLessonContentSave}
        isNewLesson={isNewLesson}
      />

      {/* Add New Lesson Sidebar */}
      <AddLessonSidebar hook={contentOrgHook} />
    </div>
  );
};

export default ContentOrganization;
