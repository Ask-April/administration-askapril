
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

type SettingItemProps = {
  title: string;
  description: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  isChanged?: boolean;
};

const SettingItem = ({ 
  title, 
  description, 
  defaultChecked = false, 
  onToggle,
  isChanged = false
}: SettingItemProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  // Update internal state when defaultChecked changes (e.g., when settings are loaded from API)
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  
  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
    if (onToggle) {
      onToggle(checked);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          {isChanged && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Changed
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch 
        checked={checked} 
        onCheckedChange={handleCheckedChange} 
      />
    </div>
  );
};

export default SettingItem;
