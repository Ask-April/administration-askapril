
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash, Tag } from "lucide-react";

const LeadTags = () => {
  const tags = [
    { 
      id: "1", 
      name: "Hot Lead", 
      color: "red", 
      count: 56, 
      description: "Leads showing high interest and engagement"
    },
    { 
      id: "2", 
      name: "New Customer", 
      color: "green", 
      count: 124, 
      description: "Recently converted customers"
    },
    { 
      id: "3", 
      name: "Webinar Attendee", 
      color: "blue", 
      count: 87, 
      description: "Leads who attended our webinars"
    },
    { 
      id: "4", 
      name: "Newsletter", 
      color: "purple", 
      count: 342, 
      description: "Subscribed to our newsletter"
    },
    { 
      id: "5", 
      name: "Free Trial", 
      color: "amber", 
      count: 65, 
      description: "Currently on free trial period"
    },
    { 
      id: "6", 
      name: "Abandoned Cart", 
      color: "slate", 
      count: 42, 
      description: "Users who abandoned their shopping cart"
    },
  ];

  const getTagColor = (color: string) => {
    const colors = {
      red: "bg-red-100 text-red-800 hover:bg-red-100",
      green: "bg-green-100 text-green-800 hover:bg-green-100",
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      purple: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      amber: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      slate: "bg-slate-100 text-slate-800 hover:bg-slate-100"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lead Tags</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Tag
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div className="col-span-2">Tag</div>
                  <div>Count</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {tags.map((tag) => (
                    <div key={tag.id} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`flex items-center gap-1 ${getTagColor(tag.color)}`}>
                            <Tag className="h-3 w-3" />
                            {tag.name}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{tag.description}</p>
                      </div>
                      <div>{tag.count} leads</div>
                      <div className="col-span-2 flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                          <Trash className="h-3 w-3" />
                          Delete
                        </Button>
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

export default LeadTags;
