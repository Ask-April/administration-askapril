
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Settings, User } from "lucide-react";

const CommunityCard = ({ title, description, icon, link }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  link: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          {icon}
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to={link}>Manage</Link>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Communities = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Communities</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CommunityCard 
            title="All Communities" 
            description="Browse and manage all your learning communities"
            icon={<Users className="h-6 w-6 text-primary" />}
            link="/communities/all"
          />
          <CommunityCard 
            title="Discussions" 
            description="Monitor and moderate community discussions"
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            link="/communities/discussions"
          />
          <CommunityCard 
            title="Members" 
            description="Manage community members and permissions"
            icon={<User className="h-6 w-6 text-primary" />}
            link="/communities/members"
          />
          <CommunityCard 
            title="Community Settings" 
            description="Configure community preferences and options"
            icon={<Settings className="h-6 w-6 text-primary" />}
            link="/communities/settings"
          />
          <CommunityCard 
            title="Community Management" 
            description="Advanced management tools and moderation"
            icon={<Settings className="h-6 w-6 text-primary" />}
            link="/communities/manage"
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Communities;
