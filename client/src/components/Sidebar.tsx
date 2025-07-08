import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-5 shadow-sm">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">JobBoard Admin</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/jobs" className="text-gray-700 hover:text-blue-500">Manage Jobs</Link></li>
        <li><Link to="/employeers-page" className="text-gray-700 hover:text-blue-500">Employers</Link></li>
        <li><Link to="/candidates-page" className="text-gray-700 hover:text-blue-500">Candidates</Link></li>
        <li><Link to="/employeers-application-page" className="text-gray-700 hover:text-blue-500">Applications</Link></li>
        <li><Link to="/settings" className="text-gray-700 hover:text-blue-500">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
