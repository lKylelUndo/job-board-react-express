import React, { useState } from "react";
import type { Job } from "../pages/Jobs";
import { useAuthContext } from "../context/AuthProvider";

type JobCardProps = {
  jobs: Job[] | null;
};

const JobCard = ({ jobs }: JobCardProps) => {
  const { auth } = useAuthContext();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="md:flex gap-8 w-full">
      {/* Job list */}
      <div className="md:w-1/2 space-y-4">
        {jobs?.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className={`border cursor-pointer rounded-lg p-5 transition ${
              selectedJob?.id === job.id
                ? "border-[#083d77] bg-blue-50"
                : "border-gray-200"
            } hover:shadow-md`}
          >
            <h2 className="text-lg font-semibold text-[#717e8b]">
              {job.jobTitle}
            </h2>
            <p className="text-[#03455f]">{job.jobLocation}</p>
            <p className="text-[#03455f]">{job.jobSalary}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-[#03455f]">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {job.jobType}
              </span>
              <span>{job.jobPosted}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Job details */}
      <div className="md:w-1/2 border border-gray-200 rounded-lg p-6 min-h-[300px] mt-6 md:mt-0 sticky top-20 h-max">
        {selectedJob ? (
          <>
            <h2 className="text-2xl font-bold text-[#051c34]">
              {selectedJob.jobTitle}
            </h2>
            <p className="text-[#03455f] mb-2">{selectedJob.jobLocation}</p>
            <p className="text-[#03455f] mb-2">{selectedJob.jobSalary}</p>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-max text-xs font-medium mb-4">
              {selectedJob.jobType}
            </div>
            <p className="text-[#03455f] whitespace-pre-line">
              {selectedJob.jobDescription}
            </p>
            <p className="text-sm mt-4 text-gray-500">
              {selectedJob.jobPosted}
            </p>
            {auth?.isAuthenticated && (
              <button className="btn btn-info" data-theme="aqua">
                Apply Now
              </button>
            )}
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
