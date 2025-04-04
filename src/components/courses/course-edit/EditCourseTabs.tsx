
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FileText, BookOpen, DollarSign, Settings, Users } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import DetailsTab from "./tabs/DetailsTab";
import ContentTab from "./tabs/ContentTab";
import PriceTab from "./tabs/PriceTab";
import AutomateTab from "./tabs/AutomateTab";
import StudentsTab from "./tabs/StudentsTab";

interface EditCourseTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  courseData: {
    title: string;
    description: string;
    category: string;
    image: string;
    duration: string;
    status: string;
    lessons: number;
    students: number;
  };
  updateCourseData: (data: Partial<typeof courseData>) => void;
}

const EditCourseTabs: React.FC<EditCourseTabsProps> = ({ 
  activeTab, 
  onTabChange,
  courseData,
  updateCourseData
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
        <OverviewTab
          title={courseData.title}
          description={courseData.description}
          onUpdateTitle={(value) => updateCourseData({ title: value })}
          onUpdateDescription={(value) => updateCourseData({ description: value })}
        />
      </TabsContent>
      
      <TabsContent value="details">
        <DetailsTab
          category={courseData.category}
          image={courseData.image}
          status={courseData.status}
          onUpdateCategory={(value) => updateCourseData({ category: value })}
          onUpdateImage={(value) => updateCourseData({ image: value })}
          onUpdateStatus={(value) => updateCourseData({ status: value })}
        />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentTab />
      </TabsContent>
      
      <TabsContent value="price">
        <PriceTab
          duration={courseData.duration}
          onUpdateDuration={(value) => updateCourseData({ duration: value })}
        />
      </TabsContent>
      
      <TabsContent value="automate">
        <AutomateTab />
      </TabsContent>
      
      <TabsContent value="students">
        <StudentsTab
          students={courseData.students}
          onUpdateStudents={(value) => updateCourseData({ students: value })}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EditCourseTabs;
