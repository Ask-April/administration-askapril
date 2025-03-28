
import React from "react";
import { SearchBar, NavbarActions } from "./navbar";
import { Profile } from "@/hooks/auth/use-profile";

interface NavbarProps {
  profile: Profile | null;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  return (
    <header className="bg-background border-b border-border h-16 fixed top-0 right-0 left-0 z-30 transition-all duration-300 flex items-center px-4 sm:px-6 pl-[78px]">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <SearchBar />
        </div>
        
        <NavbarActions profile={profile} />
      </div>
    </header>
  );
};

export default Navbar;
