
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Hook to fetch and manage user profile data
 */
export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoadingProfile(false);
        return;
      }

      try {
        // First check if the profile exists
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const newProfile = {
              id: user.id,
              display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              avatar_url: user.user_metadata?.avatar_url || null,
              bio: null
            };
            
            const { data: createdProfile, error: createError } = await supabase
              .from('profiles')
              .insert(newProfile)
              .select()
              .single();
              
            if (createError) {
              console.error("Error creating profile:", createError);
              toast.error("Failed to create your profile");
            } else {
              setProfile(createdProfile as Profile);
            }
          } else {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load your profile");
          }
        } else {
          setProfile(data as Profile);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loadingProfile };
};
