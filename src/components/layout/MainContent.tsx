
import React from "react";
import Navbar from "./Navbar";
import { Profile } from "@/hooks/auth/use-profile";

interface MainContentProps {
  children: React.ReactNode;
  profile: Profile | null;
}

const MainContent: React.FC<MainContentProps> = ({ children, profile }) => {
  return (
    <div className="flex-1 flex flex-col w-full transition-all duration-300 ml-0 md:ml-64">
      <Navbar profile={profile} />
      <main className="pt-16 flex-1 overflow-auto h-screen">
        {children}
      </main>
    </div>
  );
};

export default MainContent;
