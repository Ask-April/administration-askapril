
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const People = () => {
  const people = [
    { name: "Alex Johnson", role: "Student", course: "Web Development", progress: 85, avatar: "AJ" },
    { name: "Sarah Williams", role: "Student", course: "Data Science", progress: 68, avatar: "SW" },
    { name: "Michael Chen", role: "Instructor", course: "Programming Fundamentals", students: 124, avatar: "MC" },
    { name: "Emma Davis", role: "Student", course: "UX Design", progress: 92, avatar: "ED" },
    { name: "James Wilson", role: "Instructor", course: "Mobile Development", students: 86, avatar: "JW" },
    { name: "Olivia Martinez", role: "Student", course: "Business Analytics", progress: 45, avatar: "OM" },
    { name: "Daniel Lee", role: "Teaching Assistant", course: "Web Development", avatar: "DL" },
    { name: "Sophia Brown", role: "Student", course: "Digital Marketing", progress: 76, avatar: "SB" },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">People</h1>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div className="col-span-2">Name</div>
                  <div>Role</div>
                  <div>Course</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {people.map((person, index) => (
                    <div key={index} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={person.name} />
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.name.toLowerCase().replace(' ', '.')}@example.com</p>
                        </div>
                      </div>
                      <div>
                        <Badge variant={person.role === "Instructor" ? "default" : person.role === "Teaching Assistant" ? "outline" : "secondary"}>
                          {person.role}
                        </Badge>
                      </div>
                      <div>{person.course}</div>
                      <div>
                        {person.role === "Student" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${person.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{person.progress}%</span>
                          </div>
                        ) : person.role === "Instructor" ? (
                          <span className="text-sm">{person.students} students</span>
                        ) : (
                          <span className="text-sm">Active</span>
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

export default People;
