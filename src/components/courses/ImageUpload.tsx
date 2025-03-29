
import React, { useState } from "react";
import { ImagePlus, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/supabaseStorage";
import { toast } from "sonner";

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
      console.log("Starting image upload...");
      
      // Upload the file using our utility function
      const publicUrl = await uploadImage(file, 'course-images');
      
      console.log("Upload complete. Public URL:", publicUrl);
      
      // Update the form
      onChange(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      toast.error("Failed to upload image. Please try again.");
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
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                <p className="text-sm text-muted-foreground text-center">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Click to upload course image
                </p>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  (max 5MB)
                </p>
              </>
            )}
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
