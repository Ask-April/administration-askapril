
import { supabase } from '@/integrations/supabase/client';

export const uploadImage = async (file: File, bucket: string, path: string = ''): Promise<string> => {
  try {
    console.log(`Starting upload to bucket: ${bucket}, path: ${path || 'root'}`);
    
    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fullPath = path 
      ? `${path}/${crypto.randomUUID()}.${fileExt}`
      : `${crypto.randomUUID()}.${fileExt}`;
    
    console.log(`Generated file path: ${fullPath}`);
    
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
    throw error;
  }
};

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    // Parse the URL to get the bucket and path
    const urlObj = new URL(url);
    const path = urlObj.pathname.split('/').slice(2).join('/');
    
    if (!path) {
      console.error('Invalid storage URL');
      return false;
    }
    
    // Extract bucket name from the pathname
    const bucketPath = urlObj.pathname.split('/');
    const bucket = bucketPath[1]; // Should be at index 1 (/storage/bucket-name/...)
    
    if (!bucket) {
      console.error('Could not determine bucket from URL');
      return false;
    }
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
};
