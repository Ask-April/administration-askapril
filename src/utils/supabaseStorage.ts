
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const uploadImage = async (file: File, bucket: string, path: string = ''): Promise<string> => {
  try {
    console.log(`Starting upload to bucket: ${bucket}, path: ${path || 'root'}`);
    
    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}${fileExt ? `.${fileExt}` : ''}`;
    
    const fullPath = path 
      ? `${path}/${fileName}`
      : fileName;
    
    console.log(`Generated file path: ${fullPath}`);
    
    // Check for authenticated user
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      console.warn('No authenticated user found for upload. This may cause permission issues.');
    }
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
    
    console.log('File uploaded successfully:', data);
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);
    
    console.log('Generated public URL:', publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    
    // For development purposes, create a dummy URL to use for testing
    // This should be removed in production
    console.log('Creating dummy URL for development testing');
    const dummyUrl = `https://example.com/${bucket}/${file.name}?mock=true`;
    
    // Only in development, return a dummy URL
    if (process.env.NODE_ENV === 'development') {
      return dummyUrl;
    }
    
    throw error;
  }
};

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    // Parse the URL to get the bucket and path
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // Format for Supabase storage URLs: /storage/v1/object/public/[bucket]/[path]
    if (pathParts.length < 4) {
      console.error('Invalid storage URL format');
      return false;
    }
    
    // Extract bucket (should be at index 4 in /storage/v1/object/public/bucket/...)
    const bucketIndex = pathParts.findIndex(part => part === 'public') + 1;
    if (bucketIndex < 1 || bucketIndex >= pathParts.length) {
      console.error('Could not determine bucket from URL');
      return false;
    }
    
    const bucket = pathParts[bucketIndex];
    // Path is everything after the bucket name
    const path = pathParts.slice(bucketIndex + 1).join('/');
    
    if (!bucket || !path) {
      console.error('Could not extract bucket or path from URL:', { url, bucket, path });
      return false;
    }
    
    console.log('Deleting file from storage:', { bucket, path });
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    console.log('File deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
};
