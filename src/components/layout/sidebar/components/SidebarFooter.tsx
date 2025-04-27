
import React from "react";
import SidebarUser from "../SidebarUser";
import { User } from "@supabase/supabase-js";

interface SidebarFooterProps {
  expanded: boolean;
  user: User | null;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  expanded,
  user
}) => {
  return (
    <div className="mt-auto border-t border-sidebar-border pt-2">
      <SidebarUser user={user} expanded={expanded} />
    </div>
  );
};

export default SidebarFooter;
