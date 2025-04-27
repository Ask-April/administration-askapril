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
  return;
};
export default SidebarFooter;