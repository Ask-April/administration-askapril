
import React from "react";
import PageTransition from "@/components/layout/PageTransition";
import DashboardComponent from "@/components/dashboard/Dashboard";

const Dashboard = () => {
  return (
    <PageTransition>
      <DashboardComponent />
    </PageTransition>
  );
};

export default Dashboard;
