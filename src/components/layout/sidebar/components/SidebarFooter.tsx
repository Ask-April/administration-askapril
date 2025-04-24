
import React from "react";
import SidebarUser from "../SidebarUser";
import { User } from "@supabase/supabase-js";

interface SidebarFooterProps {
  expanded: boolean;
  user: User | null;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ expanded, user }) => {
  return (
    <div className="mt-auto p-4">
      <SidebarUser expanded={expanded} user={user} />
    </div>
  );
};

export default SidebarFooter;
