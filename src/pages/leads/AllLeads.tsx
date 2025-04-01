
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  PlusCircle, 
  Filter,
  Mail,
  Phone,
  Tag,
  Calendar
} from "lucide-react";

const AllLeads = () => {
  const leads = [
    { 
      id: "1", 
      name: "John Smith", 
      email: "john.s@example.com", 
      phone: "+1 (555) 123-4567",
      source: "Website", 
      status: "Hot", 
      lastContact: "2 hours ago",
      tags: ["Newsletter", "Webinar Attendee"],
      avatar: "JS"
    },
    { 
      id: "2", 
      name: "Emily Johnson", 
      email: "emily.j@example.com", 
      phone: "+1 (555) 234-5678",
      source: "Referral", 
      status: "Warm", 
      lastContact: "1 day ago",
      tags: ["Free Trial"],
      avatar: "EJ"
    },
    { 
      id: "3", 
      name: "Michael Brown", 
      email: "michael.b@example.com", 
      phone: "+1 (555) 345-6789",
      source: "Social Media", 
      status: "Cold", 
      lastContact: "5 days ago",
      tags: ["Newsletter"],
      avatar: "MB"
    },
    { 
      id: "4", 
      name: "Sarah Wilson", 
      email: "sarah.w@example.com", 
      phone: "+1 (555) 456-7890",
      source: "Paid Ad", 
      status: "Hot", 
      lastContact: "3 hours ago",
      tags: ["Webinar Attendee", "Free Trial"],
      avatar: "SW"
    },
    { 
      id: "5", 
      name: "David Lee", 
      email: "david.l@example.com", 
      phone: "+1 (555) 567-8901",
      source: "Email Campaign", 
      status: "Warm", 
      lastContact: "2 days ago",
      tags: ["Newsletter"],
      avatar: "DL"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hot":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hot</Badge>;
      case "Warm":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warm</Badge>;
      case "Cold":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Leads</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 p-4 font-medium">
                  <div className="col-span-2">Name</div>
                  <div>Source</div>
                  <div>Status</div>
                  <div>Tags</div>
                  <div>Last Contact</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {leads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-7 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={lead.name} />
                          <AvatarFallback>{lead.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <div className="flex flex-col text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{lead.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{lead.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>{lead.source}</div>
                      <div>{getStatusBadge(lead.status)}</div>
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs flex items-center gap-1">
                            <Tag className="h-2 w-2" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{lead.lastContact}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Contact</Button>
                        <Button variant="outline" size="sm">View</Button>
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

export default AllLeads;
