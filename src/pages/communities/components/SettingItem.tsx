
import React from "react";
import { Switch } from "@/components/ui/switch";

type SettingItemProps = {
  title: string;
  description: string;
  defaultChecked?: boolean;
};

const SettingItem = ({ title, description, defaultChecked = false }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
};

export default SettingItem;
