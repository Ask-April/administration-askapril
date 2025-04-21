

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "@/services/types";

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
        // Try to get the profile from the profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          toast.error("Failed to load your profile: " + error.message);
          setProfile(null);
        } else if (!data) {
          // profile does not exist -- create one
          const newProfile: Omit<Profile, 'created_at' | 'updated_at'> = {
            id: user.id,
            display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            avatar_url: user.user_metadata?.avatar_url || null,
            bio: null,
          };
          const { data: created, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .maybeSingle();

          if (createError) {
            toast.error("Failed to create your profile: " + createError.message);
            setProfile(null);
          } else {
            setProfile(created as Profile);
          }
        } else {
          setProfile(data as Profile);
        }
      } catch (e) {
        console.error("Profile fetch error:", e);
        toast.error("Unexpected error loading profile");
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loadingProfile };
};

