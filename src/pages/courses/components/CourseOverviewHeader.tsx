
import React from "react";

interface CourseOverviewHeaderProps {}

const CourseOverviewHeader: React.FC<CourseOverviewHeaderProps> = () => (
  <div className="flex flex-col gap-2">
    <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
    <p className="text-muted-foreground">
      Manage and organize your course catalog
    </p>
  </div>
);

export default CourseOverviewHeader;
