import React from "react";

const widgets = [
  { title: "Total Jobs", value: 132, color: "bg-blue-100 text-blue-700" },
  { title: "Total Employers", value: 45, color: "bg-green-100 text-green-700" },
  {
    title: "Total Candidates",
    value: 312,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Pending Applications",
    value: 27,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const DashboardWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {widgets.map((widget, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-lg shadow-sm ${widget.color} font-medium text-lg text-center`}
        >
          <h3 className="mb-2">{widget.title}</h3>
          <p className="text-3xl font-bold">{widget.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
