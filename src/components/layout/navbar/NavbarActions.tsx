
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import { Profile } from "@/hooks/auth/use-profile";

interface NavbarActionsProps {
  profile: Profile | null;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ profile }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Notifications</span>
      </Button>
      
      <Button variant="ghost" size="icon" className="rounded-full">
        <Settings className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Settings</span>
      </Button>
      
      <UserMenu profile={profile} />
    </div>
  );
};

export default NavbarActions;
