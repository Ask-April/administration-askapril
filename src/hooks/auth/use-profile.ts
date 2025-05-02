
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Profile } from "@/services/types";

export type { Profile }; // Use "export type" for isolatedModules

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
        // Now we use the correct Table definition for "profiles":
        // Note: We're casting "profiles" as any due to TypeScript errors with the supabase client
        // This is a workaround until the proper types are available
        const { data, error } = await supabase
          .from("profiles" as any)
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (!data && error && error.code === 'PGRST116') {
          // Profile does not exist -- create one
          const newProfile: Omit<Profile, "created_at" | "updated_at"> & { created_at?: string, updated_at?: string } = {
            id: user.id,
            display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
            avatar_url: user.user_metadata?.avatar_url || null,
            bio: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          
          // Cast "profiles" as any to work around TypeScript errors
          const { data: created, error: createError } = await supabase
            .from('profiles' as any)
            .insert(newProfile)
            .select()
            .maybeSingle();
            
          if (createError) {
            toast.error("Failed to create your profile: " + createError.message);
            setProfile(null);
          } else {
            // Cast the created data to our Profile type
            setProfile(created as unknown as Profile);
          }
        } else if (error) {
          toast.error("Failed to load your profile: " + error.message);
          setProfile(null);
        } else if (data) {
          // Cast the data to our Profile type
          setProfile(data as unknown as Profile);
        } else {
          setProfile(null);
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
