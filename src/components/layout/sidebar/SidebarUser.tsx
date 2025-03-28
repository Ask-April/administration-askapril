
import React from "react";
import { User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarUserProps {
  expanded: boolean;
  user: any;
}

const SidebarUser: React.FC<SidebarUserProps> = ({ expanded, user }) => {
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-md bg-sidebar-accent/40 p-3",
      !expanded && "justify-center"
    )}>
      <div className="h-9 w-9 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0">
        <User size={20} className="text-sidebar-primary-foreground" />
      </div>
      
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col overflow-hidden"
          >
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-sidebar-foreground/70">{user?.email}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarUser;
