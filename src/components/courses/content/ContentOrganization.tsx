
import React from "react";
import SectionItem from "./SectionItem";
import LessonEditModal from "./LessonEditModal";
import AddSectionForm from "./AddSectionForm";
import AddLessonSidebar from "./AddLessonSidebar";
import { useContentOrganization } from "@/hooks/useContentOrganization";
import { CourseSection } from "@/services/types";

interface ContentOrganizationProps {
  sections: CourseSection[];
  updateSections: (sections: CourseSection[]) => void;
}

const ContentOrganization: React.FC<ContentOrganizationProps> = ({ 
  sections, 
  updateSections 
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
      
      {/* Lesson Content Edit Modal */}
      <LessonEditModal
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
