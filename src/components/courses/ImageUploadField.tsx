
import React, { useState } from "react";
import { ImagePlus, Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/supabaseStorage";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface ImageUploadFieldProps {
  name: string;
  label: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ name, label }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useFormContext();
  const value = form.watch(name);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
      toast.error("Invalid file type. Please upload an image.");
      return;
    }
    
    // Validate file size (3MB limit)
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      setError("File size should be less than 3MB");
      toast.error("File size should be less than 3MB");
      return;
    }
    
    // Clear any previous errors
    setError(null);
    setIsUploading(true);
    
    try {
      console.log("Starting image upload for file:", file.name, "type:", file.type);
      
      // Upload the file using our utility function
      const publicUrl = await uploadImage(file, 'course-images');
      
      console.log("Upload complete. Public URL:", publicUrl);
      
      // Update the form
      form.setValue(name, publicUrl, { shouldValidate: true });
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
    form.setValue(name, "", { shouldValidate: true });
  };

  const triggerFileInput = () => {
    document.getElementById(`image-upload-${name}`)?.click();
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
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
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      (max 3MB)
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          
          <input
            id={`image-upload-${name}`}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
          
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ImageUploadField;
