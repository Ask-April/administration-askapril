
import React, { useState, useRef, useEffect } from "react";
import { Mic, Upload, Link as LinkIcon, Play, Square, Pause } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/supabaseStorage";
import { toast } from "sonner";

interface AudioEditorProps {
  contentUrl: string;
  onContentUrlChange: (url: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const AudioEditor: React.FC<AudioEditorProps> = ({ 
  contentUrl, 
  onContentUrlChange, 
  onFileChange,
  fileInputRef 
}) => {
  const [contentMethod, setContentMethod] = useState<string>("url");
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setAudioChunks([]);
      setAudioBlob(null);
      setRecordedAudioUrl(null);
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        setAudioChunks((currentChunks) => [...currentChunks, event.data]);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        
        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check your permissions.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !recordedAudioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const handleUploadRecording = async () => {
    if (!audioBlob) return;
    
    try {
      const timestamp = new Date().getTime();
      const fileName = `recorded-audio-${timestamp}.webm`;
      const file = new File([audioBlob], fileName, { type: "audio/webm" });
      
      // TODO: Replace with your upload function
      toast.promise(
        uploadImage(file, 'course-content', 'audio'),
        {
          loading: 'Uploading recorded audio...',
          success: (url) => {
            onContentUrlChange(url);
            return 'Audio uploaded successfully!';
          },
          error: 'Failed to upload audio',
        }
      );
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error("Failed to upload recording");
    }
  };

  return (
    <Tabs defaultValue="url" value={contentMethod} onValueChange={setContentMethod} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="url"><LinkIcon className="h-4 w-4 mr-1" /> URL</TabsTrigger>
        <TabsTrigger value="upload"><Upload className="h-4 w-4 mr-1" /> Upload</TabsTrigger>
        <TabsTrigger value="record"><Mic className="h-4 w-4 mr-1" /> Record</TabsTrigger>
      </TabsList>
      
      <TabsContent value="url" className="space-y-2">
        <div>
          <Label htmlFor="audio-url">Audio URL</Label>
          <Input 
            id="audio-url" 
            placeholder="https://..." 
            value={contentUrl}
            onChange={(e) => onContentUrlChange(e.target.value)}
          />
          {contentUrl && (
            <div className="mt-3">
              <audio controls src={contentUrl} className="w-full mt-2" />
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="upload" className="space-y-2">
        <div>
          <Label htmlFor="audio-file">Upload Audio</Label>
          <Input 
            id="audio-file" 
            type="file" 
            ref={fileInputRef}
            accept="audio/*"
            onChange={onFileChange}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="record" className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-2 mb-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                size="sm" 
                variant="outline"
                className="flex items-center space-x-1"
                disabled={recordedAudioUrl !== null}
              >
                <Mic className="h-4 w-4" />
                <span>Start Recording</span>
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                size="sm" 
                variant="outline" 
                className="flex items-center space-x-1 bg-red-100"
              >
                <Square className="h-4 w-4" />
                <span>Stop Recording</span>
              </Button>
            )}
          </div>
          
          {recordedAudioUrl && (
            <div className="w-full space-y-2">
              <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePlayPause}
                  className="flex items-center space-x-1"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Play</span>
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleUploadRecording}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  <span>Use this recording</span>
                </Button>
              </div>
              
              <audio 
                ref={audioRef} 
                src={recordedAudioUrl} 
                onEnded={handleAudioEnd}
                className="hidden"
              />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setAudioChunks([]);
                  setAudioBlob(null);
                  if (recordedAudioUrl) {
                    URL.revokeObjectURL(recordedAudioUrl);
                  }
                  setRecordedAudioUrl(null);
                }}
              >
                Record Again
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AudioEditor;
