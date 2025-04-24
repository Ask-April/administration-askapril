
import React from "react";
import { Profile } from "@/hooks/auth/use-profile";
import NavbarActions from "./navbar/NavbarActions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SidebarLogo from "./sidebar/SidebarLogo";

interface NavbarProps {
  profile: Profile | null;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  return (
    <header className="bg-background border-b border-border h-16 fixed top-0 right-0 left-0 z-30 transition-all duration-300 flex items-center px-4 justify-between">
      {/* Left section - Hamburger menu toggle for mobile */}
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      
      {/* Center section - Logo */}
      <div className="flex items-center justify-center flex-1 md:justify-start">
        <SidebarLogo expanded={true} className="h-10" />
      </div>
      
      {/* Right section - User profile/actions */}
      <NavbarActions profile={profile} />
    </header>
  );
};

export default Navbar;
