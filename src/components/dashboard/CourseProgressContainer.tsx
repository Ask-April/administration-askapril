
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  amount?: string; // Make amount optional
  image?: string;  // Add image property
}

interface CourseProgressContainerProps {
  courses: CourseProgressItem[];
  activities: ActivityItem[];
}

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const CourseItem = ({ course }: { course: CourseProgressItem }) => {
  return (
    <div className="flex flex-col space-y-2 p-4 border rounded-md">
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
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: ActivityItem }) => {
  return (
    <div className="flex items-start space-x-3 p-3 border-b last:border-0">
      <div className="rounded-md bg-muted p-2">
        {activity.image ? (
          <img
            src={activity.image}
            alt={activity.type}
            className="w-8 h-8 object-cover"
          />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center text-muted-foreground">
            {activity.type.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-sm">{activity.title}</h4>
          {activity.amount && (
            <span className="text-green-600 font-medium text-sm">
              ${activity.amount}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
      </div>
    </div>
  );
};

const CourseProgressContainer: React.FC<CourseProgressContainerProps> = ({
  courses,
  activities,
}) => {
  return (
    <Card className="col-span-12 md:col-span-4">
      <Tabs defaultValue="courses">
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
          <TabsContent value="courses" className="space-y-4 mt-4">
            {courses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No courses in progress</p>
              </div>
            ) : (
              courses.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))
            )}
          </TabsContent>
          <TabsContent value="activity" className="mt-4">
            {activities.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-1">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default CourseProgressContainer;
