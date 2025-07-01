import React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { applyJob } from "../services/JobApplicationServices";

export type SelectedJobCardProps = {
  id: number;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  jobSalary: string;
  jobDescription: string;
  jobPosted: string;
};

type SelectedJobProps = {
  selectedJob: SelectedJobCardProps | null;
};

const SelectedJobCard = ({ selectedJob }: SelectedJobProps) => {
  const { auth } = useAuthContext();

  const handleApply = async (selectedJob: SelectedJobCardProps) => {
    try {
      const { id, ...restJob } = selectedJob;
      const updatedJob = { ...restJob, userId: auth?.userId };

      const result = await applyJob(updatedJob);
      
      if (!result) throw new Error("Failed to apply");

      const { response, responseData } = result;
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
          <p className="text-sm mt-4 text-gray-500">{selectedJob.jobPosted}</p>
          {auth?.isAuthenticated && (
            <button
              onClick={() => handleApply(selectedJob)}
              className="btn btn-info"
              data-theme="aqua"
            >
              Quick Apply
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400 text-center">
          Select a job to view details
        </p>
      )}
    </div>
  );
};

export default SelectedJobCard;
