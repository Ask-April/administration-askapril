
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const Subscribers = () => {
  const subscribers = [
    { 
      name: "John Smith", 
      email: "john.smith@example.com",
      status: "Active",
      joinDate: "May 5, 2023",
      lists: ["Newsletter", "Course Updates"],
      opens: 15,
      clicks: 4,
      avatar: "JS"
    },
    { 
      name: "Emily Johnson", 
      email: "emily.j@example.com",
      status: "Active",
      joinDate: "March 12, 2023",
      lists: ["Newsletter", "Promotions"],
      opens: 22,
      clicks: 8,
      avatar: "EJ"
    },
    { 
      name: "Michael Davis", 
      email: "michael.d@example.com",
      status: "Unsubscribed",
      joinDate: "January 8, 2023",
      lists: ["Newsletter"],
      opens: 3,
      clicks: 0,
      avatar: "MD"
    },
    { 
      name: "Jessica Wilson", 
      email: "jessica.w@example.com",
      status: "Active",
      joinDate: "April 17, 2023",
      lists: ["Course Updates", "Promotions"],
      opens: 18,
      clicks: 7,
      avatar: "JW"
    },
    { 
      name: "Robert Chen", 
      email: "robert.c@example.com",
      status: "Pending",
      joinDate: "May 28, 2023",
      lists: ["Newsletter"],
      opens: 0,
      clicks: 0,
      avatar: "RC"
    },
    { 
      name: "Sarah Thompson", 
      email: "sarah.t@example.com",
      status: "Active",
      joinDate: "February 3, 2023",
      lists: ["Newsletter", "Course Updates", "Promotions"],
      opens: 32,
      clicks: 12,
      avatar: "ST"
    },
  ];

  const stats = [
    { title: "Total Subscribers", value: "4,256", change: "+12% from last month" },
    { title: "Active Subscribers", value: "3,845", change: "+8% from last month" },
    { title: "Avg. Open Rate", value: "42%", change: "+3% from last month" },
    { title: "Avg. Click Rate", value: "15%", change: "-2% from last month" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Unsubscribed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Subscribers</h1>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-4 font-medium">
                  <div className="col-span-2">Subscriber</div>
                  <div>Status</div>
                  <div>Join Date</div>
                  <div>Lists</div>
                  <div>Opens</div>
                  <div>Clicks</div>
                </div>
                <div className="divide-y">
                  {subscribers.map((subscriber, index) => (
                    <div key={index} className="grid grid-cols-7 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={subscriber.name} />
                          <AvatarFallback>{subscriber.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{subscriber.name}</p>
                          <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(subscriber.status)}
                        <span className={`
                          ${subscriber.status === 'Active' ? 'text-green-700' : 
                            subscriber.status === 'Unsubscribed' ? 'text-red-700' : 
                            'text-amber-700'}
                        `}>
                          {subscriber.status}
                        </span>
                      </div>
                      <div>{subscriber.joinDate}</div>
                      <div className="flex flex-wrap gap-1">
                        {subscriber.lists.map((list, listIndex) => (
                          <Badge key={listIndex} variant="outline" className="text-xs">
                            {list}
                          </Badge>
                        ))}
                      </div>
                      <div>{subscriber.opens}</div>
                      <div>{subscriber.clicks}</div>
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

export default Subscribers;
