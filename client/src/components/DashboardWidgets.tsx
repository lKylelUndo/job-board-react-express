import React, { useEffect, useState } from "react";

type WidgetData = {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color: string;
};

const DashboardWidgets = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);

  const fetchDashboardStats = async () => {
    try {
      const responses = await Promise.all([
        fetch("http://localhost:3000/api/get-all-jobs"),
        fetch("http://localhost:3000/api/fetch-registered-employeer"),
        fetch("http://localhost:3000/api/fetch-all-candidates"),
        fetch("http://localhost:3000/api/fetch-pending-employeer"),
      ]);

      const data = await Promise.all(responses.map(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          console.error(`Error from ${res.url}:`, json.message || json.error);
          return {};
        }
        return json;
      }));

      console.log("Dashboard API responses:", data);

      // Safely extract data with fallbacks
      const totalJobs = Array.isArray(data[0]?.jobs) ? data[0].jobs.length : 0;
      const totalEmployers = Array.isArray(data[1]?.employeers) ? data[1].employeers.length : 0;
      const totalCandidates = Array.isArray(data[2]?.candidates) ? data[2].candidates.length : 0;
      const pendingEmployers = Array.isArray(data[3]?.employeers) ? data[3].employeers.length : 0;

      const widgetData: WidgetData[] = [
        {
          title: "Total Jobs",
          value: totalJobs,
          color: "border-blue-500 text-blue-700",
        },
        {
          title: "Total Employers",
          value: totalEmployers,
          color: "border-green-500 text-green-700",
        },
        {
          title: "Total Candidates",
          value: totalCandidates,
          color: "border-purple-500 text-purple-700",
        },
        {
          title: "Pending Employeer Applications",
          value: pendingEmployers,
          color: "border-yellow-500 text-yellow-700",
        },
      ];

      setWidgets(widgetData);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {widgets.map((widget, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-xl border-l-4 bg-white shadow-sm ${widget.color}`}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500 font-medium">
              {widget.title}
            </span>
            <span className="text-3xl font-bold">{widget.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
