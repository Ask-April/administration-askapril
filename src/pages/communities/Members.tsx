
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Clock } from "lucide-react";

const Members = () => {
  const members = [
    { 
      name: "Thomas Anderson", 
      username: "@neo",
      email: "thomas.a@example.com",
      role: "Admin",
      communities: ["Web Development", "AI & Machine Learning"],
      joinDate: "January 12, 2022",
      lastActive: "2 hours ago",
      avatar: "TA",
      verified: true
    },
    { 
      name: "Lisa Johnson", 
      username: "@lisaj",
      email: "lisa.j@example.com",
      role: "Moderator",
      communities: ["Data Science", "Career Development"],
      joinDate: "March 8, 2022",
      lastActive: "1 day ago",
      avatar: "LJ",
      verified: true
    },
    { 
      name: "David Wong", 
      username: "@dwong",
      email: "david.w@example.com",
      role: "Member",
      communities: ["UX Design"],
      joinDate: "May 17, 2022",
      lastActive: "5 hours ago",
      avatar: "DW",
      verified: true
    },
    { 
      name: "James Wilson", 
      username: "@jwilson",
      email: "james.w@example.com",
      role: "Member",
      communities: ["Mobile Development", "Web Development"],
      joinDate: "August 24, 2022",
      lastActive: "2 days ago",
      avatar: "JW",
      verified: false
    },
    { 
      name: "Maria Garcia", 
      username: "@mgarcia",
      email: "maria.g@example.com",
      role: "Moderator",
      communities: ["Web Development", "Career Development"],
      joinDate: "October 5, 2022",
      lastActive: "3 hours ago",
      avatar: "MG",
      verified: true
    },
    { 
      name: "Samuel Lee", 
      username: "@slee",
      email: "samuel.l@example.com",
      role: "Member",
      communities: ["AI & Machine Learning"],
      joinDate: "December 12, 2022",
      lastActive: "1 week ago",
      avatar: "SL",
      verified: true
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        );
      case "Moderator":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Moderator
          </Badge>
        );
      default:
        return <Badge variant="outline">Member</Badge>;
    }
  };

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Community Members</h1>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div className="col-span-2">Member</div>
                  <div>Role</div>
                  <div>Communities</div>
                  <div>Last Active</div>
                </div>
                <div className="divide-y">
                  {members.map((member, index) => (
                    <div key={index} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={member.name} />
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium">{member.name}</p>
                            {member.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex flex-col text-sm text-muted-foreground">
                            <span>{member.username}</span>
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {getRoleBadge(member.role)}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.communities.map((community, communityIndex) => (
                          <Badge key={communityIndex} variant="outline" className="text-xs">
                            {community}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{member.lastActive}</span>
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

export default Members;
