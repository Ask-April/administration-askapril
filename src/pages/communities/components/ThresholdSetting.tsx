
import React from "react";
import { Button } from "@/components/ui/button";

type ThresholdSettingProps = {
  title: string;
  description: string;
  value: string;
};

const ThresholdSetting = ({ title, description, value }: ThresholdSettingProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <Button variant="outline" size="sm">Change</Button>
      </div>
    </div>
  );
};

export default ThresholdSetting;
