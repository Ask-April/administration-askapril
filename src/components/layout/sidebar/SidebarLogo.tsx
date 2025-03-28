
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarLogoProps {
  expanded: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ expanded }) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {expanded ? (
        <motion.div
          key="full-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <img 
            src="/lovable-uploads/d69fe8cc-396d-4df5-9d0f-2f686f1cbea9.png" 
            alt="AskApril.AI Logo" 
            className="h-14 w-auto" 
          />
        </motion.div>
      ) : (
        <motion.div
          key="icon-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto"
        >
          <img 
            src="/lovable-uploads/d69fe8cc-396d-4df5-9d0f-2f686f1cbea9.png" 
            alt="AskApril.AI Logo" 
            className="h-12 w-auto" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarLogo;
