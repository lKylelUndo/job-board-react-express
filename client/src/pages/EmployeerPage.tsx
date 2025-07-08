import React from "react";
import Sidebar from "../components/Sidebar";

const EmployeerPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto"></div>
    </div>
  );
};

export default EmployeerPage;
