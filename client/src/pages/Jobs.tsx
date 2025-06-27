import React, { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Makati City",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We are looking for a skilled frontend developer with experience in React, Tailwind CSS, and modern UI/UX design principles.",
  },
  {
    id: 2,
    title: "HR Generalist",
    company: "PeopleFirst Corp.",
    location: "Cebu City",
    type: "Part-time",
    posted: "1 week ago",
    description:
      "Handle recruitment, onboarding, and employee engagement. Requires excellent communication and organizational skills.",
  },
  {
    id: 3,
    title: "Marketing Associate",
    company: "Growth Hub PH",
    location: "Remote",
    type: "Contract",
    posted: "3 days ago",
    description:
      "Assist in campaign planning, social media management, and market research for local and international campaigns.",
  },
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <section className="py-16 px-6 w-11/12 mx-auto text-[#083d77]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Job Opportunities
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Job List */}
        <div className="md:w-1/2 space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`border cursor-pointer rounded-lg p-5 transition ${
                selectedJob?.id === job.id
                  ? "border-[#083d77] bg-blue-50"
                  : "border-gray-200"
              } hover:shadow-md`}
            >
              <h2 className="text-lg font-semibold text-[#051c34]">
                {job.title}
              </h2>
              <p className="text-[#03455f]">
                {job.company} · {job.location}
              </p>
              <div className="flex justify-between items-center mt-2 text-sm text-[#03455f]">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {job.type}
                </span>
                <span>{job.posted}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail View */}
        <div className="md:w-1/2 border border-gray-200 rounded-lg p-6 min-h-[200px]">
          {selectedJob ? (
            <>
              <h2 className="text-2xl font-bold text-[#051c34]">
                {selectedJob.title}
              </h2>
              <p className="text-[#03455f] mb-2">
                {selectedJob.company} · {selectedJob.location}
              </p>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-max text-xs font-medium mb-4">
                {selectedJob.type}
              </div>
              <p className="text-[#03455f] whitespace-pre-line">
                {selectedJob.description}
              </p>
              <p className="text-sm mt-4 text-gray-500">{selectedJob.posted}</p>
            </>
          ) : (
            <p className="text-gray-400 text-center">
              Select a job to view details
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
