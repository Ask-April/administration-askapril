
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Activity, 
  Users, 
  Bell, 
  Zap, 
  Award, 
  LineChart 
} from "lucide-react";

interface OverviewTabProps {
  courseId: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Course Overview</h3>
          
          <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
            <MetricPill icon={<BarChart3 className="h-4 w-4" />} label="Sales" active={true} />
            <MetricPill icon={<Activity className="h-4 w-4" />} label="Activity" />
            <MetricPill icon={<Users className="h-4 w-4" />} label="Engagement" />
            <MetricPill icon={<Bell className="h-4 w-4" />} label="Notifications" />
            <MetricPill icon={<Zap className="h-4 w-4" />} label="Quick Actions" />
            <MetricPill icon={<Award className="h-4 w-4" />} label="Tips" />
            <MetricPill icon={<LineChart className="h-4 w-4" />} label="Benchmark" />
          </div>
          
          <div className="border rounded-md p-6">
            <h4 className="text-md font-medium mb-6">Sales Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Row 1 */}
              <SalesMetricCard 
                title="Total Enrollments" 
                value="132" 
                trend="+12%" 
                period="Monthly" 
              />
              <SalesMetricCard 
                title="Total Revenue" 
                value="$8,450" 
                trend="+8.5%" 
                period="Monthly" 
              />
              <SalesMetricCard 
                title="Average Rating" 
                value="4.8" 
                reviews={24} 
                trend="+0.2" 
              />
              
              {/* Row 2 */}
              <SalesMetricCard 
                title="Completion Rate" 
                value="78%" 
                benchmark="65%" 
                industry="72%" 
              />
              <SalesMetricCard 
                title="Average Quiz Score" 
                value="82%" 
                highest="98%" 
                lowest="65%" 
              />
              <SalesMetricCard 
                title="Revenue Forecast" 
                nextMonth="$9,200" 
                nextQuarter="$28,500" 
                confidence="85%" 
              />
              
              {/* Row 3 */}
              <SalesMetricCard 
                title="Refund Rate" 
                value="2.1%" 
                industry="3.5%" 
              />
            </div>
            
            {/* Additional metrics sections could be added here */}
            <div className="mt-8">
              <h4 className="text-md font-medium mb-4">Recent Activity</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActivityMetricCard 
                  title="New Enrollments" 
                  last24h={5} 
                  last7d={28} 
                  last30d={86} 
                />
                <ActivityMetricCard 
                  title="Completed Quizzes" 
                  count={56} 
                  averageScore="76%" 
                  completionRate="68%" 
                />
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-md font-medium mb-4">Engagement Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EngagementMetricCard 
                  title="Average Time Spent" 
                  perSession="32 min" 
                  perStudent="4.2 hours" 
                />
                <EngagementMetricCard 
                  title="Active Students" 
                  active="68%" 
                  reactivation="8.2%" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface MetricPillProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const MetricPill: React.FC<MetricPillProps> = ({ icon, label, active = false }) => {
  return (
    <div 
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
        ${active 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted/50 hover:bg-muted cursor-pointer'}
      `}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

interface SalesMetricCardProps {
  title: string;
  value?: string;
  trend?: string;
  period?: string;
  reviews?: number;
  benchmark?: string;
  industry?: string;
  highest?: string;
  lowest?: string;
  nextMonth?: string;
  nextQuarter?: string;
  confidence?: string;
}

const SalesMetricCard: React.FC<SalesMetricCardProps> = ({ 
  title, 
  value, 
  trend, 
  period,
  reviews,
  benchmark,
  industry,
  highest,
  lowest,
  nextMonth,
  nextQuarter,
  confidence
}) => {
  return (
    <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      {value && <p className="text-2xl font-bold mt-1">{value}</p>}
      <div className="mt-2 space-y-1">
        {trend && <p className="text-sm text-emerald-600">{trend} {period && `(${period})`}</p>}
        {reviews && <p className="text-sm text-muted-foreground">{reviews} reviews</p>}
        {benchmark && <p className="text-sm text-muted-foreground">Benchmark: {benchmark}</p>}
        {industry && <p className="text-sm text-muted-foreground">Industry avg: {industry}</p>}
        {highest && <p className="text-sm text-muted-foreground">Highest: {highest}</p>}
        {lowest && <p className="text-sm text-muted-foreground">Lowest: {lowest}</p>}
        {nextMonth && <p className="text-sm text-muted-foreground">Next month: {nextMonth}</p>}
        {nextQuarter && <p className="text-sm text-muted-foreground">Next quarter: {nextQuarter}</p>}
        {confidence && <p className="text-sm text-muted-foreground">Confidence: {confidence}</p>}
      </div>
    </div>
  );
};

interface ActivityMetricCardProps {
  title: string;
  last24h?: number;
  last7d?: number;
  last30d?: number;
  count?: number;
  averageScore?: string;
  completionRate?: string;
  unanswered?: number;
  responseTime?: string;
  newPosts?: number;
  activeDiscussions?: number;
}

const ActivityMetricCard: React.FC<ActivityMetricCardProps> = ({ 
  title, 
  last24h,
  last7d,
  last30d,
  count,
  averageScore,
  completionRate,
  unanswered,
  responseTime,
  newPosts,
  activeDiscussions
}) => {
  return (
    <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      
      <div className="mt-2 space-y-1">
        {last24h !== undefined && <p className="text-sm">Last 24h: <span className="font-medium">{last24h}</span></p>}
        {last7d !== undefined && <p className="text-sm">Last 7 days: <span className="font-medium">{last7d}</span></p>}
        {last30d !== undefined && <p className="text-sm">Last 30 days: <span className="font-medium">{last30d}</span></p>}
        
        {count !== undefined && <p className="text-sm">Count: <span className="font-medium">{count}</span></p>}
        {averageScore && <p className="text-sm">Average score: <span className="font-medium">{averageScore}</span></p>}
        {completionRate && <p className="text-sm">Completion rate: <span className="font-medium">{completionRate}</span></p>}
        
        {unanswered !== undefined && <p className="text-sm">Unanswered: <span className="font-medium">{unanswered}</span></p>}
        {responseTime && <p className="text-sm">Avg. response time: <span className="font-medium">{responseTime}</span></p>}
        
        {newPosts !== undefined && <p className="text-sm">New posts: <span className="font-medium">{newPosts}</span></p>}
        {activeDiscussions !== undefined && <p className="text-sm">Active discussions: <span className="font-medium">{activeDiscussions}</span></p>}
      </div>
    </div>
  );
};

interface EngagementMetricCardProps {
  title: string;
  perSession?: string;
  perStudent?: string;
  perModule?: string;
  videoCompletion?: string;
  downloads?: number;
  active?: string;
  reactivation?: string;
  averagePerWeek?: number;
}

const EngagementMetricCard: React.FC<EngagementMetricCardProps> = ({ 
  title, 
  perSession,
  perStudent,
  perModule,
  videoCompletion,
  downloads,
  active,
  reactivation,
  averagePerWeek
}) => {
  return (
    <div className="bg-card border rounded-md p-4">
      <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>
      
      <div className="mt-2 space-y-1">
        {perSession && <p className="text-sm">Per session: <span className="font-medium">{perSession}</span></p>}
        {perStudent && <p className="text-sm">Per student: <span className="font-medium">{perStudent}</span></p>}
        {perModule && <p className="text-sm">Per module: <span className="font-medium">{perModule}</span></p>}
        
        {videoCompletion && <p className="text-sm">Video completion: <span className="font-medium">{videoCompletion}</span></p>}
        {downloads !== undefined && <p className="text-sm">Resource downloads: <span className="font-medium">{downloads}</span></p>}
        
        {active && <p className="text-sm">Active students: <span className="font-medium">{active}</span></p>}
        {reactivation && <p className="text-sm">Reactivation rate: <span className="font-medium">{reactivation}</span></p>}
        
        {averagePerWeek !== undefined && <p className="text-sm">Sessions per week: <span className="font-medium">{averagePerWeek}</span></p>}
      </div>
    </div>
  );
};

export default OverviewTab;
