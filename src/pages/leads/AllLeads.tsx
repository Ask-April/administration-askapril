
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AllLeads = () => {
  const leads = [
    { name: "Emma Thompson", email: "emma.t@example.com", source: "Website", interest: "Web Development", status: "Hot", lastActivity: "2 hours ago", avatar: "ET" },
    { name: "Michael Rodriguez", email: "m.rodriguez@example.com", source: "Referral", interest: "Data Science", status: "Warm", lastActivity: "1 day ago", avatar: "MR" },
    { name: "Sarah Johnson", email: "sarah.j@example.com", source: "Social Media", interest: "UX Design", status: "Cold", lastActivity: "5 days ago", avatar: "SJ" },
    { name: "David Kim", email: "d.kim@example.com", source: "Webinar", interest: "Mobile Development", status: "Hot", lastActivity: "3 hours ago", avatar: "DK" },
    { name: "Lisa Wang", email: "lisa.w@example.com", source: "Ebook Download", interest: "AI & Machine Learning", status: "Warm", lastActivity: "2 days ago", avatar: "LW" },
    { name: "James Wilson", email: "j.wilson@example.com", source: "Event", interest: "Business Analytics", status: "Cold", lastActivity: "1 week ago", avatar: "JW" },
    { name: "Olivia Martinez", email: "o.martinez@example.com", source: "Website", interest: "Web Development", status: "Hot", lastActivity: "5 hours ago", avatar: "OM" },
    { name: "Daniel Lee", email: "daniel.l@example.com", source: "Newsletter", interest: "Cybersecurity", status: "Warm", lastActivity: "3 days ago", avatar: "DL" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-500";
      case "Warm":
        return "bg-amber-500";
      case "Cold":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">All Leads</h1>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium">
                  <div className="col-span-2">Lead</div>
                  <div>Source</div>
                  <div>Interest</div>
                  <div>Status</div>
                  <div>Last Activity</div>
                </div>
                <div className="divide-y">
                  {leads.map((lead, index) => (
                    <div key={index} className="grid grid-cols-6 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={lead.name} />
                          <AvatarFallback>{lead.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{lead.source}</Badge>
                      </div>
                      <div>{lead.interest}</div>
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(lead.status)}`}></div>
                        <span>{lead.status}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{lead.lastActivity}</div>
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

export default AllLeads;
