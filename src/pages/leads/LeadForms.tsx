
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";

const LeadForms = () => {
  const forms = [
    { 
      id: "1", 
      name: "Newsletter Signup", 
      submissions: 156, 
      conversion: "12.4%", 
      lastActive: "2 hours ago",
      fields: 4
    },
    { 
      id: "2", 
      name: "Contact Request", 
      submissions: 78, 
      conversion: "8.2%", 
      lastActive: "1 day ago",
      fields: 6
    },
    { 
      id: "3", 
      name: "Course Interest", 
      submissions: 124, 
      conversion: "15.7%", 
      lastActive: "5 hours ago",
      fields: 5
    },
    { 
      id: "4", 
      name: "Free Trial Request", 
      submissions: 92, 
      conversion: "18.5%", 
      lastActive: "3 days ago",
      fields: 3
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lead Forms</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Form
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div className="col-span-2">Form Name</div>
                  <div>Submissions</div>
                  <div>Conversion Rate</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {forms.map((form) => (
                    <div key={form.id} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2">
                        <p className="font-medium">{form.name}</p>
                        <p className="text-sm text-muted-foreground">{form.fields} fields • Last active {form.lastActive}</p>
                      </div>
                      <div>{form.submissions}</div>
                      <div>{form.conversion}</div>
                      <div className="flex gap-2">
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

export default LeadForms;
