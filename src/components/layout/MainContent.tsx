
import React from "react";
import Navbar from "./Navbar";
import { Profile } from "@/hooks/auth/use-profile";

interface MainContentProps {
  children: React.ReactNode;
  profile: Profile | null;
}

const MainContent: React.FC<MainContentProps> = ({ children, profile }) => {
  return (
    <div className="flex-1 flex flex-col w-0 pl-[78px] transition-all duration-300">
      {/* Navbar remains fixed; the padding left is managed by sidebar state */}
      <Navbar profile={profile} />
      <main className="pt-16 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainContent;
