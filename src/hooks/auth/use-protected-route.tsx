
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * A hook that returns a component wrapper for protected routes
 */
export const useProtectedRoute = () => {
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    redirectTo = "/auth/signin" 
  }) => {
    const { user, loading } = useAuth();

    if (loading) {
      // Show skeleton loading indicator while checking authentication
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md space-y-6 p-6">
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="flex justify-center mt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      );
    }

    // If not authenticated, redirect to the sign-in page
    if (!user) {
      return <Navigate to={redirectTo} replace />;
    }

    // If authenticated, render the protected content
    return <>{children}</>;
  };

  return ProtectedRoute;
};
