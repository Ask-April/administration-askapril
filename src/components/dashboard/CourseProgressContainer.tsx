
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Link } from "react-router-dom";
import { ShoppingCart, Users, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { EmptyState } from "@/components/ui/loading-states";

// Helper function to render the appropriate icon for each activity type
const getEventIcon = (type: string) => {
  switch (type) {
    case "purchase":
      return <ShoppingCart className="h-4 w-4 text-primary" />;
    case "enrollment":
      return <Users className="h-4 w-4 text-primary" />;
    case "course":
      return <BookOpen className="h-4 w-4 text-primary" />;
    default:
      return <Calendar className="h-4 w-4 text-primary" />;
  }
};

const CourseProgressContainer = () => {
  const { data, isError } = useDashboardStats();

  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Latest Events</CardTitle>
          <CardDescription>
            Recent activities on your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState 
            title="Unable to load events"
            description="There was an error loading recent activities."
            icon={Calendar}
          />
        </CardContent>
      </Card>
    );
  }

  // Combine enrollments and other events
  const recentEvents = [
    ...(data?.recentEnrollments || []).map(enrollment => ({
      id: enrollment.enrollment_id,
      type: "enrollment",
      title: "New enrollment",
      description: `A student enrolled in ${enrollment.courses?.title || "a course"}`,
      date: enrollment.enroll_date,
      image: enrollment.courses?.image
    })),
    // Add mock purchase events for demonstration
    {
      id: "purchase-1",
      type: "purchase",
      title: "Course purchase",
      description: "JavaScript Fundamentals was purchased",
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      amount: "$89.99"
    },
    {
      id: "purchase-2",
      type: "purchase",
      title: "Course purchase",
      description: "UX Design Principles was purchased",
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      amount: "$59.99"
    }
  ];

  // Sort events by date (newest first)
  const sortedEvents = recentEvents.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5); // Only show the 5 most recent events

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest Events</CardTitle>
        <CardDescription>
          Recent activities on your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedEvents.length === 0 ? (
          <EmptyState 
            title="No recent events"
            description="Activities will appear here as they happen."
            icon={Calendar}
          />
        ) : (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 rounded-lg border p-3"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.date), 'MMM d, yyyy • h:mm a')}
                    </p>
                    {event.amount && (
                      <span className="text-xs font-medium text-emerald-600">
                        {event.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/courses/overview" className="block">
              <div className="rounded-md border border-dashed p-3 text-center text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                View all activities
              </div>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseProgressContainer;
