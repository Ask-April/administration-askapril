
import React from "react";
import SectionItem from "./SectionItem";
import LessonEditDrawer from "./LessonEditDrawer";
import AddLessonSidebar from "./AddLessonSidebar";
import AddSectionForm from "./AddSectionForm";
import { useContentOrganization } from "@/hooks/useContentOrganization";
import { CourseSection } from "@/services/types";
import { useEffectiveDragDrop } from "@/hooks/content/useEffectiveDragDrop";

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
  
  // Use our improved drag and drop hook
  const dragDropHook = useEffectiveDragDrop(sections, updateSections);
  
  const { 
    handleAddSection,
    handleDeleteSection,
    handleAddLesson,
    handleDeleteLesson,
    openLessonModal,
    changeLessonType,
    updateSectionTitle,
    selectedLesson,
    setSelectedLesson,
    isLessonModalOpen, 
    setIsLessonModalOpen,
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
      {/* Only show AddSectionForm component if showAddSection is true */}
      {showAddSection && (
        <AddSectionForm hook={contentOrgHook} />
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
            onDragStart={dragDropHook.handleDragStart}
            onDragEnd={dragDropHook.handleDragEnd}
            onDragOver={dragDropHook.handleDragOver}
            onDragLeave={dragDropHook.handleDragLeave}
            onDrop={dragDropHook.handleDrop}
            changeLessonType={changeLessonType}
            updateSectionTitle={updateSectionTitle}
            isDragging={dragDropHook.isDragging}
            draggedItem={dragDropHook.draggedItem}
            dragOverItem={dragDropHook.dragOverItem}
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
      />

      {/* Add New Lesson Sidebar */}
      <AddLessonSidebar hook={contentOrgHook} />
    </div>
  );
};

export default ContentOrganization;
