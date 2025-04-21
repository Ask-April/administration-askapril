
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Profile } from "@/services/types";

export type { Profile };

export const useRequireAuth = (redirectTo = "/auth/signin") => {
  const { user, loading, profile, loadingProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading: loading || loadingProfile, profile };
};
