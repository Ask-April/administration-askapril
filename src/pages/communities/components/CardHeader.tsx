
import React, { ReactNode } from "react";
import { CardDescription, CardHeader as UICardHeader, CardTitle } from "@/components/ui/card";

type IconHeaderProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const IconHeader = ({ icon, title, description }: IconHeaderProps) => {
  return (
    <UICardHeader>
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
          {React.cloneElement(icon as React.ReactElement, {
            className: "h-5 w-5 text-primary"
          })}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </UICardHeader>
  );
};

export default IconHeader;
