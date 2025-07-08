import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardWidgets from '../components/DashboardWidgets';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* <Header title="Admin Dashboard" /> */}
        <DashboardWidgets />
        {/* Additional sections can go here */}
      </div>
    </div>
  );
};

export default Dashboard;
