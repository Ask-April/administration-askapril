
import React, { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }
    
    // Clear any previous errors
    setError(null);
    setIsUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `public/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('course-images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('course-images')
        .getPublicUrl(filePath);
      
      // Update the form
      onChange(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div 
        className="relative w-full aspect-video bg-muted border rounded-md overflow-hidden cursor-pointer"
        onClick={triggerFileInput}
      >
        {value ? (
          <>
            <img 
              src={value} 
              alt="Course preview" 
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              {isUploading ? "Uploading..." : "Click to upload course image"}
            </p>
          </div>
        )}
      </div>
      
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={isUploading}
      />
      
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
