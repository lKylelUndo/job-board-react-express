import React, { useState } from "react";
import type { Job } from "../pages/Jobs";

const JobCard = ({ jobs }: { jobs: Job[] }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="md:flex gap-8 w-full">
      {/* Job list */}
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

      {/* Job details */}
      <div className="md:w-1/2 border border-gray-200 rounded-lg p-6 min-h-[200px] mt-6 md:mt-0">
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
  );
};

export default JobCard;
