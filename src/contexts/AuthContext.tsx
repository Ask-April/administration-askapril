
import React, { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useAuthState } from "@/hooks/auth/use-auth-state";
import { useAuthMethods } from "@/hooks/auth/use-auth-methods";
import { Profile, useProfile } from "@/hooks/auth/use-profile";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  loadingProfile: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use the auth state hook to manage user and session
  const { user, session, loading } = useAuthState();
  
  // Use the auth methods hook to get authentication functions
  const { signIn, signUp, signOut } = useAuthMethods();
  
  // Use the profile hook to fetch user profile data
  const { profile, loadingProfile } = useProfile(user);

  const value = {
    session,
    user,
    loading,
    profile,
    loadingProfile,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
