
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Eye, Clock } from "lucide-react";

const Discussions = () => {
  const discussions = [
    { 
      title: "Best practices for React state management in 2023", 
      author: "Alex Johnson",
      authorAvatar: "AJ",
      community: "Web Development",
      posted: "3 hours ago",
      replies: 24,
      likes: 42,
      views: 156,
      isSticky: true,
      isHot: true
    },
    { 
      title: "How to optimize machine learning models for production", 
      author: "Emma Davis",
      authorAvatar: "ED",
      community: "Data Science",
      posted: "1 day ago",
      replies: 18,
      likes: 36,
      views: 122,
      isSticky: false,
      isHot: true
    },
    { 
      title: "UI/UX design trends to watch in 2023", 
      author: "Michael Chen",
      authorAvatar: "MC",
      community: "UX Design",
      posted: "2 days ago",
      replies: 12,
      likes: 28,
      views: 98,
      isSticky: false,
      isHot: false
    },
    { 
      title: "Getting started with TensorFlow for computer vision", 
      author: "Sarah Williams",
      authorAvatar: "SW",
      community: "AI & Machine Learning",
      posted: "3 days ago",
      replies: 15,
      likes: 32,
      views: 115,
      isSticky: false,
      isHot: false
    },
    { 
      title: "Flutter vs. React Native: A 2023 comparison", 
      author: "David Kim",
      authorAvatar: "DK",
      community: "Mobile Development",
      posted: "5 days ago",
      replies: 29,
      likes: 45,
      views: 167,
      isSticky: false,
      isHot: true
    },
    { 
      title: "How to prepare for technical interviews at FAANG companies", 
      author: "Jessica Wilson",
      authorAvatar: "JW",
      community: "Career Development",
      posted: "1 week ago",
      replies: 32,
      likes: 56,
      views: 246,
      isSticky: false,
      isHot: true
    },
  ];

  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Discussions</h1>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="divide-y">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="p-4 hover:bg-muted/50">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg`} alt={discussion.author} />
                          <AvatarFallback>{discussion.authorAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium">{discussion.title}</h3>
                            {discussion.isSticky && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Sticky</Badge>
                            )}
                            {discussion.isHot && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hot</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <Badge variant="outline" className="font-normal">{discussion.community}</Badge>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {discussion.posted}
                            </div>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{discussion.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{discussion.views} views</span>
                            </div>
                          </div>
                        </div>
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

export default Discussions;
