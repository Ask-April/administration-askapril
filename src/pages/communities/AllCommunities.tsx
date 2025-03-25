
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar } from "lucide-react";

const AllCommunities = () => {
  const communities = [
    { 
      name: "Web Development", 
      description: "A community for web developers to share knowledge and resources",
      members: 845,
      discussions: 156,
      activity: "Very Active",
      lastActive: "2 hours ago"
    },
    { 
      name: "Data Science", 
      description: "Connect with fellow data scientists and analysts",
      members: 634,
      discussions: 98,
      activity: "Active",
      lastActive: "1 day ago"
    },
    { 
      name: "UX Design", 
      description: "Share design tips and get feedback on your work",
      members: 521,
      discussions: 87,
      activity: "Active",
      lastActive: "5 hours ago"
    },
    { 
      name: "AI & Machine Learning", 
      description: "Discuss the latest in AI and machine learning technologies",
      members: 732,
      discussions: 124,
      activity: "Very Active",
      lastActive: "3 hours ago"
    },
    { 
      name: "Mobile Development", 
      description: "For mobile app developers across all platforms",
      members: 489,
      discussions: 62,
      activity: "Moderate",
      lastActive: "2 days ago"
    },
    { 
      name: "Career Development", 
      description: "Career advice and job opportunities in tech",
      members: 675,
      discussions: 105,
      activity: "Active",
      lastActive: "1 day ago"
    },
  ];

  const getActivityBadge = (activity: string) => {
    switch (activity) {
      case "Very Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Very Active</Badge>;
      case "Active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
      case "Moderate":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>;
      default:
        return <Badge>{activity}</Badge>;
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">All Communities</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{community.name}</CardTitle>
                  {getActivityBadge(community.activity)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{community.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{community.discussions} discussions</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Last active {community.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default AllCommunities;
