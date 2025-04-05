
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
      // Show loading indicator while checking authentication
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
