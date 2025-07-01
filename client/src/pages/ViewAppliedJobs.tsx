import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider";

type ApplicationJobTypes = {
  id: number;
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
};

const ViewAppliedJobs = () => {
  const { auth } = useAuthContext();
  const [jobs, setJobs] = useState<ApplicationJobTypes[]>([]);

  useEffect(() => {
    async function fetchAllAppliedJobs() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-all-applied-jobs/${auth?.userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        setJobs(responseData.jobs || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllAppliedJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Applied Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t applied for any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.jobTitle}
              </h3>
              <p className="text-sm text-gray-600 italic mb-3">
                {job.jobLocation}
              </p>
              <p className="text-gray-700 text-sm">{job.jobDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAppliedJobs;
