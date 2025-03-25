
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Mail, Eye, Clock } from "lucide-react";

const AllBroadcasts = () => {
  const broadcasts = [
    { 
      name: "May Newsletter", 
      type: "Email", 
      sentDate: "May 15, 2023",
      status: "Sent",
      recipients: 1245,
      openRate: 42,
      clickRate: 12
    },
    { 
      name: "New Course Announcement", 
      type: "Email", 
      sentDate: "April 28, 2023",
      status: "Sent",
      recipients: 1356,
      openRate: 54,
      clickRate: 23
    },
    { 
      name: "Summer Sale", 
      type: "Email", 
      sentDate: "June 5, 2023",
      status: "Scheduled",
      recipients: 1500,
      openRate: null,
      clickRate: null
    },
    { 
      name: "Webinar Invitation: AI in Education", 
      type: "Email", 
      sentDate: "March 12, 2023",
      status: "Sent",
      recipients: 875,
      openRate: 38,
      clickRate: 15
    },
    { 
      name: "Course Update Announcement", 
      type: "Email", 
      sentDate: "February 20, 2023",
      status: "Sent",
      recipients: 1120,
      openRate: 45,
      clickRate: 18
    },
    { 
      name: "Welcome Sequence: Email 1", 
      type: "Automated", 
      sentDate: "Ongoing",
      status: "Active",
      recipients: 324,
      openRate: 68,
      clickRate: 24
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Sent</Badge>;
      case "Scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "Active":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Active</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Email":
        return <Mail className="h-5 w-5 text-blue-500" />;
      case "Automated":
        return <Clock className="h-5 w-5 text-purple-500" />;
      default:
        return <Radio className="h-5 w-5" />;
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">All Broadcasts</h1>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-4 font-medium">
                  <div className="col-span-2">Broadcast</div>
                  <div>Type</div>
                  <div>Sent Date</div>
                  <div>Recipients</div>
                  <div>Open Rate</div>
                  <div>Click Rate</div>
                </div>
                <div className="divide-y">
                  {broadcasts.map((broadcast, index) => (
                    <div key={index} className="grid grid-cols-7 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getTypeIcon(broadcast.type)}
                        </div>
                        <div>
                          <p className="font-medium">{broadcast.name}</p>
                          <p className="flex items-center text-sm text-muted-foreground">
                            {getStatusBadge(broadcast.status)}
                          </p>
                        </div>
                      </div>
                      <div>{broadcast.type}</div>
                      <div>{broadcast.sentDate}</div>
                      <div>{broadcast.recipients.toLocaleString()}</div>
                      <div className="flex items-center gap-1">
                        {broadcast.openRate ? (
                          <>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{broadcast.openRate}%</span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                      <div>
                        {broadcast.clickRate ? (
                          <span>{broadcast.clickRate}%</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default AllBroadcasts;
