
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Calendar } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { format, formatDistanceToNow } from "date-fns";
import { EmptyState } from "@/components/ui/loading-states";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseProgressItem {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  amount?: string;
  image?: string;
}

interface CourseProgressContainerProps {
  courses: CourseProgressItem[];
}

const ProgressBar = ({
  progress
}: {
  progress: number;
}) => {
  return <div className="w-full bg-muted rounded-full h-2">
      <div className="bg-primary h-2 rounded-full" style={{
      width: `${progress}%`
    }}></div>
    </div>;
};

const CourseItem = ({
  course
}: {
  course: CourseProgressItem;
}) => {
  return <div className="flex flex-col space-y-2 p-4 border rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">{course.title}</h3>
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          Resume <ArrowRight className="ml-1 w-3 h-3" />
        </Button>
      </div>
      <div className="space-y-1">
        <ProgressBar progress={course.progress} />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {course.completedLessons} of {course.totalLessons} lessons
          </span>
          <span>{course.progress}% complete</span>
        </div>
      </div>
    </div>;
};

const ActivityItemSkeleton = () => {
  return (
    <div className="flex items-start space-x-3 p-3 border-b last:border-0">
      <Skeleton className="rounded-full h-10 w-10" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};

const ActivityList = () => {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => <ActivityItemSkeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Unable to load activity"
        description="There was an error loading recent activity."
        icon={User}
      />
    );
  }

  const recentEnrollments = data.recentEnrollments || [];

  if (recentEnrollments.length === 0) {
    return (
      <EmptyState
        title="No recent activity"
        description="Student enrollments will appear here as they happen."
        icon={User}
      />
    );
  }

  return (
    <div className="space-y-0 divide-y">
      {recentEnrollments.map((enrollment, index) => {
        const timeAgo = enrollment.enroll_date 
          ? formatDistanceToNow(new Date(enrollment.enroll_date), { addSuffix: true })
          : "recently";
        
        return (
          <div key={enrollment.enrollment_id || index} className="flex items-start space-x-3 p-4">
            <div className="rounded-full bg-muted p-2 flex-shrink-0">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">
                {enrollment.student?.first_name || "Student"} {enrollment.student?.last_name || ""}
                <span className="font-normal text-muted-foreground"> joined as student</span>
              </p>
              {enrollment.courses?.title && (
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-normal">{enrollment.student?.first_name || "Student"}</span>
                  <span className="text-muted-foreground"> registered in </span>
                  <span className="font-medium">{enrollment.courses?.title}</span>
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {timeAgo}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CourseList = ({ courses }: { courses: CourseProgressItem[] }) => {
  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses in progress"
        description="Your enrolled courses will appear here."
        icon={Calendar}
      />
    );
  }

  return (
    <div className="space-y-3">
      {courses.map(course => <CourseItem key={course.id} course={course} />)}
    </div>
  );
};

const CourseProgressContainer: React.FC<CourseProgressContainerProps> = ({
  courses
}) => {
  return <Card className="col-span-12 md:col-span-4">
      <Tabs defaultValue="activity">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="courses" className="flex-1">
              My Courses
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
          </TabsList>
        </div>
        <CardContent>
          <TabsContent value="courses" className="mt-4 space-y-4">
            <CourseList courses={courses} />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <ActivityList />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>;
};

export default CourseProgressContainer;
