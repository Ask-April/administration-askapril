import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, File, FileVideo, FileAudio } from "lucide-react";

const MediaLibrary = () => {
  return (
    <PageTransition>
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Media Library</h1>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MediaItem type="image" name="course-thumbnail-1.jpg" />
                  <MediaItem type="video" name="intro-lecture.mp4" />
                  <MediaItem type="document" name="course-slides.pdf" />
                  <MediaItem type="image" name="project-example.png" />
                  <MediaItem type="audio" name="podcast-interview.mp3" />
                  <MediaItem
                    type="document"
                    name="assignment-instructions.docx"
                  />
                  <MediaItem type="video" name="tutorial-lesson-2.mp4" />
                  <MediaItem type="image" name="infographic.jpg" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MediaItem type="image" name="course-thumbnail-1.jpg" />
                  <MediaItem type="image" name="project-example.png" />
                  <MediaItem type="image" name="infographic.jpg" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MediaItem type="video" name="intro-lecture.mp4" />
                  <MediaItem type="video" name="tutorial-lesson-2.mp4" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MediaItem type="document" name="course-slides.pdf" />
                  <MediaItem
                    type="document"
                    name="assignment-instructions.docx"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <MediaItem type="audio" name="podcast-interview.mp3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

const MediaItem = ({ type, name }: { type: string; name: string }) => {
  const getIcon = () => {
    switch (type) {
      case "image":
        return <Image className="h-8 w-8 text-blue-500" />;
      case "video":
        return <FileVideo className="h-8 w-8 text-red-500" />;
      case "document":
        return <File className="h-8 w-8 text-yellow-500" />;
      case "audio":
        return <FileAudio className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8" />;
    }
  };

  return (
    <div className="bg-muted rounded-md p-4 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="h-24 flex items-center justify-center bg-background rounded border">
        {getIcon()}
      </div>
      <div>
        <p className="font-medium truncate text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{type} • 2.4 MB</p>
      </div>
    </div>
  );
};

export default MediaLibrary;
