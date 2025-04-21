import React from "react";
import { Profile } from "@/hooks/auth/use-profile";
import NavbarActions from "./navbar/NavbarActions";
import SearchBar from "./navbar/SearchBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
interface NavbarProps {
  profile: Profile | null;
}
const Navbar: React.FC<NavbarProps> = ({
  profile
}) => {
  return <header className="border-b border-border h-16 fixed top-0 right-0 left-0 z-30 transition-all duration-300 flex items-center px-4 sm:px-6 pl-[78px] bg-slate-950">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Show sidebar trigger on mobile only */}
          <div className="sm:hidden">
            <SidebarTrigger />
          </div>
          {/* Always show search bar on all screens now */}
          <SearchBar />
        </div>
        <NavbarActions profile={profile} />
      </div>
    </header>;
};
export default Navbar;