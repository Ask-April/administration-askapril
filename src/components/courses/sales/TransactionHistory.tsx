
import React from "react";
import { Button } from "@/components/ui/button";

interface TransactionHistoryProps {
  // Add any props here if needed
}

const TransactionHistory: React.FC<TransactionHistoryProps> = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Transaction History</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Recent transactions will appear here
      </p>
      <Button variant="outline">View All Transactions</Button>
    </div>
  );
};

export default TransactionHistory;
