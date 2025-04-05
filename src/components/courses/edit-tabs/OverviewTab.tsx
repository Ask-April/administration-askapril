
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Activity, 
  Users
} from "lucide-react";
import {
  SalesMetricCard,
  ActivityMetricCard,
  EngagementMetricCard,
  MetricSection
} from "../overview";

interface OverviewTabProps {
  courseId: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  courseId
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-6">Course Overview</h3>
          
          <div className="space-y-8">
            {/* Sales Section */}
            <MetricSection icon={BarChart3} title="Sales Overview" columns={3}>
              <SalesMetricCard title="Total Enrollments" value="132" trend="+12%" period="Monthly" />
              <SalesMetricCard title="Total Revenue" value="$8,450" trend="+8.5%" period="Monthly" />
              <SalesMetricCard title="Average Rating" value="4.8" reviews={24} trend="+0.2" />
              <SalesMetricCard title="Completion Rate" value="78%" benchmark="65%" industry="72%" />
              <SalesMetricCard title="Revenue Forecast" nextMonth="$9,200" nextQuarter="$28,500" confidence="85%" />
              <SalesMetricCard title="Refund Rate" value="2.1%" industry="3.5%" />
            </MetricSection>

            {/* Activity Section */}
            <MetricSection icon={Activity} title="Recent Activity" columns={2}>
              <ActivityMetricCard title="New Enrollments" last24h={5} last7d={28} last30d={86} />
              <ActivityMetricCard title="Completed Quizzes" count={56} averageScore="76%" completionRate="68%" />
              <ActivityMetricCard title="Student Questions" unanswered={3} responseTime="6 hours" />
              <ActivityMetricCard title="Forum Activity" newPosts={12} activeDiscussions={5} />
            </MetricSection>

            {/* Engagement Section */}
            <MetricSection icon={Users} title="Engagement Metrics" columns={2}>
              <EngagementMetricCard title="Average Time Spent" perSession="32 min" perStudent="4.2 hours" perModule="58 min" />
              <EngagementMetricCard title="Interaction Levels" videoCompletion="76%" downloads={128} />
              <EngagementMetricCard title="Active Students" active="68%" reactivation="8.2%" />
              <EngagementMetricCard title="Session Frequency" averagePerWeek={2.4} />
            </MetricSection>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
