
import React from "react";

interface DevicePlatformProps {
  // Add any props here if needed
}

const DevicePlatform: React.FC<DevicePlatformProps> = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Device & Platform</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Desktop</span>
          <span className="text-sm font-medium">64%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Mobile</span>
          <span className="text-sm font-medium">29%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Tablet</span>
          <span className="text-sm font-medium">7%</span>
        </div>
      </div>
    </div>
  );
};

export default DevicePlatform;
