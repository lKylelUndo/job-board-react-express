import React, { useState } from "react";
import type { Job } from "../pages/Jobs";
import { useAuthContext } from "../context/AuthProvider";
import SelectedJobCard from "./SelectedJobCard";

type JobCardProps = {
  jobs: Job[] | null;
};

const JobCard = ({ jobs }: JobCardProps) => {
  const { auth } = useAuthContext();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  console.log(jobs)

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
      <SelectedJobCard selectedJob={selectedJob} />
    </div>
  );
};

export default JobCard;
